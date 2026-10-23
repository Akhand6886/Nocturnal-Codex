---
title: "Descriptive Statistics & Data Summaries"
description: "Measures of central tendency, dispersion metrics, breakdown points, robust statistics (IQR, MAD), skewness, kurtosis, and Q-Q plot diagnostics."
---

## 1. Summarizing Empirical Data

Before applying parametric modeling or running hypothesis tests, engineers must characterize raw observational data. In systems telemetry, user telemetry, and performance profiling, datasets are rarely idealized bell curves—they are heavily skewed, bounded, multimodal, or contaminated by measurement noise and network timeouts.

```
+-----------------------------------------------------------------------------------------+
|                                  THE TAXONOMY OF DESCRIPTIVE METRICS                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  LOCATION (CENTRAL TENDENCY):                                                           |
|  - Arithmetic Mean:   sum(x_i) / n             (Breakdown point: 0% - very fragile!)    |
|  - Trimmed Mean:      Discard top/bottom alpha% (Breakdown point: alpha%)               |
|  - Median:            50th percentile          (Breakdown point: 50% - maximally robust)|
|                                                                                         |
|  DISPERSION (SCALE):                                                                    |
|  - Sample Variance:   sum((x_i - mean)^2)/(n-1)(Quadratic penalty on outliers)          |
|  - Interquartile Range: Q3 - Q1                (Middle 50% spread)                      |
|  - Median Absolute Deviation (MAD): med(|x_i - med(X)|) (Optimal robust scale)          |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Measures of Central Tendency

### 2.1 The Arithmetic Mean
For a sample $\mathbf{x} = (x_1, x_2, \dots, x_n)$:

$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i$$

- **Mathematical Property**: The sample mean minimizes the sum of squared Euclidean errors:
  $$\bar{x} = \arg\min_{c \in \mathbb{R}} \sum_{i=1}^n (x_i - c)^2$$
- **Engineering Vulnerability**: A single infinite outlier $x_n \to \infty$ pulls $\bar{x} \to \infty$. Its **breakdown point** is $\epsilon^* = \frac{1}{n} \to 0$.

### 2.2 The Sample Median
Sorting the observations $x_{(1)} \le x_{(2)} \le \dots \le x_{(n)}$:

$$\tilde{x} = \begin{cases} x_{\left(\frac{n+1}{2}\right)} & \text{if } n \text{ is odd} \\ \frac{1}{2}\left(x_{\left(\frac{n}{2}\right)} + x_{\left(\frac{n}{2} + 1\right)}\right) & \text{if } n \text{ is even} \end{cases}$$

- **Mathematical Property**: The sample median minimizes the sum of absolute errors ($L_1$ loss):
  $$\tilde{x} = \arg\min_{c \in \mathbb{R}} \sum_{i=1}^n |x_i - c|$$
- **Breakdown Point**: $\epsilon^* = 50\%$. Up to half the dataset can be completely corrupted without shifting the median to infinity.

### 2.3 The $\alpha$-Trimmed Mean
Discards the smallest $\lfloor \alpha n \rfloor$ and largest $\lfloor \alpha n \rfloor$ observations before computing the arithmetic mean:

$$\bar{x}_\alpha = \frac{1}{n - 2k} \sum_{i=k+1}^{n-k} x_{(i)}, \quad k = \lfloor \alpha n \rfloor$$

Commonly used in CPU benchmark suites and network latency profiling ($\alpha = 5\%$) to eliminate cache warm-up spikes and garbage collection pauses.

---

## 3. Measures of Dispersion & Robust Scale

### 3.1 Sample Variance & Standard Deviation
The sample variance $s^2$ measures average squared deviations from the sample mean:

$$s^2 = \frac{1}{n - 1} \sum_{i=1}^n (x_i - \bar{x})^2$$

The denominator uses $n - 1$ instead of $n$ (**Bessel's Correction**) to ensure an unbiased estimator of the true population variance ($E[s^2] = \sigma^2$).

### 3.2 Interquartile Range (IQR)
The difference between the 75th percentile ($Q_3$) and the 25th percentile ($Q_1$):

$$\text{IQR} = Q_3 - Q_1$$

In standard Tukey box plots, observations outside the range $[Q_1 - 1.5 \cdot \text{IQR}, Q_3 + 1.5 \cdot \text{IQR}]$ are flagged as potential outliers.

### 3.3 Median Absolute Deviation (MAD)
The median of the absolute differences between the data points and the sample median:

$$\text{MAD} = \text{median}\left( |x_i - \tilde{x}| \right)$$

To serve as a consistent estimator of the standard deviation $\sigma$ for normally distributed data, MAD is scaled by the consistency factor $1 / \Phi^{-1}(0.75) \approx 1.4826$:

$$\hat{\sigma}_{\text{MAD}} = 1.4826 \times \text{MAD}$$

`MAD` has a maximal breakdown point of $50\%$, making it the gold standard for robust anomaly detection in observability pipelines (e.g. Datadog, Prometheus).

---

## 4. Quantiles & Percentiles in Production Observability

In web service level agreements (SLAs), uptime and performance are defined by high quantiles ($p95, p99, p99.9$):
- **$p50$ (Median)**: The typical user experience.
- **$p99$**: Tail latency experienced by 1 out of every 100 requests.

```
Request Latency Density (Heavy Right Tail):
f(latency)
 ^
 |    *
 |   * *     <-- p50 = 25 ms
 |  *   *
 | *     *        <-- Mean = 68 ms (skewed by tail!)
 |*       *
 |         *                  <-- p95 = 210 ms
 |          *                                      <-- p99 = 1,450 ms !
-+-----------+--------+---------------+--------------------+---------> Latency (ms)
 0          25       68              210                  1450
```

> **The Distributed Amplification Effect**:
> If a single user request requires fan-out queries to $k = 100$ internal microservice backends, the probability that the user experiences at least one $p99$ backend latency is:
> $$P(\text{User hits } \ge 1 \text{ slow backend}) = 1 - (1 - 0.01)^{100} = 1 - 0.366 = 0.634 \quad (63.4\% !)$$
> Even though individual servers run at $p99$, almost two-thirds of user requests suffer severe degradation! This is why $p99$ latency optimization is critical.

---

## 5. Diagnostic Plots: Quantile-Quantile (Q-Q) Plots

How do we mathematically verify whether an empirical dataset originates from a theoretical distribution (such as a Gaussian $\mathcal{N}(\mu, \sigma^2)$)?

A **Q-Q Plot** graphs the ordered empirical quantiles against the theoretical quantiles of the reference distribution:

$$(q_{\text{theoretical}}^{(i)}, x_{(i)}), \quad i = 1, 2, \dots, n$$

where $q_{\text{theoretical}}^{(i)} = F^{-1}\left(\frac{i - 0.5}{n}\right)$.

```
Q-Q Plot Diagnostic Signatures:
1. Normal Distribution:               2. Heavy Tails (Fat Tailed):
   Empirical                             Empirical
       ^        /                            ^           /
       |       /                             |          /
       |      /                              |       .-'
       |     /                               |    .-'
       |    /                                | .-'
       +---------> Theoretical               +---------> Theoretical
       Points form a straight line.          "S-curve" deviating at extremes.
```

---

## 6. Python Implementation: Robust Summaries & Q-Q Diagnostics

```python
import numpy as np
import scipy.stats as stats

def compute_robust_telemetry_summary(latencies: np.ndarray) -> dict[str, float]:
    """
    Compute comprehensive classical vs robust summary statistics
    for high-skew production request telemetry.
    """
    mean = np.mean(latencies)
    std = np.std(latencies, ddof=1)
    
    # Quantiles
    p50, p90, p95, p99 = np.percentile(latencies, [50, 90, 95, 99])
    iqr = stats.iqr(latencies)
    
    # Robust Median Absolute Deviation (scaled for normal consistency)
    mad = stats.median_abs_deviation(latencies, scale='normal')

    # Trimmed mean (5% on each tail)
    trimmed_mean = stats.trim_mean(latencies, proportiontocut=0.05)

    return {
        "Sample Mean (ms)": mean,
        "Trimmed Mean 5% (ms)": trimmed_mean,
        "Median p50 (ms)": p50,
        "p95 Latency (ms)": p95,
        "p99 Latency (ms)": p99,
        "Sample StdDev (ms)": std,
        "IQR (ms)": iqr,
        "Robust MAD Sigma (ms)": mad,
    }

def demonstrate_robustness():
    rng = np.random.default_rng(42)
    # 99.5% clean normal traffic (mean=30ms, std=5ms)
    clean = rng.normal(loc=30.0, scale=5.0, size=9950)
    # 0.5% garbage collection timeout spikes (1,000ms - 5,000ms)
    outliers = rng.uniform(low=1000.0, high=5000.0, size=50)
    data = np.concatenate([clean, outliers])

    summary = compute_robust_telemetry_summary(data)
    print("=== Production Telemetry Summary (0.5% Severe Outliers) ===")
    for metric, value in summary.items():
        print(f"{metric:<24}: {value:.2f}")

    # Notice how Mean (44.6ms) is inflated by 48% due to only 0.5% outliers,
    # while Median (30.0ms) and MAD (4.98ms) are completely immune!

if __name__ == "__main__":
    demonstrate_robustness()
```

---

## 7. Key Takeaways

1. **Breakdown Points Matter**: The sample mean breaks down with 1 corrupted observation ($0\%$); the median and MAD tolerate up to $50\%$ corrupted data.
2. **Never Average Percentiles**: Averaging $p99$ across multiple nodes is mathematically invalid; percentiles must be computed across the pooled distribution (or using algorithms like t-digest / DDSketch).
3. **Q-Q Plots for Normality**: Use Q-Q plots to inspect tail behavior before applying parametric tests that assume normality.
