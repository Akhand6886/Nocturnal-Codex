---
title: "A/B Testing & Production Experimentation"
description: "Production A/B test engineering, sample size power calculations, Minimum Detectable Effect (MDE), the peeking problem, and CUPED variance reduction."
---

## 1. Controlled Experimentation at Scale

In modern tech organizations (Netflix, Meta, Google, Uber), product changes, UI designs, and backend algorithms are not deployed based on intuition. They are validated via **Online Controlled Experiments (A/B Testing)**.

A randomized hashing algorithm assigns incoming users into two isolated cohorts:
- **Control ($A$)**: Current baseline system.
- **Treatment ($B$)**: New feature, model, or UI.

```
+-----------------------------------------------------------------------------------------+
|                                PRODUCTION A/B TEST ARCHITECTURE                         |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       Incoming Request (User ID: "user_8921")                                           |
|                           |                                                             |
|                           v                                                             |
|       HASH ROUTER: hash("user_8921" + salt) % 100                                       |
|                  /                           \                                          |
|      Bucket < 50                              Bucket >= 50                              |
|           v                                        v                                    |
|   [ CONTROL GROUP A ]                      [ TREATMENT GROUP B ]                        |
|   Standard Pricing / Old Cache             Dynamic Pricing / New Cache                  |
|           |                                        |                                    |
|           v                                        v                                    |
|      Telemetrics                              Telemetrics                               |
|           \                                        /                                    |
|            +=======> STATISTICAL ANALYSIS PLATFORM <=======+                            |
|                      - Power Calculation                                                |
|                      - CUPED Variance Reduction                                         |
|                      - Sequential Testing / Peeking Correction                          |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Sample Size Determination & Power Planning

Before launching an experiment, engineers must calculate the **minimum required sample size per variant ($n$)**. Launching an underpowered experiment risks discarding genuine multi-million dollar improvements (Type II error).

### 2.1 The Two-Sample Sizing Formula
For significance level $\alpha$ (typically $0.05 \implies z_{\alpha/2} = 1.960$) and power $1 - \beta$ (typically $80\% \implies z_\beta = 0.842$):

$$n = \frac{2 (z_{\alpha/2} + z_\beta)^2 \sigma^2}{\delta^2}$$

where:
- $\delta = |\mu_B - \mu_A|$ is the **Minimum Detectable Effect (MDE)**.
- $\sigma^2$ is the metric variance.

### 2.2 Proportions Sizing (Conversion Rates)
For conversion rates where baseline conversion is $p$, variance is $\sigma^2 = p(1 - p)$:

$$n = \frac{2 (z_{\alpha/2} + z_\beta)^2 p(1 - p)}{\delta^2}$$

#### Concrete Production Calculation:
A fintech checkout page has a baseline conversion rate $p = 5\%$ ($0.05$). The product team wants to detect an absolute lift of $\delta = 0.25\%$ (i.e. $5.00\% \to 5.25\%$, a $5\%$ relative lift):

$$(z_{0.025} + z_{0.20})^2 = (1.960 + 0.842)^2 = (2.802)^2 \approx 7.851$$
$$n = \frac{2 \times 7.851 \times (0.05 \times 0.95)}{(0.0025)^2} = \frac{15.702 \times 0.0475}{0.00000625} \approx 119,335 \text{ users per variant}$$

To detect this lift with $80\%$ statistical power, you must run the experiment until at least **$239,000$ total users** have participated.

---

## 3. The Peeking Problem (Repeated Significance Testing)

A catastrophic mistake in software engineering is dashboard peeking: checking the experiment daily and stopping the test the instant $p < 0.05$.

### Why Peeking Destroys Validity:
When you peek continuously over $N$ days, the probability of reaching a false positive at *some* point during the experiment is no longer $\alpha = 0.05$. It inflates dramatically:

$$\alpha_{\text{peeking}} = P\left( \exists t \le T : p_t \le 0.05 \;\middle|\; H_0 \right) \approx 30\% \text{ to } 40\% !$$

```
Simulated Random Walks under True Null Hypothesis (mu_A == mu_B):
p-value
 0.10 |            .---.
      |           /     \
 0.05 |---------/---------\------------------- Alpha = 0.05
      |        /           \             /
 0.01 |       /             '-----------'  <-- "PEEKING ERROR!" False positive declared!
 0.00 +------+---------------+-----------+------> Sample Progress (Days)
             Day 3           Day 7       Day 14
```

### Stopping Rule Solutions:
1. **Fixed-Horizon Testing**: Commit to sample size $n$ ahead of time; evaluate $p$-values exactly once when $n$ is reached.
2. **Sequential Testing (O'Brien-Fleming / Pocock Boundaries)**: Uses dynamically adjusted critical thresholds that start very conservative ($\alpha \approx 0.001$) and widen as sample size increases, guaranteeing total false positives remain bounded by $\alpha = 0.05$.

---

## 4. CUPED (Controlled-experiment Using Pre-Experiment Data)

Invented by Microsoft Research (Deng et al., 2013), **CUPED** is the gold standard for variance reduction in production experimentation.

Users exhibit wide behavioral heterogeneity: some users naturally spend $\$500$/week, while others spend $\$5$. This variance dilutes statistical power.

### 4.1 The CUPED Mathematical Transformation
Let $Y$ be the metric of interest observed during the experiment. Let $X$ be the **same metric observed for that user during the pre-experiment period** (before assignment).

Define the adjusted metric:

$$Y_{\text{CUPED}} = Y - \theta (X - E[X])$$

where $\theta$ is an optimal scaling constant.

### 4.2 Optimal Choice of $\theta$
To minimize the variance of $Y_{\text{CUPED}}$:
$$\text{Var}(Y_{\text{CUPED}}) = \text{Var}(Y) + \theta^2 \text{Var}(X) - 2\theta \text{Cov}(Y, X)$$
Differentiating with respect to $\theta$ and setting to zero:
$$2\theta \text{Var}(X) - 2\text{Cov}(Y, X) = 0 \implies \theta^* = \frac{\text{Cov}(Y, X)}{\text{Var}(X)}$$

### 4.3 Variance Reduction Factor
Substituting $\theta^*$ back into the variance formula:

$$\text{Var}(Y_{\text{CUPED}}) = \text{Var}(Y) \left( 1 - \rho_{X, Y}^2 \right)$$

where $\rho_{X, Y}$ is the correlation between pre-experiment and post-experiment metrics.

```
Variance Reduction and Runtime Savings via CUPED:
Correlation rho    Variance Reduction (1 - rho^2)    Experiment Runtime Needed
rho = 0.50         Drops to 75%                      25% faster
rho = 0.70         Drops to 51%                      Almost 2x faster!
rho = 0.85         Drops to 27.75%                   3.6x faster! (14 days -> 4 days)
```

CUPED removes user-specific baseline variance while preserving an identical, unbiased estimate of the treatment effect:
$$E[Y_{\text{CUPED}}] = E[Y] - \theta (E[X] - E[X]) = E[Y]$$

---

## 5. Multi-Armed Bandits vs. Fixed-Horizon A/B Testing

In scenarios where the cost of showing a suboptimal variant is high (e.g. ad revenue or emergency disaster response):

```
+---------------------------------------------------------------------------------+
|                         A/B TESTING VS MULTI-ARMED BANDITS                      |
+---------------------------------------------------------------------------------+
|  A/B Testing:                Multi-Armed Bandits (Thompson Sampling):           |
|  - 50/50 static allocation   - Dynamically reallocates traffic toward winner    |
|  - Maximizes STATISTICAL     - Minimizes REGRET (lost revenue during test)      |
|    CONFIDENCE                - Ideal for short-lived promotions and ad banners  |
+---------------------------------------------------------------------------------+
```

---

## 6. Python Implementation: Sample Sizing & CUPED

```python
import numpy as np
import scipy.stats as stats

def calculate_ab_sample_size(baseline_rate: float, relative_lift: float, alpha: float = 0.05, power: float = 0.80) -> int:
    """Calculate minimum sample size per variant for a binomial A/B test."""
    p1 = baseline_rate
    delta = baseline_rate * relative_lift
    p2 = p1 + delta

    z_alpha = stats.norm.ppf(1.0 - alpha / 2.0)
    z_beta = stats.norm.ppf(power)

    # Pooled variance
    p_bar = (p1 + p2) / 2.0
    numerator = (z_alpha * np.sqrt(2 * p_bar * (1 - p_bar)) + z_beta * np.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2
    n = numerator / (delta ** 2)
    return int(np.ceil(n))

def apply_cuped(pre_exp_x: np.ndarray, post_exp_y: np.ndarray) -> tuple[np.ndarray, float]:
    """
    Apply CUPED variance reduction to post-experiment metrics Y
    using pre-experiment baseline metrics X.
    """
    cov = np.cov(pre_exp_x, post_exp_y)[0, 1]
    var_x = np.var(pre_exp_x, ddof=1)
    theta = cov / var_x

    mean_x = np.mean(pre_exp_x)
    y_cuped = post_exp_y - theta * (pre_exp_x - mean_x)

    var_original = np.var(post_exp_y, ddof=1)
    var_cuped = np.var(y_cuped, ddof=1)
    variance_reduction_pct = (1.0 - var_cuped / var_original) * 100.0

    return y_cuped, variance_reduction_pct

if __name__ == "__main__":
    # 1. Sample Size Planning
    n_required = calculate_ab_sample_size(baseline_rate=0.04, relative_lift=0.08)
    print(f"Required Sample Size per Variant: {n_required:,} users")

    # 2. CUPED Demonstration
    rng = np.random.default_rng(42)
    n_users = 20_000
    # User historical baseline activity
    pre_x = rng.gamma(shape=2.0, scale=10.0, size=n_users)
    # Post-experiment metric (strongly correlated with pre_x)
    post_y = pre_x * 1.1 + rng.normal(0, 5.0, size=n_users)

    y_adjusted, reduction = apply_cuped(pre_x, post_y)
    print(f"\nCUPED Variance Reduction: {reduction:.2f}%")
    print(f"Original StdDev: {np.std(post_y):.3f}")
    print(f"CUPED    StdDev: {np.std(y_adjusted):.3f}")
```

---

## 7. Key Takeaways

1. **Size Before Launching**: Calculate required $n$ using target MDE, $\alpha$, and $1 - \beta$ to avoid underpowered tests.
2. **Avoid Peeking**: Continuously evaluating $p$-values inflates false positive rates from $5\%$ up to $40\%$.
3. **Always Use CUPED**: Using pre-experiment metrics removes between-user variance, cutting experiment duration by $30\text{--}60\%$.
