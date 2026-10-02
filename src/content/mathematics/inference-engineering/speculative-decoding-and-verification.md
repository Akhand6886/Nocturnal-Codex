---
title: "Speculative Decoding & Parallel Verification"
slug: "speculative-decoding-and-verification"
description: "How draft models speculate future tokens, parallel target model verification, rejection sampling distribution guarantees, and latency speedup bounds."
---

# Speculative Decoding & Parallel Verification

Autoregressive language models generate tokens sequentially: emitting $K$ tokens requires $K$ sequential forward passes through all layers of the network. Because each decode pass is memory-bandwidth bound, generating long answers from a 70B parameter model can feel painfully sluggish.

**Speculative Decoding** (Leviathan et al., 2023; Chen et al., 2023) breaks this sequential bottleneck. By pairing a small, fast **Draft Model** (e.g., Llama-3-8B) with a large **Target Model** (e.g., Llama-3-70B), speculative decoding generates multiple tokens per target forward pass **without any degradation in output distribution or sample quality**.

---

## 1. The Core Speculative Workflow

```
Step 1: Fast Draft Model Speculates $\gamma$ Tokens Sequentially
  Prompt ────────► [ Draft Model (8B) ] ────────► Emits: [ w_1, w_2, w_3, w_4 ]
                   (Fast: ~5 ms per token)

Step 2: Large Target Model Verifies All $\gamma$ Tokens in Parallel!
  Input: Prompt + [ w_1, w_2, w_3, w_4 ]
         │
         ▼
  [ Target Model (70B) - Single Forward Pass! ]
  (Prefill-style parallel evaluation: ~40 ms total)
  Computes target probabilities: p(w_1), p(w_2), p(w_3), p(w_4), and candidate p(w_5)

Step 3: Modified Rejection Sampling
  Token 1: Accepted!
  Token 2: Accepted!
  Token 3: Rejected! ──► Rejection sampling emits corrected token w_3' from adjusted distribution.
  Tokens 4-5: Discarded.
  Net Result: Emitted 3 tokens in 1 target model step!
```

---

## 2. The Modified Rejection Sampling Invariant

A critical property of Speculative Decoding is that it is **mathematically lossless**: the final output sequence is drawn from the exact probability distribution $P(x)$ of the large target model.

Let:
- $q(x)$ be the probability assigned to token $x$ by the draft model.
- $p(x)$ be the probability assigned to token $x$ by the target model.

For each candidate token $x$ proposed by the draft model:
1. Sample a random uniform value $r \sim \text{Uniform}(0, 1)$.
2. If $r \le \min\left(1, \frac{p(x)}{q(x)}\right)$, **Accept** the token.
3. If rejected, stop speculation for this round, discard subsequent draft tokens, and sample the replacement token from the normalized residual distribution:
   $$P_{\text{corrected}}(x) = \frac{\max(0, p(x) - q(x))}{\sum_y \max(0, p(y) - q(y))}$$

### Proof of Distribution Preservation
The probability of accepting token $x$ is:
$$q(x) \times \min\left(1, \frac{p(x)}{q(x)}\right) = \min(q(x), p(x))$$
The probability of emitting token $x$ upon rejection is:
$$\left(1 - \sum_y \min(q(y), p(y))\right) \times \frac{\max(0, p(x) - q(x))}{\sum_y \max(0, p(y) - q(y))}$$
Using the algebraic identity $\sum_y \max(0, p(y) - q(y)) = 1 - \sum_y \min(q(y), p(y))$, the rejection probabilities cancel, leaving:
$$P_{\text{total}}(x) = \min(q(x), p(x)) + \max(0, p(x) - q(x)) \equiv p(x)$$

The emitted distribution is **identical to evaluating the large target model directly**!

---

## 3. Mathematical Speedup Bounds

Let:
- $\gamma$: Number of tokens drafted per step (typically 3 to 6).
- $\alpha$: **Acceptance Rate** (fraction of draft tokens accepted by the target model, typically 0.65 to 0.85).
- $t_{\text{draft}}$: Time required for the draft model to emit one token.
- $t_{\text{target}}$: Time required for the target model to verify a sequence of $\gamma$ tokens.

The expected number of accepted tokens per round is:
$$\mathbb{E}[\text{Accepted}] = \sum_{i=1}^\gamma \alpha^i + (1 - \alpha) \cdot 1 = \frac{1 - \alpha^{\gamma+1}}{1 - \alpha}$$

The theoretical wall-clock speedup ratio $S$ is:

$$S = \frac{\mathbb{E}[\text{Accepted}] \times t_{\text{target, single}}}{\gamma \cdot t_{\text{draft}} + t_{\text{target}}}$$

### When Does Speculative Decoding Win?
Speculative decoding provides substantial acceleration when:
1. **$t_{\text{draft}} \ll t_{\text{target}}$**: The draft model runs significantly faster than the target model (e.g., 8B vs. 70B, or utilizing Medusa/Eagle draft heads).
2. **High Acceptance Rate ($\alpha > 0.70$)**: The draft model's predictions align well with the target model, common in structured tasks, code completion, and natural conversational text.
3. **Small Concurrency**: At very high batch sizes, the target model's decode step becomes compute-saturated, reducing the margin of benefit.

In production environments, speculative decoding routinely yields **1.8x to 2.8x end-to-end wall-clock latency reductions** for interactive user sessions.
