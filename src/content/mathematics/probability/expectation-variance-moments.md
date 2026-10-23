---
title: "Expectation, Moments & Generating Functions"
description: "Linearity of expectation, higher-order moments, covariance matrices, Cauchy-Schwarz inequality, Moment Generating Functions (MGFs), and characteristic functions."
---

## 1. The Algebra of Moments

While a probability distribution's full density or mass function provides exhaustive information, in software systems and engineering we frequently summarize random variables using their **moments**: location (expectation), scale (variance), asymmetry (skewness), and tail heaviness (kurtosis).

```
+-----------------------------------------------------------------------------------------+
|                                    THE FOUR MOMENTS OF A DISTRIBUTION                   |
+-----------------------------------------------------------------------------------------+
|  1st Moment: EXPECTATION (mu)    --> Center of gravity / Balance point                  |
|  2nd Moment: VARIANCE (sigma^2)  --> Dispersion / Energy around the mean                |
|  3rd Moment: SKEWNESS (gamma_1)  --> Direction and degree of asymmetry                  |
|  4th Moment: KURTOSIS (gamma_2)  --> Outlier frequency / Tail heaviness                 |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Linearity of Expectation

### The Fundamental Theorem
For any random variables $X_1, X_2, \dots, X_n$ (whether independent or arbitrary dependent) and constants $a_1, a_2, \dots, a_n, c \in \mathbb{R}$:

$$E\left[ \sum_{i=1}^n a_i X_i + c \right] = \sum_{i=1}^n a_i E[X_i] + c$$

*Why this is profound in Computer Science*:
Computing the joint distribution of dependent random variables often requires exponential time ($O(2^n)$). However, computing the expected sum requires only computing individual expectations and adding them together ($O(n)$).

### Classic Application: Counting Inversions in Sorting
In an array $A$ of $n$ distinct randomly permuted elements, let $I_{i, j}$ be an indicator variable equal to $1$ if $A[i] > A[j]$ for $i < j$, and $0$ otherwise.
For any pair $(i, j)$ with $i < j$, by symmetry:
$$P(A[i] > A[j]) = \frac{1}{2} \implies E[I_{i, j}] = \frac{1}{2}$$
The total number of inversions is $X = \sum_{i < j} I_{i, j}$. Even though the indicators are heavily dependent, linearity of expectation applies directly:
$$E[X] = E\left[ \sum_{i < j} I_{i, j} \right] = \sum_{i < j} E[I_{i, j}] = \binom{n}{2} \cdot \frac{1}{2} = \frac{n(n-1)}{4}$$
This mathematically establishes the average-case $O(n^2)$ comparison bound for Insertion Sort.

---

## 3. Higher-Order Moments

Let $X$ be a random variable with mean $\mu = E[X]$:
1. **$k$-th Raw Moment**:
   $$\alpha_k = E[X^k]$$
2. **$k$-th Central Moment**:
   $$\mu_k = E[(X - \mu)^k]$$

### 3.1 Skewness (Asymmetry)
The standardized third central moment measures asymmetry around the mean:

$$\tilde{\mu}_3 = E\left[ \left(\frac{X - \mu}{\sigma}\right)^3 \right] = \frac{\mu_3}{\sigma^3}$$

- $\tilde{\mu}_3 = 0$: Symmetric distribution (e.g., Gaussian, Uniform).
- $\tilde{\mu}_3 > 0$: Right-skewed (heavy right tail, e.g., web request latency where most requests finish in 10ms but outliers take 2000ms).
- $\tilde{\mu}_3 < 0$: Left-skewed (heavy left tail).

### 3.2 Kurtosis (Tail Heaviness)
The standardized fourth central moment:

$$\tilde{\mu}_4 = E\left[ \left(\frac{X - \mu}{\sigma}\right)^4 \right] = \frac{\mu_4}{\sigma^4}$$

**Excess Kurtosis** is defined relative to the normal distribution ($\kappa_{\text{Normal}} = 3$):
$$\text{Excess Kurtosis} = \tilde{\mu}_4 - 3$$
- **Leptokurtic** ($\tilde{\mu}_4 > 3$): Heavy tails with high frequency of extreme outliers (e.g., Student's $t$, financial returns).
- **Platykurtic** ($\tilde{\mu}_4 < 3$): Thin tails with few outliers (e.g., Uniform).

---

## 4. Covariance & Correlation

### 4.1 Covariance
Measures the joint linear variability of two random variables:

$$\text{Cov}(X, Y) = E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]E[Y]$$

#### Properties of Covariance:
1. $\text{Cov}(X, X) = \text{Var}(X)$.
2. $\text{Cov}(X, Y) = \text{Cov}(Y, X)$ (Symmetry).
3. $\text{Cov}(aX + b, cY + d) = ac \cdot \text{Cov}(X, Y)$ (Bilinearity).
4. If $X \perp\!\!\!\perp Y$, then $\text{Cov}(X, Y) = 0$.

### 4.2 Pearson Correlation Coefficient
Normalizes covariance by the product of standard deviations:

$$\rho_{X, Y} = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y}$$

By the **Cauchy-Schwarz Inequality** for random variables:
$$(E[(X - \mu_X)(Y - \mu_Y)])^2 \le E[(X - \mu_X)^2] E[(Y - \mu_Y)^2] \implies |\text{Cov}(X, Y)| \le \sigma_X \sigma_Y$$
Therefore, the correlation is strictly bounded:

$$-1 \le \rho_{X, Y} \le 1$$

---

## 5. Variance of Sums & Covariance Matrix

For a linear combination of random variables $S = \sum_{i=1}^n a_i X_i$:

$$\text{Var}(S) = \sum_{i=1}^n a_i^2 \text{Var}(X_i) + 2 \sum_{1 \le i < j \le n} a_i a_j \text{Cov}(X_i, X_j)$$

In vector notation, let $\mathbf{X} = (X_1, \dots, X_n)^T$ with **Covariance Matrix** $\mathbf{\Sigma} \in \mathbb{R}^{n \times n}$:
$$\mathbf{\Sigma}_{ij} = \text{Cov}(X_i, X_j)$$
For any weight vector $\mathbf{a} \in \mathbb{R}^n$:
$$\text{Var}(\mathbf{a}^T \mathbf{X}) = \mathbf{a}^T \mathbf{\Sigma} \mathbf{a}$$
Since variance is non-negative, $\mathbf{a}^T \mathbf{\Sigma} \mathbf{a} \ge 0$ for all $\mathbf{a}$, proving that **every covariance matrix is Symmetric and Positive Semi-Definite (SPSD)**.

---

## 6. Moment Generating Functions (MGF)

The **Moment Generating Function** of a random variable $X$ is defined for $t \in \mathbb{R}$ as:

$$M_X(t) = E[e^{tX}]$$

### 6.1 Generating Moments via Differentiation
Expanding $e^{tX}$ using its Maclaurin series:

$$M_X(t) = E\left[ \sum_{k=0}^\infty \frac{(tX)^k}{k!} \right] = \sum_{k=0}^\infty \frac{t^k}{k!} E[X^k] = 1 + tE[X] + \frac{t^2}{2!} E[X^2] + \frac{t^3}{3!} E[X^3] + \dots$$

Differentiating $k$ times with respect to $t$ and evaluating at $t = 0$:

$$E[X^k] = \left. \frac{d^k M_X(t)}{dt^k} \right|_{t=0} = M_X^{(k)}(0)$$

### 6.2 Key Properties of MGFs
1. **Uniqueness Theorem**: If two random variables have identical MGFs in an open neighborhood around $t = 0$, they have identical probability distributions.
2. **Sums of Independent Variables**: If $X$ and $Y$ are independent, the MGF of their sum is the product of their MGFs:
   $$M_{X+Y}(t) = E[e^{t(X+Y)}] = E[e^{tX} e^{tY}] = E[e^{tX}] E[e^{tY}] = M_X(t) \cdot M_Y(t)$$

> In distributed computing, the distribution of the sum of independent execution stages can be found by simply multiplying their MGFs and computing the inverse transform.

---

## 7. Python Implementation: Moments, Covariance & MGF

```python
import numpy as np
import scipy.stats as stats

def compute_empirical_moments(data: np.ndarray) -> dict[str, float]:
    """Compute the 4 standardized moments of an empirical dataset."""
    n = len(data)
    mean = np.mean(data)
    var = np.var(data, ddof=1)
    std = np.sqrt(var)

    # 3rd and 4th central moments
    z = (data - mean) / std
    skew = np.mean(z ** 3)
    kurtosis = np.mean(z ** 4)  # Pearson kurtosis (3 for normal)
    excess_kurt = kurtosis - 3.0

    return {
        "mean": mean,
        "variance": var,
        "skewness": skew,
        "kurtosis": kurtosis,
        "excess_kurtosis": excess_kurt,
    }

def demonstrate_moments():
    rng = np.random.default_rng(42)
    # Generate right-skewed web request latencies (Lognormal)
    latencies = rng.lognormal(mean=2.5, sigma=0.8, size=200_000)

    m = compute_empirical_moments(latencies)
    print("=== Empirical Moments of Latency Distribution ===")
    for k, v in m.items():
        print(f"{k.capitalize():<18}: {v:.4f}")

    # Covariance Matrix Demonstration
    cpu_usage = latencies * 0.4 + rng.normal(0, 2.0, size=len(latencies))
    cov_matrix = np.cov(latencies, cpu_usage)
    corr_matrix = np.corrcoef(latencies, cpu_usage)

    print("\n=== Covariance Matrix ===")
    print(cov_matrix)
    print(f"\nPearson Correlation: {corr_matrix[0, 1]:.4f}")

if __name__ == "__main__":
    demonstrate_moments()
```

---

## 8. Summary & Reference

1. **Linearity of Expectation Holds Universally**: $E[X + Y] = E[X] + E[Y]$ requires no independence assumptions.
2. **Variance of Sums Requires Covariance**: When variables are correlated, the cross terms $2\text{Cov}(X_i, X_j)$ can dramatically inflate or deflate total variance.
3. **MGF Encodes All Moments**: $M_X(t) = E[e^{tX}]$ uniquely determines the distribution and converts convolution of sums into multiplication.
