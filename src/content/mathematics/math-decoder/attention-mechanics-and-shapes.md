---
title: "Deconstructing Attention Equations"
slug: "attention-mechanics-and-shapes"
description: "Scaled dot-product attention step-by-step: query-key similarity matrices, softmax normalization, value mixing, and Rotary Position Embeddings (RoPE)."
---

# Deconstructing Attention Equations

The core mathematical primitive powering all modern large language models, vision transformers, and multimodal architectures is **Scaled Dot-Product Attention** (Vaswani et al., 2017).

While the canonical equation fits on a single line, understanding its mechanics requires tracing the dimensional transformations, normalization dynamics, and masking constraints that govern its behavior.

---

## 1. The Canonical Scaled Dot-Product Attention Equation

$$\text{Attention}(Q, K, V) = \text{Softmax}\left( \frac{Q K^T}{\sqrt{d_k}} \right) V$$

```
   Q: [S_q, d_k]                K^T: [d_k, S_k]
┌──────────────────┐          ┌───────────────────────────┐
│                  │          │                           │
│  Queries         │    x     │    Keys (Transposed)      │
│  (Tokens looking)│          │    (Tokens being examined)│
└──────────────────┘          └───────────────────────────┘
         │                                  │
         └─────────────────┬────────────────┘
                           ▼
                 Scores Matrix: [S_q, S_k]
                           │
                 Scaled by 1 / sqrt(d_k)
                           │
                 Masked (Optional: Causal Mask)
                           │
                 Row-wise Softmax Normalization
                           ▼
                Attention Weights A: [S_q, S_k]
                           │
                           ▼
                           x  V: [S_k, d_v]
                           ▼
                Final Context Output: [S_q, d_v]
```

---

## 2. Step-by-Step Mathematical Anatomy

### Step 1: The Query-Key Projection
Given input token representations $X \in \mathbb{R}^{S \times d_{\text{model}}}$, we project them into three distinct latent spaces using learned parameter matrices:
$$Q = X W_Q, \quad K = X W_K, \quad V = X W_V$$
Where $W_Q, W_K \in \mathbb{R}^{d_{\text{model}} \times d_k}$ and $W_V \in \mathbb{R}^{d_{\text{model}} \times d_v}$.

### Step 2: The Raw Similarity Scores ($Q K^T$)
The matrix multiplication $Q K^T$ computes the pairwise dot product between every query vector $q_i$ and every key vector $k_j$:
$$S_{i, j} = q_i \cdot k_j = \sum_{m=1}^{d_k} q_{i, m} k_{j, m}$$
Geometrically, the dot product measures alignment: the more similar the representations, the larger the resulting scalar.

### Step 3: Why Divide by $\sqrt{d_k}$? (The Variance Stabilizer)
Assume components of $q$ and $k$ are independent random variables with zero mean and unit variance $\sigma^2 = 1$. The dot product $q \cdot k = \sum_{m=1}^{d_k} q_m k_m$ has:
- Mean: $\mathbb{E}[q \cdot k] = 0$
- Variance: $\text{Var}(q \cdot k) = \sum_{m=1}^{d_k} \text{Var}(q_m k_m) = d_k$

For large head dimensions (e.g., $d_k = 128$), the variance is $128$, and values of $S_{i, j}$ easily reach $\pm 30$.
When large inputs enter the $\text{Softmax}$ function:
$$\text{Softmax}(z)_i = \frac{e^{z_i}}{\sum_j e^{z_j}}$$
The exponentiated values explode, pushing the Softmax into saturation regions where **gradients become vanishingly small** ($\frac{\partial \text{Softmax}}{\partial z} \approx 0$).

Dividing by $\sqrt{d_k}$ rescales the variance back to:
$$\text{Var}\left(\frac{q \cdot k}{\sqrt{d_k}}\right) = \frac{d_k}{(\sqrt{d_k})^2} = 1$$
This keeps logits in a numerically stable range, preserving clean gradient flow during backpropagation.

### Step 4: The Causal Attention Mask
In autoregressive decoder models (e.g., GPT-4, Llama-3), token $i$ cannot look forward at future tokens $j > i$.
To enforce this, we add a causal mask matrix $M \in \mathbb{R}^{S \times S}$ before applying Softmax:

$$M_{i, j} = \begin{cases} 0 & \text{if } j \le i \\ -\infty & \text{if } j > i \end{cases}$$

$$\text{Attention Weights} = \text{Softmax}\left( \frac{Q K^T}{\sqrt{d_k}} + M \right)$$

Because $e^{-\infty} = 0$, every future position receives exactly **zero probability weight**, preventing causal leakage.

---

## 3. Rotary Position Embeddings (RoPE)

In the original 2017 Transformer, positions were injected via absolute sinusoidal additions: $X_{\text{pos}} = X + P$.
Modern frontier models (Llama, Mistral, Qwen, DeepSeek) replace this with **Rotary Position Embedding (RoPE)** (Su et al., 2021).

### The RoPE Insight:
Instead of adding an arbitrary position vector, RoPE rotates the query and key vectors in 2D planes by an angle proportional to the token's position index $m$:

```
Two-Dimensional Subspace Rotation:
  [ q_m^(2i)   ]   ┌──                      ──┐ [ q_m^(2i)   ]
  [            ] = │ cos(m \theta_i)  -sin(m \theta_i)│ │            │
  [ q_m^(2i+1) ]   │ sin(m \theta_i)   cos(m \theta_i)│ │ q_m^(2i+1) ]
                   └──                      ──┘
```

When we compute the dot product between query at position $m$ and key at position $n$:
$$\langle R_{\Theta, m}^d q_m, \, R_{\Theta, n}^d k_n \rangle = q_m^T \left( R_{\Theta, m}^d \right)^T R_{\Theta, n}^d k_n = q_m^T R_{\Theta, n - m}^d k_n$$

The resulting attention score depends **strictly on the relative distance $(n - m)$**, allowing models to generalize to sequence lengths far beyond what they observed during pretraining!
