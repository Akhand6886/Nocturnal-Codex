---
title: "Eigenvalues, Eigenvectors & PageRank"
description: "Spectral matrix theory, characteristic polynomials, diagonalization, and Google's PageRank dominant eigenvector power iteration."
---

## 1. The Eigenvalue Equation

When a linear transformation $A \in \mathbb{R}^{n \times n}$ acts on a vector $x$, it typically changes both the magnitude and the direction of $x$.

However, there exist special non-zero vectors whose **direction remains invariant** under the transformation; they are only scaled by a factor $\lambda \in \mathbb{C}$:

$$A v = \lambda v, \quad v \neq \mathbf{0}$$

- **$v$** is the **Eigenvector** (characteristic vector).
- **$\lambda$** is the **Eigenvalue** (characteristic value).

```
          Av = λv (Direction preserved, length scaled by λ)
          ▲
         /
        /   v (Eigenvector)
       /  ▲
      /  /
     /  /
    •──/─────────────────►
```

### The Characteristic Equation
Rearranging $(A - \lambda I)v = \mathbf{0}$. For non-trivial solutions ($v \neq \mathbf{0}$), the matrix $(A - \lambda I)$ must be singular (its determinant must equal zero):

$$\det(A - \lambda I) = 0$$

Solving this $n$-degree polynomial yields the $n$ eigenvalues $\lambda_1, \lambda_2, \dots, \lambda_n$.

---

## 2. Diagonalization: Decoupling Complex Systems

If an $n \times n$ matrix $A$ has $n$ linearly independent eigenvectors $\{v_1, \dots, v_n\}$, we can form the eigenvector matrix $P = [v_1 \dots v_n]$ and diagonal matrix $D = \text{diag}(\lambda_1, \dots, \lambda_n)$:

$$A = P D P^{-1}$$

### Fast Matrix Exponentiation
Computing $A^k$ for large $k$ (e.g. evaluating Markov chain transitions or graph walk step counts) takes $O(k n^3)$ naively. With diagonalization:

$$A^k = (P D P^{-1})^k = P D^k P^{-1}$$

Since $D$ is diagonal, $D^k = \text{diag}(\lambda_1^k, \lambda_2^k, \dots, \lambda_n^k)$, reducing matrix powers to $O(n)$ after the initial $O(n^3)$ decomposition!

---

## 3. Google's PageRank Algorithm: The Dominant Eigenvector

Google's original search engine algorithm, **PageRank** (Page & Brin, 1998), models the entire World Wide Web as a directed graph of $N$ nodes.

A random web surfer on page $j$ clicks a link to page $i$ with probability $M_{ij} = 1 / L(j)$, or jumps to a random page with probability $(1 - d)$ where $d \approx 0.85$ is the **damping factor**.

The **Google Transition Matrix** $G$ is defined as:

$$G = d \cdot M + \frac{1 - d}{N} \mathbf{1} \mathbf{1}^T$$

### Perron-Frobenius Theorem
Because $G$ is a strictly positive stochastic matrix ($G_{ij} > 0$ and columns sum to 1), the Perron-Frobenius theorem guarantees:
1. The largest eigenvalue of $G$ is **strictly equal to 1** ($\lambda_1 = 1$).
2. The corresponding eigenvector $r$ satisfies:

$$G r = 1 \cdot r \implies G r = r$$

3. All entries of $r$ are strictly positive ($r_i > 0$).

The components of this **dominant eigenvector** $r$ represent the exact steady-state probability of being on each webpage—which is precisely the **PageRank score**!

---

## 4. Python Implementation: The Power Iteration Method

```python
import numpy as np

def compute_pagerank(adjacency_matrix: np.ndarray, d: float = 0.85, tol: float = 1e-6) -> np.ndarray:
    """
    Computes PageRank vector using Power Iteration to find the dominant eigenvector (λ = 1).
    """
    n = adjacency_matrix.shape[0]
    
    # Normalize columns to form stochastic link matrix M
    out_degrees = adjacency_matrix.sum(axis=0)
    out_degrees[out_degrees == 0] = 1 # avoid divide by zero for dangling nodes
    M = adjacency_matrix / out_degrees
    
    # Construct Google Matrix G
    G = d * M + ((1.0 - d) / n) * np.ones((n, n))
    
    # Initialize uniform probability distribution
    r = np.ones(n) / n
    
    # Power Iteration: r_{t+1} = G * r_t
    max_iter = 100
    for step in range(max_iter):
        r_next = G @ r
        # Normalize
        r_next = r_next / np.sum(r_next)
        
        diff = np.linalg.norm(r_next - r, ord=1)
        r = r_next
        if diff < tol:
            print(f"PageRank converged in {step + 1} iterations.")
            break
            
    return r

# Web graph with 4 pages: A (0), B (1), C (2), D (3)
# Directed links: A -> B, A -> C, B -> D, C -> A, C -> B, D -> C
adj = np.array([
    [0, 0, 1, 0], # in-links to A
    [1, 0, 1, 0], # in-links to B
    [1, 0, 0, 1], # in-links to C
    [0, 1, 0, 0], # in-links to D
], dtype=np.float64)

scores = compute_pagerank(adj)
for page, score in enumerate(scores):
    print(f"Page {chr(65 + page)}: Rank Score = {score:.4f}")
```
