---
title: "LLM Inference Engineering"
slug: "inference-engineering"
description: "Master the systems mechanics, memory hierarchies, and algorithmic optimizations powering production-grade large language model inference runtimes."
iconName: "cpu"
topics:
  - section: "Part I: Hardware, Quantization & Memory Ceilings"
    description: "Physical GPU bounds, memory bandwidth, arithmetic intensity, and precision reduction."
    items:
      - title: "The Roofline Model for AI Inference"
        description: "Operational intensity, peak FLOP/s, sustainable bandwidth, the ridge point, and why prefill and decode occupy opposite regimes."
        slug: "roofline-model-for-ai-inference"
      - title: "KV-Cache Mechanics & Memory Formulas"
        description: "Deriving exact KV-cache tensor bytes, MHA vs GQA vs MQA architectures, FP8 quantization, and GPU capacity planning."
        slug: "kv-cache-mechanics-and-formulas"
      - title: "Quantization: FP8, INT4 & NVFP4"
        description: "Weight-only vs weight-activation quantization, calibration scales, and hardware kernel execution across FP8, INT8, AWQ, and NVFP4."
        slug: "quantization-fp8-int4-and-kernels"
  - section: "Part II: Kernel & Serving Architecture"
    description: "How modern inference engines overcome hardware bottlenecks through algorithmic memory management."
    items:
      - title: "FlashAttention vs PagedAttention"
        description: "SRAM IO-aware attention tiling vs virtual memory paging for KV caches, eliminating fragmentation and enabling zero-copy sharing."
        slug: "flashattention-vs-pagedattention"
      - title: "Continuous Batching & Iteration Scheduling"
        description: "Moving from static request batches to iteration-level scheduling (Orca), prompt prefill chunking, and preemption budgets."
        slug: "continuous-batching-and-scheduling"
      - title: "Disaggregated Prefill & Decode Architecture"
        description: "Decoupling compute-bound prompt evaluation from bandwidth-bound token generation into dedicated accelerator pools (DistServe & Splitwise)."
        slug: "disaggregated-prefill-and-decode"
  - section: "Part III: Distributed Serving & Parallelism"
    description: "Multi-device scaling, speculative generation, and sparse mixture-of-experts architectures."
    items:
      - title: "Speculative Decoding & Parallel Verification"
        description: "Draft model generation, target verification, rejection sampling distribution preservation, and wall-clock speedup bounds."
        slug: "speculative-decoding-and-verification"
      - title: "Mixture of Experts & Parallelism"
        description: "Top-k token routing, router z-loss, expert capacity limits, load balancing auxiliary loss, and Expert Parallelism (EPLB) vs Tensor Parallelism."
        slug: "mixture-of-experts-and-parallelism"
      - title: "Tensor, Pipeline & Ring Attention Parallelism"
        description: "Choosing between Tensor Parallelism, Pipeline Parallelism, and Sequence Parallelism based on interconnect bandwidth and context length."
        slug: "tensor-vs-pipeline-parallelism"
  - section: "Part IV: Production Benchmarking & SLOs"
    description: "Monitoring, measuring, and scaling high-availability inference clusters."
    items:
      - title: "Serving Metrics: Goodput, SLOs & Tail Latency"
        description: "Deconstructing TTFT, ITL, Goodput vs Throughput, SLO attainment fractions, and tail latency variance in production LLM systems."
        slug: "serving-metrics-goodput-and-slos"
---

# LLM Inference Engineering

Inference engineering is the discipline of maximizing throughput, minimizing Time-to-First-Token (TTFT) and Inter-Token Latency (ITL), and fitting massive autoregressive transformer models into distributed accelerator memory.

While model training focuses on gradient descent, loss convergence, and data pipelines, inference operates under strict physical hardware constraints: memory bandwidth, SRAM capacity, interconnect latency, and KV-cache expansion.

---

## The Physical GPU Memory Hierarchy

Modern LLM serving engines like vLLM, TensorRT-LLM, and TGI succeed by orchestrating data movement across memory tiers:

```
┌────────────────────────────────────────────────────────────────────────┐
│ GPU Streaming Multiprocessors (SMs) / Tensor Cores                    │
│ Peak Compute: 300 - 2000 TFLOP/s (FP16/BF16/FP8)                      │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │ On-Chip SRAM / L1 & Shared Memory Cache                      │     │
│   │ Bandwidth: ~15 - 20 TB/s | Size: ~100 - 250 KB per SM        │     │
│   │ (Where FlashAttention keeps intermediate Softmax matrices)   │     │
│   └──────────────────────────────▲───────────────────────────────┘     │
└──────────────────────────────────┼─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ High Bandwidth Memory (HBM3 / HBM3e)                                   │
│ Bandwidth: 2.0 - 5.3 TB/s | Capacity: 80 - 192 GB                      │
│ Stores: Model Weights, Paged KV-Cache, Activation Buffers              │
└──────────────────────────────────▲─────────────────────────────────────┘
                                   │ PCIe Gen 5 / NVLink (900 GB/s)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Host System Memory (CPU RAM) & NVMe Tiered Offload                     │
│ Bandwidth: ~50 - 200 GB/s | Capacity: 512 GB - 2 TB                    │
│ Stores: Cold KV Prefixes, Swapped Request Buffers                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Core Pillars of Inference Optimization

1. **The Two Serving Regimes**:
   - **Prefill (Prompt Processing)**: Highly compute-bound. Processes $N$ prompt tokens in parallel via dense matrix multiplications ($GEMM$).
   - **Decode (Token Generation)**: Highly memory-bandwidth bound. Generates one token at a time via vector-matrix multiplications ($GEMV$), requiring weights and KV cache to cross from HBM to compute cores for every single token.

2. **KV-Cache Memory Management**:
   - Without paging, dynamic sequence lengths lead to 60-80% memory waste due to internal and external fragmentation.
   - PagedAttention and chunked prefill transform KV caches into manageable virtual memory pages.

3. **High-Throughput Scheduling**:
   - Iteration-level scheduling allows newly arriving requests to join running batches without waiting for long sequences to finish.

Explore each detailed chapter in the curriculum above to master the complete mathematics, systems architecture, and engineering recipes of modern AI inference.
