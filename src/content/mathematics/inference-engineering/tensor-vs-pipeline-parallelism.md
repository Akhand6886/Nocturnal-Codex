---
title: "Distributed Inference: Tensor, Pipeline & Ring Attention Parallelism"
slug: "tensor-vs-pipeline-parallelism"
description: "Choosing between Tensor Parallelism, Pipeline Parallelism, and Sequence Parallelism based on interconnect bandwidth, bubble overhead, and context length."
---

# Distributed Inference: Tensor, Pipeline & Ring Attention Parallelism

When an LLM exceeds the memory capacity of a single GPU, the model must be partitioned across multiple accelerators. Choosing the appropriate distributed parallelism strategy depends on interconnect topology, latency constraints, and context length.

---

## 1. Tensor Parallelism (TP): Megatron-LM Style

**Tensor Parallelism (TP)** splits individual weight matrices within each transformer layer across $N$ GPUs. It operates synchronously at every layer:

```
Column-Parallel Linear (Feed-Forward First Layer):
Input X ─────┬─────► GPU 0: Computes X * W_1,1 ─────┐
             └─────► GPU 1: Computes X * W_1,2 ─────┴──► Output: Concatenated [ Y_1, Y_2 ]

Row-Parallel Linear (Feed-Forward Second Layer):
[ Y_1, Y_2 ] ──► GPU 0: Computes Y_1 * W_2,1 ──┐
             ──► GPU 1: Computes Y_2 * W_2,2 ──┴──► All-Reduce (Sum) ──► Final Layer Output Y
```

### The Communication Contract:
- In each transformer block, TP requires **two All-Reduce collective operations**:
  1. One after the Multi-Head Attention output projection.
  2. One after the Feed-Forward output projection.
- **Communication Volume per Step**:
  $$\text{Bytes} = 2 \times \left(\frac{N - 1}{N}\right) \times 2 \cdot B \cdot S \cdot d_{\text{model}} \quad (\text{per layer})$$
- **Where to Use TP**: Strictly within a **single physical node** connected by high-bandwidth NVLink ($900\text{+} \text{ GB/s}$). Running TP across multi-node Ethernet or InfiniBand introduces devastating communication latency.

---

## 2. Pipeline Parallelism (PP): Inter-Layer Partitioning

**Pipeline Parallelism (PP)** partitions complete transformer layers sequentially across GPUs:
- GPU 0 holds Layers 1–20.
- GPU 1 holds Layers 21–40.
- GPU 2 holds Layers 41–60.
- GPU 3 holds Layers 61–80.

```
Request Flow:
User Prompt ──► [ GPU 0 (Layers 1-20) ] ──► [ GPU 1 (Layers 21-40) ] ──► [ GPU 2 (Layers 41-60) ] ──► Token Output
```

### The Communication Contract:
- GPUs communicate only point-to-point (P2P) along the pipeline boundary: GPU $i$ sends its final activation vector to GPU $i+1$.
- **Communication Volume**: Low. Transfers only the activation tensor of size $B \times S \times d_{\text{model}}$ at stage boundaries.
- **Interconnect Friendly**: Can run efficiently across standard multi-node networks (InfiniBand or 100 GbE).

### The Pipeline Bubble Problem:
In naive scheduling, when GPU 0 is evaluating, GPUs 1, 2, and 3 are completely idle. The fraction of idle time is called the **Pipeline Bubble**:

$$\text{Bubble Fraction} = \frac{p - 1}{m + p - 1}$$

Where $p$ is the pipeline depth and $m$ is the number of microbatches. In high-concurrency continuous serving, inter-leaving microbatches (1F1B schedule) fills the pipeline and minimizes bubble waste.

---

## 3. Sequence Parallelism & RingAttention for Extreme Contexts

What happens when a single request has an ultra-long context ($S = 1,000,000$ tokens) that cannot fit into the memory of a single GPU even with Tensor Parallelism?

**RingAttention** (Liu et al., 2023) implements **Sequence Parallelism**:
- The prompt sequence of length $S$ is sliced into chunks of length $S / N$ across $N$ GPUs.
- Each GPU keeps its local Query chunk stationary in memory.
- Key and Value blocks circulate in a **ring topology** from GPU to GPU:

```
Step 1: GPU i computes Attention(Q_i, K_i, V_i) locally.
Step 2: While computing, GPU i transmits (K_i, V_i) to GPU (i+1) and receives (K_{i-1}, V_{i-1}).
Step 3: GPU i computes Attention(Q_i, K_{i-1}, V_{i-1}) and updates online softmax statistics.
```

By overlapping compute with asynchronous P2P ring communication, RingAttention allows context windows to scale **linearly with cluster size to millions of tokens** without ever assembling the full attention matrix on any single device!

---

## 4. Parallelism Selection Matrix

| Model Size / Architecture | Recommended Distributed Topology | Typical Hardware |
| :--- | :--- | :--- |
| **7B – 14B Models** | $TP = 1$ (Single GPU) | 1x A100 / H100 / RTX 4090 |
| **70B Models (BF16)** | $TP = 4$ or $TP = 8$ (Single Node) | 4x or 8x 80 GB GPUs with NVLink |
| **405B Models (Llama-3)** | $TP = 8, \, PP = 8$ (Multi-Node 3D) | 64x H100 connected via NVLink + InfiniBand |
| **Long Context ($>256\text{K}$)** | $TP = 4\text{–}8$ + Sequence Parallelism (RingAttention) | InfiniBand cluster with RDMA |
