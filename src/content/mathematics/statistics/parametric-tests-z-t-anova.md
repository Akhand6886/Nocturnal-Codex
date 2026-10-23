---
title: "Parametric Tests: Z-Test, T-Test & ANOVA"
description: "One and two-sample tests, Welch's t-test, Paired t-test, One-Way ANOVA, the multiple comparison problem, and Benjamini-Hochberg FDR control."
---

## 1. Classical Parametric Tests

Parametric hypothesis tests assume that the underlying population data follows a defined mathematical distribution—typically the Gaussian (Normal) distribution. When these assumptions hold, parametric tests maximize statistical efficiency and power.

```
+-----------------------------------------------------------------------------------------+
|                               DECISION TREE FOR PARAMETRIC TESTS                        |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  1 Group vs Known Standard mu_0:                                                        |
|  - Known population sigma:                  ===> ONE-SAMPLE Z-TEST                      |
|  - Unknown sigma (estimated via s):         ===> ONE-SAMPLE T-TEST                      |
|                                                                                         |
|  2 Independent Groups (A vs B):                                                         |
|  - Unequal variances (Modern default):      ===> WELCH'S T-TEST                         |
|  - Equal variances assumed:                 ===> STUDENT'S TWO-SAMPLE T-TEST            |
|                                                                                         |
|  2 Paired / Dependent Measurements:                                                     |
|  - Same subject before & after:             ===> PAIRED T-TEST                          |
|                                                                                         |
|  3 or More Groups (A vs B vs C ...):                                                    |
|  - Compare across all groups simultaneously: ===> ONE-WAY ANOVA (F-TEST)                |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Two-Sample Tests: Student vs. Welch

Suppose we compare response times between server cluster A ($n_1$ requests) and cluster B ($n_2$ requests).

### 2.1 Student's Two-Sample $t$-Test (Equal Variances Assumed)
Assumes $\sigma_1^2 = \sigma_2^2 = \sigma^2$. Computes a pooled sample variance:

$$s_p^2 = \frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}$$

$$t = \frac{\bar{x}_1 - \bar{x}_2}{s_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}} \sim t_{n_1 + n_2 - 2}$$

> **Warning**: In production software engineering, servers, configurations, and user cohorts almost **never** have equal variances ($\sigma_1^2 \neq \sigma_2^2$). If sample sizes are unequal ($n_1 \neq n_2$), Student's $t$-test produces heavily inflated false positive rates!

---

### 2.2 Welch's $t$-Test (The Modern Industry Standard)
Welch's $t$-test does **not** assume equal variances ($\sigma_1^2 \neq \sigma_2^2$).

The test statistic is:

$$t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$$

Degrees of freedom $\nu$ are calculated using the **Welch-Satterthwaite approximation**:

$$\nu = \frac{\left( \frac{s_1^2}{n_1} + \frac{s_2^2}{n_2} \right)^2}{\frac{(s_1^2 / n_1)^2}{n_1 - 1} + \frac{(s_2^2 / n_2)^2}{n_2 - 1}}$$

Welch's $t$-test is unconditionally robust and should always be used in place of Student's two-sample $t$-test.

---

## 3. The Paired $t$-Test

When observations in Group 1 and Group 2 are paired (e.g., measuring SQL query latency before and after applying an index on the exact same 100 queries):

Do not treat them as independent samples! Compute the per-item difference:
$$d_i = x_{1, i} - x_{2, i}, \quad i = 1, \dots, n$$
Then conduct a **one-sample $t$-test** on the differences $d_i$ against null hypothesis $H_0: \mu_d = 0$:

$$t = \frac{\bar{d} - 0}{s_d / \sqrt{n}} \sim t_{n - 1}$$

where $\bar{d} = \frac{1}{n} \sum d_i$ and $s_d$ is the sample standard deviation of differences.

Paired testing cancels out subject-to-subject variation, dramatically increasing statistical power.

---

## 4. Analysis of Variance (One-Way ANOVA)

Suppose we test 4 database caching strategies ($k = 4$ variants). Why not run $\binom{4}{2} = 6$ individual pairwise $t$-tests?
Because running multiple tests causes the **Multiple Comparison Problem**:

$$\alpha_{\text{family}} = 1 - (1 - 0.05)^6 = 1 - 0.735 = 0.265 \quad (26.5\% \text{ chance of at least one false positive!})$$

**One-Way ANOVA** tests all $k$ groups simultaneously against the omnibus null hypothesis:

$$H_0: \mu_1 = \mu_2 = \dots = \mu_k$$

### 4.1 Sum of Squares Decomposition
Total variability in data decomposes into two orthogonal components:

$$\text{SS}_{\text{total}} = \text{SS}_{\text{between}} + \text{SS}_{\text{within}}$$

$$\sum_{j=1}^k \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot\cdot})^2 = \sum_{j=1}^k n_j (\bar{x}_{\cdot j} - \bar{x}_{\cdot\cdot})^2 + \sum_{j=1}^k \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot j})^2$$

- $\text{SS}_{\text{between}}$: Variation between group means and the grand mean (Degrees of freedom: $k - 1$).
- $\text{SS}_{\text{within}}$: Random variation within each group (Degrees of freedom: $N - k$, where $N = \sum n_j$).

### 4.2 The $F$-Statistic
Compute Mean Squares:
$$\text{MS}_{\text{between}} = \frac{\text{SS}_{\text{between}}}{k - 1}, \qquad \text{MS}_{\text{within}} = \frac{\text{SS}_{\text{within}}}{N - k}$$

The test statistic is the variance ratio:

$$F = \frac{\text{MS}_{\text{between}}}{\text{MS}_{\text{within}}} \sim F_{k - 1, N - k}$$

If group means differ significantly, $\text{MS}_{\text{between}} \gg \text{MS}_{\text{within}}$, producing a large $F$-statistic and rejecting $H_0$.

---

## 5. Multiple Testing Corrections

When testing $m$ hypotheses simultaneously (e.g., monitoring 50 microservice health metrics or testing 20 UI buttons):

### 5.1 The Bonferroni Correction (FWER Control)
Controls the **Family-Wise Error Rate** (probability of making even one false positive):

$$\alpha_{\text{per test}} = \frac{\alpha}{m}$$

If testing $m = 20$ metrics at $\alpha = 0.05$, reject null only if $p \le 0.05 / 20 = 0.0025$. 
*Limitation*: Extremely conservative, leading to high Type II error (missed discoveries).

---

### 5.2 Benjamini-Hochberg Procedure (FDR Control)
Instead of controlling the probability of any error, controls the **False Discovery Rate (FDR)**—the expected proportion of false alarms among all rejected tests:

$$\text{FDR} = E\left[ \frac{\text{False Discoveries}}{\text{Total Discoveries}} \right] \le Q$$

#### The Benjamini-Hochberg (BH) Algorithm:
1. Sort all $m$ calculated $p$-values in ascending order:
   $$p_{(1)} \le p_{(2)} \le \dots \le p_{(m)}$$
2. Find the largest rank $k$ such that:
   $$p_{(k)} \le \frac{k}{m} Q$$
3. Reject the null hypothesis for all tests with ranks $i = 1, 2, \dots, k$.

```
Benjamini-Hochberg Threshold Line:
p-value
 ^                                     .--- (Slope = Q / m)
 |                                  .-'
 |                              _.-'   <-- Reject all points below line!
 |                 *        _.-'
 |            *         _.-'
 |       *          _.-'
-+------+----------+-------------------------> Rank k
 1      2          3                        m
```

---

## 6. Python Implementation: Welch's $t$, ANOVA & FDR Control

```python
import numpy as np
import scipy.stats as stats

def demonstrate_welch_and_anova():
    rng = np.random.default_rng(42)

    # Welch's t-test demonstration: Unequal variances
    group_a = rng.normal(loc=50.0, scale=4.0, size=30)
    group_b = rng.normal(loc=53.0, scale=12.0, size=45)

    # Welch's t-test (equal_var=False)
    t_stat, p_welch = stats.ttest_ind(group_a, group_b, equal_var=False)
    print("=== Welch's t-Test (Unequal Variances) ===")
    print(f"t-statistic: {t_stat:.4f}, p-value: {p_welch:.4f}")

    # One-Way ANOVA across 3 caching strategies
    cache_none = rng.normal(loc=100.0, scale=10.0, size=40)
    cache_redis = rng.normal(loc=45.0, scale=8.0, size=40)
    cache_memcached = rng.normal(loc=43.0, scale=7.0, size=40)

    f_stat, p_anova = stats.f_oneway(cache_none, cache_redis, cache_memcached)
    print("\n=== One-Way ANOVA (3 Caching Groups) ===")
    print(f"F-statistic: {f_stat:.4f}, p-value: {p_anova:.4e}")

def benjamini_hochberg_fdr(p_values: list[float], q: float = 0.05) -> list[bool]:
    """
    Apply Benjamini-Hochberg procedure to control False Discovery Rate at Q.
    Returns boolean array indicating which tests to reject.
    """
    m = len(p_values)
    sorted_indices = np.argsort(p_values)
    sorted_p = np.array(p_values)[sorted_indices]

    # Calculate BH threshold for each rank
    thresholds = (np.arange(1, m + 1) / m) * q
    below_threshold = sorted_p <= thresholds

    rejected = np.zeros(m, dtype=bool)
    if np.any(below_threshold):
        max_k = np.max(np.where(below_threshold)[0])
        rejected_sorted_indices = sorted_indices[:max_k + 1]
        rejected[rejected_sorted_indices] = True

    return rejected.tolist()

if __name__ == "__main__":
    demonstrate_welch_and_anova()

    # Simulate 10 hypothesis tests
    p_vals = [0.001, 0.008, 0.039, 0.041, 0.09, 0.15, 0.35, 0.60, 0.72, 0.90]
    bh_rejections = benjamini_hochberg_fdr(p_vals, q=0.05)
    print("\n=== Multiple Testing: Benjamini-Hochberg FDR (Q=0.05) ===")
    for p, rej in zip(p_vals, bh_rejections):
        print(f"p-val: {p:<6.4f} -> Reject Null: {rej}")
```

---

## 7. Key Takeaways

1. **Default to Welch's $t$**: Never assume equal variances; Welch's $t$-test is robust under all conditions.
2. **Paired Tests Boost Power**: When evaluating before/after metrics on the same subjects, use paired testing to cancel inter-subject noise.
3. **Control Multiplicity**: Never run repeated $t$-tests across many variants; use ANOVA followed by Benjamini-Hochberg FDR control.
