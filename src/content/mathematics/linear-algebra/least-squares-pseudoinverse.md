---
title: "Least Squares, Normal Equations & Pseudoinverse"
description: "Overdetermined linear systems, the normal equations, Moore-Penrose pseudoinverse, condition numbers, and Tikhonov Ridge regularization."
---

## 1. When Exact Solutions Do Not Exist

In practical engineering and data science, we frequently encounter **overdetermined systems**: systems with far more equations (observations) than unknowns (features):

$$\mathbf{A}\mathbf{x} = \mathbf{b}, \quad \mathbf{A} \in \mathbb{R}^{m \times n} \text{ with } m \gg n$$

Because real-world telemetry contains sensor noise, measurement error, or physical imperfections, the target vector $\mathbf{b}$ rarely lies perfectly in the column space $C(\mathbf{A})$. An exact solution $\mathbf{x}$ almost never exists.

Instead of abandoning the problem, we seek the **Least Squares solution** $\mathbf{\hat{x}}$ that minimizes the Euclidean length of the error residual vector:

$$\mathbf{\hat{x}} = \arg\min_{\mathbf{x} \in \mathbb{R}^n} \|\mathbf{A}\mathbf{x} - \mathbf{b}\|_2^2$$

```
+-----------------------------------------------------------------------------------------+
|                                LEAST SQUARES GEOMETRY                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       b (Target observation outside column space)                                       |
|       ^                                                                                 |
|       |  \                                                                              |
|       |    \  Residual Error e = b - A*x_hat (Perpendicular to C(A)!)                   |
|       |      \                                                                          |
|       |        v                                                                        |
|  -----+--------+------------------------------------> Column space C(A)                |
|       0        p = A * x_hat (Closest reachable point)                                  |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Derivation of the Normal Equations

Let $S(\mathbf{x}) = \|\mathbf{A}\mathbf{x} - \mathbf{b}\|_2^2 = (\mathbf{A}\mathbf{x} - \mathbf{b})^T (\mathbf{A}\mathbf{x} - \mathbf{b})$.

Expanding the scalar quadratic product:
$$S(\mathbf{x}) = \mathbf{x}^T \mathbf{A}^T \mathbf{A}\mathbf{x} - 2\mathbf{x}^T \mathbf{A}^T \mathbf{b} + \mathbf{b}^T \mathbf{b}$$

Taking the gradient with respect to $\mathbf{x}$:
$$\nabla_\mathbf{x} S(\mathbf{x}) = 2\mathbf{A}^T \mathbf{A}\mathbf{x} - 2\mathbf{A}^T \mathbf{b}$$

Setting the gradient to zero yields the fundamental **Normal Equations**:

$$\mathbf{A}^T \mathbf{A} \mathbf{x} = \mathbf{A}^T \mathbf{b}$$

```
Geometric Meaning of A^T * (b - A*x) = 0:
The residual error vector (b - A*x) must be orthogonal to EVERY column of A!
```

If $\mathbf{A}$ has full column rank ($\text{rank}(\mathbf{A}) = n$), the $n \times n$ Gram matrix $\mathbf{A}^T \mathbf{A}$ is strictly symmetric and positive definite (invertible):

$$\mathbf{\hat{x}} = (\mathbf{A}^T \mathbf{A})^{-1} \mathbf{A}^T \mathbf{b}$$

---

## 3. The Moore-Penrose Pseudoinverse ($\mathbf{A}^+$)

What if $\mathbf{A}$ is rectangular ($m \neq n$) or rank-deficient (columns are linearly dependent)? 
Matrix inversion $\mathbf{A}^{-1}$ does not exist. The **Moore-Penrose Pseudoinverse** $\mathbf{A}^+ \in \mathbb{R}^{n \times m}$ generalizes matrix inversion to all arbitrary matrices.

### 3.1 The Four Penrose Axioms
For any matrix $\mathbf{A}$, there exists a unique matrix $\mathbf{A}^+$ satisfying all four Moore-Penrose conditions:
1. $\mathbf{A} \mathbf{A}^+ \mathbf{A} = \mathbf{A}$
2. $\mathbf{A}^+ \mathbf{A} \mathbf{A}^+ = \mathbf{A}^+$
3. $(\mathbf{A} \mathbf{A}^+)^T = \mathbf{A} \mathbf{A}^+$ (Hermitian / Symmetric)
4. $(\mathbf{A}^+ \mathbf{A})^T = \mathbf{A}^+ \mathbf{A}$ (Hermitian / Symmetric)

### 3.2 Closed-Form Representations
- **Tall Matrix with Full Column Rank ($m > n$, rank $= n$)**:
  $$\mathbf{A}^+ = (\mathbf{A}^T \mathbf{A})^{-1} \mathbf{A}^T \implies \mathbf{A}^+ \mathbf{A} = \mathbf{I}_n \quad (\text{Left Inverse})$$
- **Wide Matrix with Full Row Rank ($m < n$, rank $= m$)**:
  $$\mathbf{A}^+ = \mathbf{A}^T (\mathbf{A} \mathbf{A}^T)^{-1} \implies \mathbf{A} \mathbf{A}^+ = \mathbf{I}_m \quad (\text{Right Inverse})$$
- **Universal SVD Formulation**:
  Let $\mathbf{A} = \mathbf{U} \mathbf{\Sigma} \mathbf{V}^T$ be the Singular Value Decomposition of $\mathbf{A}$. Then:
  $$\mathbf{A}^+ = \mathbf{V} \mathbf{\Sigma}^+ \mathbf{U}^T$$
  where $\mathbf{\Sigma}^+$ is formed by transposing $\mathbf{\Sigma}$ and inverting every non-zero singular value ($\sigma_i \to 1/\sigma_i$).

---

## 4. Condition Numbers & Numerical Ill-Conditioning

When computing $(\mathbf{A}^T \mathbf{A})^{-1}$, a severe numerical danger emerges: **squaring the condition number**.

The **Condition Number** of a matrix measures how sensitive the solution $\mathbf{x}$ is to small perturbations in input $\mathbf{b}$:

$$\kappa(\mathbf{A}) = \|\mathbf{A}\|_2 \|\mathbf{A}^+\|_2 = \frac{\sigma_{\max}(\mathbf{A})}{\sigma_{\min}(\mathbf{A})}$$

- If $\kappa(\mathbf{A}) \approx 1$: Well-conditioned; errors are dampened.
- If $\kappa(\mathbf{A}) \ge 10^{12}$: Ill-conditioned; small floating-point roundoff errors completely corrupt the solution.

### The Gram Matrix Squaring Penalty:
$$\kappa(\mathbf{A}^T \mathbf{A}) = (\kappa(\mathbf{A}))^2$$
If $\mathbf{A}$ has condition number $\kappa(\mathbf{A}) = 10^5$, the normal equations matrix $\mathbf{A}^T \mathbf{A}$ has condition number $10^{10}$! In 64-bit precision ($\approx 15\text{--}16$ decimal digits), you lose 10 digits of accuracy.

> **Production Numerical Rule**: In high-precision scientific libraries (LAPACK, NumPy, Eigen), least squares is **never** solved via normal equations $(\mathbf{A}^T \mathbf{A})^{-1}\mathbf{A}^T \mathbf{b}$. It is solved via **QR Factorization** ($\mathbf{A} = \mathbf{Q}\mathbf{R} \implies \mathbf{R}\mathbf{x} = \mathbf{Q}^T \mathbf{b}$) or **SVD**, maintaining linear condition number $\kappa(\mathbf{A})$.

---

## 5. Tikhonov Regularization (Ridge Regression)

When features are near-collinear, $\sigma_{\min} \to 0$, causing the normal equations to explode. 
**Tikhonov Regularization** (known as **Ridge Regression** in machine learning) adds a diagonal penalty to condition the matrix:

$$\min_{\mathbf{x}} \left( \|\mathbf{A}\mathbf{x} - \mathbf{b}\|_2^2 + \lambda \|\mathbf{x}\|_2^2 \right)$$

where $\lambda > 0$ is the regularization parameter.

### Closed-Form Solution:
$$\nabla_\mathbf{x} \left( \|\mathbf{A}\mathbf{x} - \mathbf{b}\|_2^2 + \lambda \mathbf{x}^T \mathbf{x} \right) = 2\mathbf{A}^T (\mathbf{A}\mathbf{x} - \mathbf{b}) + 2\lambda \mathbf{x} = 0$$

$$(\mathbf{A}^T \mathbf{A} + \lambda \mathbf{I})\mathbf{x} = \mathbf{A}^T \mathbf{b}$$

$$\mathbf{\hat{x}}_{\text{ridge}} = (\mathbf{A}^T \mathbf{A} + \lambda \mathbf{I})^{-1} \mathbf{A}^T \mathbf{b}$$

```
Why Adding lambda * I Stabilizes the Matrix:
Eigenvalues of (A^T * A):           lambda_i >= 0
Eigenvalues of (A^T * A + lambda * I): lambda_i + lambda > 0 (Strictly positive!)
Smallest eigenvalue is lifted from ~0 to at least lambda.
Condition number is guaranteed bounded: kappa <= (sigma_max^2 + lambda) / lambda.
```

---

## 6. Python Implementation: Least Squares Comparison (Normal vs QR vs SVD)

```python
import numpy as np

def solve_least_squares_comparison():
    """
    Compare numerical accuracy of Normal Equations vs QR Decomposition
    on an ill-conditioned polynomial fitting problem.
    """
    rng = np.random.default_rng(42)
    n_samples = 100
    x_points = np.linspace(0.0, 1.0, n_samples)
    
    # Vandermonde matrix for high-degree polynomial (notoriously ill-conditioned)
    # A = [1, x, x^2, ..., x^9]
    A = np.vander(x_points, N=10, increasing=True)
    
    # Ground truth parameters
    true_x = np.ones(10)
    # Add tiny noise to b
    b = A @ true_x + rng.normal(0, 1e-4, size=n_samples)

    cond_A = np.linalg.cond(A)
    print(f"Condition Number kappa(A):     {cond_A:.2e}")
    print(f"Condition Number kappa(A^T*A): {(cond_A**2):.2e} (Severe ill-conditioning!)")

    # 1. Normal Equations: (A^T * A)^(-1) * A^T * b
    xtx = A.T @ A
    xty = A.T @ b
    x_normal = np.linalg.solve(xtx, xty)

    # 2. QR Decomposition: A = Q * R ==> R * x = Q^T * b
    Q, R = np.linalg.qr(A)
    x_qr = np.linalg.solve(R, Q.T @ b)

    # 3. SVD / NumPy lstsq (uses SVD pseudoinverse)
    x_svd, _, _, _ = np.linalg.lstsq(A, b, rcond=None)

    # Errors against ground truth
    err_normal = np.linalg.norm(x_normal - true_x)
    err_qr = np.linalg.norm(x_qr - true_x)
    err_svd = np.linalg.norm(x_svd - true_x)

    print("\n=== Parameter Estimation Error Norm ===")
    print(f"Normal Equations Error: {err_normal:.4e}")
    print(f"QR Factorization Error: {err_qr:.4e}")
    print(f"SVD Pseudoinverse Error:{err_svd:.4e}")

    # Notice that QR and SVD are orders of magnitude more accurate than normal equations!

if __name__ == "__main__":
    solve_least_squares_comparison()
```

---

## 7. Key Takeaways

1. **Normal Equations**: $\mathbf{A}^T \mathbf{A}\mathbf{x} = \mathbf{A}^T \mathbf{b}$ minimizes squared Euclidean error by enforcing that residual $\mathbf{b} - \mathbf{A}\mathbf{x}$ is orthogonal to $C(\mathbf{A})$.
2. **Never Square Condition Numbers**: In production code, solve least squares using QR or SVD to avoid the $(\kappa(\mathbf{A}))^2$ condition squaring penalty.
3. **Tikhonov / Ridge Stabilization**: Adding $\lambda \mathbf{I}$ shifts singular values away from zero, stabilizing ill-conditioned matrices.
