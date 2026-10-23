---
title: "Symmetric Matrices & The Spectral Theorem"
description: "Real symmetric matrices, orthogonal diagonalization, the Spectral Theorem, quadratic forms, definiteness, and the Rayleigh quotient in spectral graph theory."
---

## 1. The Crown Jewel of Linear Algebra

In applied mathematics, physics, and computer science, **symmetric matrices** ($\mathbf{A} = \mathbf{A}^T$) are everywhere:
- **Covariance Matrices** in statistics and machine learning ($\mathbf{\Sigma} = \frac{1}{n} \mathbf{X}^T \mathbf{X}$).
- **Hessian Matrices** of second-order partial derivatives in numerical optimization ($\mathbf{H}_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$).
- **Graph Laplacians** in spectral network clustering ($\mathbf{L} = \mathbf{D} - \mathbf{A}$).
- **Inertia Tensors** in 3D physics engines.

Symmetric operators possess remarkable mathematical properties that do not hold for arbitrary matrices.

```
+-----------------------------------------------------------------------------------------+
|                               PROPERTIES OF REAL SYMMETRIC MATRICES                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  1. ALL EIGENVALUES ARE STRICTLY REAL (No imaginary components!).                       |
|                                                                                         |
|  2. EIGENVECTORS CORRESPONDING TO DISTINCT EIGENVALUES ARE MUTUALLY ORTHOGONAL.         |
|                                                                                         |
|  3. ALWAYS DIAGONALIZABLE: There exists a complete orthonormal basis of n eigenvectors! |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Mathematical Proofs of Fundamental Properties

### 2.1 Proof: All Eigenvalues of a Real Symmetric Matrix are Real
Let $\mathbf{A} \in \mathbb{R}^{n \times n}$ with $\mathbf{A} = \mathbf{A}^T$. Let $\lambda$ be an eigenvalue with non-zero eigenvector $\mathbf{x} \in \mathbb{C}^n$:
$$\mathbf{A}\mathbf{x} = \lambda \mathbf{x}$$
Take the conjugate transpose (Hermitian) on both sides:
$$\mathbf{x}^H \mathbf{A}^T = \bar{\lambda} \mathbf{x}^H \implies \mathbf{x}^H \mathbf{A} = \bar{\lambda} \mathbf{x}^H \quad (\text{since } \mathbf{A} = \mathbf{A}^T = \mathbf{A}^H)$$
Multiply on the right by $\mathbf{x}$:
$$\mathbf{x}^H \mathbf{A} \mathbf{x} = \bar{\lambda} \mathbf{x}^H \mathbf{x}$$
Multiply the original equation $\mathbf{A}\mathbf{x} = \lambda \mathbf{x}$ on the left by $\mathbf{x}^H$:
$$\mathbf{x}^H \mathbf{A} \mathbf{x} = \lambda \mathbf{x}^H \mathbf{x}$$
Equating both expressions:
$$\lambda \mathbf{x}^H \mathbf{x} = \bar{\lambda} \mathbf{x}^H \mathbf{x} \implies (\lambda - \bar{\lambda}) \|\mathbf{x}\|_2^2 = 0$$
Since $\mathbf{x} \neq \mathbf{0}$, $\|\mathbf{x}\|_2^2 > 0$. Therefore, $\lambda = \bar{\lambda}$, proving that $\lambda \in \mathbb{R}$ is strictly real! $\blacksquare$

---

### 2.2 Proof: Eigenvectors of Distinct Eigenvalues are Orthogonal
Let $\mathbf{A}\mathbf{u} = \lambda_1 \mathbf{u}$ and $\mathbf{A}\mathbf{v} = \lambda_2 \mathbf{v}$ with $\lambda_1 \neq \lambda_2$.
$$\lambda_1 (\mathbf{u}^T \mathbf{v}) = (\lambda_1 \mathbf{u})^T \mathbf{v} = (\mathbf{A}\mathbf{u})^T \mathbf{v} = \mathbf{u}^T \mathbf{A}^T \mathbf{v} = \mathbf{u}^T (\mathbf{A}\mathbf{v}) = \mathbf{u}^T (\lambda_2 \mathbf{v}) = \lambda_2 (\mathbf{u}^T \mathbf{v})$$
$$(\lambda_1 - \lambda_2) (\mathbf{u}^T \mathbf{v}) = 0$$
Since $\lambda_1 \neq \lambda_2$, we must have $\mathbf{u}^T \mathbf{v} = 0$. The eigenvectors are strictly orthogonal! $\blacksquare$

---

## 3. The Spectral Theorem for Real Symmetric Matrices

### Theorem (Spectral Theorem)
Every real symmetric matrix $\mathbf{A} \in \mathbb{R}^{n \times n}$ can be factored into an **orthogonal matrix** $\mathbf{Q}$ and a **diagonal matrix** $\mathbf{\Lambda}$:

$$\mathbf{A} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^T$$

where:
- $\mathbf{Q} = [\mathbf{q}_1 \mid \mathbf{q}_2 \mid \cdots \mid \mathbf{q}_n]$ is orthogonal ($\mathbf{Q}^T \mathbf{Q} = \mathbf{I}$), whose columns are orthonormal eigenvectors of $\mathbf{A}$.
- $\mathbf{\Lambda} = \text{diag}(\lambda_1, \lambda_2, \dots, \lambda_n)$ contains the real eigenvalues.

### Spectral Outer-Product Decomposition
Expanding the matrix product reveals that $\mathbf{A}$ is a weighted sum of rank-1 orthogonal projection matrices:

$$\mathbf{A} = \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T$$

```
Geometric Interpretation of the Spectral Theorem:
Any real symmetric transformation acts by:
1. Rotating the coordinate axes into alignment with its orthogonal eigenvectors (Q^T).
2. Stretching or shrinking along each orthogonal axis by its eigenvalue lambda_i (Lambda).
3. Rotating back to original space (Q).
No shearing! Pure orthogonal stretch!
```

---

## 4. Quadratic Forms & Matrix Definiteness

A **quadratic form** is a scalar function $q: \mathbb{R}^n \to \mathbb{R}$ defined by:

$$q(\mathbf{x}) = \mathbf{x}^T \mathbf{A} \mathbf{x} = \sum_{i=1}^n \sum_{j=1}^n A_{ij} x_i x_j$$

### Definiteness Classifications

| Definiteness | Condition on $\mathbf{x}^T \mathbf{A} \mathbf{x}$ | Eigenvalue Condition | Geometric Energy Surface |
| :--- | :--- | :--- | :--- |
| **Positive Definite (PD)** | $\mathbf{x}^T \mathbf{A} \mathbf{x} > 0$ for all $\mathbf{x} \neq \mathbf{0}$ | All $\lambda_i > 0$ | Upward bowl; unique global minimum. |
| **Positive Semidefinite (PSD)** | $\mathbf{x}^T \mathbf{A} \mathbf{x} \ge 0$ for all $\mathbf{x}$ | All $\lambda_i \ge 0$ | Valley bowl; flat bottom trough. |
| **Negative Definite (ND)** | $\mathbf{x}^T \mathbf{A} \mathbf{x} < 0$ for all $\mathbf{x} \neq \mathbf{0}$ | All $\lambda_i < 0$ | Inverted downward bowl; global maximum. |
| **Indefinite** | Takes both positive and negative values | Mixed signs ($\exists \lambda_i > 0, \lambda_j < 0$) | Saddle point (hyperbolic paraboloid). |

```
Energy Surfaces z = x^T * A * x:
Positive Definite (Bowl):                      Indefinite (Saddle Point):
        \             /                                     \       /
         \     .     /                                       \  .  /
          '._.' '._.'                                         '- -'
       Global Minimum at 0                             Saddle Point at 0
```

---

## 5. The Rayleigh Quotient & Min-Max Principle

For a real symmetric matrix $\mathbf{A}$, the **Rayleigh Quotient** is:

$$R(\mathbf{A}, \mathbf{x}) = \frac{\mathbf{x}^T \mathbf{A} \mathbf{x}}{\mathbf{x}^T \mathbf{x}}, \quad \mathbf{x} \neq \mathbf{0}$$

### Theorem (Courant-Fischer Min-Max Theorem)
The Rayleigh quotient is bounded between the minimum and maximum eigenvalues:

$$\lambda_{\min} \le R(\mathbf{A}, \mathbf{x}) \le \lambda_{\max}$$

- $\max_{\mathbf{x} \neq \mathbf{0}} R(\mathbf{A}, \mathbf{x}) = \lambda_{\max}$, achieved when $\mathbf{x} = \mathbf{q}_{\max}$ (dominant eigenvector).
- $\min_{\mathbf{x} \neq \mathbf{0}} R(\mathbf{A}, \mathbf{x}) = \lambda_{\min}$, achieved when $\mathbf{x} = \mathbf{q}_{\min}$.

*Proof*:
Using the orthonormal basis $\mathbf{Q}$, express any vector $\mathbf{x} = \sum c_i \mathbf{q}_i$:
$$\mathbf{x}^T \mathbf{A} \mathbf{x} = \sum_{i=1}^n \lambda_i c_i^2 \le \lambda_{\max} \sum_{i=1}^n c_i^2 = \lambda_{\max} (\mathbf{x}^T \mathbf{x})$$
Dividing by $\mathbf{x}^T \mathbf{x} = \sum c_i^2$ yields $R(\mathbf{A}, \mathbf{x}) \le \lambda_{\max}$. $\blacksquare$

---

## 6. Algorithmic Application: Spectral Graph Clustering

How do machine learning algorithms partition an arbitrary network or social graph into tightly knit communities?

1. Construct the **Graph Laplacian**: $\mathbf{L} = \mathbf{D} - \mathbf{A}$.
2. The Laplacian $\mathbf{L}$ is real symmetric and positive semidefinite:
   - Smallest eigenvalue is always $\lambda_1 = 0$ with eigenvector $\mathbf{1} = (1, 1, \dots, 1)^T$.
3. The **second smallest eigenvalue $\lambda_2$** is called the **Algebraic Connectivity** (or Spectral Gap).
4. Its corresponding eigenvector $\mathbf{v}_2$ is the **Fiedler Vector**:
   - The sign of the entries in $\mathbf{v}_2$ optimally partitions the graph into two clusters, minimizing the **Normalized Cut**!

---

## 7. Python Implementation: Spectral Decomposition & Graph Partitioning

```python
import numpy as np

def spectral_decomposition(A: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute Spectral Decomposition A = Q * Lambda * Q^T
    for a real symmetric matrix.
    """
    assert np.allclose(A, A.T), "Matrix must be symmetric!"
    # eigh is optimized for Hermitian/Symmetric matrices
    eigenvalues, Q = np.linalg.eigh(A)
    return eigenvalues, Q

def spectral_graph_bisection(adj_matrix: np.ndarray) -> np.ndarray:
    """
    Partition graph into two clusters using the Fiedler vector (Laplacian lambda_2).
    """
    degrees = np.sum(adj_matrix, axis=1)
    laplacian = np.diag(degrees) - adj_matrix

    eigenvalues, eigenvectors = np.linalg.eigh(laplacian)
    # Fiedler vector is eigenvector corresponding to 2nd smallest eigenvalue
    fiedler_vector = eigenvectors[:, 1]
    
    # Partition by sign of Fiedler vector
    cluster_labels = (fiedler_vector >= 0).astype(int)
    return cluster_labels

if __name__ == "__main__":
    # Symmetric 3x3 matrix
    S = np.array([
        [4.0, 1.0, 2.0],
        [1.0, 5.0, 3.0],
        [2.0, 3.0, 6.0]
    ])

    lambdas, Q = spectral_decomposition(S)
    print("=== Spectral Decomposition A = Q * Lambda * Q^T ===")
    print("Real Eigenvalues:", np.round(lambdas, 4))
    print("Orthonormal Eigenvector Matrix Q:")
    print(np.round(Q, 4))

    # Reconstruct: Q * diag(lambdas) * Q^T == S
    S_reconstructed = Q @ np.diag(lambdas) @ Q.T
    assert np.allclose(S, S_reconstructed), "Reconstruction failed!"
    print("Spectral reconstruction verified with zero error.")
```

---

## 8. Key Takeaways

1. **Spectral Theorem**: Real symmetric matrices always possess real eigenvalues and an orthonormal basis of eigenvectors ($\mathbf{A} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^T$).
2. **Definiteness**: Governed strictly by eigenvalue signs; positive definite matrices guarantee strict convexity in optimization.
3. **Rayleigh Quotient Optimization**: Maximizing $\mathbf{x}^T \mathbf{A} \mathbf{x} / \mathbf{x}^T \mathbf{x}$ recovers the dominant eigenvector, powering PCA and spectral graph clustering.
