---
title: "Diffusion Mathematics: Schedulers, Noise & ELBO"
slug: "diffusion-mathematics-and-elbo"
description: "Deconstructing the forward Gaussian process, reverse denoising Markov chain, score matching, and the Evidence Lower Bound (ELBO)."
---

# Diffusion Mathematics: Schedulers, Noise & ELBO

Diffusion probabilistic models (Sohl-Dickstein et al., 2015; Ho et al., 2020) form the theoretical engine of modern generative image and video models (Stable Diffusion, Midjourney, Flux, Sora).

Unlike GANs (which rely on unstable adversarial minimax games) or autoregressive models (which predict one element at a time), diffusion models define generation as a **stochastic denoising trajectory**: gradually transforming pure Gaussian noise into structured data.

---

## 1. The Forward Process (Gaussian Corruption)

Given a clean data sample $x_0 \sim q(x)$, the forward process gradually adds Gaussian noise over $T$ discrete timesteps according to a pre-defined variance schedule $\{\beta_1, \beta_2, \dots, \beta_T\}$:

$$q(x_t \mid x_{t-1}) = \mathcal{N}\left(x_t; \, \sqrt{1 - \beta_t} x_{t-1}, \, \beta_t \mathbf{I}\right)$$

```
Clean Image x_0 ────► x_1 ────► x_2 ────► ... ────► x_T ~ N(0, I)
  (Forward Process q: Adds Gaussian noise gradually without learned parameters)
```

### The Closed-Form Shortcut ($q(x_t \mid x_0)$)
A remarkable mathematical property of Gaussian distributions is that we do not need to simulate all $t$ intermediate steps to sample $x_t$. 

Let $\alpha_t = 1 - \beta_t$ and $\bar{\alpha}_t = \prod_{s=1}^t \alpha_s$:

$$q(x_t \mid x_0) = \mathcal{N}\left(x_t; \, \sqrt{\bar{\alpha}_t} x_0, \, (1 - \bar{\alpha}_t) \mathbf{I}\right)$$

By the reparameterization trick, any corrupted state $x_t$ can be sampled in a single step using standard Gaussian noise $\epsilon \sim \mathcal{N}(0, \mathbf{I})$:

$$x_t = \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1 - \bar{\alpha}_t} \epsilon$$

---

## 2. The Reverse Process & Noise Prediction Objective

The reverse process seeks to reconstruct clean data by undoing the noise step-by-step:

$$p_\theta(x_{t-1} \mid x_t) = \mathcal{N}\left(x_{t-1}; \, \mu_\theta(x_t, t), \, \Sigma_\theta(x_t, t)\right)$$

While the true reverse distribution $q(x_{t-1} \mid x_t)$ is intractable, conditioning on clean sample $x_0$ makes the posterior tractable:

$$q(x_{t-1} \mid x_t, x_0) = \mathcal{N}\left(x_{t-1}; \, \tilde{\mu}_t(x_t, x_0), \, \tilde{\beta}_t \mathbf{I}\right)$$

Where the posterior mean $\tilde{\mu}_t$ is:

$$\tilde{\mu}_t(x_t, x_0) = \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_t}{1 - \bar{\alpha}_t} x_0 + \frac{\sqrt{\alpha_t}(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t} x_t$$

### The Simplified Loss Function ($\epsilon$-Prediction)
Ho et al. (DDPM, 2020) demonstrated that rather than predicting the mean $\mu_\theta$, the neural network should be trained to predict the **exact noise vector $\epsilon$** added to the clean image:

$$\mathcal{L}_{\text{simple}}(\theta) = \mathbb{E}_{t, x_0, \epsilon}\left[ \big\| \epsilon - \epsilon_\theta(x_t, t) \big\|^2 \right]$$

Where $x_t = \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1 - \bar{\alpha}_t} \epsilon$.
This surprisingly simple MSE objective between true noise $\epsilon$ and predicted noise $\epsilon_\theta$ directly optimizes the variational lower bound!

---

## 3. The Variational Lower Bound (ELBO) Derivation

The negative log-likelihood $-\log p_\theta(x_0)$ is bounded above by the Kullback-Leibler divergences between the forward and reverse transitions:

$$-\log p_\theta(x_0) \le \mathcal{L}_{\text{VLB}} = \mathbb{E}_q \left[ D_{\text{KL}}\big(q(x_T \mid x_0) \parallel p(x_T)\big) + \sum_{t > 1} D_{\text{KL}}\big(q(x_{t-1} \mid x_t, x_0) \parallel p_\theta(x_{t-1} \mid x_t)\big) - \log p_\theta(x_0 \mid x_1) \right]$$

1. $D_{\text{KL}}\big(q(x_T \mid x_0) \parallel p(x_T)\big) \approx 0$: Prior matching (ensures final state is pure Gaussian).
2. $D_{\text{KL}}\big(q(x_{t-1} \mid x_t, x_0) \parallel p_\theta(x_{t-1} \mid x_t)\big)$: Denoising transition alignment at each timestep.
3. $-\log p_\theta(x_0 \mid x_1)$: Final reconstruction likelihood.

---

## 4. Sampling / Inference (DDPM vs. DDIM)

To generate a new image during inference:
1. Sample pure noise $x_T \sim \mathcal{N}(0, \mathbf{I})$.
2. For $t = T, T-1, \dots, 1$:
   $$x_{t-1} = \frac{1}{\sqrt{\alpha_t}} \left( x_t - \frac{\beta_t}{\sqrt{1 - \bar{\alpha}_t}} \epsilon_\theta(x_t, t) \right) + \sigma_t z, \quad \text{where } z \sim \mathcal{N}(0, \mathbf{I})$$

**DDIM (Denoising Diffusion Implicit Models)** removes the stochastic noise term $\sigma_t z$, transforming sampling into a deterministic Ordinary Differential Equation (ODE). This reduces the required generation steps from 1,000 steps down to 20–50 steps without quality degradation.
