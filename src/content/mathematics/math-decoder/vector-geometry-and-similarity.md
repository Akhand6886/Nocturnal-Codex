---
title: "Vector Geometry, Cosine Distance & HNSW"
slug: "vector-geometry-and-similarity"
description: "High-dimensional hypersphere geometry, dot products vs cosine similarity, the curse of dimensionality, and Hierarchical Navigable Small World (HNSW) search."
---

# Vector Geometry, Cosine Distance & HNSW

Modern artificial intelligence relies on **dense vector embeddings** (e.g., text-embedding-3, CLIP, ColBERT) to represent semantic meaning. In Retrieval-Augmented Generation (RAG), recommendation engines, and multimodal search, retrieval depends on computing geometric proximity in high-dimensional vector spaces ($\mathbb{R}^{768}$ to $\mathbb{R}^{4096}$).

However, geometry in 1,000-dimensional space defies everyday 3D human intuition.

---

## 1. Metrics in High Dimensions: Euclidean vs. Dot Product vs. Cosine

Given two vector embeddings $\mathbf{u}, \mathbf{v} \in \mathbb{R}^d$:

```
1. Euclidean Distance (L2):
   d_{L2}(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{i=1}^d (u_i - v_i)^2} = \|\mathbf{u} - \mathbf{v}\|_2

2. Dot Product (Inner Product):
   \langle \mathbf{u}, \mathbf{v} \rangle = \mathbf{u} \cdot \mathbf{v} = \sum_{i=1}^d u_i v_i = \|\mathbf{u}\| \|\mathbf{v}\| \cos(\theta)

3. Cosine Similarity:
   \text{Sim}_{\cos}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2} = \cos(\theta)
```

### The Equivalence Under Unit Normalization
If vectors are normalized to unit length ($\|\mathbf{u}\|_2 = 1, \, \|\mathbf{v}\|_2 = 1$), they reside on the surface of a unit hypersphere $\mathbb{S}^{d-1}$. 
Expanding the squared Euclidean distance:

$$\|\mathbf{u} - \mathbf{v}\|_2^2 = \|\mathbf{u}\|^2 + \|\mathbf{v}\|^2 - 2 \mathbf{u} \cdot \mathbf{v} = 1 + 1 - 2 \cos(\theta) = 2 \big( 1 - \cos(\theta) \big)$$

On unit-normalized vectors:
$$\arg\min \|\mathbf{u} - \mathbf{v}\|_2 \equiv \arg\max \mathbf{u} \cdot \mathbf{v} \equiv \arg\max \text{Sim}_{\cos}(\mathbf{u}, \mathbf{v})$$
All three metrics produce the exact same ranking! Because dot products require only single-instruction multiply-accumulate operations, unit normalization allows vector databases to execute high-speed inner product search.

---

## 2. Strange Geometry of High-Dimensional Spaces

### A. All Mass Concentrates in an Ultra-Thin Shell
The volume of a $d$-dimensional hypersphere of radius $R$ is:
$$V_d(R) = \frac{\pi^{d/2}}{\Gamma(d/2 + 1)} R^d$$

Consider the fraction of volume contained in an outer shell of thickness $\epsilon = 0.01 R$:
$$\frac{V_d(R) - V_d(0.99 R)}{V_d(R)} = 1 - (0.99)^d$$
- For $d = 3$: $1 - 0.99^3 \approx \mathbf{2.9\%}$ of volume is in the crust.
- For $d = 1,024$: $1 - 0.99^{1024} \approx \mathbf{99.996\%}$ of the volume is packed into the outer 1% skin!

### B. All Random Vectors are Nearly Orthogonal
If you sample two independent random vectors uniformly in $\mathbb{R}^d$:
$$\mathbb{E}[\cos(\theta)] = 0, \quad \text{Var}(\cos(\theta)) = \frac{1}{d}$$
In $d = 1,536$, the angle $\theta$ between any two random vectors is tightly concentrated between $88^\circ$ and $92^\circ$. Any non-orthogonal alignment represents genuine semantic correlation.

---

## 3. Approximate Nearest Neighbor (ANN) Search: HNSW

Brute-force exact $k$-Nearest Neighbor search compares a query vector against all $N$ database embeddings, requiring $O(N \cdot d)$ computation. For a dataset of 100 million vectors, a single query requires 150 billion operations—too slow for real-time RAG!

**Hierarchical Navigable Small World (HNSW)** (Malkov & Yashunin, 2018) builds a multi-layer graph inspired by skip-lists:

```
HNSW Multi-Layer Skip-Graph:
Layer 2 (Sparse, Long-Range Highway):
  [ Node A ] ──────────────────────────────────────────► [ Node F ]

Layer 1 (Medium Granularity):
  [ Node A ] ──────────► [ Node C ] ──────────────────► [ Node F ]

Layer 0 (Dense, Local Proximity):
  [ Node A ] ──► [ Node B ] ──► [ Node C ] ──► [ Node D ] ──► [ Node E ] ──► [ Node F ]
```

### The HNSW Search Trajectory:
1. Start at the top layer with sparse long-range express links.
2. Greedily hop to the neighbor closest to query vector $\mathbf{q}$.
3. When local minima is reached on layer $L$, drop down to layer $L-1$ and resume greedy search.
4. On Layer 0, perform fine-grained beam search to return the top $k$ nearest neighbors.

**Complexity**: Drops retrieval latency from $O(N)$ linear scan to **$O(\log N)$ logarithmic time**, returning answers across millions of vectors in under **5 milliseconds**.
