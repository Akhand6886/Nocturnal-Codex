---
title: "Optimizer Equations & Update Rules"
slug: "optimization-and-updates"
description: "SGD with momentum, Adam bias-corrected moments, cosine annealing schedules, and PPO clipped surrogate objectives."
---

# Optimizer Equations & Update Rules

In machine learning, model learning is expressed as an optimization objective: find a set of parameter weights $\theta^* \in \mathbb{R}^D$ that minimizes an empirical loss function $\mathcal{L}(\theta)$.

Because analytical closed-form solutions do not exist for deep neural networks, models learn through iterative update equations driven by gradient descent.

---

## 1. Stochastic Gradient Descent (SGD) with Momentum

Standard gradient descent updates parameters strictly opposite to the local gradient:
$$\theta_{t+1} = \theta_t - \eta g_t, \quad \text{where } g_t = \nabla_\theta \mathcal{L}(\theta_t)$$

In ravine-like loss surfaces, naive SGD oscillates wildly across steep ravines while making minimal progress along the gentle downhill direction. 

**Polyak Momentum** resolves this by modeling parameters as a heavy ball rolling down a hill, accumulating velocity $v_t$:

$$v_t = \beta v_{t-1} + (1 - \beta) g_t$$
$$\theta_{t+1} = \theta_t - \eta v_t$$

Where:
- $\beta \in [0.9, 0.99]$: Momentum decay coefficient.
- $\eta$: Learning rate.

Persistent gradient directions reinforce each other, accelerating downhill descent while high-frequency oscillations cancel out.

---

## 2. Adam: Adaptive Moment Estimation

**Adam** (Kingma & Ba, 2014) is the undisputed workhorse optimizer of modern foundation models. It maintains two separate moving averages for each parameter:
1. $m_t$: The **First Moment** (exponential moving average of gradients, estimating the direction).
2. $v_t$: The **Second Moment** (exponential moving average of squared gradients, estimating variance/scale).

### The Adam Update Algorithm:

At step $t$:
$$g_t = \nabla_\theta \mathcal{L}(\theta_t)$$

$$m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t \quad (\text{Default } \beta_1 = 0.9)$$
$$v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2 \quad (\text{Default } \beta_2 = 0.999)$$

### Why Bias Correction Matters:
Because $m_0 = 0$ and $v_0 = 0$, both moments are severely biased towards zero during early training steps.
Adam divides by $(1 - \beta^t)$ to correct for this initialization deficit:

$$\hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t}$$

Notice that as $t \to \infty$, $\beta^t \to 0$, and the bias correction factor $(1 - \beta^t) \to 1$.

### The Parameter Update:
$$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$$

Where $\epsilon \approx 10^{-8}$ prevents division by zero.
- Frequently updated parameters with large, noisy gradients have large $\hat{v}_t$, scaling their step size down.
- Infrequent or subtle parameters with small gradients have small $\hat{v}_t$, boosting their relative step size.

---

## 3. Cosine Annealing Learning Rate Schedule

Training foundation models requires gradually lowering the learning rate $\eta$ as the model approaches optimal convergence:

```
Learning
Rate \eta
   ▲
   │        Warmup
   │       ┌──────┐
   │      ╱        ╲
   │     ╱          ╲
   │    ╱            ╲
   │   ╱              ╲___ Cosine Annealing Decay
   │  ╱                   ╲
   └─┴─────────────────────┴──────► Training Steps t
     0 t_warmup            T_max
```

The canonical **Cosine Annealing** formula is:

$$\eta_t = \eta_{\min} + \frac{1}{2} (\eta_{\max} - \eta_{\min}) \left( 1 + \cos\left( \frac{t - t_{\text{warmup}}}{T_{\max} - t_{\text{warmup}}} \pi \right) \right)$$

1. **Linear Warmup**: For $t < t_{\text{warmup}}$, $\eta$ scales linearly from $0 \to \eta_{\max}$ to stabilize early Adam second-moment estimates.
2. **Smooth Cosine Decay**: Smoothly transitions from aggressive exploratory updates to fine-grained feature refinement without abrupt step changes.

---

## 4. Proximal Policy Optimization (PPO) Clipped Loss

In RLHF alignment, the objective is to optimize policy $\pi_\theta$ to maximize expected rewards. However, taking too large of a gradient step can catastrophically destroy the language model's pre-trained conversational abilities.

**PPO** (Schulman et al., 2017) introduces a **Clipped Surrogate Objective** that restricts policy updates:

$$\mathcal{L}^{\text{CLIP}}(\theta) = \hat{\mathbb{E}}_t \left[ \min\Big( r_t(\theta) \hat{A}_t, \, \text{clip}(r_t(\theta), 1 - \epsilon, 1 + \epsilon) \hat{A}_t \Big) \right]$$

Where:
- $r_t(\theta) = \frac{\pi_\theta(a_t \mid s_t)}{\pi_{\theta_{\text{old}}}(a_t \mid s_t)}$: The **Probability Ratio** between the updated policy and the data-collecting old policy.
- $\hat{A}_t$: The **Advantage Estimate** (measuring how much better action $a_t$ was compared to average expectation).
- $\epsilon \approx 0.1 - 0.2$: The clipping threshold.

### How the Clipping Barrier Works:
- When the advantage is positive ($\hat{A}_t > 0$), we want to increase the probability ratio $r_t(\theta)$. However, once $r_t(\theta) > 1 + \epsilon$, clipping ignores further increases, removing any incentive to push the policy too far from $\pi_{\text{old}}$.
- When the advantage is negative ($\hat{A}_t < 0$), once $r_t(\theta) < 1 - \epsilon$, clipping prevents unbounded policy degradation.

This simple min-clip mechanism provides the mathematical stability that allows Reinforcement Learning with Human Feedback to reliably train models like ChatGPT and Claude without model collapse.
