---
title: "Method of Moments & Bayesian MAP"
description: "Method of moments estimation, conjugate Bayesian priors (Beta-Binomial, Normal-Normal), Maximum A Posteriori (MAP), and L1/L2 regularization as Bayesian priors."
---

## 1. Beyond Maximum Likelihood

While Maximum Likelihood Estimation (MLE) is powerful, it has two key limitations:
1. When sample size $n$ is very small, MLE severely overfits (e.g., if a coin is flipped 3 times and lands on Heads every time, MLE concludes $p = 1.0$).
2. Likelihood optimization often has no closed form and requires iterative numerical solvers.

Two critical alternatives resolve these challenges:
- **Method of Moments (MoM)**: Fast, non-iterative algebraic estimators.
- **Bayesian Maximum A Posteriori (MAP)**: Incorporates prior domain knowledge to regularize parameter estimates.

```
+-----------------------------------------------------------------------------------------+
|                              ESTIMATION FRAMEWORK COMPARISON                            |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  METHOD OF MOMENTS:   Equate empirical sample moments to theoretical moments.           |
|                       Fast algebraic closed-form, but higher variance than MLE.         |
|                                                                                         |
|  MAXIMUM LIKELIHOOD:  Find theta that maximizes L(theta; x) = P(x | theta).             |
|                       Asymptotically optimal, but overfits on small n.                  |
|                                                                                         |
|  MAXIMUM A POSTERIORI:Find theta that maximizes P(theta | x) ~ P(x | theta) * P(theta). |
|                       Natural Bayesian regularization; prevents extreme overfitting.    |
+-----------------------------------------------------------------------------------------+
```

---

## 2. The Method of Moments (MoM)

Let $X$ be a random variable whose distribution depends on $k$ unknown parameters $\theta = (\theta_1, \dots, \theta_k)$.

1. **Theoretical Moments**: $\mu_j(\theta) = E[X^j]$, $j = 1, \dots, k$.
2. **Empirical Sample Moments**: $m_j = \frac{1}{n} \sum_{i=1}^n x_i^j$.

### The MoM Procedure:
Equate the first $k$ theoretical moments to the first $k$ sample moments:

$$\begin{cases}
\mu_1(\theta_1, \dots, \theta_k) = m_1 = \bar{x} \\
\mu_2(\theta_1, \dots, \theta_k) = m_2 = \frac{1}{n} \sum x_i^2 \\
\vdots \\
\mu_k(\theta_1, \dots, \theta_k) = m_k = \frac{1}{n} \sum x_i^k
\end{cases}$$

Solve this system of $k$ algebraic equations for $\theta_1, \dots, \theta_k$.

### Example: Fitting a Gamma Distribution $(\alpha, \beta)$
The Gamma distribution has PDF $f(x) = \frac{\beta^\alpha}{\Gamma(\alpha)} x^{\alpha - 1} e^{-\beta x}$.
Theoretical moments:
$$E[X] = \frac{\alpha}{\beta}, \quad \text{Var}(X) = \frac{\alpha}{\beta^2} = E[X^2] - (E[X])^2$$
Sample moments: mean $\bar{x}$, variance $s^2 = m_2 - m_1^2$.
Equating:
$$\frac{\alpha}{\beta} = \bar{x}, \quad \frac{\alpha}{\beta^2} = s^2$$
Dividing the two equations:
$$\frac{\alpha / \beta}{\alpha / \beta^2} = \beta = \frac{\bar{x}}{s^2}$$
Substituting back into $\alpha = \beta \bar{x}$:
$$\hat{\alpha}_{\text{MoM}} = \frac{\bar{x}^2}{s^2}, \qquad \hat{\beta}_{\text{MoM}} = \frac{\bar{x}}{s^2}$$
MoM produces instantaneous closed-form formulas without numerical gradients!

---

## 3. Bayesian Point Estimation & Conjugate Priors

In the Bayesian paradigm, the parameter $\theta$ is not a fixed unknown constant—it is a **random variable** with a prior probability distribution $p(\theta)$ expressing prior belief before seeing data.

By Bayes' theorem, the updated belief after observing data $\mathbf{x}$ is the **Posterior Distribution**:

$$p(\theta \mid \mathbf{x}) = \frac{p(\mathbf{x} \mid \theta) p(\theta)}{p(\mathbf{x})} = \frac{p(\mathbf{x} \mid \theta) p(\theta)}{\int_\Theta p(\mathbf{x} \mid \theta') p(\theta') \, d\theta'} \propto p(\mathbf{x} \mid \theta) p(\theta)$$

$$\text{Posterior} \propto \text{Likelihood} \times \text{Prior}$$

### 3.1 Conjugate Priors
Computing the denominator $p(\mathbf{x}) = \int p(\mathbf{x} \mid \theta) p(\theta) d\theta$ often involves intractable high-dimensional integrals. 
A prior $p(\theta)$ is **conjugate** to the likelihood $p(\mathbf{x} \mid \theta)$ if the resulting posterior $p(\theta \mid \mathbf{x})$ belongs to the exact same algebraic family as the prior.

---

### 3.2 The Beta-Binomial Conjugate Model
Suppose we observe $k$ successes out of $n$ trials (Binomial likelihood):
$$p(k \mid p) = \binom{n}{k} p^k (1 - p)^{n - k}$$
We place a **Beta prior** on the success probability $p \in [0, 1]$:
$$p \sim \text{Beta}(\alpha, \beta) \implies p(p) = \frac{1}{\text{B}(\alpha, \beta)} p^{\alpha - 1} (1 - p)^{\beta - 1}$$
where $\alpha$ and $\beta$ act as **pseudo-counts** of prior successes and failures.

#### Posterior Derivation:
$$\begin{aligned}
p(p \mid k) &\propto p(k \mid p) \cdot p(p) \\
&\propto \left[ p^k (1 - p)^{n - k} \right] \cdot \left[ p^{\alpha - 1} (1 - p)^{\beta - 1} \right] \\
&= p^{(\alpha + k) - 1} (1 - p)^{(\beta + n - k) - 1}
\end{aligned}$$
The posterior is strictly another Beta distribution:

$$p \mid k \sim \text{Beta}(\alpha + k, \beta + n - k)$$

Bayesian updating is simply adding observed successes $k$ to $\alpha$ and observed failures $n - k$ to $\beta$!

```
Beta-Binomial Updating (Prior to Posterior):
Prior Beta(2, 2): Weak belief coin is fair.
Observe: 8 Heads out of 10 flips.
Posterior Beta(2 + 8, 2 + 2) = Beta(10, 4): Smoothly shifted toward Heads!
```

---

## 4. Maximum A Posteriori (MAP) Estimation

Instead of computing the entire posterior distribution, **Maximum A Posteriori (MAP)** selects the single point $\theta$ that maximizes the posterior density:

$$\hat{\theta}_{\text{MAP}} = \arg\max_\theta p(\theta \mid \mathbf{x}) = \arg\max_\theta \left[ \ln p(\mathbf{x} \mid \theta) + \ln p(\theta) \right]$$

```
+---------------------------------------------------------------------------------+
|                                 MLE VS MAP EQUATION                             |
+---------------------------------------------------------------------------------+
|  theta_MLE = argmax [ ln P(x | theta) ]                                         |
|  theta_MAP = argmax [ ln P(x | theta)   +   ln P(theta) ]                       |
|                             |                     |                             |
|                      Data Likelihood        Prior Penalty (Regularization)      |
+---------------------------------------------------------------------------------+
```

---

## 5. Machine Learning Connection: Regularization as Bayesian Priors

Why do machine learning practitioners add weight decay ($L_2$) or Lasso ($L_1$) penalties to loss functions? **Regularization is identical to MAP estimation under specific Bayesian priors!**

### 5.1 $L_2$ Regularization (Ridge / Weight Decay) = Gaussian Prior
Assume regression weights $w_j$ have an independent zero-mean Gaussian prior:
$$w_j \sim \mathcal{N}\left(0, \sigma_0^2\right) \implies p(\mathbf{w}) \propto \exp\left( -\frac{\|\mathbf{w}\|_2^2}{2\sigma_0^2} \right)$$
Taking the log prior:
$$\ln p(\mathbf{w}) = -\frac{1}{2\sigma_0^2} \|\mathbf{w}\|_2^2 + \text{const}$$
The MAP objective becomes:
$$\hat{\mathbf{w}}_{\text{MAP}} = \arg\max_\mathbf{w} \left[ \ln p(\mathbf{y} \mid \mathbf{X}, \mathbf{w}) - \frac{\lambda}{2} \|\mathbf{w}\|_2^2 \right]$$
Minimizing negative log-posterior yields the **Ridge Regression ($L_2$) objective** with regularization parameter $\lambda = \sigma^2 / \sigma_0^2$!

### 5.2 $L_1$ Regularization (Lasso) = Laplace Prior
Assume weights $w_j$ have an independent zero-mean Laplace prior:
$$p(w_j) = \frac{1}{2b} \exp\left( -\frac{|w_j|}{b} \right) \implies \ln p(\mathbf{w}) = -\frac{1}{b} \|\mathbf{w}\|_1 + \text{const}$$
Maximizing log-posterior yields the **Lasso Regression ($L_1$) objective**:
$$\min_\mathbf{w} \left[ \text{MSE}(\mathbf{w}) + \lambda \|\mathbf{w}\|_1 \right]$$
The sharp peak of the Laplace prior at $w = 0$ forces coefficients to exactly zero, producing **sparse models**.

---

## 6. Python Implementation: MLE vs MAP with Small Samples

```python
import numpy as np

def compare_mle_and_map():
    """
    Demonstrate how Bayesian MAP with a Beta(2, 2) prior prevents
    the extreme overfitting of MLE in small-sample click-through-rate (CTR) tests.
    """
    # True ad click-through rate is 5%
    true_ctr = 0.05
    rng = np.random.default_rng(42)

    # Small sample: only 5 ad impressions observed
    impressions = 5
    clicks = rng.binomial(impressions, true_ctr)  # Most likely 0 clicks

    # 1. MLE: clicks / impressions
    mle_ctr = clicks / impressions

    # 2. MAP with Beta(alpha=3, beta=50) prior (reflecting historical ad CTR ~ 5%)
    alpha_prior, beta_prior = 3.0, 50.0
    # Mode of Beta(alpha', beta') is (alpha' - 1) / (alpha' + beta' - 2)
    alpha_post = alpha_prior + clicks
    beta_post = beta_prior + (impressions - clicks)
    map_ctr = (alpha_post - 1.0) / (alpha_post + beta_post - 2.0)

    print(f"Observed: {clicks} clicks out of {impressions} impressions")
    print(f"True CTR: {true_ctr:.4f}")
    print(f"MLE CTR:  {mle_ctr:.4f}  (Catastrophic zero estimate!)")
    print(f"MAP CTR:  {map_ctr:.4f}  (Gracefully regularized toward 5%)")

if __name__ == "__main__":
    compare_mle_and_map()
```

---

## 7. Key Takeaways

1. **Method of Moments is Instant**: Solves moments algebraically; excellent for generating initial parameter guesses for numerical MLE.
2. **Conjugacy Simplifies Bayesian Math**: Conjugate priors yield closed-form posterior updates by simply adding observation counts.
3. **Regularization IS Bayesian Inference**: $L_2$ regularization is MAP with a Gaussian prior; $L_1$ regularization is MAP with a Laplace prior.
