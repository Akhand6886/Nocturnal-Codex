---
title: "Limit Theorems: LLN & Central Limit Theorem"
description: "Modes of probabilistic convergence, the Weak and Strong Laws of Large Numbers, the Central Limit Theorem (CLT) proof, and Monte Carlo integration rates."
---

## 1. Asymptotics: Order from Random Chaos

Individual random trials are inherently unpredictable. However, when independent random trials are aggregated across large numbers ($n \to \infty$), macroscopic determinism emerges.

The two master pillars governing this transformation are:
1. **The Law of Large Numbers (LLN)**: Sample averages converge to their true theoretical expectation.
2. **The Central Limit Theorem (CLT)**: The standardized distribution of sums of independent variables converges to a universal Gaussian bell curve, regardless of the underlying distribution's shape!

```
+-----------------------------------------------------------------------------------------+
|                                    MODES OF CONVERGENCE                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       Almost Sure Convergence (a.s.)  =======>  Convergence in Probability (P)          |
|                   ||                                           ||                       |
|                   || (L2 bounded)                              ||                       |
|                   v                                            v                        |
|       Mean Square Convergence (L2)    =======>  Convergence in Distribution (d)         |
|                                                 (Weakest: CDFs converge)                |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Four Modes of Probabilistic Convergence

Let $X_1, X_2, \dots$ be a sequence of random variables, and let $X$ be a target random variable:

### 2.1 Convergence in Probability ($X_n \xrightarrow{P} X$)
For every arbitrarily small $\epsilon > 0$:

$$\lim_{n \to \infty} P(|X_n - X| \ge \epsilon) = 0$$

The probability of observing an outlier larger than $\epsilon$ evaporates to zero.

### 2.2 Almost Sure Convergence ($X_n \xrightarrow{a.s.} X$)
$$P\left( \lim_{n \to \infty} X_n = X \right) = 1$$

Except for a subset of outcomes of total measure zero, every realization trajectory converges point-wise as a standard sequence of real numbers.

### 2.3 Convergence in Mean Square ($X_n \xrightarrow{L^2} X$)
$$\lim_{n \to \infty} E[(X_n - X)^2] = 0$$

The expected squared error shrinks to zero (fundamental for Kalman filters and gradient descent convergence).

### 2.4 Convergence in Distribution ($X_n \xrightarrow{d} X$)
Let $F_n(x) = P(X_n \le x)$ and $F(x) = P(X \le x)$. Then:

$$\lim_{n \to \infty} F_n(x) = F(x)$$

for all points $x$ where the target CDF $F$ is continuous. The variables themselves do not need to be close to each other, but their accumulated probability curves become identical.

---

## 3. The Law of Large Numbers (LLN)

Let $X_1, X_2, \dots, X_n$ be independent and identically distributed (i.i.d.) random variables with mean $\mu = E[X_i]$. Define the sample average:

$$\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i$$

### 3.1 The Weak Law of Large Numbers (WLLN)
For any $\epsilon > 0$:

$$\lim_{n \to \infty} P(|\bar{X}_n - \mu| \ge \epsilon) = 0 \quad \left(\bar{X}_n \xrightarrow{P} \mu\right)$$

#### Proof via Chebyshev's Inequality:
Assume finite variance $\sigma^2 < \infty$.
1. $E[\bar{X}_n] = \frac{1}{n} \sum_{i=1}^n E[X_i] = \mu$.
2. Because the variables are independent, their variances add directly:
   $$\text{Var}(\bar{X}_n) = \text{Var}\left(\frac{1}{n} \sum_{i=1}^n X_i\right) = \frac{1}{n^2} \sum_{i=1}^n \text{Var}(X_i) = \frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}$$
3. Applying Chebyshev's inequality to $\bar{X}_n$:
   $$P(|\bar{X}_n - \mu| \ge \epsilon) \le \frac{\text{Var}(\bar{X}_n)}{\epsilon^2} = \frac{\sigma^2}{n \epsilon^2}$$
4. Taking the limit as $n \to \infty$:
   $$\lim_{n \to \infty} P(|\bar{X}_n - \mu| \ge \epsilon) \le \lim_{n \to \infty} \frac{\sigma^2}{n \epsilon^2} = 0 \quad \blacksquare$$

---

### 3.2 The Strong Law of Large Numbers (SLLN)
With probability 1:

$$P\left( \lim_{n \to \infty} \bar{X}_n = \mu \right) = 1 \quad \left(\bar{X}_n \xrightarrow{a.s.} \mu\right)$$

*Physical Meaning*: If you record an infinite sequence of coin flips, the sequence of running averages will never again deviate outside $(\mu - \epsilon, \mu + \epsilon)$ beyond some finite step $N$.

---

## 4. The Central Limit Theorem (CLT)

The Law of Large Numbers tells us that $\bar{X}_n \to \mu$. The Central Limit Theorem answers the next fundamental question: **What does the error distribution $(\bar{X}_n - \mu)$ look like, and how fast does it shrink?**

### Lindeberg-Lévy CLT Theorem
Let $X_1, X_2, \dots, X_n$ be i.i.d. random variables with mean $\mu$ and finite variance $\sigma^2 > 0$. Let $S_n = \sum_{i=1}^n X_i$.

As $n \to \infty$, the standardized sample mean converges in distribution to the **Standard Normal Distribution**:

$$Z_n = \frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} = \frac{\sum_{i=1}^n X_i - n\mu}{\sigma \sqrt{n}} \xrightarrow{d} \mathcal{N}(0, 1)$$

$$\lim_{n \to \infty} P\left( \frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \le z \right) = \Phi(z) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^z e^{-t^2 / 2} \, dt$$

```
Universal Convergence to Gaussian:
Individual Distribution        Sum of n=3               Sum of n=30
   Uniform / Exponential       Rounded Triangles        Perfect Gaussian Curve
      |-----|                      /\                        _.-'-._
      |     |                     /  \                     .'       '.
      +-----+                    /    \                   /           \
```

---

### Proof Sketch via Characteristic Functions
Let $Y_i = \frac{X_i - \mu}{\sigma}$, so $E[Y_i] = 0$ and $\text{Var}(Y_i) = 1$.
The standardized sum is $Z_n = \frac{1}{\sqrt{n}} \sum_{i=1}^n Y_i$.

1. The characteristic function of $Y_i$ is $\phi_Y(t) = E[e^{itY}]$. Using Taylor series expansion around $t = 0$:
   $$\phi_Y(t) = 1 + itE[Y] + \frac{(it)^2}{2!} E[Y^2] + o(t^2) = 1 - \frac{t^2}{2} + o(t^2)$$
2. The characteristic function of $Z_n = \sum_{i=1}^n \frac{Y_i}{\sqrt{n}}$ is:
   $$\phi_{Z_n}(t) = \left( \phi_Y\left(\frac{t}{\sqrt{n}}\right) \right)^n = \left( 1 - \frac{t^2}{2n} + o\left(\frac{t^2}{n}\right) \right)^n$$
3. Taking the limit as $n \to \infty$ using the standard limit $\lim_{n \to \infty} (1 + x/n)^n = e^x$:
   $$\lim_{n \to \infty} \phi_{Z_n}(t) = \exp\left(-\frac{t^2}{2}\right)$$
4. $\exp(-t^2 / 2)$ is the characteristic function of the **Standard Normal Distribution $\mathcal{N}(0, 1)$**. By Lévy's Continuity Theorem, convergence of characteristic functions guarantees convergence in distribution. $\blacksquare$

---

## 5. Engineering Application: Monte Carlo Integration

How do computer graphics path-tracers calculate complex multi-bounce lighting, or how do algorithmic trading platforms price multi-asset exotic options? High-dimensional integrals cannot be solved analytically.

We reframe an integral $I = \int_\Omega g(x) dx$ as an expectation $E[g(X)]$ under a uniform distribution:

$$\hat{I}_n = \frac{1}{n} \sum_{i=1}^n g(X_i)$$

By the Strong Law of Large Numbers:
$$\hat{I}_n \xrightarrow{a.s.} I$$

By the Central Limit Theorem, the error is distributed as:
$$\hat{I}_n - I \sim \mathcal{N}\left(0, \frac{\sigma^2}{n}\right) \implies \text{Error} = O\left(\frac{1}{\sqrt{n}}\right)$$

> **Why Monte Carlo Beats Grid Quadrature in High Dimensions**:
> In $d$ dimensions, classical grid numerical integration requires $O(K^d)$ points (the "Curse of Dimensionality").
> Monte Carlo integration converges at rate $O(1/\sqrt{n})$ **completely independent of the dimension $d$**!

---

## 6. Python Implementation: Verifying CLT and Monte Carlo Rates

```python
import numpy as np

def demonstrate_clt_convergence():
    """
    Simulate sums of heavily skewed Exponential(lambda=1) variables
    to witness emergence of the Gaussian bell curve.
    """
    rng = np.random.default_rng(42)
    sample_sizes = [1, 5, 30, 200]
    n_simulations = 50_000

    print("=== Central Limit Theorem Verification ===")
    for n in sample_sizes:
        # Exponential(1.0) has true mean = 1.0, true std = 1.0
        samples = rng.exponential(scale=1.0, size=(n_simulations, n))
        sample_means = np.mean(samples, axis=1)

        # Standardized Z_n = sqrt(n) * (mean - mu) / sigma
        z_scores = np.sqrt(n) * (sample_means - 1.0) / 1.0

        mean_z = np.mean(z_scores)
        var_z = np.var(z_scores)
        skew_z = np.mean(((z_scores - mean_z) / np.sqrt(var_z)) ** 3)

        print(f"n = {n:<3} | Z Mean: {mean_z:+.4f} (-> 0) | Z Var: {var_z:.4f} (-> 1) | Skew: {skew_z:+.4f} (-> 0)")

def monte_carlo_pi_estimation(n_samples: int = 10_000_000):
    """
    Estimate Pi via Monte Carlo rejection sampling on a 2D quarter circle.
    Error rate should conform to O(1 / sqrt(N)).
    """
    rng = np.random.default_rng(42)
    x = rng.uniform(0.0, 1.0, size=n_samples)
    y = rng.uniform(0.0, 1.0, size=n_samples)

    inside_circle = (x**2 + y**2) <= 1.0
    pi_estimate = 4.0 * np.mean(inside_circle)
    actual_error = abs(pi_estimate - np.pi)

    print(f"\n=== Monte Carlo Pi Estimation ===")
    print(f"Samples:    {n_samples:,}")
    print(f"Estimate:   {pi_estimate:.6f}")
    print(f"True Pi:    {np.pi:.6f}")
    print(f"Abs Error:  {actual_error:.6f}")

if __name__ == "__main__":
    demonstrate_clt_convergence()
    monte_carlo_pi_estimation()
```

---

## 7. Key Takeaways

1. **WLLN vs SLLN**: WLLN ensures the probability of a large error approaches zero; SLLN ensures individual trajectories stay within bounds forever.
2. **CLT Generality**: Independent sums from almost any finite-variance distribution converge to a Normal distribution at rate $O(1/\sqrt{n})$.
3. **Monte Carlo Efficiency**: In high dimensions ($d > 4$), randomized sampling at rate $O(1/\sqrt{n})$ outperforms deterministic numerical quadrature.
