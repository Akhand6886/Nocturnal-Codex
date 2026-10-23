---
title: "Confidence Intervals & Margin of Error"
description: "Frequentist interpretation, Z-intervals, Student's t-intervals, Wilson score interval for proportions, and sample size sizing."
---

## 1. Quantifying Parameter Uncertainty

A point estimate (such as $\bar{x} = 42.1 \text{ ms}$) provides a single number without any measure of certainty. Did it come from a small sample of 5 noisy benchmarks, or from 5,000,000 production traces?

A **Confidence Interval (CI)** specifies an estimated range of values $[L(\mathbf{x}), U(\mathbf{x})]$ constructed from sample data, associated with a **confidence level** $1 - \alpha$ (typically $95\%$ or $99\%$):

$$P(L(\mathbf{X}) \le \theta \le U(\mathbf{X})) = 1 - \alpha$$

```
+-----------------------------------------------------------------------------------------+
|                         THE CRITICAL FREQUENTIST DEFINITION                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  WRONG INTERPRETATION:                                                                  |
|  "There is a 95% probability that the true parameter mu is inside [12.4, 18.2]."        |
|  (False! mu is a fixed physical constant, not a random variable. It is either inside   |
|   the interval or it is not; the probability is either 1 or 0!)                         |
|                                                                                         |
|  CORRECT INTERPRETATION:                                                                |
|  "If we repeated this experiment 10,000 times and calculated an interval each time,      |
|   approximately 9,500 of those intervals would capture the true fixed parameter mu."    |
+-----------------------------------------------------------------------------------------+
```

```
Repeated Sampling Visualization (95% CI):
True Parameter mu: |
Experiment  1:     |    [-------*-------]         (Captures mu)
Experiment  2:     | [-----*-----]                (Captures mu)
Experiment  3:     |         [-----*-----]        (Captures mu)
Experiment  4:     |                         [--*--] (MISSES mu!)
Experiment  5:     |      [--------*--------]     (Captures mu)
```

---

## 2. Confidence Intervals for the Mean

### 2.1 Known Population Variance $\sigma$: The $Z$-Interval
When $\sigma$ is known (or when sample size $n$ is very large, $n > 1000$, so $s \approx \sigma$ by the Law of Large Numbers):

$$\text{CI}_{1-\alpha} = \left[ \bar{x} - z_{\alpha/2} \frac{\sigma}{\sqrt{n}}, \; \bar{x} + z_{\alpha/2} \frac{\sigma}{\sqrt{n}} \right]$$

For standard confidence levels:
- $90\%$ Confidence ($\alpha = 0.10$): $z_{0.05} = 1.645$
- $95\%$ Confidence ($\alpha = 0.05$): $z_{0.025} = 1.960$
- $99\%$ Confidence ($\alpha = 0.01$): $z_{0.005} = 2.576$

---

### 2.2 Unknown Variance $\sigma$: Student's $t$-Interval
In practical engineering, the true population variance $\sigma^2$ is unknown. We substitute the sample standard deviation $s$ and use critical values from **Student's $t$-distribution** with $\nu = n - 1$ degrees of freedom:

$$\text{CI}_{1-\alpha} = \left[ \bar{x} - t_{\alpha/2, n-1} \frac{s}{\sqrt{n}}, \; \bar{x} + t_{\alpha/2, n-1} \frac{s}{\sqrt{n}} \right]$$

The Margin of Error is:

$$E = t_{\alpha/2, n-1} \frac{s}{\sqrt{n}}$$

Because $t$-critical values are strictly larger than $z$-critical values ($t_{0.025, 4} = 2.776$ vs $z_{0.025} = 1.960$), Student's $t$-intervals are wider, accurately reflecting the extra uncertainty of estimating the unknown standard deviation $s$ from small samples.

---

## 3. Confidence Intervals for Proportions

Suppose an ad generates $k$ clicks across $n$ impressions. What is the confidence interval for the conversion proportion $p$?

### 3.1 The Flawed Wald Interval
The classic textbook formula uses the normal approximation:

$$\hat{p} \pm z_{\alpha/2} \sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$$

**Why the Wald interval should never be used in production**:
When $p$ is small ($p < 0.05$) or $n$ is small, the Wald interval breaks down:
- It can produce impossible negative lower bounds ($[-0.02, 0.04]$).
- Its true coverage is far below $95\%$ (often as low as $80\%$).

### 3.2 The Wilson Score Interval (Industry Standard)
The Wilson score interval inverts the score test, solving $(p - \hat{p})^2 \le z^2 \frac{p(1-p)}{n}$ directly for $p$ without approximating the variance using $\hat{p}$:

$$\text{CI}_{\text{Wilson}} = \frac{\hat{p} + \frac{z^2}{2n} \pm z \sqrt{\frac{\hat{p}(1 - \hat{p})}{n} + \frac{z^2}{4n^2}}}{1 + \frac{z^2}{n}}$$

Properties:
1. Always bounded strictly within $[0, 1]$.
2. Highly accurate even when $k = 0$ or $k = n$.
3. Used by Reddit and Amazon for upvote/downvote and review ranking.

### 3.3 The Agresti-Coull "Add-4" Rule
A simple, highly accurate approximation for 95% confidence intervals: simply **add 2 artificial successes and 2 artificial failures** ($n' = n + 4$, $\tilde{p} = \frac{k + 2}{n + 4}$):

$$\tilde{p} \pm 1.96 \sqrt{\frac{\tilde{p}(1 - \tilde{p})}{n + 4}}$$

---

## 4. Difference in Means (Two Independent Groups)

When comparing Variant A and Variant B in an A/B test without assuming equal variances, we construct a confidence interval for $\mu_A - \mu_B$:

$$\text{CI}_{1-\alpha} = (\bar{x}_A - \bar{x}_B) \pm t_{\alpha/2, \nu} \sqrt{\frac{s_A^2}{n_A} + \frac{s_B^2}{n_B}}$$

where degrees of freedom $\nu$ are calculated using the **Welch-Satterthwaite equation**:

$$\nu = \frac{\left( \frac{s_A^2}{n_A} + \frac{s_B^2}{n_B} \right)^2}{\frac{(s_A^2 / n_A)^2}{n_A - 1} + \frac{(s_B^2 / n_B)^2}{n_B - 1}}$$

If the resulting $95\%$ confidence interval for $\mu_A - \mu_B$ **does not include 0**, the difference is statistically significant at $\alpha = 0.05$.

---

## 5. Sample Size Determination for a Target Margin of Error

Before running a benchmark or experiment, how many requests $n$ must be collected to guarantee that the estimate is within margin of error $E$ with $95\%$ confidence?

$$E = z_{\alpha/2} \frac{\sigma}{\sqrt{n}}$$

Squaring both sides and solving for $n$:

$$n = \left( \frac{z_{\alpha/2} \sigma}{E} \right)^2$$

### Production Sizing Example:
A payments team wants to estimate average transaction latency within $E = \pm 1.0 \text{ ms}$ with $95\%$ confidence ($z = 1.960$). Pilot benchmarks suggest $\sigma \approx 15.0 \text{ ms}$.

$$n = \left( \frac{1.960 \times 15.0}{1.0} \right)^2 = (29.4)^2 \approx 864.36 \implies \text{Collect at least } 865 \text{ requests.}$$

---

## 6. Python Implementation: Wilson Score & $t$-Intervals

```python
import numpy as np
import scipy.stats as stats

def wilson_score_interval(successes: int, trials: int, confidence: float = 0.95) -> tuple[float, float]:
    """
    Calculate the Wilson Score confidence interval for a binomial proportion.
    """
    if trials == 0:
        return 0.0, 1.0
    
    alpha = 1.0 - confidence
    z = stats.norm.ppf(1.0 - alpha / 2.0)
    p_hat = successes / trials

    denominator = 1.0 + (z**2) / trials
    center = (p_hat + (z**2) / (2.0 * trials)) / denominator
    margin = (z * np.sqrt((p_hat * (1.0 - p_hat) / trials) + ((z**2) / (4.0 * trials**2)))) / denominator

    lower = max(0.0, center - margin)
    upper = min(1.0, center + margin)
    return lower, upper

def compute_t_interval(data: np.ndarray, confidence: float = 0.95) -> tuple[float, float, float]:
    """Compute mean and Student's t-confidence interval for continuous data."""
    n = len(data)
    mean = np.mean(data)
    sem = stats.sem(data)
    interval = stats.t.interval(confidence, df=n - 1, loc=mean, scale=sem)
    return mean, interval[0], interval[1]

if __name__ == "__main__":
    # Test 0 conversions out of 20 trials
    # Wald interval would give [0.0, 0.0], completely hiding uncertainty!
    w_low, w_high = wilson_score_interval(successes=0, trials=20)
    print("=== Wilson Score Interval (0 clicks / 20 impressions) ===")
    print(f"95% CI: [{w_low * 100:.2f}%, {w_high * 100:.2f}%]")

    # Benchmark latency test
    rng = np.random.default_rng(42)
    benchmarks = rng.normal(loc=45.0, scale=8.0, size=25)
    mean, t_low, t_high = compute_t_interval(benchmarks)
    print("\n=== Latency Student's t-Interval (n=25) ===")
    print(f"Sample Mean: {mean:.2f} ms")
    print(f"95% CI:      [{t_low:.2f} ms, {t_high:.2f} ms]")
```

---

## 7. Key Takeaways

1. **Confidence Applies to the Estimator**: A 95% CI means 95% of generated intervals contain the true parameter.
2. **Never Use Wald for Proportions**: Use Wilson Score intervals or Agresti-Coull to avoid broken coverage near zero.
3. **Quadruple Rule**: To halve the margin of error ($E \to E/2$), you must quadruple sample size ($4n$).
