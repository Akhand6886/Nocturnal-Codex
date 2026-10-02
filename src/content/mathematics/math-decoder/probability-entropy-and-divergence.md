---
title: "Information Theory & Divergences"
slug: "probability-entropy-and-divergence"
description: "Shannon entropy, categorical cross-entropy from unnormalized logits, Kullback-Leibler (KL) divergence, and minimum entropy floors."
---

# Information Theory & Divergences

Modern machine learning models are probabilistic systems. Language models predict next-token probability distributions, diffusion models estimate noise distributions, and reinforcement learning agents optimize policy action distributions.

The mathematical language used to evaluate, compare, and steer these distributions comes directly from **Information Theory** (Shannon, 1948).

---

## 1. Shannon Entropy: Quantifying Uncertainty

The **Entropy** $H(P)$ of a discrete probability distribution $P$ measures the average amount of surprise or information conveyed by an event drawn from $P$:

$$H(P) = - \sum_{x \in \mathcal{X}} P(x) \log_2 P(x) = \mathbb{E}_{x \sim P}\left[ \log_2 \frac{1}{P(x)} \right]$$

```
High Entropy (Maximum Uncertainty):           Low Entropy (Deterministic Certainty):
Distribution: Uniform across 4 classes       Distribution: Highly peaked on class 1
P = [ 0.25, 0.25, 0.25, 0.25 ]               P = [ 0.97, 0.01, 0.01, 0.01 ]
H(P) = - 4 * (0.25 * log2(0.25)) = 2.0 bits   H(P) \approx 0.24 bits
```

### Key Intuitions:
- If an outcome is guaranteed ($P(x) = 1$), observing it reveals zero new information ($H = 0$).
- For a discrete distribution with $C$ possible categories, entropy is maximized when the distribution is **Uniform**:
  $$H_{\max} = \ln C$$
  This uniform ceiling is critical for diagnosing loss values during LLM pretraining.

---

## 2. Categorical Cross-Entropy from Logits

In classification and autoregressive language modeling, the training loss is **Categorical Cross-Entropy (CCE)**. 

Given:
- Ground-truth target distribution $P$ (one-hot vector for the correct token $y^*$, where $P(y^*) = 1$ and $P(y) = 0$ for $y \ne y^*$).
- Model output logits vector $z \in \mathbb{R}^C$.
- Predicted probability distribution $Q = \text{Softmax}(z)$:
  $$Q(y) = \frac{e^{z_y}}{\sum_{j=1}^C e^{z_j}}$$

The cross-entropy loss is:

$$\mathcal{L}_{\text{CCE}}(P, Q) = - \sum_{y=1}^C P(y) \ln Q(y) = - \ln Q(y^*)$$

Expanding the Softmax:

$$\mathcal{L}_{\text{CCE}} = - \ln \left( \frac{e^{z_{y^*}}}{\sum_j e^{z_j}} \right) = - z_{y^*} + \ln \left( \sum_{j=1}^C e^{z_j} \right)$$

### The Log-Sum-Exp Trick for Numerical Stability
In naive code, computing $\sum e^{z_j}$ overflows float32 when any logit $z_j > 88$. Modern runtimes stabilize this by subtracting the maximum logit $z_{\max} = \max_j z_j$:

$$\ln \left( \sum_j e^{z_j} \right) = z_{\max} + \ln \left( \sum_j e^{z_j - z_{\max}} \right)$$

This mathematical identity guarantees that the largest exponentiated term is $e^0 = 1$, completely eliminating floating-point overflow!

---

## 3. What is a "Good" Loss Value? (The Baseline Floor)

When an engineer starts training a 7B parameter language model on a vocabulary of $V = 32,000$ tokens:

### At Initialization (Step 0):
The model has random weights, assigning roughly equal probability to all $V$ tokens:
$$\mathcal{L}_{\text{initial}} \approx \ln(V) = \ln(32,000) \approx \mathbf{10.37}$$
If your training run starts at a loss far higher than $10.4$, initialization is broken.

### After Convergence on Web Text:
Well-trained foundation models achieve a cross-entropy loss between **1.8 and 2.3** nats per token on general English benchmarks.
Converting nats to **Perplexity (PPL)**:
$$\text{PPL} = \exp(\mathcal{L}) = e^{2.0} \approx \mathbf{7.38}$$
This means that on average, the trained model is as confident as if it were choosing between roughly 7 equally likely next tokens!

---

## 4. Kullback-Leibler (KL) Divergence

The **KL Divergence** $D_{\text{KL}}(P \parallel Q)$ measures the statistical distance (relative entropy) from a reference distribution $P$ to a candidate distribution $Q$:

$$D_{\text{KL}}(P \parallel Q) = \sum_{x \in \mathcal{X}} P(x) \ln \frac{P(x)}{Q(x)} = \mathbb{E}_{x \sim P}\left[ \ln \frac{P(x)}{Q(x)} \right]$$

### Fundamental Properties:
1. **Non-negativity (Gibbs' Inequality)**: $D_{\text{KL}}(P \parallel Q) \ge 0$, with equality if and only if $P \equiv Q$.
2. **Asymmetry**: $D_{\text{KL}}(P \parallel Q) \ne D_{\text{KL}}(Q \parallel P)$. It is not a true metric distance!
   - **Forward KL ($D_{\text{KL}}(P \parallel Q)$)**: "Zero-avoiding" (mode-covering). Forces $Q$ to spread its mass everywhere $P > 0$.
   - **Reverse KL ($D_{\text{KL}}(Q \parallel P)$)**: "Zero-forcing" (mode-seeking). Used in variational inference and knowledge distillation, encouraging $Q$ to fit tightly on the highest-probability modes of $P$.

### KL Divergence in RLHF & Alignment
In Reinforcement Learning from Human Feedback (RLHF), an LLM policy $\pi_\theta$ is fine-tuned to maximize rewards while being penalized for drifting too far from the base pretrained reference policy $\pi_{\text{ref}}$:

$$\max_\theta \mathbb{E}_{x, y}\Big[ R(x, y) - \beta \, D_{\text{KL}}\big(\pi_\theta(y \mid x) \parallel \pi_{\text{ref}}(y \mid x)\big) \Big]$$

This KL penalty acts as a mathematical leash, preventing the model from degenerating into repetitive reward-hacking patterns.
