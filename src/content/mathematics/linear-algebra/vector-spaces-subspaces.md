---
title: "Vector Spaces, Basis & Dimension"
description: "Foundational mathematical structures of vector spaces, linear combinations, span, basis, dimension, and vector norms in computer science."
---

## 1. The Vector Space Axioms

In Computer Science and Engineering, a **vector** is not merely an arrow in 2D space or an array in memory; it is an element of an algebraic structure called a **Vector Space** $(V, +, \cdot)$ defined over a scalar field $\mathbb{F}$ (typically the real numbers $\mathbb{R}$ or complex numbers $\mathbb{C}$).

A set $V$ equipped with vector addition $+: V \times V \to V$ and scalar multiplication $\cdot: \mathbb{F} \times V \to V$ forms a vector space if it satisfies the **8 Core Axioms**:

1. **Associativity of Addition**: $u + (v + w) = (u + v) + w$ for all $u, v, w \in V$.
2. **Commutativity of Addition**: $u + v = v + u$ for all $u, v \in V$.
3. **Additive Identity**: There exists $\mathbf{0} \in V$ such that $v + \mathbf{0} = v$.
4. **Additive Inverse**: For every $v \in V$, there exists $-v \in V$ such that $v + (-v) = \mathbf{0}$.
5. **Compatibility of Scalar Multiplication**: $a(bv) = (ab)v$ for all $a, b \in \mathbb{F}$.
6. **Multiplicative Identity**: $1 \cdot v = v$ where $1 \in \mathbb{F}$.
7. **Distributivity over Vector Addition**: $a(u + v) = au + av$.
8. **Distributivity over Scalar Addition**: $(a + b)v = av + bv$.

```
┌─────────────────────────────────────────────────────────────┐
│                   VECTOR SPACE V over ℝ                     │
│                                                             │
│   Vector Addition: u, v ∈ V ───► (u + v) ∈ V                │
│   Scalar Scaling:  c ∈ ℝ, v ∈ V ───► (c · v) ∈ V            │
│   Linear Combination: c₁v₁ + c₂v₂ + ... + cₖvₖ ∈ V          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Linear Independence and Span

Let $S = \{v_1, v_2, \dots, v_k\}$ be a set of vectors in $V$.

### The Span
The **span** of $S$, denoted $\text{span}(S)$, is the set of all possible linear combinations of vectors in $S$:

$$\text{span}(S) = \left\{ \sum_{i=1}^k c_i v_i \;\middle|\; c_i \in \mathbb{F} \right\}$$

$\text{span}(S)$ is the smallest subspace of $V$ containing all vectors in $S$.

### Linear Independence
The vectors $\{v_1, v_2, \dots, v_k\}$ are **linearly independent** if and only if the vector equation:

$$c_1 v_1 + c_2 v_2 + \dots + c_k v_k = \mathbf{0}$$

has **only the trivial solution**:

$$c_1 = c_2 = \dots = c_k = 0$$

If there exists a set of scalars not all zero that satisfies the equation, the vectors are **linearly dependent**. In CSE terms, linear dependence indicates **redundant data** or collinear features in a dataset.

---

## 3. Basis and Dimension

A subset $B = \{b_1, b_2, \dots, b_n\} \subset V$ is a **Basis** of $V$ if:
1. $B$ is linearly independent.
2. $\text{span}(B) = V$ (B spans the entire space).

### Unique Representation Theorem
If $B$ is a basis for $V$, every vector $v \in V$ can be expressed **uniquely** as a linear combination:

$$v = x_1 b_1 + x_2 b_2 + \dots + x_n b_n$$

The scalar tuple $[x_1, x_2, \dots, x_n]^T \in \mathbb{R}^n$ represents the **coordinates** of $v$ with respect to basis $B$.

### Dimension
The **dimension** of a vector space, $\dim(V)$, is the number of vectors in any basis for $V$. All bases for a given finite-dimensional vector space have the identical cardinality.

---

## 4. Inner Products and Norms in CSE

To measure distances, angles, and magnitudes in vector spaces, we equip $V$ with an **Inner Product** $\langle u, v \rangle = u^T v = \sum_{i=1}^n u_i v_i$.

### Common Vector Norms in Computer Science

| Norm | Formula | CSE / Engineering Usage |
| :--- | :--- | :--- |
| **$L_1$ Norm (Manhattan)** | $\|x\|_1 = \sum_{i=1}^n \|x_i\|$ | Lasso regression, sparse feature selection, grid pathfinding. |
| **$L_2$ Norm (Euclidean)** | $\|x\|_2 = \sqrt{\sum_{i=1}^n x_i^2}$ | Standard distance metric, ridge regularization, SGD weight decay. |
| **$L_\infty$ Norm (Max)** | $\|x\|_\infty = \max_{i} \|x_i\|$ | Worst-case numerical error analysis, infinity-norm adversarial attacks in AI. |
| **Cosine Similarity** | $\cos(\theta) = \frac{u \cdot v}{\|u\|_2 \|v\|_2}$ | Vector search engines, RAG embeddings similarity (Pinecone, Milvus, pgvector). |

---

## 5. Python Implementation: Verifying Basis & Independence

```python
import numpy as np

def check_linear_independence(vectors: list[np.ndarray]) -> tuple[bool, int]:
    """
    Given a list of vectors, determines if they form a linearly independent basis
    by computing the rank of the matrix formed by stacking them as columns.
    """
    # Stack vectors as columns of matrix A
    A = np.column_stack(vectors)
    
    # Compute matrix rank via SVD
    rank = np.linalg.matrix_rank(A)
    num_vectors = A.shape[1]
    
    is_independent = (rank == num_vectors)
    return is_independent, rank

# Example: 3 vectors in R^3
v1 = np.array([1.0, 0.0, 2.0])
v2 = np.array([0.0, 1.0, -1.0])
v3 = np.array([2.0, 2.0, 2.0]) # v3 = 2*v1 + 2*v2 (Dependent!)

is_indep, r = check_linear_independence([v1, v2, v3])
print(f"Independent: {is_indep}, Matrix Rank: {r}") # Independent: False, Matrix Rank: 2
```

### Key Takeaway for CSE
Vector spaces form the foundation for coordinate systems in computer graphics, token embeddings in large language models ($d=4096$ in Llama 3), and feature spaces in classification algorithms. Linear independence guarantees that our representations contain zero redundant dimensions.
