---
title: "Sampling Distributions & Standard Error"
description: "Population vs sample, Bessel's correction proof, Standard Error of the Mean, Student's t, Chi-square, and F distributions."
---

## 1. The Bridge from Sample to Population

In statistical inference, we never observe the full theoretical population $\mathcal{P}$. Instead, we gather a finite sample $\mathcal{S} = \{x_1, x_2, \dots, x_n\}$. 

Every statistic we compute from data (such as the sample mean $\bar{x}$ or sample variance $s^2$) is itself a **random variable**. If we repeated the experiment 1,000 times, we would obtain 1,000 different sample means. 

The probability distribution of a statistic over repeated random sampling is its **Sampling Distribution**.

```
+-----------------------------------------------------------------------------------------+
|                                POPULATION VS SAMPLE TAXONOMY                            |
+-----------------------------------------------------------------------------------------+
|  Metric               Population Parameter (Fixed, Unknown)   Sample Statistic (Random) |
|  -------------------------------------------------------------------------------------  |
|  Mean                 mu                                      \bar{x}                   |
|  Variance             sigma^2                                 s^2                       |
|  Standard Deviation   sigma                                   s                         |
|  Proportion           p                                       \hat{p}                   |
|  Size                 N (Infinite / Massive)                  n (Observed subset)       |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Standard Error of the Mean (SE) vs. Standard Deviation (SD)

A ubiquitous mistake in engineering reports is confusing **Standard Deviation ($\sigma$ or $s$)** with **Standard Error ($\text{SE}$)**:
- **Standard Deviation ($s$)**: Measures the natural variability of individual data points in the population. It does NOT shrink as sample size $n$ increases.
- **Standard Error ($\text{SE}$)**: Measures the precision of the estimated sample mean $\bar{x}$. It shrinks inversely with $\sqrt{n}$.

### The Standard Error Formula
$$\text{SE}(\bar{x}) = \frac{\sigma}{\sqrt{n}} \approx \frac{s}{\sqrt{n}}$$

```
Sample Size n    Estimated Mean x_bar    Std Dev s (Spread of data)    Std Error SE (Uncertainty of mean)
n = 100          150 ms                  30 ms                         30 / sqrt(100) = 3.00 ms
n = 10,000       150 ms                  30 ms                         30 / sqrt(10000) = 0.30 ms
n = 1,000,000    150 ms                  30 ms                         30 / sqrt(1000000) = 0.03 ms
```

To cut uncertainty in half, you must quadruple the sample size ($4n$).

---

## 3. Bessel's Correction: Why Divide by $(n - 1)$?

When computing sample variance, the naive formula $\frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})^2$ systematically **underestimates** the true population variance $\sigma^2$. To make the estimator unbiased, we divide by $n - 1$.

### Formal Mathematical Proof:
Let $x_1, \dots, x_n$ be i.i.d. random variables with true mean $\mu$ and true variance $\sigma^2$.
Let $S_{\text{naive}}^2 = \frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})^2$.

1. Rewrite the deviation using the true mean $\mu$:
   $$x_i - \bar{x} = (x_i - \mu) - (\bar{x} - \mu)$$
2. Square both sides:
   $$(x_i - \bar{x})^2 = (x_i - \mu)^2 - 2(x_i - \mu)(\bar{x} - \mu) + (\bar{x} - \mu)^2$$
3. Sum over all $i = 1, \dots, n$:
   $$\sum_{i=1}^n (x_i - \bar{x})^2 = \sum_{i=1}^n (x_i - \mu)^2 - 2(\bar{x} - \mu) \sum_{i=1}^n (x_i - \mu) + n(\bar{x} - \mu)^2$$
   Since $\sum_{i=1}^n (x_i - \mu) = n(\bar{x} - \mu)$:
   $$\sum_{i=1}^n (x_i - \bar{x})^2 = \sum_{i=1}^n (x_i - \mu)^2 - 2n(\bar{x} - \mu)^2 + n(\bar{x} - \mu)^2 = \sum_{i=1}^n (x_i - \mu)^2 - n(\bar{x} - \mu)^2$$
4. Take expectations of both sides:
   $$E\left[ \sum_{i=1}^n (x_i - \bar{x})^2 \right] = \sum_{i=1}^n E[(x_i - \mu)^2] - n E[(\bar{x} - \mu)^2]$$
   Notice that $E[(x_i - \mu)^2] = \sigma^2$, and $E[(\bar{x} - \mu)^2] = \text{Var}(\bar{x}) = \frac{\sigma^2}{n}$:
   $$E\left[ \sum_{i=1}^n (x_i - \bar{x})^2 \right] = n\sigma^2 - n\left(\frac{\sigma^2}{n}\right) = n\sigma^2 - \sigma^2 = (n - 1)\sigma^2$$
5. Divide by $n$:
   $$E[S_{\text{naive}}^2] = \frac{n - 1}{n} \sigma^2 \neq \sigma^2 \quad (\text{Biased by factor } \frac{n-1}{n}!)$$
6. Therefore, the unbiased sample variance estimator is:
   $$s^2 = \frac{1}{n - 1} \sum_{i=1}^n (x_i - \bar{x})^2 \implies E[s^2] = \frac{1}{n-1} (n - 1)\sigma^2 = \sigma^2 \quad \blacksquare$$

> **Degrees of Freedom**: We lose 1 degree of freedom because the residuals $(x_i - \bar{x})$ must sum to 0 ($\sum (x_i - \bar{x}) = 0$). Once $n - 1$ residuals are known, the last residual is fixed.

---

## 4. Fundamental Sampling Distributions

### 4.1 Chi-Square Distribution ($\chi^2_\nu$)
Let $Z_1, Z_2, \dots, Z_\nu \sim \mathcal{N}(0, 1)$ be independent standard normal random variables. The sum of their squares follows a **Chi-Square distribution with $\nu$ degrees of freedom**:

$$V = \sum_{i=1}^\nu Z_i^2 \sim \chi^2_\nu$$

- **Mean**: $E[V] = \nu$
- **Variance**: $\text{Var}(V) = 2\nu$
- **Sampling Theorem**: If $x_1, \dots, x_n \sim \mathcal{N}(\mu, \sigma^2)$, then:
  $$\frac{(n - 1)s^2}{\sigma^2} \sim \chi^2_{n - 1}$$

---

### 4.2 Student's $t$-Distribution ($t_\nu$)
When the true population standard deviation $\sigma$ is unknown, we substitute the sample standard deviation $s$. 
The standardized quantity no longer follows a Normal distribution! It follows **Student's $t$-distribution**:

$$T = \frac{\bar{x} - \mu}{s / \sqrt{n}} \sim t_{n - 1}$$

Mathematically, a $t$-distribution is defined as the ratio of an independent standard normal variable to the square root of a scaled chi-square variable:

$$T = \frac{Z}{\sqrt{V / \nu}}, \quad Z \sim \mathcal{N}(0, 1), \quad V \sim \chi^2_\nu$$

```
Normal vs Student's t (Heavy Tails):
Density
 ^
 |             _.-'""'-._            -- Normal N(0, 1)
 |           .'    ||    '.          .. Student's t (df=3)
 |          /     .||.     \
 |        .'     : || :     '.
 |     .-'      :  ||  :      '-.
-+----+--------+---+----+--------+-----> t
     -3       -1   0    1        3
               Heavy tails absorb uncertainty from estimating s!
               As df -> infinity, t_df converges exactly to N(0, 1).
```

---

### 4.3 Snedecor's $F$-Distribution ($F_{\nu_1, \nu_2}$)
The ratio of two independent, scaled Chi-Square random variables:

$$F = \frac{V_1 / \nu_1}{V_2 / \nu_2} \sim F_{\nu_1, \nu_2}, \quad V_1 \sim \chi^2_{\nu_1}, \quad V_2 \sim \chi^2_{\nu_2}$$

- **Core Use Case**: Comparing the ratio of two sample variances ($s_1^2 / s_2^2$) in ANOVA and regression $F$-tests.

---

## 5. Python Implementation: Verifying Bessel's Correction & Sampling

```python
import numpy as np

def verify_bessels_correction(n_experiments: int = 100_000, sample_size: int = 5):
    """
    Monte Carlo simulation demonstrating that dividing by n systematically
    underestimates variance, while (n - 1) is strictly unbiased.
    """
    true_mean = 10.0
    true_variance = 4.0  # true_sigma = 2.0
    rng = np.random.default_rng(42)

    # Draw n_experiments batches of sample_size
    samples = rng.normal(loc=true_mean, scale=np.sqrt(true_variance), size=(n_experiments, sample_size))

    # Naive variance: divide by n (ddof=0)
    naive_vars = np.var(samples, axis=1, ddof=0)
    # Bessel-corrected variance: divide by n - 1 (ddof=1)
    unbiased_vars = np.var(samples, axis=1, ddof=1)

    mean_naive = np.mean(naive_vars)
    mean_unbiased = np.mean(unbiased_vars)

    expected_naive = ((sample_size - 1) / sample_size) * true_variance

    print(f"Sample Size n = {sample_size}, True Population Variance = {true_variance:.4f}")
    print("-----------------------------------------------------------------")
    print(f"Naive Var (divide by n):        {mean_naive:.4f} (Expected: {expected_naive:.4f})")
    print(f"Bessel Var (divide by n - 1):   {mean_unbiased:.4f} (Expected: {true_variance:.4f})")
    print(f"Empirical Bias of Naive:        {mean_naive - true_variance:+.4f}")

    assert np.isclose(mean_unbiased, true_variance, atol=0.02), "Bessel correction failed to unbias!"

if __name__ == "__main__":
    verify_bessels_correction()
```

---

## 6. Key Takeaways

1. **SD vs SE**: Standard deviation describes data spread; standard error describes estimator precision ($\sigma / \sqrt{n}$).
2. **Bessel's Correction**: Dividing by $n - 1$ compensates for centering around the sample mean $\bar{x}$ instead of the true mean $\mu$.
3. **Student's $t$ for Finite Samples**: Whenever sample size is moderate ($n < 30$) and $\sigma$ is estimated via $s$, use Student's $t$ to account for heavier tails.
