---
title: "Disaggregated Prefill & Decode Architecture"
slug: "disaggregated-prefill-and-decode"
description: "Decoupling compute-bound prompt evaluation from bandwidth-bound token generation into dedicated accelerator pools (DistServe & Splitwise)."
---

# Disaggregated Prefill & Decode Architecture

In unified LLM serving architectures, both the **Prefill** (prompt processing) and **Decode** (token generation) phases execute on the same physical GPUs. As demonstrated by the Roofline Model, these two phases have diametrically opposing hardware demands:
- **Prefill** requires massive compute throughput (GEMM) and runs in dense bursts of hundreds of milliseconds.
- **Decode** requires immense memory bandwidth (GEMV) and must run in strict, low-latency iterations of 15–30 ms to preserve smooth streaming output.

When prefill and decode are co-located, long prompt evaluations hijack the GPU, creating high tail latency and jitter for active streaming users.

**Disaggregated Prefill and Decode** (introduced by systems like **Splitwise** and **DistServe**) solves this by physically separating serving into two distinct, dedicated clusters: a **Prefill Pool** and a **Decode Pool**.

---

## 1. The Disaggregated Architecture

```
               Incoming User Requests
                         │
                         ▼
        ┌──────────────────────────────────┐
        │  Global Request Router / Gateway │
        └────────────────┬─────────────────┘
                         │
                         ▼
       ┌────────────────────────────────────┐
       │         Prefill Pool               │
       │  (Optimized for Peak Compute)      │
       │  High TFLOP/s (e.g., 8x H100)      │
       │  - Processes prompt tokens in bulk │
       │  - Generates initial KV cache      │
       │  - Emits first token (TTFT)        │
       └─────────────────┬──────────────────┘
                         │
                         │ High-Speed Network KV-Cache Transfer
                         │ (RDMA / InfiniBand / PCIe Gen 5)
                         ▼
       ┌────────────────────────────────────┐
       │         Decode Pool                │
       │  (Optimized for Memory Bandwidth)  │
       │  High HBM Bandwidth / Memory Fit   │
       │  - Receives transferred KV cache   │
       │  - Executes continuous batching    │
       │  - Streams tokens at steady ITL    │
       └────────────────────────────────────┘
```

---

## 2. The KV-Cache Network Transfer Math

The primary engineering trade-off in disaggregation is **KV-cache migration latency**: the time required to transfer the prompt's key-value tensors across the network from the prefill worker to the decode worker.

Let:
- $S$: Prompt sequence length (tokens).
- $n_{\text{layers}}$: Transformer layers.
- $n_{\text{kv\_heads}}$: Key/value attention heads.
- $d_{\text{head}}$: Dimension per head.
- $P_{\text{bytes}}$: Bytes per element ($2$ for BF16, $1$ for FP8).
- $BW_{\text{net}}$: Effective network interconnect bandwidth (Bytes/s).

The total transfer size is:

$$\text{Bytes}_{\text{KV}} = 2 \times n_{\text{layers}} \times n_{\text{kv\_heads}} \times d_{\text{head}} \times S \times P_{\text{bytes}}$$

The network transmission time is:

$$t_{\text{transfer}} = \frac{\text{Bytes}_{\text{KV}}}{BW_{\text{net}}} + t_{\text{handshake}}$$

### Worked Example: Llama-3-70B over 400 Gbps InfiniBand (RDMA)
- Layers: $80$, $n_{\text{kv\_heads}} = 8$, $d_{\text{head}} = 128$.
- Bytes per token in BF16: $163.84 \text{ KB}$.
- Sequence length: $S = 4,000 \text{ tokens}$.
- Total KV Cache size:
  $$\text{Bytes}_{\text{KV}} = 4,000 \times 163,840 \text{ bytes} \approx \mathbf{655.36 \text{ MB}}$$

Over a single **400 Gbps InfiniBand** link ($BW_{\text{net}} \approx 45 \text{ GB/s}$ sustained):

$$t_{\text{transfer}} \approx \frac{655.36 \text{ MB}}{45,000 \text{ MB/s}} \approx \mathbf{14.5 \text{ ms}}$$

Because $14.5 \text{ ms}$ is less than a single decode iteration ($20\text{–}30 \text{ ms}$), the transfer is completely hidden behind the decode queue!

---

## 3. Benefits of Disaggregation

1. **Deterministic Inter-Token Latency (ITL)**:
   - Decode GPUs are never interrupted by incoming 8K-token prompts. Token streaming remains completely smooth and jitter-free.
2. **Heterogeneous Hardware Pairing**:
   - **Prefill nodes** can utilize compute-dense accelerators (such as NVIDIA H100 with FP8 Tensor Cores).
   - **Decode nodes** can utilize memory-dense or more cost-effective accelerators (such as L40S, A100, or high-capacity CPU RAM offload tiers).
3. **Independent Resource Autoscaling**:
   - Workloads with long prompts and short responses (summarization, document Q&A) scale the prefill pool.
   - Workloads with short prompts and massive code generation (agents, reasoning models) scale the decode pool.

---

## 4. Disaggregation vs. Chunked Prefill: When to Use Which?

| Architectural Criterion | Chunked Prefill (Co-located) | Disaggregated Prefill & Decode |
| :--- | :--- | :--- |
| **Cluster Complexity** | Low (Single homogeneous cluster) | Higher (Requires fast RDMA network & cross-node KV transfer) |
| **Interconnect Requirement** | Standard Ethernet / PCIe | High-speed InfiniBand / RoCE ($400\text{+} \text{ Gbps}$) |
| **Inter-Token Latency Jitter** | Slight increase (decode runs with prefill chunks) | Zero interference (decode runs in isolation) |
| **Best Workload** | General conversational chat & small teams | Large-scale enterprise APIs, coding agents & varying prompt lengths |
