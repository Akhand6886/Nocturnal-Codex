---
title: "Inner Products, Norms & Orthogonality"
description: "Inner product spaces, L1/L2/Linf vector norms, Frobenius and spectral matrix norms, the Cauchy-Schwarz inequality, Gram-Schmidt orthogonalization, and projection matrices."
---

## 1. The Geometry of Vector Magnitude & Angles

While vector spaces alone define addition and scalar multiplication, they lack any inherent notion of **length, distance, or angle**. 

By equipping a vector space with an **Inner Product**, we transform an abstract algebraic structure into a geometric **Hilbert space** capable of computing distances, measuring similarity, and defining perpendicularity (orthogonality).

```
+-----------------------------------------------------------------------------------------+
|                                    INNER PRODUCT TO GEOMETRY                            |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       INNER PRODUCT <u, v>  =======> Defines VECTOR NORM ||u|| = sqrt(<u, u>)           |
|                ||                                                                       |
|                v                                                                        |
|       Defines METRIC DISTANCE d(u, v) = ||u - v||                                       |
|                ||                                                                       |
|                v                                                                        |
|       Defines ANGLE theta: cos(theta) = <u, v> / (||u|| * ||v||)                        |
|                ||                                                                       |
|                v                                                                        |
|       Defines ORTHOGONALITY: u perpendicular to v <===> <u, v> == 0                     |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Inner Product Spaces

### 2.1 Formal Axioms
An **inner product** on a real vector space $V$ is a function $\langle \cdot, \cdot \rangle: V \times V \to \mathbb{R}$ satisfying three axioms for all $\mathbf{u}, \mathbf{v}, \mathbf{w} \in V$ and $c \in \mathbb{R}$:

1. **Symmetry**:
   $$\langle \mathbf{u}, \mathbf{v} \rangle = \langle \mathbf{v}, \mathbf{u} \rangle$$
2. **Linearity in the First Argument**:
   $$\langle c\mathbf{u} + \mathbf{v}, \mathbf{w} \rangle = c\langle \mathbf{u}, \mathbf{w} \rangle + \langle \mathbf{v}, \mathbf{w} \rangle$$
3. **Positive Definiteness**:
   $$\langle \mathbf{u}, \mathbf{u} \rangle \ge 0, \quad \text{and} \quad \langle \mathbf{u}, \mathbf{u} \rangle = 0 \iff \mathbf{u} = \mathbf{0}$$

In standard Euclidean space $\mathbb{R}^n$, the inner product is the familiar **dot product**:
$$\langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v} = \mathbf{u}^T \mathbf{v} = \sum_{i=1}^n u_i v_i$$

---

## 3. Vector & Matrix Norms

A **norm** $\|\cdot\|: V \to \mathbb{R}$ measures the magnitude of a vector, satisfying:
1. Non-negativity: $\|\mathbf{v}\| \ge 0$, and $\|\mathbf{v}\| = 0 \iff \mathbf{v} = \mathbf{0}$.
2. Absolute scalability: $\|c\mathbf{v}\| = |c| \|\mathbf{v}\|$.
3. Triangle Inequality: $\|\mathbf{u} + \mathbf{v}\| \le \|\mathbf{u}\| + \|\mathbf{v}\|$.

### 3.1 Common Vector $L_p$ Norms
For a vector $\mathbf{x} \in \mathbb{R}^n$:

$$\|\mathbf{x}\|_p = \left( \sum_{i=1}^n |x_i|^p \right)^{1/p}$$

- **$L_1$ Norm (Manhattan / Taxicab)**:
  $$\|\mathbf{x}\|_1 = \sum_{i=1}^n |x_i|$$
  *(Used in Lasso regularization to induce parameter sparsity).*
- **$L_2$ Norm (Euclidean Norm)**:
  $$\|\mathbf{x}\|_2 = \sqrt{\sum_{i=1}^n x_i^2} = \sqrt{\mathbf{x}^T \mathbf{x}}$$
  *(Standard straight-line Euclidean distance).*
- **$L_\infty$ Norm (Chebyshev / Maximum Norm)**:
  $$\|\mathbf{x}\|_\infty = \max_{1 \le i \le n} |x_i|$$
  *(Used in adversarial robustness testing in machine learning).*

```
Unit Norm Contours in 2D (||x|| <= 1):
      L1 Norm (Diamond)           L2 Norm (Circle)            L_inf Norm (Square)
            ^                           ^                           ^
           / \                        .' '.                       +---+
          /   \                      /     \                      |   |
         <  0  >                    (   0   )                     | 0 |
          \   /                      \     /                      |   |
           \ /                        '. .'                       +---+
            v                           v                           v
```

---

### 3.2 Matrix Norms
For a matrix $\mathbf{A} \in \mathbb{R}^{m \times n}$:

1. **Frobenius Norm**: The Euclidean length of the flattened matrix:
   $$\|\mathbf{A}\|_F = \sqrt{\sum_{i=1}^m \sum_{j=1}^n a_{ij}^2} = \sqrt{\text{Tr}(\mathbf{A}^T \mathbf{A})}$$
2. **Spectral Norm (Induced Operator 2-Norm)**:
   $$\|\mathbf{A}\|_2 = \max_{\mathbf{x} \neq \mathbf{0}} \frac{\|\mathbf{A}\mathbf{x}\|_2}{\|\mathbf{x}\|_2} = \sigma_{\max}(\mathbf{A})$$
   where $\sigma_{\max}(\mathbf{A})$ is the largest singular value of $\mathbf{A}$.

---

## 4. The Cauchy-Schwarz Inequality & Cosine Similarity

One of the most widely used inequalities in all of mathematics:

### Theorem (Cauchy-Schwarz)
For any vectors $\mathbf{u}$ and $\mathbf{v}$ in an inner product space:

$$|\langle \mathbf{u}, \mathbf{v} \rangle| \le \|\mathbf{u}\|_2 \|\mathbf{v}\|_2$$

Equality holds if and only if $\mathbf{u}$ and $\mathbf{v}$ are linearly dependent ($\mathbf{u} = c\mathbf{v}$).

### Application in Vector Search Engines: Cosine Similarity
In retrieval-augmented generation (RAG) and semantic search (Pinecone, Qdrant, Milvus), text embeddings are normalized vectors. The angle $\theta$ between document vector $\mathbf{u}$ and query vector $\mathbf{v}$ measures semantic alignment:

$$\cos \theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2} \in [-1, 1]$$

By the Cauchy-Schwarz inequality, this value is guaranteed to stay bounded within $[-1, 1]$.
- $\cos \theta = 1.0$: Identical semantic direction.
- $\cos \theta = 0.0$: Orthogonal (completely unrelated topics).
- $\cos \theta = -1.0$: Diametrically opposite meaning.

---

## 5. Orthogonality & Gram-Schmidt Process

Two vectors $\mathbf{u}$ and $\mathbf{v}$ are **orthogonal** ($\mathbf{u} \perp \mathbf{v}$) if their inner product is zero:

$$\langle \mathbf{u}, \mathbf{v} \rangle = 0$$

A set of vectors $\{\mathbf{q}_1, \dots, \mathbf{q}_k\}$ is **orthonormal** if:
$$\langle \mathbf{q}_i, \mathbf{q}_j \rangle = \begin{cases} 1 & \text{if } i = j \\ 0 & \text{if } i \neq j \end{cases} = \delta_{ij}$$

### 5.1 The Gram-Schmidt Orthogonalization Algorithm
Given a linearly independent basis $\{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_k\}$, construct an orthonormal basis $\{\mathbf{q}_1, \mathbf{q}_2, \dots, \mathbf{q}_k\}$ spanning the identical subspace.

```
Gram-Schmidt Step:
For each new vector v_i:
Subtract its projections onto all previously computed orthogonal directions!
```

$$\begin{aligned}
\mathbf{u}_1 &= \mathbf{v}_1, &\mathbf{q}_1 &= \frac{\mathbf{u}_1}{\|\mathbf{u}_1\|} \\
\mathbf{u}_2 &= \mathbf{v}_2 - \langle \mathbf{v}_2, \mathbf{q}_1 \rangle \mathbf{q}_1, &\mathbf{q}_2 &= \frac{\mathbf{u}_2}{\|\mathbf{u}_2\|} \\
\mathbf{u}_3 &= \mathbf{v}_3 - \langle \mathbf{v}_3, \mathbf{q}_1 \rangle \mathbf{q}_1 - \langle \mathbf{v}_3, \mathbf{q}_2 \rangle \mathbf{q}_2, &\mathbf{q}_3 &= \frac{\mathbf{u}_3}{\|\mathbf{u}_3\|} \\
&\vdots & &\vdots \\
\mathbf{u}_k &= \mathbf{v}_k - \sum_{j=1}^{k-1} \langle \mathbf{v}_k, \mathbf{q}_j \rangle \mathbf{q}_j, &\mathbf{q}_k &= \frac{\mathbf{u}_k}{\|\mathbf{u}_k\|}
\end{aligned}$$

---

## 6. Orthogonal Matrices

A real square matrix $\mathbf{Q} \in \mathbb{R}^{n \times n}$ is **orthogonal** if its columns are mutually orthonormal vectors:

$$\mathbf{Q}^T \mathbf{Q} = \mathbf{I} \iff \mathbf{Q}^{-1} = \mathbf{Q}^T$$

### Invariance Properties of Orthogonal Transformations:
1. **Length Preservation (Isometry)**:
   $$\|\mathbf{Q}\mathbf{x}\|_2^2 = (\mathbf{Q}\mathbf{x})^T (\mathbf{Q}\mathbf{x}) = \mathbf{x}^T \mathbf{Q}^T \mathbf{Q} \mathbf{x} = \mathbf{x}^T \mathbf{I} \mathbf{x} = \|\mathbf{x}\|_2^2$$
2. **Angle Preservation**:
   $$\langle \mathbf{Q}\mathbf{u}, \mathbf{Q}\mathbf{v} \rangle = (\mathbf{Q}\mathbf{u})^T (\mathbf{Q}\mathbf{v}) = \mathbf{u}^T \mathbf{Q}^T \mathbf{Q} \mathbf{v} = \mathbf{u}^T \mathbf{v} = \langle \mathbf{u}, \mathbf{v} \rangle$$
3. **Determinant**: $\det(\mathbf{Q}) = \pm 1$.
   - $\det(\mathbf{Q}) = +1$: Pure spatial rotation ($SO(n)$ group).
   - $\det(\mathbf{Q}) = -1$: Reflection.

> Because orthogonal matrices preserve lengths exactly, multiplying by an orthogonal matrix **neither amplifies nor dampens floating-point roundoff error**. This makes orthogonal factorizations (like QR decomposition) the gold standard for numerical stability in high-performance computing.

---

## 7. Orthogonal Projection onto Subspaces

Let $W$ be a subspace of $\mathbb{R}^n$ spanned by the linearly independent columns of matrix $\mathbf{A} \in \mathbb{R}^{n \times k}$.
For any arbitrary vector $\mathbf{b} \in \mathbb{R}^n$, we want to find the point $\mathbf{p} \in W$ closest to $\mathbf{b}$ in Euclidean distance:

$$\mathbf{p} = \arg\min_{\mathbf{w} \in W} \|\mathbf{b} - \mathbf{w}\|_2$$

```
Orthogonal Projection Geometry:
   b
   ^
   |  \
   |    \  Error e = b - p (Perpendicular to Subspace W!)
   |      \
   |        v
---+--------+----------------------> Subspace W = C(A)
   0        p = P * b
```

### Derivation of Projection Matrix $\mathbf{P}$:
1. Since $\mathbf{p} \in W$, it can be written as a linear combination of the columns of $\mathbf{A}$: $\mathbf{p} = \mathbf{A}\mathbf{\hat{x}}$.
2. The error vector $\mathbf{e} = \mathbf{b} - \mathbf{p}$ must be orthogonal to every column of $\mathbf{A}$:
   $$\mathbf{A}^T (\mathbf{b} - \mathbf{A}\mathbf{\hat{x}}) = \mathbf{0}$$
3. Expanding and solving for $\mathbf{\hat{x}}$:
   $$\mathbf{A}^T \mathbf{b} - \mathbf{A}^T \mathbf{A}\mathbf{\hat{x}} = \mathbf{0} \implies \mathbf{A}^T \mathbf{A}\mathbf{\hat{x}} = \mathbf{A}^T \mathbf{b} \implies \mathbf{\hat{x}} = (\mathbf{A}^T \mathbf{A})^{-1} \mathbf{A}^T \mathbf{b}$$
4. Substituting $\mathbf{\hat{x}}$ back into $\mathbf{p} = \mathbf{A}\mathbf{\hat{x}}$:
   $$\mathbf{p} = \mathbf{A}(\mathbf{A}^T \mathbf{A})^{-1} \mathbf{A}^T \mathbf{b} = \mathbf{P}\mathbf{b}$$

The **Orthogonal Projection Matrix** is:

$$\mathbf{P} = \mathbf{A}(\mathbf{A}^T \mathbf{A})^{-1} \mathbf{A}^T$$

It satisfies two definitive mathematical properties:
1. **Symmetric**: $\mathbf{P}^T = \mathbf{P}$.
2. **Idempotent**: $\mathbf{P}^2 = \mathbf{P}$.

---

## 8. Python Implementation: Gram-Schmidt & Cosine Similarity

```python
import numpy as np

def gram_schmidt(vectors: np.ndarray) -> np.ndarray:
    """
    Gram-Schmidt orthonormalization.
    Input: k linearly independent vectors as rows of array (k, n).
    Output: k orthonormal vectors as rows of array (k, n).
    """
    k, n = vectors.shape
    orthonormal = np.zeros((k, n), dtype=float)

    for i in range(k):
        # Start with original vector
        v = vectors[i].copy()
        # Subtract projections onto previously computed orthonormal basis vectors
        for j in range(i):
            proj = np.dot(vectors[i], orthonormal[j])
            v -= proj * orthonormal[j]
        # Normalize to unit length
        norm = np.linalg.norm(v)
        if norm < 1e-12:
            raise ValueError(f"Vector {i} is linearly dependent on preceding vectors!")
        orthonormal[i] = v / norm

    return orthonormal

def cosine_similarity(u: np.ndarray, v: np.ndarray) -> float:
    """Compute cosine similarity between two high-dimensional embeddings."""
    dot_product = np.dot(u, v)
    norm_u = np.linalg.norm(u)
    norm_v = np.linalg.norm(v)
    return dot_product / (norm_u * norm_v)

if __name__ == "__main__":
    # Test Gram-Schmidt on 3 basis vectors in R^3
    basis = np.array([
        [1.0, 1.0, 0.0],
        [1.0, 0.0, 2.0],
        [0.0, 1.0, 1.0]
    ])

    q_basis = gram_schmidt(basis)
    print("=== Gram-Schmidt Orthonormal Basis ===")
    print(q_basis)

    # Verify orthonormality: Q * Q^T == I
    identity_check = q_basis @ q_basis.T
    print("\nQ * Q^T (Should be Identity Matrix):")
    print(np.round(identity_check, 4))
```

---

## 9. Key Takeaways

1. **Inner Products Induce Norms**: $\|\mathbf{x}\| = \sqrt{\langle \mathbf{x}, \mathbf{x} \rangle}$ defines Euclidean geometry.
2. **Orthogonal Invariance**: Orthogonal matrices ($\mathbf{Q}^T \mathbf{Q} = \mathbf{I}$) preserve vector lengths and angles without numeric drift.
3. **Projection Matrix $\mathbf{P}$**: $\mathbf{P} = \mathbf{A}(\mathbf{A}^T \mathbf{A})^{-1} \mathbf{A}^T$ projects vectors orthogonally onto the subspace spanned by $\mathbf{A}$.
