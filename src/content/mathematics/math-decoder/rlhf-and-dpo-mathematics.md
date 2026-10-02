---
title: "RLHF & DPO: Preference Models & Implicit Rewards"
slug: "rlhf-and-dpo-mathematics"
description: "Deriving the Bradley-Terry preference model, PPO reward optimization with KL regularization, and the Direct Preference Optimization (DPO) closed-form solution."
---

# RLHF & DPO: Preference Models & Implicit Rewards

Large language models are pre-trained to minimize cross-entropy loss over web text: predicting the most statistically likely next token. However, "statistically likely" internet text includes falsehoods, toxic hallucinations, and unsafe instructions.

**Post-training alignment** bridges the gap between pre-training probability and human intent using preference learning.

---

## 1. The Bradley-Terry Preference Model

Given a prompt $x$ and two candidate responses $(y_w, y_l)$, human annotators label $y_w$ as the preferred ("winning") response and $y_l$ as the dispreferred ("losing") response.

The **Bradley-Terry (BT) Model** assumes that an underlying scalar reward function $r^*(x, y) \in \mathbb{R}$ governs human preferences:

$$P(y_w \succ y_l \mid x) = \sigma\big(r^*(x, y_w) - r^*(x, y_l)\big) = \frac{1}{1 + e^{-(r^*(x, y_w) - r^*(x, y_l))}}$$

Where $\sigma(z) = \frac{1}{1 + e^{-z}}$ is the logistic sigmoid function.

### Training the Reward Model ($r_\phi$):
We train a reward network $r_\phi$ by minimizing negative log-likelihood over a dataset of paired preferences $\mathcal{D} = \{(x, y_w, y_l)\}$:

$$\mathcal{L}_R(\phi) = - \mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}}\Big[ \log \sigma\big(r_\phi(x, y_w) - r_\phi(x, y_l)\big) \Big]$$

---

## 2. Standard RLHF with PPO

In standard RLHF (InstructGPT, PPO), the trained reward model $r_\phi$ provides environmental rewards to optimize the language model policy $\pi_\theta$:

$$\max_{\theta} \mathbb{E}_{x \sim \mathcal{D}, \, y \sim \pi_\theta}\Big[ r_\phi(x, y) \Big] - \beta \, D_{\text{KL}}\big(\pi_\theta(y \mid x) \parallel \pi_{\text{ref}}(y \mid x)\big)$$

### The Role of the KL Penalty ($\beta$):
- **Prevents Reward Hacking**: Without $\beta$, the policy exploits flaws in the reward model, generating repetitive nonsensical phrases that yield high score.
- **Preserves Base Linguistic Knowledge**: The policy stays close to the frozen reference model $\pi_{\text{ref}}$.

---

## 3. Direct Preference Optimization (DPO): Bypassing the Reward Model

While PPO is powerful, it is notoriously unstable: it requires keeping 4 separate large models in GPU memory simultaneously (Policy $\pi_\theta$, Reference $\pi_{\text{ref}}$, Critic $V_\psi$, and Reward $r_\phi$).

**Direct Preference Optimization (DPO)** (Rafailov et al., NeurIPS 2023) analytically proves that the reward model can be solved in closed form directly in terms of the optimal policy!

### The Closed-Form Reward Substitution:
Under the KL-constrained objective, the optimal policy $\pi^*$ satisfies:
$$\pi^*(y \mid x) = \frac{1}{Z(x)} \pi_{\text{ref}}(y \mid x) \exp\left( \frac{1}{\beta} r(x, y) \right)$$

Taking the logarithm and rearranging gives the **Implicit Reward**:

$$r(x, y) = \beta \log \frac{\pi^*(y \mid x)}{\pi_{\text{ref}}(y \mid x)} + \beta \log Z(x)$$

### The DPO Objective Equation:
Substituting this implicit reward expression directly into the Bradley-Terry preference likelihood eliminates both $r_\phi$ and the partition function $Z(x)$ completely:

$$\mathcal{L}_{\text{DPO}}(\theta; \, \pi_{\text{ref}}) = - \mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w \mid x)}{\pi_{\text{ref}}(y_w \mid x)} - \beta \log \frac{\pi_\theta(y_l \mid x)}{\pi_{\text{ref}}(y_l \mid x)} \right) \right]$$

```
PPO Architecture (Complex):
  Prompt ──► Policy $\pi_\theta$ ──► Generated Output ──► Reward Model $r_\phi$ ──► Value Critic $V_\psi$ ──► PPO Gradient

DPO Architecture (Simple & Stable):
  (x, y_w, y_l) ──► Compute Log Probabilities under $\pi_\theta$ and $\pi_{\text{ref}}$ ──► Direct Cross-Entropy Style Loss!
```

### The Gradient Intuition of DPO:
$$\nabla_\theta \mathcal{L}_{\text{DPO}} = - \beta \, \sigma(\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w)) \cdot \Big[ \nabla_\theta \log \pi_\theta(y_w \mid x) - \nabla_\theta \log \pi_\theta(y_l \mid x) \Big]$$
- Increases the probability of the preferred response $y_w$.
- Decreases the probability of the dispreferred response $y_l$.
- Weights the gradient by how incorrectly the model currently ranks the pair!
