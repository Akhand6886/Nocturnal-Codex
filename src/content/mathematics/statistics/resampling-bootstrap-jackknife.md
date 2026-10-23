---
title: "Resampling Methods: Bootstrap & Jackknife"
description: "Non-parametric empirical distribution functions, the Bootstrap algorithm, percentile and BCa confidence intervals, the Jackknife, and Permutation tests."
---

## 1. When Analytical Formulas Fail

Classical statistical formulas (such as $s / \sqrt{n}$ or $t$-distributions) rely on strict mathematical assumptions:
1. Data follows a known parametric distribution (e.g., Gaussian).
2. The estimator is a simple linear statistic (like the sample mean $\bar{x}$).

What if you need a confidence interval for the **99th percentile ($p99$)**, a **trimmed ratio estimator**, an **AUC score**, or the **Gini coefficient**? In these settings, closed-form analytical formulas do not exist.

**Resampling methods** use computational power to simulate repeated sampling directly from the empirical data itself, requiring **zero parametric assumptions**.

```
+-----------------------------------------------------------------------------------------+
|                                    THE BOOTSTRAP CYCLE                                  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  Real World:       POPULATION F  ======= (Draw sample) =======>  SAMPLE x_1, ..., x_n   |
|                                                                          ||             |
|                                                                          v              |
|  Bootstrap World:  EMPIRICAL CDF F_n  <== (Resample with replacement) == [ BOOTSTRAP ]  |
|                            ||                                                           |
|                            v                                                            |
|                    Bootstrap Sample x* (size n) ===> Compute theta* (e.g., p99)         |
|                            ||                                                           |
|                            +==> Repeat B = 5,000 times to construct distribution!      |
+-----------------------------------------------------------------------------------------+
```

---

## 2. The Non-Parametric Bootstrap

Invented by Bradley Efron in 1979, the **Bootstrap** approximates the true unknown sampling distribution of an estimator $\hat{\theta}$ by resampling from the **Empirical Distribution Function (EDF)** $\hat{F}_n$:

$$\hat{F}_n(x) = \frac{1}{n} \sum_{i=1}^n I(x_i \le x)$$

### The Bootstrap Algorithm:
Given observed data $\mathbf{x} = (x_1, x_2, \dots, x_n)$ and a statistic $\hat{\theta} = g(\mathbf{x})$:
1. For $b = 1$ to $B$ (typically $B = 2,000$ to $10,000$ iterations):
   - Draw a bootstrap sample $\mathbf{x}^{*(b)} = (x_1^*, \dots, x_n^*)$ of size $n$ **uniformly with replacement** from $\mathbf{x}$.
   - Compute the bootstrap estimate $\hat{\theta}^{*(b)} = g(\mathbf{x}^{*(b)})$.
2. The empirical distribution of $\{\hat{\theta}^{*(1)}, \dots, \hat{\theta}^{*(B)}\}$ is our estimated sampling distribution!

### 2.1 The Out-of-Bag (OOB) Invariant
What is the probability that a specific data point $x_i$ is **not selected** in a bootstrap sample of size $n$?
$$P(\text{Not selected in } n \text{ draws}) = \left( 1 - \frac{1}{n} \right)^n$$
Taking the limit as $n \to \infty$:
$$\lim_{n \to \infty} \left( 1 - \frac{1}{n} \right)^n = e^{-1} \approx 0.3679 \quad (36.8\%)$$

> Each bootstrap sample contains approximately $63.2\%$ unique items from the original dataset, leaving $36.8\%$ as **Out-of-Bag (OOB)** samples. This mathematical property is the foundation of **Random Forest** validation without a separate validation set.

---

## 3. Bootstrap Confidence Intervals

### 3.1 Percentile Bootstrap Interval
Sort the $B$ bootstrap estimates $\hat{\theta}^{*(1)} \le \hat{\theta}^{*(2)} \le \dots \le \hat{\theta}^{*(B)}$.
For a $1 - \alpha$ confidence level:

$$\text{CI}_{\text{percentile}} = \left[ \hat{\theta}^*_{\lfloor B \cdot \alpha/2 \rfloor}, \; \hat{\theta}^*_{\lfloor B \cdot (1 - \alpha/2) \rfloor} \right]$$

For $B = 10,000$ and $95\%$ confidence ($\alpha = 0.05$):
$$\text{CI} = [\hat{\theta}^*_{250}, \; \hat{\theta}^*_{9750}]$$

### 3.2 Standard Error Bootstrap Interval
$$\text{SE}^*_{\text{boot}} = \sqrt{ \frac{1}{B - 1} \sum_{b=1}^B \left(\hat{\theta}^{*(b)} - \bar{\theta}^*\right)^2 }$$
$$\text{CI} = \hat{\theta} \pm z_{\alpha/2} \text{SE}^*_{\text{boot}}$$

---

## 4. The Jackknife

Before modern compute made drawing thousands of bootstrap samples trivial, John Tukey developed the **Jackknife** (1958)—a deterministic "leave-one-out" resampling method.

Given $n$ observations, generate $n$ distinct subsamples of size $n - 1$ by dropping observation $i$:
$$\mathbf{x}_{(i)} = (x_1, \dots, x_{i-1}, x_{i+1}, \dots, x_n)$$
Compute the leave-one-out statistic $\hat{\theta}_{(i)} = g(\mathbf{x}_{(i)})$, and their average $\bar{\theta}_{(\cdot)} = \frac{1}{n} \sum_{i=1}^n \hat{\theta}_{(i)}$.

### Jackknife Bias and Variance Estimators:
- **Estimated Bias**:
  $$\widehat{\text{Bias}}_{\text{jack}} = (n - 1) \left( \bar{\theta}_{(\cdot)} - \hat{\theta} \right)$$
- **Jackknife Variance**:
  $$\widehat{\text{Var}}_{\text{jack}} = \frac{n - 1}{n} \sum_{i=1}^n \left( \hat{\theta}_{(i)} - \bar{\theta}_{(\cdot)} \right)^2$$

> Unlike the Bootstrap, the Jackknife is **deterministic** and requires only $n$ evaluations. However, it fails for non-smooth statistics (such as the median or percentiles).

---

## 5. Permutation Tests (Exact Non-Parametric Testing)

Suppose we run an A/B test comparing Treatment ($n_A$ samples) against Control ($n_B$ samples). We want to test the null hypothesis:

$$H_0: \text{The distributions of Group A and Group B are identical } (F_A = F_B)$$

If $H_0$ is true, the group labels "A" and "B" are arbitrary artifacts! Any observed difference in means $D = \bar{x}_A - \bar{x}_B$ is pure chance.

### The Permutation Algorithm:
1. Compute the observed test statistic: $D_{\text{obs}} = \bar{x}_A - \bar{x}_B$.
2. Pool all $N = n_A + n_B$ observations into a single dataset.
3. For $k = 1$ to $K$ iterations (e.g., $K = 50,000$):
   - Randomly shuffle (permute) the pooled observations.
   - Assign the first $n_A$ items to synthetic Group A, and remaining $n_B$ items to synthetic Group B.
   - Compute the permutation difference: $D^{*(k)} = \bar{x}_A^* - \bar{x}_B^*$.
4. Compute the exact two-tailed $p$-value:
   $$p = \frac{1}{K} \sum_{k=1}^K I\left( |D^{*(k)}| \ge |D_{\text{obs}}| \right)$$

Permutation tests require **zero assumptions about normality or equal variances**, making them mathematically exact.

---

## 6. Python Implementation: Bootstrap CI & Permutation Test

```python
import numpy as np

def bootstrap_ci(data: np.ndarray, stat_fn, confidence: float = 0.95, n_bootstraps: int = 5000, seed: int = 42) -> tuple[float, float, float]:
    """
    Compute non-parametric percentile bootstrap confidence interval for any arbitrary statistic.
    """
    rng = np.random.default_rng(seed)
    n = len(data)
    observed_stat = stat_fn(data)

    # Resample with replacement
    boot_indices = rng.integers(0, n, size=(n_bootstraps, n))
    boot_samples = data[boot_indices]
    boot_stats = np.apply_along_axis(stat_fn, 1, boot_samples)

    # Percentiles
    alpha = 1.0 - confidence
    lower = np.percentile(boot_stats, 100 * (alpha / 2.0))
    upper = np.percentile(boot_stats, 100 * (1.0 - alpha / 2.0))
    return observed_stat, lower, upper

def permutation_test(group_a: np.ndarray, group_b: np.ndarray, n_permutations: int = 20_000, seed: int = 42) -> float:
    """
    Two-sided permutation test for difference in means between two groups.
    """
    rng = np.random.default_rng(seed)
    n_a = len(group_a)
    observed_diff = abs(np.mean(group_a) - np.mean(group_b))

    pooled = np.concatenate([group_a, group_b])
    total_n = len(pooled)

    diffs = np.zeros(n_permutations)
    for i in range(n_permutations):
        shuffled = rng.permutation(pooled)
        diffs[i] = abs(np.mean(shuffled[:n_a]) - np.mean(shuffled[n_a:]))

    p_value = np.mean(diffs >= observed_diff)
    return p_value

if __name__ == "__main__":
    # Test Bootstrap on p99 Tail Latency
    rng = np.random.default_rng(42)
    latencies = rng.lognormal(mean=3.0, sigma=0.8, size=2000)

    p99_fn = lambda x: np.percentile(x, 99)
    est_p99, low_p99, high_p99 = bootstrap_ci(latencies, stat_fn=p99_fn)
    print("=== Bootstrap 95% CI for p99 Tail Latency ===")
    print(f"Sample p99:  {est_p99:.2f} ms")
    print(f"95% CI:      [{low_p99:.2f} ms, {high_p99:.2f} ms]")

    # Test Permutation Test on A/B Latency
    control = rng.normal(loc=120.0, scale=15.0, size=50)
    treatment = rng.normal(loc=114.0, scale=15.0, size=50)  # 6ms speedup
    p_val = permutation_test(control, treatment)
    print(f"\nPermutation Test p-value: {p_val:.4f} (Significant: {p_val < 0.05})")
```

---

## 7. Key Takeaways

1. **Bootstrap Solves Complex Estimators**: Generates confidence intervals for non-linear statistics ($p99$, medians) without theoretical formulas.
2. **Out-of-Bag Rate**: Approximately $36.8\%$ of data points are left out of each bootstrap sample ($e^{-1}$).
3. **Permutation Tests are Exact**: Shuffling labels produces exact $p$-values with zero parametric assumptions.
