---
title: "Hypothesis Testing Foundations"
description: "Statistical decision theory, null and alternative hypotheses, p-value definitions and fallacies, Type I and II errors, statistical power, and the Neyman-Pearson lemma."
---

## 1. Statistical Decision Theory

In software engineering, decisions must constantly be made under uncertainty:
- *Did the new caching layer reduce p99 latency, or was the improvement random network variance?*
- *Did the new checkout button increase conversion, or did we observe a temporary traffic fluke?*

**Hypothesis Testing** formalizes this decision-making process into an adversarial mathematical framework:

```
+-----------------------------------------------------------------------------------------+
|                                 THE 2x2 DECISION MATRIX                                 |
+-----------------------------------------------------------------------------------------+
|                                    ACTUAL STATE OF REALITY                              |
|  DECISION MADE             H_0 is TRUE (No real effect)     H_1 is TRUE (Real effect)   |
|  -------------------------------------------------------------------------------------  |
|  Fail to Reject H_0        CORRECT DECISION                 TYPE II ERROR (beta)        |
|  (Keep Status Quo)         Confidence Level: 1 - alpha      False Negative              |
|                                                                                         |
|  Reject H_0 (Declare Win)  TYPE I ERROR (alpha)             CORRECT DECISION            |
|                            False Positive (Significance)    STATISTICAL POWER (1 - beta)|
+-----------------------------------------------------------------------------------------+
```

---

## 2. Null & Alternative Hypotheses

### 2.1 The Null Hypothesis ($H_0$)
The skeptical baseline: asserts that there is **no difference, no effect, or no relationship**.
$$H_0: \mu_{\text{new}} = \mu_{\text{old}} \quad \text{or} \quad \mu_{\text{new}} - \mu_{\text{old}} \le 0$$
The burden of proof rests entirely on the claimant. In the eyes of the mathematical framework, $H_0$ is presumed true until evidence overwhelming refutes it.

### 2.2 The Alternative Hypothesis ($H_1$ or $H_a$)
The research claim: asserts that a real, measurable effect exists.
- **Two-Tailed Test**: $H_1: \mu_{\text{new}} \neq \mu_{\text{old}}$ (detects changes in either direction).
- **One-Tailed Test**: $H_1: \mu_{\text{new}} < \mu_{\text{old}}$ (detects improvement only in a specific direction).

---

## 3. The $p$-Value: Rigorous Definition & Fallacies

### 3.1 Formal Definition
The **$p$-value** is the probability of observing a test statistic $T(\mathbf{X})$ at least as extreme as the value actually calculated from data, **assuming the null hypothesis $H_0$ is strictly true**:

$$p\text{-value} = P\left( |T(\mathbf{X})| \ge |t_{\text{obs}}| \;\middle|\; H_0 \right)$$

If the $p$-value is less than or equal to a predetermined threshold $\alpha$ (conventionally $\alpha = 0.05$ or $0.01$):
$$\text{Reject } H_0 \text{ at significance level } \alpha$$

```
Two-Tailed Rejection Region (alpha = 0.05):
Null Distribution f(T | H_0)
 ^
 |                    .---.
 |                  /       \
 |                /           \
 |     |///|  _.-'             '-._  |///|
-+-----+-----+-------+-------+-------+-----+-----+------> Test Statistic T
     -z_crit        0               +z_crit
     [ 2.5% ]                       [ 2.5% ]
     Reject H_0                     Reject H_0
```

---

### 3.2 Critical $p$-Value Fallacies in Engineering

| Fallacy | Reality |
| :--- | :--- |
| **"The $p$-value is the probability that $H_0$ is true."** | **FALSE!** In frequentist statistics, $H_0$ has no probability. The $p$-value is $P(\text{Data} \mid H_0)$, NOT $P(H_0 \mid \text{Data})$! |
| **"A smaller $p$-value means a bigger engineering effect."** | **FALSE!** $p = 0.00001$ only means we are very certain an effect is non-zero. A huge sample ($n = 10,000,000$) can yield $p < 10^{-10}$ for an infinitesimal $0.0001\text{ ms}$ speedup that is economically useless. |
| **"$p > 0.05$ proves that the two systems are identical."** | **FALSE!** Absence of evidence is not evidence of absence. A high $p$-value often simply means the sample size was too small to detect the difference (low power). |

---

## 4. Statistical Power ($1 - \beta$)

**Statistical Power** is the probability that a test correctly rejects the null hypothesis when a real effect actually exists:

$$\text{Power} = 1 - \beta = P(\text{Reject } H_0 \mid H_1 \text{ is true})$$

In industry A/B testing and software benchmarks, target power is conventionally set to **$80\%$ or $90\%$** ($\beta = 0.20$ or $0.10$).

```
Visualizing the Tradeoff between alpha and beta:
Density
 ^
 |         H_0 Distribution                  H_1 Distribution (Shifted by delta)
 |              /\                                  /\
 |             /  \                                /  \
 |            /    \   Critical Value             /    \
 |           /      \         |                  /      \
 |          /        \        |                 /        \
 |         /          \   |///|               .:          \
-+--------+------------+--+---+--------------+--+----------+------> Test Statistic
                          ^                  ^
                     alpha (Type I)       beta (Type II)
                   [False Positive]     [Missed Detection]
```

### Factors Increasing Statistical Power:
1. **Larger Sample Size ($n$)**: Narrower sampling distributions reduce overlap between $H_0$ and $H_1$.
2. **Larger Effect Size ($\delta = |\mu_1 - \mu_0|$ / $\sigma$)**: Shifting $H_1$ further right makes detection easier.
3. **Lower Noise / Variance ($\sigma$)**: Variance reduction techniques (e.g., CUPED) shrink standard error.
4. **Higher Significance Level ($\alpha$)**: Accepting more false positives ($0.05 \to 0.10$) increases power.

---

## 5. The Neyman-Pearson Lemma

Is there a mathematically "best" hypothesis test that maximizes power for a fixed false positive budget $\alpha$?

### Theorem (Neyman-Pearson Lemma)
To test a simple null hypothesis $H_0: \theta = \theta_0$ against a simple alternative $H_1: \theta = \theta_1$, the test that maximizes statistical power ($1 - \beta$) for a given significance level $\alpha$ is the **Likelihood Ratio Test (LRT)**:

$$\Lambda(\mathbf{x}) = \frac{L(\theta_0; \mathbf{x})}{L(\theta_1; \mathbf{x})} \le k_\alpha \implies \text{Reject } H_0$$

where threshold $k_\alpha$ is chosen such that $P(\Lambda(\mathbf{X}) \le k_\alpha \mid H_0) = \alpha$.

The Neyman-Pearson lemma proves that the likelihood ratio contains all necessary information to construct the **Uniformly Most Powerful (UMP)** statistical test.

---

## 6. Effect Size: Cohen's $d$

Because statistical significance ($p < 0.05$) depends heavily on sample size $n$, reporting $p$-values alone is insufficient. We must compute the standardized **Effect Size**:

$$\text{Cohen's } d = \frac{\bar{x}_1 - \bar{x}_2}{s_{\text{pooled}}}$$

where $s_{\text{pooled}} = \sqrt{\frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}}$.

- **Small Effect**: $d \approx 0.2$
- **Medium Effect**: $d \approx 0.5$
- **Large Effect**: $d \ge 0.8$

---

## 7. Python Implementation: Simulating Power Curves

```python
import numpy as np
import scipy.stats as stats

def calculate_statistical_power(effect_size_delta: float, sample_size: int, sigma: float = 1.0, alpha: float = 0.05, n_simulations: int = 10_000) -> float:
    """
    Monte Carlo calculation of statistical power (1 - beta)
    for a two-tailed two-sample z-test.
    """
    rng = np.random.default_rng(42)
    # Standard error under null
    se = sigma * np.sqrt(2.0 / sample_size)
    z_critical = stats.norm.ppf(1.0 - alpha / 2.0)

    # Simulate Group A (control, mu = 0) and Group B (treatment, mu = delta)
    control = rng.normal(loc=0.0, scale=sigma, size=(n_simulations, sample_size))
    treatment = rng.normal(loc=effect_size_delta, scale=sigma, size=(n_simulations, sample_size))

    # Test statistics
    mean_diffs = np.mean(treatment, axis=1) - np.mean(control, axis=1)
    z_scores = mean_diffs / se

    # Reject null if |Z| >= z_critical
    rejections = np.abs(z_scores) >= z_critical
    power = np.mean(rejections)
    return power

def demonstrate_power():
    delta = 0.3  # Moderate effect size
    sample_sizes = [20, 50, 100, 200, 500]

    print(f"=== Statistical Power vs Sample Size (Delta = {delta}, Alpha = 0.05) ===")
    for n in sample_sizes:
        power = calculate_statistical_power(effect_size_delta=delta, sample_size=n)
        print(f"Sample Size n = {n:<4} | Statistical Power: {power * 100:.2f}%")

if __name__ == "__main__":
    demonstrate_power()
```

---

## 8. Key Takeaways

1. **$p$-Value Measures Surprise**: The probability of seeing data as extreme as observed, assuming nothing changed ($H_0$).
2. **Power is Defense against False Negatives**: Sizing tests for $80\text{--}90\%$ power ensures you do not discard winning software features due to lack of samples.
3. **Significance $\neq$ Importance**: Always report effect size (Cohen's $d$) alongside $p$-values.
