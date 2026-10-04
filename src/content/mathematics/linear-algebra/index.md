---
title: "Linear Algebra"
slug: "linear-algebra"
description: "The mathematics of vectors, matrices, and linear transformations. The engine behind computer graphics, machine learning, and high-performance computing."
iconName: "math"
topics:
  - section: "Part I: Vectors, Spaces & Transformations"
    description: "Vector spaces, linear independence, basis, and matrices as linear transformations."
    items:
      - title: "Vector Spaces, Basis & Dimension"
        description: "Vector spaces, linear independence, span, basis, dimension, inner products, and norms."
        slug: "vector-spaces-subspaces"
      - title: "Matrix Transformations & Graphics Pipeline"
        description: "Linear maps, kernel, image, rank-nullity theorem, and 3D affine transformations (Model-View-Projection)."
        slug: "matrix-transformations"
  - section: "Part II: Factorizations & Decompositions"
    description: "Decomposing complex matrix operators into simple, numerically stable factors."
    items:
      - title: "Matrix Decompositions: LU, Cholesky & QR"
        description: "Gaussian elimination, partial pivoting, positive-definite systems, and Gram-Schmidt orthogonalization."
        slug: "matrix-decompositions"
      - title: "Eigenvalues, Eigenvectors & PageRank"
        description: "Characteristic polynomials, matrix diagonalization, and Google's PageRank dominant eigenvector."
        slug: "eigenvalues-eigenvectors"
  - section: "Part III: Dimensionality Reduction & Data Science"
    description: "Extracting latent structure and compressing high-dimensional datasets."
    items:
      - title: "Singular Value Decomposition (SVD)"
        description: "SVD theorem, low-rank Eckart-Young approximation, pseudoinverses, and recommendation systems."
        slug: "singular-value-decomposition"
      - title: "Principal Component Analysis (PCA)"
        description: "Covariance matrices, variance maximization, projection onto principal axes, and scree plots."
        slug: "pca-dimensionality-reduction"
---

## Introduction to Linear Algebra

Linear Algebra is the engine of modern computer science and engineering. It provides a universal mathematical framework to represent, transform, and manipulate massive datasets simultaneously. If you are building **3D Graphics Engines**, **Machine Learning Systems**, **Robotics Kinematics**, or **High-Performance Distributed Computing**, you are computing Linear Algebra in code.

### The Three Pillars of Linear Algebra in CSE

1. **Vectors and Spaces (Representation)**: Encoding real-world entities (pixels, tokens, graph nodes, sensor readings) as coordinate vectors in high-dimensional vector spaces.
2. **Matrices as Operators (Transformation)**: Treating matrices as functions that rotate, scale, project, and shear coordinate frames—vectorized natively on CPU SIMD units and GPU tensor cores.
3. **Spectral Decompositions (Analysis & Compression)**: Factorizing large matrices into eigenvalues and singular vectors to discover latent patterns, compress data, and decouple coupled systems.
