---
title: "Singular Value Decomposition (SVD)"
description: "The fundamental theorem of data science, low-rank matrix approximation, pseudoinverses, and recommendation system engines."
---

## 1. The Fundamental SVD Theorem

While eigendecomposition only exists for square, diagonalizable matrices, the **Singular Value Decomposition (SVD)** exists for **any real or complex rectangular matrix** $A \in \mathbb{R}^{m \times n}$.

Every matrix $A$ can be factored into three matrices:

$$A = U \Sigma V^T$$

$$\begin{bmatrix} & & \\ & A & \\ & & \end{bmatrix}_{m \times n} = 
\begin{bmatrix} & & \\ & U & \\ & & \end{bmatrix}_{m \times m} 
\begin{bmatrix} 
\sigma_1 & & 0 \\ 
& \sigma_2 & \\ 
0 & & \ddots 
\end{bmatrix}_{m \times n} 
\begin{bmatrix} & & \\ & V^T & \\ & & \end{bmatrix}_{n \times n}$$

- **$U \in \mathbb{R}^{m \times m}$**: Orthogonal matrix ($U^T U = I$). The columns $u_i$ are the **left singular vectors** (eigenvectors of $A A^T$).
- **$\Sigma \in \mathbb{R}^{m \times n}$**: Diagonal rectangular matrix containing non-negative **singular values** $\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r > 0$ ordered in descending magnitude.
- **$V \in \mathbb{R}^{n \times n}$**: Orthogonal matrix ($V^T V = I$). The columns $v_i$ are the **right singular vectors** (eigenvectors of $A^T A$).

### Geometric Meaning: Rotation $\to$ Scaling $\to$ Rotation
Any linear mapping $A$ can be decomposed into:
1. An initial rotation in $\mathbb{R}^n$ via $V^T$.
2. A scaling along principal axes by singular values $\sigma_i$.
3. A secondary rotation in $\mathbb{R}^m$ via $U$.

---

## 2. Low-Rank Matrix Approximation (Eckart-Young-Mirsky Theorem)

In practical data systems, matrices are massive (e.g. Netflix user-movie rating matrix: 100M users $\times$ 50K movies). Storing the full matrix requires terabytes of RAM.

By expanding $A$ as a sum of rank-1 outer products:

$$A = \sum_{i=1}^r \sigma_i u_i v_i^T$$

The **Eckart-Young-Mirsky Theorem** states that the optimal rank-$k$ approximation $A_k$ that minimizes the Frobenius norm error $\|A - A_k\|_F$ is obtained by truncating the summation to the first $k$ terms:

$$A_k = \sum_{i=1}^k \sigma_i u_i v_i^T, \quad k < r$$

$$\min_{\text{rank}(B) = k} \|A - B\|_F = \|A - A_k\|_F = \sqrt{\sum_{i=k+1}^r \sigma_i^2}$$

```
Full Matrix A (m x n)          Truncated SVD (Rank k Approximation)
┌──────────────────────┐       ┌────┐   ┌──────┐   ┌────────────┐
│                      │       │    │   │σ₁    │   │            │
│                      │   ≈   │ Uₖ │ · │   σₖ │ · │    Vₖᵀ     │
│                      │       │    │   └──────┘   │            │
└──────────────────────┘       └────┘    (k x k)   └────────────┘
 (m x n storage)               (m x k)                 (k x n)
```

---

## 3. Collaborative Filtering & Recommendation Systems

In modern recommendation engines (Netflix, Spotify, Amazon), user interactions form a sparse matrix $R \in \mathbb{R}^{N \times M}$.

Applying Truncated SVD discovers $k$ **latent features** (e.g. "Sci-Fi Action", "Romantic Comedy", "Tempo"):
- $U_k$: Maps users into $k$-dimensional preference vectors.
- $V_k$: Maps items into $k$-dimensional attribute vectors.
- The predicted rating of user $u$ for item $i$ is calculated as the dot product:

$$\hat{R}_{u, i} = u_u^T \Sigma_k v_i$$

---

## 4. The Moore-Penrose Pseudoinverse ($A^+$)

When $A$ is non-square or rank-deficient, the standard inverse $A^{-1}$ does not exist. Using SVD, the **Moore-Penrose Pseudoinverse** is defined as:

$$A^+ = V \Sigma^+ U^T$$

where $\Sigma^+$ is formed by inverting non-zero singular values ($\sigma_i \to 1/\sigma_i$) and transposing. $x = A^+ b$ computes the **minimum-norm least-squares solution** to any linear system.

---

## 5. Python Implementation: Image Compression via Truncated SVD

```python
import numpy as np

def compress_matrix_svd(matrix: np.ndarray, k: int) -> tuple[np.ndarray, float]:
    """
    Compresses an 2D array/image to rank k using Truncated SVD.
    Returns reconstructed matrix and compression ratio.
    """
    U, s, Vt = np.linalg.svd(matrix, full_matrices=False)
    
    # Truncate to top k singular components
    U_k = U[:, :k]
    s_k = s[:k]
    Vt_k = Vt[:k, :]
    
    # Reconstruct rank-k approximation
    reconstructed = U_k @ np.diag(s_k) @ Vt_k
    
    # Compression storage ratio: (m*k + k + k*n) / (m*n)
    m, n = matrix.shape
    compressed_entries = m * k + k + k * n
    original_entries = m * n
    ratio = compressed_entries / original_entries
    
    return reconstructed, ratio

# Generate a synthetic 512x512 feature matrix
original = np.random.randn(512, 512)
approx, comp_ratio = compress_matrix_svd(original, k=20)
print(f"Compressed storage requirement: {comp_ratio * 100:.2f}% of original size")
```
