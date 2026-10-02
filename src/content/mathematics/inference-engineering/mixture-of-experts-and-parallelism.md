---
title: "Mixture of Experts & Parallelism"
slug: "mixture-of-experts-and-parallelism"
description: "Top-k gating, router z-loss, expert capacity limits, load balancing auxiliary loss, and Expert Parallelism (EPLB) vs Tensor Parallelism."
---

# Mixture of Experts & Parallelism

As language models scale beyond hundreds of billions of parameters, standard dense architectures require exorbitant compute per token. **Mixture of Experts (MoE)** decouples total parameter capacity from per-token computation by replacing dense Feed-Forward Networks (FFN) with a bank of specialized, sparsely activated sub-networks ("experts").

State-of-the-art models like **Mixtral 8x7B**, **Mixtral 8x22B**, and **DeepSeek-V3** leverage MoE to deliver the reasoning power of dense models while consuming a fraction of the active FLOPs.

---

## 1. Top-$k$ Routing Mechanics

In an MoE layer containing $E$ independent expert networks $\{E_1, E_2, \dots, E_E\}$, a learned gating network (router) directs token representation $x \in \mathbb{R}^d$ to the top $k$ most relevant experts (typically $k=2$ or $k=8$):

```
Token Input x
      │
      ├───────────────────────────────┐
      ▼                               ▼
  [ Router W_g ]              [ Pass to Selected Experts ]
  Compute logits: H(x) = W_g x        │
      ▼                               │
  Top-k Softmax:                      │
  P(x) = Softmax(TopK(H(x), k))       ▼
      │                     ┌──────────────────┐
      └────────────────────►│ Combine:         │──► Output y = \sum_{i \in TopK} P_i(x) E_i(x)
                            │ \sum P_i E_i(x)  │
                            └──────────────────┘
```

The mathematical equation for token output $y$ is:

$$y = \sum_{i \in \text{Top-}k} \text{Softmax}(W_g x)_i \cdot E_i(x)$$

---

## 2. Load Balancing & The Auxiliary Loss

Without intervention, routing networks naturally degenerate: a small subset of "favorite" experts receive all tokens, while other experts starve. This creates a severe hardware crisis:
- The overloaded GPU memory and compute units become a straggler bottleneck.
- The underloaded GPUs sit idle.

To enforce balanced utilization during training, engines introduce a **Load Balancing Auxiliary Loss** $\mathcal{L}_{\text{aux}}$:

$$\mathcal{L}_{\text{aux}} = \alpha \cdot E \sum_{i=1}^E f_i \cdot P_i$$

Where:
- $f_i$: The fraction of tokens in the batch dispatched to expert $i$:
  $$f_i = \frac{1}{T} \sum_{t=1}^T \mathbb{I}(\text{token } t \text{ routes to expert } i)$$
- $P_i$: The average probability assigned to expert $i$ across all tokens:
  $$P_i = \frac{1}{T} \sum_{t=1}^T \text{Softmax}(W_g x_t)_i$$
- $\alpha$: Hyperparameter weighting the penalty (typically $0.01$).

Minimizing this auxiliary loss penalizes correlation between routing assignments and probability weights, encouraging uniform token dispersion across all $E$ available experts.

---

## 3. Router $z$-Loss for Numerical Stability

In large-scale MoE training, router logits $H(x) = W_g x$ tend to drift towards large magnitudes, leading to floating-point overflow during Softmax and numerical instability in gradient backpropagation.

The **Router $z$-Loss** penalizes extreme logit magnitudes directly:

$$\mathcal{L}_z = \frac{c_z}{T} \sum_{t=1}^T \left( \ln \sum_{i=1}^E \exp(h_{t, i}) \right)^2$$

By pulling the log-partition function towards zero, router $z$-loss stabilizes FP16/BF16 training without restricting the router's ability to specialize.

---

## 4. Serving MoE: Expert Parallelism (EP) vs. Tensor Parallelism (TP)

When serving a model like DeepSeek-V3 (671B total parameters, 37B active parameters, 256 routed experts), no single GPU can hold all expert weights in HBM.

### A. Tensor Parallelism (TP)
- Splits every individual expert matrix across all GPUs.
- Requires **All-Reduce** communication collectives at every layer.
- Works well within a single node connected by ultra-fast NVLink (900 GB/s), but saturates slower inter-node InfiniBand networks.

### B. Expert Parallelism (EP)
- Assigns distinct, complete experts to different GPUs (e.g., GPU 0 hosts Experts 1–32; GPU 1 hosts Experts 33–64).
- Requires an **All-to-All** communication collective where tokens are dispatched across the network to the GPU hosting their chosen expert, and outputs are gathered back.

```
Token Dispatch via All-to-All:
GPU 0 (Tokens for E_1, E_4) ───────► Sends E_4 token to GPU 1
GPU 1 (Tokens for E_2, E_3) ───────► Sends E_2 token to GPU 0
```

### C. Expert Parallelism Load Balancing (EPLB)
In real-world serving, token arrival is dynamic and non-uniform: a viral coding prompt might direct 80% of tokens to a Python-specialized expert. 

**EPLB (Expert Parallelism Load Balancing)** detects hot experts dynamically and replicates their weights across multiple GPUs, dynamically dividing the token load and eliminating serving stragglers.
