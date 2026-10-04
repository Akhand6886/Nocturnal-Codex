---
title: "Matrix Decompositions: LU, Cholesky & QR"
description: "Numerical matrix factorizations powering linear solvers, least-squares regression, and scientific computing in software engineering."
---

## 1. Why Factorize Matrices?

Solving a linear system $Ax = b$ using naive matrix inversion $x = A^{-1}b$ is both computationally slow ($O(n^3)$ with large constant factor) and **numerically unstable** due to floating-point roundoff error.

In production engineering (robotics state estimation, physics simulations, financial modeling, machine learning), systems are solved via **Matrix Decompositions**—factoring $A$ into structured triangular or orthogonal matrices that can be solved in $O(n^2)$ time via forward and back-substitution.

---

## 2. LU Decomposition with Partial Pivoting

Any square invertible matrix $A \in \mathbb{R}^{n \times n}$ can be factored into a permutation matrix $P$, a unit lower-triangular matrix $L$, and an upper-triangular matrix $U$:

$$P A = L U$$

$$\begin{bmatrix} 
\cdot & \cdot & \cdot \\ 
\cdot & \cdot & \cdot \\ 
\cdot & \cdot & \cdot 
\end{bmatrix} = \begin{bmatrix} 
1 & 0 & 0 \\ 
l_{21} & 1 & 0 \\ 
l_{31} & l_{32} & 1 
\end{bmatrix} \begin{bmatrix} 
u_{11} & u_{12} & u_{13} \\ 
0 & u_{22} & u_{23} \\ 
0 & 0 & u_{33} 
\end{bmatrix}$$

### Solving $Ax = b$ in Two Triangular Passes
1. **Permute**: Compute $b' = Pb$.
2. **Forward Substitution**: Solve $Ly = b'$ for $y$ in $O(n^2)$ operations.
3. **Back Substitution**: Solve $Ux = y$ for $x$ in $O(n^2)$ operations.

If you have to solve $Ax = b$ for 10,000 different vectors $b$, you compute the $LU$ decomposition **once** ($O(n^3)$), and then each solve takes only $O(n^2)$.

---

## 3. Cholesky Decomposition: $A = L L^T$

If matrix $A \in \mathbb{R}^{n \times n}$ is **Symmetric and Positive-Definite** (SPD)—meaning $A = A^T$ and $x^T A x > 0$ for all $x \neq \mathbf{0}$—we can compute the Cholesky factorization:

$$A = L L^T$$

where $L$ is a lower-triangular matrix with strictly positive diagonal entries.

### Advantages in Machine Learning & Robotics
- **2x Faster**: Requires half the arithmetic operations of general LU ($\frac{1}{3}n^3$ vs $\frac{2}{3}n^3$).
- **Unconditionally Stable**: Requires zero pivoting.
- **Core Applications**: Kalman filters in autonomous vehicles, Gaussian Process regression, and sampling from multivariate normal distributions ($\mathcal{N}(\mu, \Sigma) \sim \mu + L \cdot z$ where $z \sim \mathcal{N}(0, I)$).

---

## 4. QR Factorization: $A = Q R$

Every real matrix $A \in \mathbb{R}^{m \times n}$ ($m \ge n$) can be factored into an **orthogonal matrix** $Q \in \mathbb{R}^{m \times m}$ ($Q^T Q = I$) and an **upper-triangular matrix** $R \in \mathbb{R}^{m \times n}$:

$$A = Q R$$

### Solving Overdetermined Least-Squares
Given an overdetermined system $Ax \approx b$ (e.g., fitting a linear model to 1,000,000 data points):

$$Q R x = b \implies R x = Q^T b$$

Because $Q$ is orthogonal, multiplication by $Q^T$ **preserves vector lengths** and **never amplifies numerical noise** ($\|Q^T v\|_2 = \|v\|_2$). This avoids the catastrophic squaring of condition numbers $\kappa(A^T A) = \kappa(A)^2$ seen in the naive Normal Equation $(A^T A)x = A^T b$.

---

## 5. Python Implementation: Benchmarking Decompositions

```python
import numpy as np
import scipy.linalg as la

# Create a random symmetric positive-definite covariance matrix
n = 1000
X = np.random.randn(n, n)
A = X.T @ X + n * np.eye(n) # Guaranteed SPD
b = np.random.randn(n)

# 1. Cholesky Solve (Fastest & most stable for SPD matrices)
L = la.cholesky(A, lower=True)
y = la.solve_triangular(L, b, lower=True)
x_chol = la.solve_triangular(L.T, y, lower=False)

# 2. QR Solve (For general least squares)
Q, R = la.qr(A)
x_qr = la.solve_triangular(R, Q.T @ b)

# Verify accuracy
residual = np.linalg.norm(A @ x_chol - b)
print(f"Cholesky residual norm: {residual:.2e}")
assert np.allclose(x_chol, x_qr)
print("Decompositions successfully verified.")
```
