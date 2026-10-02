---
title: "KV-Cache Mechanics & Memory Formulas"
slug: "kv-cache-mechanics-and-formulas"
description: "Deriving exact KV-cache tensor bytes, comparing Multi-Head, Grouped-Query, and Multi-Query Attention, and managing GPU memory budgets."
---

# KV-Cache Mechanics & Memory Formulas

In autoregressive generation, each token generated attends to all previous tokens in the sequence. Without caching, the attention keys ($K$) and values ($V$) for every past token would have to be recomputed at every step, creating an $O(N^2)$ quadratic compute penalty for an $N$-token response.

The **Key-Value Cache (KV Cache)** avoids redundant projection by storing past key and value activations in GPU memory. However, this trades compute for GPU memory, making KV-cache footprint the primary limiter of maximum context length and concurrent batch capacity.

---

## 1. The Fundamental KV-Cache Formula

For a transformer model with:
- $n_{\text{layers}}$: Total number of transformer layers.
- $n_{\text{kv\_heads}}$: Number of key/value attention heads per layer.
- $d_{\text{head}}$: Dimension of each attention head ($d_{\text{model}} / n_{\text{heads}}$).
- $s$: Sequence length (tokens).
- $b$: Concurrent batch size.
- $P_{\text{bytes}}$: Bytes per element (2 for FP16/BF16, 1 for FP8, 0.5 for INT4).

The factor of **2** accounts for storing both **Keys** and **Values**:

$$\text{Memory}_{\text{KV}} = 2 \times n_{\text{layers}} \times n_{\text{kv\_heads}} \times d_{\text{head}} \times s \times b \times P_{\text{bytes}}$$

### Per-Token Memory Footprint
To evaluate memory growth as context increases, we define the memory consumed **per token per sequence**:

$$\text{Bytes per Token} = 2 \times n_{\text{layers}} \times n_{\text{kv\_heads}} \times d_{\text{head}} \times P_{\text{bytes}}$$

---

## 2. Attention Architecture Comparison: MHA vs. GQA vs. MQA

Modern transformer architectures reduce the KV cache size by decoupling the number of Query heads ($n_q$) from the number of Key/Value heads ($n_{\text{kv}}$):

```
Multi-Head Attention (MHA)       Grouped-Query Attention (GQA)       Multi-Query Attention (MQA)
  Q Q Q Q   K K K K   V V V V        Q Q Q Q   K K   V V                   Q Q Q Q   K   V
  │ │ │ │   │ │ │ │   │ │ │ │        │ │ │ │   │ │   │ │                   │ │ │ │   │   │
  └─┴─┴─┴───┴─┴─┴─┴───┴─┴─┴─┘        └─┴─┴─┴───┴─┴───┴─┴─┘                 └─┴─┴─┴───┴───┴─┘
   n_q = 4, n_kv = 4                  n_q = 4, n_kv = 2 (Group = 2)         n_q = 4, n_kv = 1
   100% KV Cache Size                 50% KV Cache Size                     25% KV Cache Size
```

### Comparison Across Leading LLMs (in BF16, $P_{\text{bytes}} = 2$)

| Model | Layers | $n_q$ | $n_{\text{kv}}$ | $d_{\text{head}}$ | Attention Type | KV Bytes / Token |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Llama-2-70B** | 80 | 64 | 64 | 128 | MHA | **1.31 MB / token** |
| **Llama-3-70B** | 80 | 64 | 8 | 128 | GQA (8:1) | **163.8 KB / token** (8x reduction!) |
| **Mistral-7B** | 32 | 32 | 8 | 128 | GQA (4:1) | **65.5 KB / token** |
| **Falcon-40B** | 60 | 64 | 1 | 128 | MQA | **15.3 KB / token** |

> **Key Takeaway**: By migrating from MHA in Llama-2 to GQA in Llama-3, the KV-cache memory requirement dropped by **87.5%**, enabling 8x longer context windows and substantially larger batch concurrency on identical hardware.

---

## 3. Real-World Memory Budgeting: A 128K Context Example

Consider serving **Llama-3-70B** with a **128,000 token context** in BF16:

$$\text{KV Cache Size per Request} = 128,000 \text{ tokens} \times 163,840 \text{ bytes/token} \approx \mathbf{20.97 \text{ GB}}$$

If you deploy this model across an 8x NVIDIA H100 (80 GB) node:
- **Model Parameters (BF16)**: $70 \times 10^9 \times 2 \text{ bytes} \approx 140 \text{ GB}$.
- Across 8 GPUs via Tensor Parallelism ($TP=8$): $140 / 8 = 17.5 \text{ GB}$ per GPU for weights.
- Remaining HBM per GPU: $80 - 17.5 - \text{CUDA runtime buffers} \approx 58 \text{ GB}$.
- Total cluster KV Cache capacity: $58 \times 8 = 464 \text{ GB}$.
- **Max Concurrent 128K Requests**:
  $$\frac{464 \text{ GB}}{20.97 \text{ GB}} \approx \mathbf{22 \text{ concurrent streams}}$$

If a 23rd user arrives, the serving engine must either **queue**, **preempt (swap to CPU RAM)**, or trigger out-of-memory errors!

---

## 4. KV-Cache Quantization: FP8 and INT4

To push capacity further, modern runtimes quantize cached keys and values from 16-bit to lower-bit representations:

### Precision Trade-offs

| Format | Bits per Element | Memory Savings | Precision Impact | Kernel Availability |
| :--- | :--- | :--- | :--- | :--- |
| **BF16 / FP16** | 16 | Baseline | Exact | Universal |
| **FP8 (E4M3 / E5M2)** | 8 | **50% savings** | $<0.1$ Perplexity delta | Native Ada / Hopper Tensor Cores |
| **INT4 (AWQ / GPTQ)** | 4 | **75% savings** | Minor degradation in long context | Requires dequantization overhead |

### Effective Memory Savings with Metadata
When using FP8 or INT4 quantization, scaling factors must be retained per tensor or per head. 
For FP8 with per-channel scaling:
$$\text{Metadata Overhead} \approx \frac{1}{\text{block size}} \times 2 \text{ bytes} \approx 1-3\%$$
Thus, FP8 yields a net memory reduction of approximately **48.5%**, nearly doubling concurrency with virtually zero loss in generation quality.
