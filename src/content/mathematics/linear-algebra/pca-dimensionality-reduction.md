---
title: "Principal Component Analysis (PCA)"
description: "Dimensionality reduction, empirical covariance matrices, variance maximization, orthogonal projections, and scree plots in data engineering."
---

## 1. The Curse of Dimensionality

In machine learning and data engineering, high-dimensional datasets ($d > 1000$ features) suffer from:
1. **Exponential Volume Growth**: Data points become sparse, making distance metrics (Euclidean distance) converge to identical values.
2. **Overfitting & Noise**: High feature counts lead to collinearly correlated columns and redundant noise.
3. **Compute Latency**: Training algorithms scale with dimension $O(d^2)$ or $O(d^3)$.

**Principal Component Analysis (PCA)** is an unsupervised linear dimensionality reduction technique that projects data from $\mathbb{R}^d$ down to $\mathbb{R}^k$ ($k \ll d$) while **maximizing the preserved variance**.

---

## 2. Mathematical Derivation via Covariance Maximization

Let $X \in \mathbb{R}^{n \times d}$ be a zero-centered dataset with $n$ observations and $d$ features ($\frac{1}{n}\sum_{i=1}^n x_i = \mathbf{0}$).

### The Empirical Covariance Matrix
The sample covariance matrix $\Sigma \in \mathbb{R}^{d \times d}$ is:

$$\Sigma = \frac{1}{n - 1} X^T X$$

$\Sigma$ is symmetric and positive semi-definite ($x^T \Sigma x \ge 0$).

### Maximizing Variance along Direction $w$
We seek a unit projection vector $w \in \mathbb{R}^d$ ($\|w\|_2 = 1$) such that the variance of the projected data points $z = Xw$ is maximized:

$$\max_w \frac{1}{n - 1} \|Xw\|^2 = \max_w w^T \left( \frac{1}{n - 1} X^T X \right) w = \max_w w^T \Sigma w \quad \text{s.t. } w^T w = 1$$

Using Lagrange Multipliers:

$$\mathcal{L}(w, \lambda) = w^T \Sigma w - \lambda (w^T w - 1)$$

Taking the gradient with respect to $w$ and setting to zero:

$$\nabla_w \mathcal{L} = 2 \Sigma w - 2 \lambda w = \mathbf{0} \implies \Sigma w = \lambda w$$

### The Core Result
The directions of maximum variance are precisely the **Eigenvectors of the Covariance Matrix $\Sigma$**, and the variance captured along each direction is given by its **Eigenvalue $\lambda$**!

---

## 3. Scree Plot & Explained Variance Ratio

When selecting the target dimension $k$, engineers plot the **Explained Variance Ratio**:

$$\text{EVR}_i = \frac{\lambda_i}{\sum_{j=1}^d \lambda_j}$$

$$\text{Cumulative Variance}(k) = \frac{\sum_{i=1}^k \lambda_i}{\sum_{j=1}^d \lambda_j}$$

A standard engineering rule-of-thumb is to choose $k$ at the "elbow" of the scree plot or where Cumulative Variance $\ge 95\%$.

```
Variance Explained (%)
100% ────────────.───────.───────.───────.── (95% Threshold)
 80%         .·'
 60%     .·'
 40%  .·'
 20% /
  0% ────────────────────────────────────────►
     k=1     k=2    k=5     k=10    k=50  (Components)
```

---

## 4. Connection Between PCA and SVD

In production implementations, calculating the covariance matrix $X^T X$ directly is **avoided** because it squares condition numbers and requires $O(n d^2)$ memory.

Instead, production libraries (scikit-learn, PyTorch) compute PCA directly via the SVD of the centered matrix $X$:

$$X = U \Sigma V^T$$

The right singular vectors $V$ are **identically the eigenvectors of $X^T X$**, and singular values relate directly to eigenvalues:

$$\Sigma_{\text{cov}} = \frac{1}{n - 1} X^T X = \frac{1}{n - 1} (V \Sigma U^T)(U \Sigma V^T) = V \left( \frac{\Sigma^2}{n - 1} \right) V^T$$

$$\lambda_i = \frac{\sigma_i^2}{n - 1}$$

The projected low-dimensional data is computed simply as $Z_k = X V_k = U_k \Sigma_k$.

---

## 5. Python Implementation: End-to-End PCA from Scratch

```python
import numpy as np

class PrincipalComponentAnalysis:
    def __init__(self, n_components: int):
        self.n_components = n_components
        self.mean = None
        self.components = None
        self.explained_variance_ratio_ = None

    def fit(self, X: np.ndarray):
        # 1. Zero-center the dataset
        self.mean = np.mean(X, axis=0)
        X_centered = X - self.mean
        
        # 2. Compute SVD directly on centered data
        U, S, Vt = np.linalg.svd(X_centered, full_matrices=False)
        
        # 3. Principal components are rows of Vt
        self.components = Vt[:self.n_components]
        
        # 4. Calculate explained variance
        n_samples = X.shape[0]
        eigenvalues = (S ** 2) / (n_samples - 1)
        total_variance = np.sum(eigenvalues)
        self.explained_variance_ratio_ = eigenvalues[:self.n_components] / total_variance
        return self

    def transform(self, X: np.ndarray) -> np.ndarray:
        X_centered = X - self.mean
        # Project onto top k components
        return X_centered @ self.components.T

# Test on 1000 samples with 10 features
X_raw = np.random.randn(1000, 10)
pca = PrincipalComponentAnalysis(n_components=3)
pca.fit(X_raw)
X_reduced = pca.transform(X_raw)

print(f"Original shape: {X_raw.shape}, Reduced shape: {X_reduced.shape}")
print(f"Explained Variance Ratio per component: {pca.explained_variance_ratio_}")
print(f"Total variance retained: {np.sum(pca.explained_variance_ratio_) * 100:.2f}%")
```
