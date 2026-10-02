---
title: "Scalars, Vectors, Matrices & Tensors"
slug: "scalars-vectors-matrices-tensors"
description: "Axis semantics, dimension contracts, NumPy/PyTorch broadcasting rules, and Einstein summation (einsum) mechanics."
---

# Scalars, Vectors, Matrices & Tensors

In artificial intelligence, everything is represented as a multidimensional array: numerical data, model weights, hidden activations, and gradients. Understanding how dimensions align, contract, and broadcast is the core prerequisite for reading model architectures and debugging CUDA kernels.

---

## 1. The Dimensional Ladder

```
 Rank 0: Scalar              Rank 1: Vector                   Rank 2: Matrix                  Rank 3: 3D Tensor
 (0 dimensions)              (1 dimension)                    (2 dimensions)                  (3 dimensions)
       s                       [ v_1 ]                          ┌───           ───┐             ┌───────────────┐
    (Scalar)                   [ v_2 ]                          │ m_11    m_12    │            ╱               ╱│
                               [ v_3 ]                          │ m_21    m_22    │           ┌───────────────┐ │
                                                                └───           ───┘           │  Batch x Seq  │ │
                                                                                              │   x Hidden    │╱
                                                                                              └───────────────┘
```

### Typographic Conventions in AI Papers:
- **Scalars ($s, \alpha, \lambda$)**: Lowercase plain or Greek letters.
- **Vectors ($\mathbf{v}, \vec{v}, \mathbf{x}$)**: Lowercase bold letters. By convention in linear algebra, all vectors are **column vectors** ($d \times 1$) unless explicitly transposed ($\mathbf{x}^T$ is a $1 \times d$ row vector).
- **Matrices ($W, A, \Sigma$)**: Uppercase letters (often uppercase bold $\mathbf{W}$).
- **Tensors ($\mathcal{T}, \mathbf{X}$)**: Uppercase calligraphic or bold symbols.

---

## 2. Standard Tensor Axis Signatures in Transformers

When reading transformer papers (e.g., Llama, GPT-4, Mistral), tensors frequently possess 3 to 5 axes:

```
Activation Tensor: [ B, S, D ]
  ├── B: Batch Size         (Number of independent sequences processed in parallel)
  ├── S: Sequence Length    (Number of tokens in the sequence context window)
  └── D: Hidden Dimension   (Width of the model embedding space, e.g., 4096)

Attention Weights Tensor: [ B, H, S, S ]
  ├── B: Batch Size
  ├── H: Number of Heads    (Parallel attention heads per layer)
  ├── S: Query Positions    (Which token is looking)
  └── S: Key Positions      (Which token is being attended to)

Key-Value Cache Tensor: [ B, H_kv, S, D_head ]
  ├── H_kv: Key/Value Heads (May be smaller than H under GQA/MQA)
  └── D_head: Head Dim      (Typically D / H, e.g., 128)
```

---

## 3. Broadcasting: The Implicit Alignment Rules

In both mathematics and modern tensor libraries (NumPy, PyTorch, JAX), binary operations (addition, subtraction, element-wise multiplication) between tensors of different ranks follow **Broadcasting Rules**:

### The Broadcasting Contract:
Two axes are compatible when:
1. They are **equal in size**, or
2. One of the dimensions is **1** (or missing).

```
Example: Adding a Bias Vector to a Batch Activation Tensor
Activation X:   [ B, S, D ]     (e.g., [ 16, 2048, 4096 ])
Bias b:                 [ D ]   (e.g., [           4096 ])
──────────────────────────────────────────────────────────
Result (X + b): [ B, S, D ]     (Bias b is automatically duplicated across B and S)
```

In mathematical equations, authors often omit explicit expansion notation, writing simply $X + b$. Understanding broadcasting allows you to instantly recognize that $b$ is expanded to match the leading axes of $X$.

---

## 4. Einstein Summation (`einsum`): The Universal Tensor Language

Einstein summation convention simplifies multidimensional contractions by omitting the summation symbol $\sum$ and summing over any index that appears multiple times in a product.

### The Notation Rule:
- Any index that appears in the inputs but **does not** appear in the output signature is **contracted (summed over)**.
- Any index that appears in both inputs and outputs is **retained (batched)**.

### Common AI Operators Decoded via Einsum:

```python
import torch

# 1. Matrix Multiplication: C_{i,k} = \sum_j A_{i,j} B_{j,k}
# Index 'j' appears in inputs but not output -> Summed away!
C = torch.einsum('ij, jk -> ik', A, B)

# 2. Batched Scaled Dot-Product Attention Scores:
# Q: [B, H, S_q, D], K: [B, H, S_k, D]
# Output: [B, H, S_q, S_k]
# Index 'd' is contracted; 'b', 'h', 'i', 'j' are preserved
scores = torch.einsum('bhid, bhjd -> bhij', Q, K)

# 3. Value Mixing:
# Weights: [B, H, S_q, S_k], V: [B, H, S_k, D]
# Output: [B, H, S_q, D]
# Index 'j' is contracted
out = torch.einsum('bhij, bhjd -> bhid', weights, V)

# 4. Transpose (Permuting dimensions):
A_t = torch.einsum('ij -> ji', A)

# 5. Matrix Trace (Diagonal sum):
tr = torch.einsum('ii ->', A)
```

> **Why Learn Einsum?**: Whenever a research paper describes an exotic tensor contraction—such as Rotary Position Embedding (RoPE) rotations or Multi-Head Latent Attention (MLA)—writing the `einsum` string is the fastest way to verify dimension consistency and eliminate shape bugs.
