---
title: "Tensors & Multilinear Algebra in AI"
description: "Multidimensional arrays, tensor contractions, Einstein summation (einsum) mechanics, memory strides, broadcasting, and tensor rank factorizations."
---

## 1. Beyond 2D Matrices: The Era of Deep Learning

In introductory linear algebra, objects are vectors (1D lists) and matrices (2D tables). 

In modern artificial intelligence, computer vision, and Large Language Models, data lives in higher dimensions:
- **Color Images in PyTorch**: 4D Tensors $\text{Batch} \times \text{Channels} \times \text{Height} \times \text{Width}$ ($[B, C, H, W]$).
- **Transformer Token Activations**: 3D Tensors $\text{Batch} \times \text{Sequence Length} \times \text{Hidden Dimension}$ ($[B, S, D]$).
- **Multi-Head Self-Attention Weights**: 4D Tensors $\text{Batch} \times \text{Heads} \times \text{Query Len} \times \text{Key Len}$ ($[B, H, Q, K]$).

A **Tensor** is the multidimensional generalization of scalars, vectors, and matrices to arbitrary rank $k$.

```
+-----------------------------------------------------------------------------------------+
|                                  THE HIERARCHY OF TENSORS                               |
+-----------------------------------------------------------------------------------------+
|  Rank-0 Tensor:  SCALAR       s in R                        ()                          |
|  Rank-1 Tensor:  VECTOR       v in R^n                      (i)                         |
|  Rank-2 Tensor:  MATRIX       M in R^{m x n}                (i, j)                      |
|  Rank-3 Tensor:  3D VOLUME    T in R^{l x m x n}            (i, j, k)                   |
|  Rank-k Tensor:  ORDER-K      T in R^{d_1 x d_2 x ... x d_k}(i_1, i_2, ..., i_k)        |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Multilinear Maps & Tensor Products

Mathematically, a tensor of type $(p, q)$ is a **multilinear functional** that maps $p$ dual vectors and $q$ vectors to a scalar:

$$T: \underbrace{V^* \times \dots \times V^*}_{p \text{ copies}} \times \underbrace{V \times \dots \times V}_{q \text{ copies}} \to \mathbb{R}$$

It is linear in each argument independently.

### 2.1 The Outer Product (Tensor Product $\otimes$)
The tensor product of two vectors $\mathbf{u} \in \mathbb{R}^m$ and $\mathbf{v} \in \mathbb{R}^n$ produces a rank-2 matrix $\mathbf{u} \otimes \mathbf{v} \in \mathbb{R}^{m \times n}$:

$$(\mathbf{u} \otimes \mathbf{v})_{ij} = u_i v_j = \mathbf{u} \mathbf{v}^T$$

For higher orders, the tensor product of vector $\mathbf{a}$, vector $\mathbf{b}$, and vector $\mathbf{c}$ forms a rank-3 tensor:
$$(\mathbf{a} \otimes \mathbf{b} \otimes \mathbf{c})_{ijk} = a_i b_j c_k$$

---

## 3. Tensor Contraction & Einstein Summation Notation

A **tensor contraction** sums over paired matching indices, reducing the tensor's rank by 2.
- Contracting two vectors yields an inner product (Rank $1 + 1 - 2 = 0$): $\sum_i u_i v_i$.
- Contracting a matrix and a vector yields matrix-vector multiplication (Rank $2 + 1 - 2 = 1$): $\sum_j A_{ij} x_j$.
- Contracting two matrices yields standard matrix multiplication (Rank $2 + 2 - 2 = 2$): $\sum_j A_{ij} B_{jk}$.

### 3.1 Einstein Summation Convention
Albert Einstein introduced a compact notation: **whenever an index variable appears twice in a single term, summation over that index is automatically implied** without writing the $\sum$ symbol:

$$A_{ij} x_j \equiv \sum_{j=1}^n A_{ij} x_j$$

### 3.2 The `einsum` Language in PyTorch & NumPy
The `einsum` function specifies input and output tensor indices using string subscripts:

| Linear Algebra Operation | Mathematical Index Form | `einsum` String Notation |
| :--- | :--- | :--- |
| **Matrix Trace** | $\text{Tr}(\mathbf{A}) = \sum_i A_{ii}$ | `'ii -> '` |
| **Matrix-Vector Multiply** | $y_i = \sum_j A_{ij} x_j$ | `'ij, j -> i'` |
| **Matrix Multiplication** | $C_{ik} = \sum_j A_{ij} B_{jk}$ | `'ij, jk -> ik'` |
| **Batched Matrix Multiply (BMM)** | $C_{bij} = \sum_k A_{bik} B_{bkj}$ | `'bik, bkj -> bij'` |
| **Dot Product** | $s = \sum_i u_i v_i$ | `'i, i -> '` |
| **Outer Product** | $M_{ij} = u_i v_j$ | `'i, j -> ij'` |
| **Matrix Transpose** | $B_{ji} = A_{ij}$ | `'ij -> ji'` |

---

## 4. Multi-Head Attention in Transformers via `einsum`

In modern Large Language Models (LLMs), computing multi-head scaled dot-product attention involves high-dimensional tensor operations across batches and attention heads:

$$\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left( \frac{\mathbf{Q} \mathbf{K}^T}{\sqrt{d_k}} \right) \mathbf{V}$$

Let tensor shapes be:
- Queries $\mathbf{Q}$: `[batch, heads, seq_q, dim]`
- Keys $\mathbf{K}$: `[batch, heads, seq_k, dim]`
- Values $\mathbf{V}$: `[batch, heads, seq_k, dim]`

Using Einstein summation notation:
1. **Query-Key Dot Products (Attention Scores)**:
   Contract over the feature dimension `d`:
   ```python
   # Scores shape: [batch, heads, seq_q, seq_k]
   scores = torch.einsum("bhqd, bhkd -> bhqk", Q, K)
   ```
2. **Context Aggregation (Multiply by Values)**:
   Contract over the key sequence dimension `k`:
   ```python
   # Output shape: [batch, heads, seq_q, dim]
   context = torch.einsum("bhqk, bhkd -> bhqd", attention_weights, V)
   ```

Two single lines of `einsum` replace complex sequences of reshapes, transposes, and batch matrix multiplications!

---

## 5. Physical Memory Layout: Strides & Zero-Copy Broadcasting

How are $N$-dimensional tensors actually stored in physical computer memory? 
Hardware RAM is strictly a **flat, 1-dimensional byte array**.

### 5.1 Strides
The **stride** of dimension $k$ is the number of memory elements that must be stepped over in flat RAM to advance by 1 in that dimension.

For an array of shape $(d_0, d_1, d_2)$ in **Row-Major (C-Contiguous)** order:
$$\text{Memory Offset}(i, j, k) = i \cdot s_0 + j \cdot s_1 + k \cdot s_2$$
where:
$$s_2 = 1, \qquad s_1 = d_2, \qquad s_0 = d_1 \cdot d_2$$

```
3x4 Matrix Stored in Flat 1D Memory:
Shape: (3, 4), Strides: (4, 1)
Row 0: [ 0,  1,  2,  3 ]  --> RAM indices: [ 0, 1, 2, 3 ]
Row 1: [ 4,  5,  6,  7 ]  --> RAM indices: [ 4, 5, 6, 7 ]
Row 2: [ 8,  9, 10, 11 ]  --> RAM indices: [ 8, 9, 10, 11 ]
```

### 5.2 Zero-Copy Broadcasting Mechanics
In PyTorch/NumPy, when you add a vector of shape `(1, 4)` to a matrix of shape `(3, 4)`, does the computer duplicate the vector in memory? **NO!**

NumPy sets the stride for the broadcasted dimension to **$0$**:
$$\text{stride}[0] = 0$$
$$\text{Memory Offset}(i, j) = i \cdot 0 + j \cdot 1 = j$$
Advancing along row $i$ always reads the exact same physical memory cell! Broadcasting is an $O(1)$ zero-copy pointer trick.

---

## 6. Tensor Decompositions for Deep Learning Compression

Just as Singular Value Decomposition factorizes 2D matrices into low-rank components, **Tensor Factorizations** compress massive deep learning weight tensors:

### 6.1 CP Decomposition (CANDECOMP/PARAFAC)
Expresses a rank-3 tensor $\mathcal{T} \in \mathbb{R}^{d_1 \times d_2 \times d_3}$ as a sum of $R$ rank-1 outer products:

$$\mathcal{T} \approx \sum_{r=1}^R \lambda_r \left( \mathbf{a}_r \otimes \mathbf{b}_r \otimes \mathbf{c}_r \right)$$

Compresses parameters from $d_1 d_2 d_3$ down to $R(d_1 + d_2 + d_3)$, achieving up to $80\%$ memory compression in convolutional and embedding layers.

### 6.2 Tucker Decomposition (Higher-Order SVD)
Factorizes a tensor into a small dense **Core Tensor** $\mathcal{G}$ multiplied by orthogonal factor matrices along each mode:

$$\mathcal{T} \approx \mathcal{G} \times_1 \mathbf{U}^{(1)} \times_2 \mathbf{U}^{(2)} \times_3 \mathbf{U}^{(3)}$$

Used extensively in edge-device model pruning for mobile neural network inference.

---

## 7. Python Implementation: `np.einsum` & Stride Inspection

```python
import numpy as np

def demonstrate_einsum_operations():
    rng = np.random.default_rng(42)

    # 1. Batched Matrix Multiply (BMM)
    # Shape: Batch=2, M=3, K=4 and Batch=2, K=4, N=5
    A = rng.normal(size=(2, 3, 4))
    B = rng.normal(size=(2, 4, 5))

    # Classical BMM via einsum
    C = np.einsum("bik, bkj -> bij", A, B)
    print("=== Batched Matrix Multiplication (einsum) ===")
    print(f"A shape: {A.shape}, B shape: {B.shape} -> Result shape: {C.shape}")
    assert np.allclose(C, A @ B)

    # 2. Transformer Multi-Head Attention Scores
    # [batch=2, heads=4, seq_q=8, dim=16]
    Q = rng.normal(size=(2, 4, 8, 16))
    K = rng.normal(size=(2, 4, 8, 16))
    # Query-Key attention score matrix: [batch=2, heads=4, seq_q=8, seq_k=8]
    attn_scores = np.einsum("bhqd, bhkd -> bhqk", Q, K)
    print(f"\nTransformer Attention Scores Shape: {attn_scores.shape}")

def inspect_strides():
    arr = np.zeros((3, 4), dtype=np.float64)
    print("\n=== Memory Strides Inspection ===")
    print(f"Shape: {arr.shape}")
    print(f"Strides (in bytes, 8 bytes per float64): {arr.strides}")
    # Strides: (32, 8) -> jump 32 bytes (4 floats) to next row; 8 bytes to next col.

    # Broadcast vector
    vec = np.arange(4, dtype=np.float64).reshape(1, 4)
    broadcasted = np.broadcast_to(vec, (3, 4))
    print(f"Broadcasted Shape:   {broadcasted.shape}")
    print(f"Broadcasted Strides: {broadcasted.strides}")
    # Notice: Stride for dimension 0 is 0 bytes! Zero physical memory copied!

if __name__ == "__main__":
    demonstrate_einsum_operations()
    inspect_strides()
```

---

## 8. Key Takeaways

1. **Tensors Generalize Coordinates**: Rank-$k$ arrays represent multidimensional linear mappings.
2. **Einstein Summation Simplifies AI**: Repeated indices specify contractions; `einsum` handles complex attention and tensor pipelines in single declarative statements.
3. **Strides Govern Performance**: Contiguous memory access accelerates GPU SIMD execution; zero-strides enable memory-free broadcasting.
