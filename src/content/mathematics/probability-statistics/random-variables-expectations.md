---
title: "Expectation, Variance & Tail Bounds"
description: "Linearity of expectation, covariance, Markov's inequality, Chebyshev's inequality, and Chernoff bounds in algorithm analysis."
---

## 1. Expected Value and Linearity of Expectation

The **Expected Value** $E[X]$ of a random variable $X$ is its probability-weighted average:

- **Discrete**: $E[X] = \sum_x x \cdot P(X = x)$
- **Continuous**: $E[X] = \int_{-\infty}^\infty x \cdot f(x) \, dx$

### The Superpower of Linearity of Expectation
For **ANY** two random variables $X$ and $Y$, regardless of whether they are independent or dependent:

$$E[aX + bY + c] = aE[X] + bE[Y] + c$$

$$\mathbb{E}\left[ \sum_{i=1}^n X_i \right] = \sum_{i=1}^n \mathbb{E}[X_i]$$

This theorem is essential in randomized algorithm analysis. For example, in **Coupon Collector's Problem** or analyzing the average-case runtime of **Quicksort** ($O(n \log n)$), indicator variables $I_i$ are summed directly without worrying about complex joint dependencies.

---

## 2. Variance, Covariance, and Correlation

### Variance
Measures the expected squared deviation from the mean:

$$\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$$

$$\text{Var}(aX + b) = a^2 \text{Var}(X)$$

### Covariance
Measures the joint linear variability of two random variables:

$$\text{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]$$

If $X$ and $Y$ are independent, $\text{Cov}(X, Y) = 0$, and $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$.

---

## 3. Probability Tail Bounds in Computer Science

When designing distributed systems, we often need hard mathematical guarantees that a variable will not exceed a failure threshold.

### A. Markov's Inequality (First Moment)
If $X$ is a **non-negative** random variable ($X \ge 0$) and $a > 0$:

$$P(X \ge a) \le \frac{E[X]}{a}$$

*Example*: If average server CPU load is $E[X] = 20\%$, the probability that CPU load exceeds $80\%$ is at most $\frac{20}{80} = 25\%$.

### B. Chebyshev's Inequality (Second Moment)
Uses variance to bound deviations from the mean for any distribution with finite variance $\sigma^2$:

$$P(|X - \mu| \ge k\sigma) \le \frac{1}{k^2}$$

*Example*: The probability that a service latency deviates by more than $3$ standard deviations from the mean is at most $\frac{1}{3^2} \approx 11.1\%$.

### C. Chernoff Bounds (Exponential Moment)
For the sum of independent Bernoulli random variables $X = \sum_{i=1}^n X_i$ with mean $\mu = E[X]$, tail probabilities decay **exponentially**:

$$P(X \ge (1 + \delta)\mu) \le \left( \frac{e^\delta}{(1 + \delta)^{1 + \delta}} \right)^\mu \le \exp\left( -\frac{\delta^2 \mu}{3} \right), \quad 0 < \delta \le 1$$

$$P(X \le (1 - \delta)\mu) \le \exp\left( -\frac{\delta^2 \mu}{2} \right)$$

```
Upper Bound Comparison on Tail Probability P(X ≥ a)
Probability
1.0 ────┐
0.8     │  Markov (Weakest: O(1/a))
0.6     │      \
0.4     │       \     Chebyshev (Moderate: O(1/a²))
0.2     │        \         \
0.0 ────┴─────────┴─────────┴──────────────► Deviation a
                               \ Chernoff (Extremely Tight: O(e⁻ᵃ))
```

Chernoff bounds form the mathematical foundation for proving load balance guarantees in **Consistent Hashing** and determining sample sizes in **Monte Carlo simulations**.

---

## 4. Python Implementation: Verifying Tail Bounds

```python
import numpy as np

def verify_tail_bounds(num_trials: int = 100000):
    # Sum of n=100 fair coin flips ~ Binomial(100, 0.5)
    n, p = 100, 0.5
    samples = np.random.binomial(n, p, size=num_trials)
    
    mu = n * p # Expected value = 50
    sigma = np.sqrt(n * p * (1 - p)) # std = 5
    
    # We want to bound P(X >= 70), deviation = +20 (delta = 0.4)
    threshold = 70
    delta = (threshold - mu) / mu # 0.4
    
    empirical_prob = np.mean(samples >= threshold)
    
    # 1. Markov Bound: E[X] / threshold
    markov_bound = mu / threshold
    
    # 2. Chebyshev Bound: Var[X] / (threshold - mu)^2
    chebyshev_bound = (sigma ** 2) / ((threshold - mu) ** 2)
    
    # 3. Chernoff Bound: exp(-delta^2 * mu / 3)
    chernoff_bound = np.exp(- (delta ** 2) * mu / 3.0)
    
    print(f"Empirical P(X >= {threshold}): {empirical_prob:.6f}")
    print(f"Markov Upper Bound:         {markov_bound:.6f}")
    print(f"Chebyshev Upper Bound:      {chebyshev_bound:.6f}")
    print(f"Chernoff Upper Bound:       {chernoff_bound:.6f}")

verify_tail_bounds()
```
