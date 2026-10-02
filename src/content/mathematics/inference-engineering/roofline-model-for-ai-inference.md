---
title: "The Roofline Model for AI Inference"
slug: "roofline-model-for-ai-inference"
description: "Deconstructing operational intensity, memory bandwidth, compute ceilings, the ridge point, and the duality of prefill versus decode workloads."
---

# The Roofline Model for AI Inference

Peak FLOP per second is a hardware ceiling, not a performance guarantee. An inference kernel can leave over 90% of arithmetic tensor cores idle simply because execution is bottlenecked by the time required to stream weights, activations, and cache data across the memory bus.

The **Roofline Model** captures this relationship by mapping the work performed per byte transferred against two competing physical limits: the compute throughput ceiling and the memory bandwidth ceiling.

---

## 1. The Mathematical Formulation

Let:
- $P_{\text{peak}}$: Peak theoretical arithmetic throughput of the accelerator ($\text{FLOP/s}$).
- $BW$: Sustainable memory bandwidth across the target memory boundary ($\text{Bytes/s}$).
- $I$: **Operational Intensity** (also known as arithmetic intensity), measured in $\text{FLOP/Byte}$.

The attainable performance $P_{\text{attainable}}$ is strictly bounded by:

$$P_{\text{attainable}} = \min(P_{\text{peak}}, BW \times I)$$

```
 Attainable
 Performance
 (FLOP/s)
    ▲
    │                     Compute Roof: P_peak
    │                ┌─────────────────────────────────── (Compute-Bound)
    │               /
    │              /
    │             /
    │            / ◄── Sloped Roof: BW * I (Bandwidth-Bound)
    │           /
    │          /
    │         /
    │        /│
    │       / │
    └──────┴──┴──────────────────────────────────────────►
           0  I_ridge                                  Operational Intensity
                                                       (FLOP / Byte)
```

### Dimensional Analysis
Notice the units:
$$\text{Bytes/s} \times \frac{\text{FLOP}}{\text{Byte}} = \text{FLOP/s}$$

When $BW \times I$ is smaller than $P_{\text{peak}}$, the accelerator's compute units are starved for data. When $BW \times I$ exceeds $P_{\text{peak}}$, data arrives faster than arithmetic units can process it, capping throughput at $P_{\text{peak}}$.

---

## 2. The Ridge Point ($I_{\text{ridge}}$)

The **Ridge Point** defines the minimum operational intensity required to achieve maximum compute saturation:

$$I_{\text{ridge}} = \frac{P_{\text{peak}}}{BW}$$

### Hardware Comparison Table

| Accelerator | Precision | Peak Compute ($P_{\text{peak}}$) | Memory Bandwidth ($BW$) | Ridge Point ($I_{\text{ridge}}$) |
| :--- | :--- | :--- | :--- | :--- |
| **NVIDIA A100 (SXM4)** | BF16 Tensor | 312 TFLOP/s | 2,039 GB/s | **153.0 FLOP/Byte** |
| **NVIDIA H100 (SXM5)** | BF16 Tensor | 989 TFLOP/s | 3,350 GB/s | **295.2 FLOP/Byte** |
| **NVIDIA H100 (SXM5)** | FP8 Tensor | 1,978 TFLOP/s | 3,350 GB/s | **590.4 FLOP/Byte** |
| **Apple M3 Max** | FP16 Unified | ~28 TFLOP/s | 400 GB/s | **70.0 FLOP/Byte** |

> **Key Takeaway**: On an NVIDIA H100 in FP8 mode, an algorithm must execute nearly **600 floating-point operations for every single byte read from HBM** to fully saturate the GPU!

---

## 3. The Dual Nature of LLM Serving: Prefill vs. Decode

An LLM generation request consists of two fundamentally distinct computational phases that inhabit opposite sides of the Roofline ridge:

### A. The Prefill Phase (Prompt Evaluation)
- **Workload**: Processes all $S$ prompt tokens simultaneously.
- **Arithmetic**: Matrix-Matrix multiplication ($GEMM$).
- **Intensity**: High. Model weights $W \in \mathbb{R}^{d \times d}$ are loaded once from HBM and multiplied by all $S$ prompt tokens:
  $$I_{\text{prefill}} \approx \frac{2 \cdot S \cdot d^2}{2 \cdot d^2 + 2 \cdot S \cdot d} \approx S \quad (\text{for } S \ll d)$$
- **Regime**: **Compute-Bound** (Right of the ridge point for moderate-to-large prompts).
- **Optimization Strategy**: FlashAttention-2/3, Tensor Cores, FP8/FP4 GEMM kernels.

### B. The Decode Phase (Autoregressive Generation)
- **Workload**: Emits exactly one token at a time ($S=1$).
- **Arithmetic**: Vector-Matrix multiplication ($GEMV$).
- **Intensity**: Low. Every single parameter of the 70B model must be streamed from HBM into the chip to compute just one token vector:
  $$I_{\text{decode}} = \frac{2 \cdot 1 \cdot d^2}{2 \cdot d^2} \approx 1 \text{ FLOP/Byte}$$
- **Regime**: **Extremely Bandwidth-Bound** (Far to the left of the ridge point).
- **Optimization Strategy**: Increasing concurrency (continuous batching), KV-cache quantization (FP8/INT4), Grouped-Query Attention (GQA), speculative decoding.

---

## 4. Operational Intensity Worked Example

Suppose you serve a **Llama-3-70B** model in BF16 (140 GB parameter footprint) on a single server equipped with an NVIDIA H100 SXM5 ($BW = 3.35 \text{ TB/s}$).

### For a Single Batch ($B = 1$):
To generate one token, the GPU must transfer all 140 GB of model weights from HBM to register files:
$$\text{Time per token} \ge \frac{140 \times 10^9 \text{ Bytes}}{3.35 \times 10^{12} \text{ Bytes/s}} \approx 41.8 \text{ ms}$$
$$\text{Max Throughput} \le \frac{1}{0.0418} \approx 23.9 \text{ tokens/second}$$

Notice that during this time, the H100 performs:
$$\text{FLOPs} = 2 \times 70 \times 10^9 = 140 \text{ GFLOP}$$
$$\text{Effective Compute Rate} = \frac{140 \text{ GFLOP}}{0.0418 \text{ s}} \approx 3.35 \text{ TFLOP/s}$$

The GPU is utilizing just **0.34%** of its 989 TFLOP/s BF16 capability! The remaining 99.66% is idling, waiting for weights to travel over the memory bus.

### When Batch Size Increases ($B = 64$):
Now the 140 GB weights are shared across 64 parallel token generations:
$$\text{FLOPs} = 64 \times 140 \text{ GFLOP} = 8.96 \text{ TFLOP}$$
$$\text{Time per step} \approx 41.8 \text{ ms} + \text{KV cache overhead}$$
$$\text{Effective Throughput} \approx 64 \times 23.9 \approx 1,530 \text{ tokens/second}$$

Operational intensity scales linearly with batch size until the workload hits the compute roof ($I \ge I_{\text{ridge}}$).

---

## 5. Summary & Engineering Rules of Thumb

1. **Never judge an LLM serving engine by FLOP counts alone**: Latency in autoregressive generation is dominated by memory traffic.
2. **Batching increases intensity**: Larger batch sizes move your operating point to the right on the Roofline graph, transforming bandwidth waste into usable token throughput.
3. **Weight quantization (INT4/FP8) halves data transfer**: Cutting parameter precision by 50% directly doubles token speed in the decode phase when bandwidth-bound.
