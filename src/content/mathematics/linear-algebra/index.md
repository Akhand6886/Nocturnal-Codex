---
title: "Linear Algebra"
slug: "linear-algebra"
description: "The mathematical language of multidimensional computation: vector spaces, linear transformations, matrix factorizations, spectral theory, SVD, PCA, and tensor algebra."
iconName: "math"
topics:
  - section: "Part I: Vectors, Spaces & Geometry"
    description: "Vector spaces, subspaces, the Four Fundamental Subspaces, inner products, norms, and affine graphics transformations."
    items:
      - title: "Vector Spaces, Basis & Subspaces"
        description: "Vector space axioms, linear independence, span, basis, dimension, and the Four Fundamental Subspaces of a matrix."
        slug: "vector-spaces-subspaces"
      - title: "Inner Products, Norms & Orthogonality"
        description: "Inner products, vector and matrix norms, Cauchy-Schwarz, Gram-Schmidt orthogonalization, and projection matrices."
        slug: "inner-products-orthogonality"
      - title: "Matrix Transformations & Graphics Pipeline"
        description: "Linear maps, kernel, rank-nullity theorem, 2D/3D affine transformations, and the GPU Model-View-Projection pipeline."
        slug: "matrix-transformations"
  - section: "Part II: Systems of Equations & Decompositions"
    description: "Gaussian elimination, matrix factorizations, and least-squares optimization."
    items:
      - title: "Linear Systems, Elimination & Determinants"
        description: "Gaussian elimination, row echelon form, pivoting strategies, determinant properties, and signed volume scaling."
        slug: "linear-systems-elimination"
      - title: "Matrix Decompositions: LU, Cholesky & QR"
        description: "Gaussian elimination with partial pivoting (PA=LU), Cholesky for positive-definite systems, and QR decomposition."
        slug: "matrix-decompositions"
      - title: "Least Squares, Normal Equations & Pseudoinverse"
        description: "Overdetermined systems, normal equations, Moore-Penrose pseudoinverse, and Ridge regularization as conditioned least squares."
        slug: "least-squares-pseudoinverse"
  - section: "Part III: Spectral Theory & Advanced Matrix Analysis"
    description: "Eigenvalues, eigenvectors, the spectral theorem, Singular Value Decomposition, and dimensionality reduction."
    items:
      - title: "Eigenvalues, Eigenvectors & PageRank"
        description: "Characteristic polynomials, matrix diagonalization, dynamical systems, and Google's dominant eigenvector."
        slug: "eigenvalues-eigenvectors"
      - title: "Symmetric Matrices & The Spectral Theorem"
        description: "Real symmetric matrices, orthogonal diagonalization (A = Q Lambda Q^T), quadratic forms, and the Rayleigh quotient."
        slug: "symmetric-matrices-spectral-theorem"
      - title: "Singular Value Decomposition (SVD)"
        description: "The SVD theorem, geometric intuition, low-rank Eckart-Young approximation, and matrix condition numbers."
        slug: "singular-value-decomposition"
      - title: "Principal Component Analysis (PCA)"
        description: "Covariance matrix factorization, variance maximization derivation, connection between PCA and SVD, and data whitening."
        slug: "pca-dimensionality-reduction"
  - section: "Part IV: Tensors & Multilinear Algebra"
    description: "High-dimensional arrays, tensor contractions, Einstein summation, and deep learning memory mechanics."
    items:
      - title: "Tensors & Multilinear Algebra in AI"
        description: "Multidimensional arrays, tensor rank, tensor contraction, Einstein summation (einsum), and memory stride broadcasting."
        slug: "tensors-multilinear-algebra"
---

## The Engine of Multidimensional Computing

Linear Algebra is the universal mathematical language of computer science and high-performance computing. Whether training 100-billion parameter Large Language Models on distributed GPU clusters, rendering photorealistic 3D virtual worlds, or analyzing massive high-dimensional datasets, software engineers represent and manipulate physical realities as **vectors, matrices, and linear operators**.

```
+-----------------------------------------------------------------------------------+
|                           THE ARCHITECTURE OF LINEAR ALGEBRA                      |
+-----------------------------------------------------------------------------------+
|  [Vector Spaces & Subspaces]    --> Coordinates, basis, Four Fundamental Subspaces |
|           |                                                                       |
|           v                                                                       |
|  [Linear Operators & Geometry]  --> Matrices as transformations, projections, GPU |
|           |                                                                       |
|           v                                                                       |
|  [Matrix Factorizations]        --> LU, Cholesky, QR, Least Squares, Pseudoinverses|
|           |                                                                       |
|           v                                                                       |
|  [Spectral Theory & SVD]        --> Eigenvalues, Spectral Theorem, SVD, PCA       |
|           |                                                                       |
|           v                                                                       |
|  [Tensors & Multilinear AI]     --> Einsum, contractions, tensor decompositions   |
+-----------------------------------------------------------------------------------+
```

---

## Core Pillars in Computer Science & Engineering

### 1. Artificial Intelligence & Deep Learning
Modern neural networks are vast compositions of parameterized linear transformations interleaved with element-wise non-linearities:

$$\mathbf{h}^{(l+1)} = \sigma\left( \mathbf{W}^{(l)} \mathbf{h}^{(l)} + \mathbf{b}^{(l)} \right)$$

Attention mechanics in Transformers (GPT, Claude, Gemini) calculate token interactions via scaled dot-product attention matrices:
$$\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left( \frac{\mathbf{Q} \mathbf{K}^T}{\sqrt{d_k}} \right) \mathbf{V}$$
Every forward pass, backward gradient propagation, and inference KV-cache lookup is vectorized linear algebra executed on SIMD hardware and tensor processing units.

### 2. 3D Computer Graphics & Game Engines
In game engines (Unreal, Unity) and GPU shaders (Vulkan, DirectX, Metal), geometry is represented in **4D Homogeneous Coordinates**. The **Model-View-Projection (MVP)** pipeline transforms a 3D vertex in world space to screen pixel coordinates via a sequence of $4 \times 4$ affine transformation matrices.

### 3. Dimensionality Reduction & Information Retrieval
High-dimensional datasets suffer from the "Curse of Dimensionality" and severe noise. By factorizing large data matrices using **Singular Value Decomposition (SVD)** and **Principal Component Analysis (PCA)**, engineers extract the latent low-rank signals, enabling semantic document embeddings, recommendation engines (collaborative filtering), and data compression.
