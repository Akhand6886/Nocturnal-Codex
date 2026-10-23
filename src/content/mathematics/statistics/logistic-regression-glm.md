---
title: "Logistic Regression & Generalized Linear Models"
description: "GLM exponential family, the logit link function, odds ratios, binary cross-entropy, Iteratively Reweighted Least Squares (IRLS), and ROC/AUC diagnostics."
---

## 1. Extending Linear Models: The GLM Framework

Standard Ordinary Least Squares (OLS) regression requires that the target variable $y$ is continuous and unrestricted across $(-\infty, \infty)$. 

However, in classification, count modeling, and survival analysis:
- Click-through rate / Churn: Binary $y \in \{0, 1\}$.
- API request counts: Discrete non-negative integers $y \in \{0, 1, 2, \dots\}$.

Nelder and Wedderburn (1972) unified these under **Generalized Linear Models (GLMs)**.

```
+-----------------------------------------------------------------------------------------+
|                                    THE THREE PILLARS OF A GLM                           |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  1. RANDOM COMPONENT:      y follows a distribution in the Exponential Family           |
|                            (Gaussian, Bernoulli, Poisson, Gamma).                       |
|                                                                                         |
|  2. SYSTEMATIC COMPONENT:  Linear predictor: eta = X * beta                             |
|                                                                                         |
|  3. LINK FUNCTION g(mu):   Connects expected response mu = E[y] to linear predictor:    |
|                            g(mu) = eta = X * beta  <===>  mu = g^(-1)(X * beta)         |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Why Linear Regression Fails for Binary Outcomes

Attempting to model probabilities $p_i = P(y_i = 1 \mid \mathbf{x}_i)$ using linear regression ($p_i = \mathbf{x}_i^T \mathbf{\beta}$) causes fatal mathematical violations:

```
Linear Probability Model (Broken!)             Logistic Regression (Sigmoid S-Curve)
p(y=1)                                         p(y=1)
 1.0 |                   /                     1.0 |                         .-------
     |                 /                           |                       .'
 0.5 |               /                         0.5 |---------------------.'
     |             /                               |                   .'
 0.0 +-----------/-----------------> x         0.0 +-------'----------+-------------> x
     |         /                                           Probability bounded in (0, 1)
     |  Predicts negative probabilities!
```

1. **Out-of-Bounds Predictions**: Linear regression will predict $p < 0$ or $p > 1$ for extreme feature values.
2. **Heteroscedasticity**: The variance of a Bernoulli variable is $\text{Var}(y_i) = p_i(1 - p_i)$, which varies with $\mathbf{x}_i$, violating OLS spherical error assumptions.

---

## 3. The Logistic (Logit) Model

Logistic regression maps the unbounded linear predictor $\eta \in (-\infty, \infty)$ into a valid probability $p \in (0, 1)$ via the **Logistic Sigmoid Function**:

$$p = \sigma(\eta) = \frac{1}{1 + e^{-\eta}} = \frac{1}{1 + e^{-\mathbf{x}^T \mathbf{\beta}}}$$

### 3.1 The Logit Link Function
Inverting the sigmoid yields the **Logit** function:

$$\text{logit}(p) = \ln\left( \frac{p}{1 - p} \right) = \mathbf{x}^T \mathbf{\beta}$$

The ratio $\frac{p}{1 - p}$ is the **Odds** of the event occurring. Taking the natural logarithm gives the **Log-Odds**.

### 3.2 Interpreting Coefficients via Odds Ratios
Unlike linear regression where $\beta_j$ represents additive change in $y$, in logistic regression $e^{\beta_j}$ represents the **multiplicative change in odds** for a 1-unit increase in $x_j$:

$$\text{Odds Ratio (OR)} = \frac{\text{Odds}(x_j + 1)}{\text{Odds}(x_j)} = e^{\beta_j}$$

- If $\beta_j = 0 \implies e^0 = 1.0$: Feature $x_j$ has zero impact on odds.
- If $\beta_j = 0.693 \implies e^{0.693} \approx 2.0$: Each 1-unit increase in $x_j$ doubles the odds of conversion ($100\%$ increase).
- If $\beta_j = -0.51 \implies e^{-0.51} \approx 0.60$: Each 1-unit increase reduces odds by $40\%$.

---

## 4. Maximum Likelihood Estimation & Log Loss

Because outcomes are binary Bernoulli variables ($y_i \in \{0, 1\}$), the likelihood function is:

$$L(\mathbf{\beta}) = \prod_{i=1}^n p_i^{y_i} (1 - p_i)^{1 - y_i}, \quad \text{where } p_i = \sigma(\mathbf{x}_i^T \mathbf{\beta})$$

The **Log-Likelihood** is:

$$\ell(\mathbf{\beta}) = \sum_{i=1}^n \left[ y_i \ln p_i + (1 - y_i) \ln(1 - p_i) \right]$$

Minimizing the negative log-likelihood defines the **Binary Cross-Entropy Loss** in machine learning:

$$\text{Loss}(\mathbf{\beta}) = -\frac{1}{n} \sum_{i=1}^n \left[ y_i \ln p_i + (1 - y_i) \ln(1 - p_i) \right]$$

---

## 5. Iteratively Reweighted Least Squares (IRLS)

Unlike OLS, $\nabla_\mathbf{\beta} \ell(\mathbf{\beta}) = \mathbf{0}$ has no closed-form solution. We use the **Newton-Raphson method**, known in statistics as **Iteratively Reweighted Least Squares (IRLS)**.

### 5.1 Gradient (Score Vector)
$$\mathbf{g} = \nabla_\mathbf{\beta} \ell = \mathbf{X}^T (\mathbf{y} - \mathbf{p}) \in \mathbb{R}^{p+1}$$

### 5.2 Hessian Matrix
$$\mathbf{H} = \nabla^2_\mathbf{\beta} \ell = -\mathbf{X}^T \mathbf{W} \mathbf{X} \in \mathbb{R}^{(p+1) \times (p+1)}$$

where $\mathbf{W} = \text{diag}(p_1(1 - p_1), p_2(1 - p_2), \dots, p_n(1 - p_n))$ is a diagonal weight matrix.

Because $\mathbf{W}$ is strictly positive on its diagonal ($0 < p_i(1-p_i) \le 0.25$), the Hessian $\mathbf{H}$ is strictly negative definite, guaranteeing that **the log-likelihood surface is strictly concave with a unique global maximum**.

### 5.3 The Newton-Raphson Update Rule
$$\mathbf{\beta}^{(t+1)} = \mathbf{\beta}^{(t)} - \mathbf{H}^{-1} \mathbf{g} = \mathbf{\beta}^{(t)} + (\mathbf{X}^T \mathbf{W} \mathbf{X})^{-1} \mathbf{X}^T (\mathbf{y} - \mathbf{p})$$

IRLS converges quadratically to the exact global maximum within $5\text{--}8$ iterations!

---

## 6. Model Evaluation: ROC & AUC

In binary classification, evaluating models solely by raw accuracy is dangerously misleading when classes are imbalanced (e.g., $99\%$ benign, $1\%$ fraud).

```
+---------------------------------------------------------------------------------+
|                                 CONFUSION MATRIX                                |
+---------------------------------------------------------------------------------+
|  True Positive Rate (TPR / Recall) = TP / (TP + FN)  --> Sensitivity            |
|  False Positive Rate (FPR)         = FP / (FP + TN)  --> 1 - Specificity        |
|  Precision                         = TP / (TP + FP)  --> Positive predictive val|
+---------------------------------------------------------------------------------+
```

### The ROC (Receiver Operating Characteristic) Curve
Plots $\text{TPR}$ (Recall) on the y-axis against $\text{FPR}$ on the x-axis across every possible classification probability threshold $\tau \in [0, 1]$.

```
ROC Curve Diagnostics:
TPR (Recall)
 1.0 |            .--------------------- Perfect Classifier (AUC = 1.0)
     |          .'
     |        .'
     |      .'       . - - - - - - - - - Random Guessing (AUC = 0.50)
     |    .'      .-'
 0.0 +---+-------+---------------------> FPR (1 - Specificity)
     0.0        0.5                    1.0
```

### Area Under the Curve (AUC / AUROC)
- **$\text{AUC} = 0.50$**: No better than random coin flip.
- **$\text{AUC} = 0.80\text{--}0.90$**: Strong predictive discrimination.
- **$\text{AUC} \ge 0.95$**: Exceptional performance.
- **Probabilistic Meaning**: AUC equals the probability that the classifier will rank a randomly chosen positive instance higher than a randomly chosen negative instance.

---

## 7. Python Implementation: Logistic Regression via Newton-Raphson (IRLS)

```python
import numpy as np
import scipy.stats as stats

class LogisticRegressionIRLS:
    """
    Logistic Regression with Iteratively Reweighted Least Squares (Newton-Raphson)
    optimized from first principles.
    """
    def __init__(self, tol: float = 1e-7, max_iter: int = 25):
        self.tol = tol
        self.max_iter = max_iter
        self.beta = None

    def _sigmoid(self, z: np.ndarray) -> np.ndarray:
        # Numerically stable sigmoid
        return np.where(z >= 0, 1.0 / (1.0 + np.exp(-z)), np.exp(z) / (1.0 + np.exp(z)))

    def fit(self, X: np.ndarray, y: np.ndarray):
        n, p = X.shape
        X_design = np.hstack([np.ones((n, 1)), X])
        k = p + 1

        # Initialize beta at zeros
        beta = np.zeros(k)

        for iteration in range(self.max_iter):
            # Predicted probabilities: p_i = sigmoid(X * beta)
            probs = self._sigmoid(X_design @ beta)

            # Gradient: g = X^T * (y - p)
            gradient = X_design.T @ (y - probs)

            # Weight matrix diagonal: W_ii = p_i * (1 - p_i)
            # Clip to prevent division by zero
            w_diag = np.clip(probs * (1.0 - probs), 1e-12, 0.25)
            
            # Hessian: H = - X^T * W * X
            # Vectorized computation: X^T @ (W * X)
            xt_w = X_design.T * w_diag
            hessian = xt_w @ X_design

            # Newton-Raphson step: delta = solve(X^T * W * X, gradient)
            delta = np.linalg.solve(hessian, gradient)
            beta += delta

            if np.linalg.norm(delta) < self.tol:
                print(f"IRLS converged in {iteration + 1} iterations.")
                break

        self.beta = beta

    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        n = X.shape[0]
        X_design = np.hstack([np.ones((n, 1)), X])
        return self._sigmoid(X_design @ self.beta)

if __name__ == "__main__":
    # Simulate binary conversion data
    rng = np.random.default_rng(42)
    n = 1000
    x_features = rng.normal(0, 1, size=(n, 2))
    # True logit: 0.5 + 1.8 * x1 - 1.2 * x2
    true_logits = 0.5 + 1.8 * x_features[:, 0] - 1.2 * x_features[:, 1]
    true_p = 1.0 / (1.0 + np.exp(-true_logits))
    y_binary = rng.binomial(1, true_p)

    clf = LogisticRegressionIRLS()
    clf.fit(x_features, y_binary)
    print("=== Estimated Logistic Regression Coefficients ===")
    print(f"Intercept: {clf.beta[0]:.4f} (True: 0.50)")
    print(f"Beta 1:    {clf.beta[1]:.4f} (True: 1.80, Odds Ratio: {np.exp(clf.beta[1]):.2f}x)")
    print(f"Beta 2:    {clf.beta[2]:.4f} (True: -1.20, Odds Ratio: {np.exp(clf.beta[2]):.2f}x)")
```

---

## 8. Key Takeaways

1. **GLM Unification**: The link function $g(\mu) = \mathbf{x}^T \mathbf{\beta}$ connects unbounded linear combinations to constrained response domains.
2. **Logit Link Interprets Odds**: $e^{\beta_j}$ represents the multiplicative factor change in odds per unit change in feature $j$.
3. **Strict Concavity**: The logistic regression log-likelihood Hessian is always negative definite; IRLS is guaranteed to reach the global optimum without local minima.
