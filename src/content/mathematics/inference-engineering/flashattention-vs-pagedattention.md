---
title: "FlashAttention vs. PagedAttention"
slug: "flashattention-vs-pagedattention"
description: "Why FlashAttention accelerates attention via SRAM tiling and why PagedAttention eliminates KV-cache fragmentation via virtual memory paging."
---

# FlashAttention vs. PagedAttention

Two of the most impactful algorithmic breakthroughs in LLM systems—**FlashAttention** and **PagedAttention**—address completely different memory bottlenecks in the transformer stack:

- **FlashAttention** is a **compute kernel optimization** designed to reduce IO traffic between GPU High Bandwidth Memory (HBM) and on-chip SRAM during the attention computation.
- **PagedAttention** is a **system-level memory manager** designed to eliminate memory fragmentation and enable zero-copy cache sharing across concurrent requests.

In modern production runtimes like vLLM, engines use **both simultaneously**: FlashAttention accelerates kernel execution, while PagedAttention manages the physical block tables in memory.

---

## 1. FlashAttention: IO-Aware SRAM Tiling

Standard attention computes:
$$S = Q K^T \in \mathbb{R}^{N \times N}, \quad P = \text{softmax}(S) \in \mathbb{R}^{N \times N}, \quad O = P V \in \mathbb{R}^{N \times d}$$

In naive PyTorch implementations:
1. $Q$ and $K$ are read from HBM.
2. The $N \times N$ attention matrix $S$ is written back to HBM.
3. $S$ is read from HBM to compute row-wise Softmax, writing $P$ back to HBM.
4. $P$ and $V$ are read from HBM to compute the final matrix product $O$.

For long contexts ($N = 8,192$), an $N \times N$ matrix requires **128 MB per head per layer**, causing catastrophic memory bandwidth thrashing!

```
Naive Attention:
  HBM ────────► Q, K ────────► Write S to HBM ────────► Read S ────────► Write P to HBM ────────► Read P, V ────────► O
  (O(N^2) memory reads/writes to slow HBM)

FlashAttention:
  HBM ────────► Small Tiles (Q_i, K_j, V_j) ───────► On-Chip SRAM (Compute Softmax Online) ───────► Output Tile O_i to HBM
  (Zero intermediate O(N^2) matrices written to HBM!)
```

### The Key Innovations of FlashAttention
1. **Tiling**: Divides inputs $Q, K, V$ into blocks that fit entirely within high-speed **on-chip SRAM** (100–256 KB per Streaming Multiprocessor).
2. **Online Softmax**: Computes row-wise Softmax incrementally without needing the complete row at once, keeping running normalization statistics ($m$ and $\ell$):
   $$m_{\text{new}} = \max(m_{\text{prev}}, x), \quad \ell_{\text{new}} = e^{m_{\text{prev}} - m_{\text{new}}} \ell_{\text{prev}} + e^{x - m_{\text{new}}}$$
3. **No Intermediate Storage**: The $O(N^2)$ attention map is **never materialized in HBM**, reducing HBM read/write traffic by 4x to 8x and cutting runtime by 2x to 4x.

---

## 2. PagedAttention: Virtual Memory for KV Caches

While FlashAttention optimizes the *math*, real-world serving runtimes faced a critical system challenge: **Dynamic sequence lengths**.

Before PagedAttention, frameworks allocated a contiguous memory buffer for each request sized to the maximum possible sequence length (e.g., 2,048 tokens):

```
Traditional Contiguous Allocation:
Request 1 (Actual: 500 tokens):  [██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░] ◄── 75% Reserved Waste!
Request 2 (Actual: 180 tokens):  [████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] ◄── 91% Reserved Waste!
Request 3 (Actual: 1,900 tokens): [████████████████████████████████░░░░]
```

### Types of Waste in Contiguous Memory:
1. **Reserved Memory Waste**: Reserving slots for tokens that have not yet been generated.
2. **Internal Fragmentation**: Allocating blocks larger than required.
3. **External Fragmentation**: Gaps between different request allocations that cannot fit a new contiguous sequence.

**Result**: Systems lost **60% to 80% of available GPU memory**, capping concurrent request capacity.

---

## 3. The PagedAttention Architecture

Inspired by operating system virtual memory with page tables, **PagedAttention** (Kwon et al., vLLM) partitions the KV cache of each sequence into fixed-size **blocks** (typically 16 or 32 tokens):

```
Logical KV Cache (Request A):
  Tokens 0-15      Tokens 16-31     Tokens 32-47
  [ Block 0 ]  ──► [ Block 1 ]  ──► [ Block 2 ]
       │                │                │
       ▼                ▼                ▼
  ┌────────────┐   ┌────────────┐   ┌────────────┐
  │ Physical 7 │   │ Physical 3 │   │ Physical 9 │   ◄── Non-contiguous physical HBM blocks!
  └────────────┘   └────────────┘   └────────────┘
```

### Breakthrough Features of PagedAttention:
- **Near-Zero Memory Waste**: Physical blocks are allocated on-demand as new tokens are emitted. Memory waste is confined strictly to the tail of the final incomplete block ($<4\%$).
- **Parallel Sampling / Beam Search**: Multiple candidate responses share identical prompt prefix blocks via **Copy-on-Write (CoW)**:
  ```
  Prompt Prefix (Tokens 0-15):  Physical Block #4  (Ref Count = 2)
                                 ▲              ▲
               Branch 1 ─────────┘              └───────── Branch 2
          Physical Block #12                          Physical Block #19
  ```
- **Shared System Prompts**: Multi-turn agents sharing a 1,000-token system prompt reuse the exact same physical blocks across thousands of users simultaneously.

---

## 4. Architectural Comparison Summary

| Feature | FlashAttention | PagedAttention |
| :--- | :--- | :--- |
| **Primary Level** | CUDA Kernel / Tile Arithmetic | Serving Engine / Memory Allocator |
| **Bottleneck Addressed** | HBM $\leftrightarrow$ SRAM memory bandwidth | GPU memory fragmentation & allocation waste |
| **Data Structures** | SRAM matrix tiles & online accumulators | Block Tables, Logical $\to$ Physical Mappings |
| **Key Advantage** | 2-4x faster attention computation | 2-4x higher concurrent batch capacity |
| **Prefix Sharing** | Not applicable | Native Copy-on-Write (CoW) |
| **Where It Lives** | `flash-attn`, Triton kernels | vLLM, TensorRT-LLM, SGLang |
