---
title: "Discrete Random Variables & Distributions"
description: "Formal definition of random variables, PMFs, CDFs, and deep mathematical analysis of Bernoulli, Binomial, Geometric, Hypergeometric, and Poisson distributions."
---

## 1. What is a Random Variable?

In elementary discussions, a "random variable" is often colloquially described as a number whose value varies randomly. Mathematically, this is incorrect: **a random variable is not a variable, nor is it random—it is a deterministic function.**

### Formal Definition
Given a probability space $(\Omega, \mathcal{F}, P)$, a **discrete random variable** $X$ is a measurable function mapping the sample space $\Omega$ to a countable subset of real numbers $\mathcal{X} \subset \mathbb{R}$:

$$X: \Omega \to \mathbb{R}$$

such that for every $x \in \mathbb{R}$, the pre-image $\{\omega \in \Omega : X(\omega) \le x\}$ is an event in $\mathcal{F}$.

```
Sample Space (Omega)                           Real Line (R)
   [ outcome omega_1 ]  -------- X(omega) ------->  [ 0 ]
   [ outcome omega_2 ]  -------- X(omega) ------->  [ 1 ]
   [ outcome omega_3 ]  -------- X(omega) ------->  [ 2 ]
```

---

## 2. Characterizing Discrete Random Variables

### 2.1 Probability Mass Function (PMF)
The PMF $p_X: \mathbb{R} \to [0, 1]$ gives the probability that $X$ takes the exact value $x$:

$$p_X(x) = P(X = x) = P(\{\omega \in \Omega : X(\omega) = x\})$$

A valid PMF must satisfy two axioms:
1. $p_X(x) \ge 0$ for all $x$.
2. $\sum_{x \in \mathcal{X}} p_X(x) = 1$.

### 2.2 Cumulative Distribution Function (CDF)
The CDF $F_X: \mathbb{R} \to [0, 1]$ accumulates probability up to $x$:

$$F_X(x) = P(X \le x) = \sum_{k \le x} p_X(k)$$

Every valid CDF possesses four fundamental properties:
1. **Non-decreasing**: If $a \le b$, then $F_X(a) \le F_X(b)$.
2. **Normalized limits**:
   $$\lim_{x \to -\infty} F_X(x) = 0 \quad \text{and} \quad \lim_{x \to \infty} F_X(x) = 1$$
3. **Right-continuous**:
   $$\lim_{h \to 0^+} F_X(x + h) = F_X(x)$$
4. **Step-function nature**: For discrete variables, $F_X(x)$ is a piecewise constant step function with jumps at points where $p_X(x) > 0$, where the height of each jump is exactly $p_X(x)$.

---

## 3. Fundamental Discrete Distributions

### 3.1 Bernoulli Distribution: $\text{Bernoulli}(p)$
Models a single trial with binary outcome: Success ($1$) with probability $p$, Failure ($0$) with probability $1-p$.

$$p(x) = p^x (1-p)^{1-x}, \quad x \in \{0, 1\}$$

- **Expectation**: $E[X] = 1 \cdot p + 0 \cdot (1-p) = p$
- **Variance**: $\text{Var}(X) = E[X^2] - (E[X])^2 = p - p^2 = p(1-p)$

---

### 3.2 Binomial Distribution: $\text{Binomial}(n, p)$
Models the number of successes in $n$ independent and identically distributed (i.i.d.) Bernoulli trials with success probability $p$.

$$p(k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k \in \{0, 1, 2, \dots, n\}$$

where the binomial coefficient $\binom{n}{k} = \frac{n!}{k!(n-k)!}$ counts all distinct orderings of $k$ successes across $n$ positions.

#### Moments Derivation via Indicator Decomposition:
Express $X = \sum_{i=1}^n I_i$, where each indicator $I_i \sim \text{Bernoulli}(p)$ independently:
$$E[X] = E\left[\sum_{i=1}^n I_i\right] = \sum_{i=1}^n E[I_i] = \sum_{i=1}^n p = np$$
Since trials are independent, variances add directly:
$$\text{Var}(X) = \sum_{i=1}^n \text{Var}(I_i) = \sum_{i=1}^n p(1-p) = np(1-p)$$

---

### 3.3 Geometric Distribution: $\text{Geom}(p)$
Models the number of trials $k$ required until the **first success** occurs in a sequence of independent Bernoulli trials.

$$p(k) = (1-p)^{k-1} p, \quad k \in \{1, 2, 3, \dots\}$$

- **Expectation**: $E[X] = \frac{1}{p}$
- **Variance**: $\text{Var}(X) = \frac{1-p}{p^2}$

#### The Memoryless Property Proof:
The Geometric distribution is the **only** discrete distribution with the memoryless property:

$$P(X > s + t \mid X > s) = P(X > t)$$

*Proof*:
The event $X > k$ means the first $k$ trials were all failures:
$$P(X > k) = (1-p)^k$$
By conditional probability:
$$P(X > s + t \mid X > s) = \frac{P(X > s + t \cap X > s)}{P(X > s)} = \frac{P(X > s + t)}{P(X > s)} = \frac{(1-p)^{s+t}}{(1-p)^s} = (1-p)^t = P(X > t) \quad \blacksquare$$

> **Engineering Meaning**: If an API retry mechanism fails 10 times in a row, the probability that it succeeds on the next attempt is still exactly $p$. Past failures do not "charge up" future success!

---

### 3.4 Hypergeometric Distribution: $\text{Hypergeom}(N, K, n)$
Models the number of successes $k$ in $n$ draws **without replacement** from a finite population of size $N$ containing exactly $K$ successes:

$$p(k) = \frac{\binom{K}{k} \binom{N - K}{n - k}}{\binom{N}{n}}$$

Unlike the Binomial distribution, draws are **dependent** because each draw removes an item, altering the base probability for subsequent draws. When $N \to \infty$, the Hypergeometric converges to $\text{Binomial}(n, K/N)$.

---

### 3.5 Poisson Distribution: $\text{Poisson}(\lambda)$
Models the number of events occurring in a fixed interval of time or space, where events arrive at a constant average rate $\lambda$ independently of time since the last event:

$$p(k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k \in \{0, 1, 2, \dots\}$$

- **Expectation**: $E[X] = \lambda$
- **Variance**: $\text{Var}(X) = \lambda$ (equidispersion property)

#### Derivation: Poisson as the Limit of Binomial
Divide an interval of time into $n$ tiny sub-intervals such that each contains at most one arrival with probability $p = \lambda / n$. The total arrivals $X \sim \text{Binomial}(n, \lambda/n)$. Let $n \to \infty$:

$$\lim_{n \to \infty} \binom{n}{k} \left(\frac{\lambda}{n}\right)^k \left(1 - \frac{\lambda}{n}\right)^{n-k} = \lim_{n \to \infty} \frac{n(n-1)\cdots(n-k+1)}{k!} \frac{\lambda^k}{n^k} \left(1 - \frac{\lambda}{n}\right)^n \left(1 - \frac{\lambda}{n}\right)^{-k}$$

As $n \to \infty$:
1. $\frac{n(n-1)\cdots(n-k+1)}{n^k} \to 1$
2. $\lim_{n \to \infty} \left(1 - \frac{\lambda}{n}\right)^n = e^{-\lambda}$ (Euler's limit)
3. $\left(1 - \frac{\lambda}{n}\right)^{-k} \to 1$

Multiplying the limits:
$$p(k) = \frac{\lambda^k e^{-\lambda}}{k!} \quad \blacksquare$$

```
When to use Poisson vs Binomial:
- Use Binomial when trial count n is known, fixed, and small.
- Use Poisson when n is massive (millions of web users), p is tiny (probability an individual clicks),
  and we only know the aggregate arrival rate lambda = n * p (e.g. 50 requests/second).
```

---

## 4. Summary Matrix of Discrete Distributions

| Distribution | Notation | Support | PMF $p(k)$ | Mean $E[X]$ | Variance $\text{Var}(X)$ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bernoulli** | $\text{Bern}(p)$ | $\{0, 1\}$ | $p^k (1-p)^{1-k}$ | $p$ | $p(1-p)$ |
| **Binomial** | $\text{Bin}(n, p)$ | $\{0, \dots, n\}$ | $\binom{n}{k} p^k (1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| **Geometric** | $\text{Geom}(p)$ | $\{1, 2, \dots\}$ | $(1-p)^{k-1} p$ | $\frac{1}{p}$ | $\frac{1-p}{p^2}$ |
| **Poisson** | $\text{Pois}(\lambda)$ | $\{0, 1, \dots\}$ | $\frac{\lambda^k e^{-\lambda}}{k!}$ | $\lambda$ | $\lambda$ |

---

## 5. Python Implementation: Simulating Discrete Processes

```python
import numpy as np
import scipy.stats as stats

def compare_binomial_poisson():
    """
    Demonstrate convergence of Binomial(n, p) to Poisson(lambda)
    for high n and low p.
    """
    n = 10_000
    p = 0.0005
    lam = n * p  # lambda = 5.0
    
    k_vals = np.arange(0, 15)
    binom_pmf = stats.binom.pmf(k_vals, n, p)
    poiss_pmf = stats.poisson.pmf(k_vals, lam)
    
    print(f"{'k':<4} | {'Binomial PMF':<15} | {'Poisson PMF':<15} | {'Absolute Error':<15}")
    print("-" * 55)
    for k, b, poi in zip(k_vals, binom_pmf, poiss_pmf):
        err = abs(b - poi)
        print(f"{k:<4} | {b:<15.6f} | {poi:<15.6f} | {err:<15.6e}")

def simulate_geometric_memoryless():
    """
    Simulate Geometric distribution to empirically verify memorylessness:
    P(X > s + t | X > s) == P(X > t).
    """
    p = 0.15
    s, t = 4, 3
    trials = 500_000
    
    rng = np.random.default_rng(42)
    # Geometric draws (number of trials until 1st success)
    draws = rng.geometric(p, size=trials)
    
    # Event: X > s
    condition_mask = draws > s
    # Sub-event: X > s + t given X > s
    conditional_prob = np.mean(draws[condition_mask] > (s + t))
    
    # Unconditional: P(X > t)
    unconditional_prob = np.mean(draws > t)
    
    print(f"\nP(X > {s + t} | X > {s}) = {conditional_prob:.4f}")
    print(f"P(X > {t})              = {unconditional_prob:.4f}")
    assert np.isclose(conditional_prob, unconditional_prob, atol=1e-2), "Memorylessness check failed!"

if __name__ == "__main__":
    compare_binomial_poisson()
    simulate_geometric_memoryless()
```

---

## 6. Key Takeaways

1. **Random Variables are Functions**: A random variable maps outcomes in $\Omega$ to real numbers.
2. **PMF vs CDF**: The PMF computes discrete point masses; the CDF computes cumulative probabilities.
3. **Memorylessness**: The Geometric distribution has no memory of past failures.
4. **Poisson Limit**: Use Poisson whenever modeling rare events across massive opportunities ($n \to \infty, p \to 0, np = \lambda$).
