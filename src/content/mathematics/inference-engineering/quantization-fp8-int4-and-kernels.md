---
title: "Model & KV-Cache Quantization: FP8, INT4 & NVFP4"
slug: "quantization-fp8-int4-and-kernels"
description: "A comprehensive guide to weight-only vs weight-activation quantization, calibration scales, and hardware kernel execution across FP8, INT8, AWQ, and NVFP4."
---

# Model & KV-Cache Quantization: FP8, INT4 & NVFP4

Quantization compresses model weights and runtime activations from standard 16-bit floating-point formats (FP16/BF16) into lower-bit integer or floating-point representations (FP8, INT8, INT4, NVFP4).

In LLM inference, quantization delivers two transformative benefits:
1. **Halves or quarters memory footprint**, allowing large models (e.g., 70B parameters) to fit onto fewer GPUs.
2. **Multiplies effective memory bandwidth**, accelerating the memory-bound decode phase by up to 2x–3x.

---

## 1. The Landscape of Modern Precision Formats

```
 16-bit BF16:  [ Sign: 1 ] [ Exponent: 8 ] [ Mantissa: 7 ]  ◄── Large dynamic range, matches FP32 exponent
 16-bit FP16:  [ Sign: 1 ] [ Exponent: 5 ] [ Mantissa: 10 ] ◄── Higher precision, smaller dynamic range

  8-bit FP8 (E4M3): [ Sign: 1 ] [ Exponent: 4 ] [ Mantissa: 3 ] ◄── Preferred for forward pass & weights
  8-bit FP8 (E5M2): [ Sign: 1 ] [ Exponent: 5 ] [ Mantissa: 2 ] ◄── Matches FP16 range, better for gradients/loss

  4-bit NVFP4: Microscaled floating point on Blackwell architectures with block-level scaling.
  4-bit INT4:  Uniform integer quantization (-8 to +7 or 0 to 15) with learned scales and zero points.
```

### Format Trade-offs Matrix

| Precision Format | Bits per Weight | Memory vs BF16 | Hardware Requirement | Quality Retention |
| :--- | :--- | :--- | :--- | :--- |
| **BF16 / FP16** | 16 | 1.0x (Baseline) | Universal (Pascal+) | 100% (Lossless reference) |
| **FP8 (E4M3)** | 8 | **0.50x (50% reduction)** | NVIDIA Ada (RTX 4090) / Hopper (H100) / Blackwell | $>99.8\%$ perplexity parity |
| **INT8 (SmoothQuant)**| 8 | **0.50x** | Universal Tensor Cores | $>99.5\%$ with outlier migration |
| **INT4 (AWQ / GPTQ)** | 4 | **0.25x (75% reduction)** | Universal (Requires dequant kernel) | $>98.5\%$ on models $>13\text{B}$ |
| **NVFP4** | 4 | **0.25x** | NVIDIA Blackwell (B200) Native | High accuracy via microscaling |

---

## 2. Weight-Only vs. Weight-Activation (W8A8 / W4A16) Quantization

Not all quantization methods operate on the same tensors during inference:

### A. Weight-Only Quantization (e.g., W4A16 with AWQ)
- **Weights** are stored in 4-bit memory ($W \in \text{INT4}$).
- When loaded from HBM into on-chip SRAM/registers, a fast CUDA kernel dequantizes weights back into 16-bit float ($W \to \text{FP16}$).
- Arithmetic is executed using standard 16-bit Tensor Cores.
- **Advantage**: Saves 75% HBM weight footprint and speeds up decode bandwidth. Works on all GPU generations.
- **Drawback**: In the compute-bound prefill phase, dequantization introduces compute overhead without increasing arithmetic FLOP ceilings.

### B. Weight-Activation Quantization (W8A8 / FP8)
- Both **Weights** and **Activations** are converted to 8-bit.
- Arithmetic is executed directly using dedicated **FP8 or INT8 Tensor Cores**, which operate at **2x the arithmetic throughput** of FP16 cores!
- **Advantage**: Speeds up both the memory-bound decode phase AND the compute-bound prefill phase.

---

## 3. The Math of Affine Quantization

Uniform linear quantization maps a continuous floating-point range $[x_{\min}, x_{\max}]$ into a discrete integer range $[q_{\min}, q_{\max}]$:

$$q = \text{clamp}\left( \left\lfloor \frac{x}{s} \right\rceil + z, \, q_{\min}, \, q_{\max} \right)$$

Where:
- $s$: **Scale Factor** (scalar float):
  $$s = \frac{x_{\max} - x_{\min}}{q_{\max} - q_{\min}}$$
- $z$: **Zero Point** (integer shift ensuring real zero maps to an exact integer):
  $$z = \left\lfloor - \frac{x_{\min}}{s} \right\rceil + q_{\min}$$
- $\lfloor \cdot \rceil$: Round to nearest integer.

### Dequantization (Reconstructing Float Approximation):
$$\hat{x} = s \cdot (q - z)$$

---

## 4. Activation Outliers & Activation-Aware Weight Quantization (AWQ)

In large models ($>6.7\text{B}$ parameters), a critical phenomenon emerges: **Emergent Activation Outliers**. A tiny fraction ($<0.1\%$) of activation channels develop massive values (up to 100x average magnitude).

If naive per-tensor quantization is applied, the scale factor $s$ must expand to accommodate these massive outliers, collapsing the resolution of the remaining 99.9% of normal weights into zero!

### The AWQ Solution (Lin et al., MLSys 2024)
Instead of protecting weights with large weight magnitudes, **Activation-Aware Weight Quantization (AWQ)** identifies the weights that correspond to large *activation channels*:
1. Observe activation magnitude distributions across calibration samples.
2. Protect the top 1% salient weight channels by scaling them up before quantization or keeping them in FP16.
3. This preserves model reasoning, zero-shot benchmarks, and perplexity even at aggressive 4-bit compression.
