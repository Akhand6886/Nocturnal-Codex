---
title: "Continuous Random Variables & Densities"
description: "Probability Density Functions (PDFs), continuous CDFs, Uniform, Exponential, Gaussian (Normal), and the change-of-variables transformation theorem."
---

## 1. The Geometry of Continuous Probability

A **continuous random variable** takes values in an uncountable continuum (such as the real interval $[a, b]$ or all of $\mathbb{R}$). 

Because there are uncountably infinite points, **the probability of a continuous random variable taking any exact single real value is strictly zero**:

$$P(X = 3.14159265\dots) = 0$$

Instead of point probabilities, we assign probability to **intervals** via the area under a **Probability Density Function (PDF)** $f_X(x)$:

$$P(a \le X \le b) = \int_a^b f_X(x) \, dx$$

```
Probability as Area Under Density Curve:
f(x)
 ^                 _.-''''-._
 |              .-'          '-.
 |            .' |////////////| '.
 |           /   |////////////|   \
 |          /    |////////////|    \
-+---------+-----+------------+-----+---------> x
 0               a            b
                 [--- P(a <= X <= b) ---]
```

---

## 2. Mathematical Formalism: PDF and CDF

### 2.1 The Probability Density Function (PDF)
A function $f_X: \mathbb{R} \to \mathbb{R}$ is a valid PDF if and only if:
1. **Non-negativity**: $f_X(x) \ge 0$ for all $x \in \mathbb{R}$.
2. **Total Area Normalization**:
   $$\int_{-\infty}^\infty f_X(x) \, dx = 1$$

> **Critical Note on Scale**: Unlike discrete PMFs, $f_X(x)$ is a *density* (probability per unit length), NOT a probability! Therefore, $f_X(x)$ **can be strictly greater than 1**. For example, if $X \sim \text{Uniform}(0, 0.1)$, then $f_X(x) = 10$ for $x \in [0, 0.1]$.

### 2.2 Relationship to the Cumulative Distribution Function (CDF)
The CDF $F_X(x)$ is continuous and differentiable almost everywhere:

$$F_X(x) = P(X \le x) = \int_{-\infty}^x f_X(t) \, dt$$

By the Fundamental Theorem of Calculus:

$$f_X(x) = \frac{d}{dx} F_X(x)$$

### 2.3 Expectation and Variance of Continuous Variables
- **Expectation**:
  $$E[X] = \int_{-\infty}^\infty x f_X(x) \, dx$$
- **Law of the Unconscious Statistician (LOTUS)**: For any real-valued function $g(X)$:
  $$E[g(X)] = \int_{-\infty}^\infty g(x) f_X(x) \, dx$$
- **Variance**:
  $$\text{Var}(X) = E[(X - \mu)^2] = \int_{-\infty}^\infty (x - \mu)^2 f_X(x) \, dx = E[X^2] - (E[X])^2$$

---

## 3. Core Continuous Distributions

### 3.1 Continuous Uniform Distribution: $\mathcal{U}(a, b)$
Models an outcome equally likely to land anywhere in the interval $[a, b]$:

$$f(x) = \begin{cases} \frac{1}{b - a} & \text{if } a \le x \le b \\ 0 & \text{otherwise} \end{cases}$$

- **Mean**: $E[X] = \frac{a + b}{2}$
- **Variance**: $\text{Var}(X) = \frac{(b - a)^2}{12}$

---

### 3.2 Exponential Distribution: $\text{Exp}(\lambda)$
Models the elapsed time between Poisson arrivals (e.g., time between incoming API calls or hardware failure time):

$$f(x) = \lambda e^{-\lambda x}, \quad x \ge 0$$

- **CDF**: $F(x) = 1 - e^{-\lambda x}$
- **Mean**: $E[X] = \frac{1}{\lambda}$
- **Variance**: $\text{Var}(X) = \frac{1}{\lambda^2}$

#### Continuous Memorylessness:
Just like the Geometric distribution in discrete time, the Exponential distribution is the **only** continuous distribution that is memoryless:

$$P(X > s + t \mid X > s) = \frac{P(X > s + t)}{P(X > s)} = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(X > t)$$

---

### 3.3 Gaussian (Normal) Distribution: $\mathcal{N}(\mu, \sigma^2)$
The cornerstone of statistical physics, machine learning, and probability theory, parameterized by mean $\mu \in \mathbb{R}$ and variance $\sigma^2 > 0$:

$$f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)$$

```
The Standard Bell Curve (mu=0, sigma=1):
f(x)
 0.4 |                    .---.
     |                  /       \
 0.2 |                /           \
     |            _.-'             '-._
 0.0 +------+-------+-------+-------+-------+------> x
           -2      -1       0       1       2
             [-- 68.27% --]
         [------- 95.45% -------]
     [------------ 99.73% ------------]
```

#### The Standard Normal $Z \sim \mathcal{N}(0, 1)$:
Any normal variable $X \sim \mathcal{N}(\mu, \sigma^2)$ can be standardized via:

$$Z = \frac{X - \mu}{\sigma}$$

Its CDF is denoted by $\Phi(z)$:
$$\Phi(z) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^z e^{-t^2 / 2} \, dt = \frac{1}{2} \left[ 1 + \text{erf}\left( \frac{z}{\sqrt{2}} \right) \right]$$

---

## 4. Change of Variables Theorem (Transformations of Random Variables)

Suppose $X$ is a continuous random variable with PDF $f_X(x)$, and $Y = g(X)$ where $g$ is a strictly monotonic, differentiable function. What is the PDF $f_Y(y)$?

### Theorem (1D Change of Variables)
Let $x = g^{-1}(y)$. Then:

$$f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right| = \frac{f_X(x)}{\left| g'(x) \right|}$$

*Proof*:
Assume $g$ is strictly increasing.
$$F_Y(y) = P(Y \le y) = P(g(X) \le y) = P(X \le g^{-1}(y)) = F_X(g^{-1}(y))$$
Differentiating both sides with respect to $y$ via the chain rule:
$$f_Y(y) = \frac{d}{dy} F_X(g^{-1}(y)) = f_X(g^{-1}(y)) \frac{d}{dy} g^{-1}(y)$$
For strictly decreasing $g$, a negative sign appears which is absorbed by the absolute value $|\cdot|$. $\blacksquare$

---

## 5. Algorithmic Application: The Box-Muller Transform

Computer pseudorandom number generators natively produce standard uniform numbers $U_1, U_2 \sim \mathcal{U}(0, 1)$. How do game engines and deep learning frameworks (PyTorch, TensorFlow) generate standard Normal samples $Z \sim \mathcal{N}(0, 1)$?

The **Box-Muller Transform** maps two independent standard uniform variables into two independent standard Gaussian variables:

$$Z_0 = \sqrt{-2 \ln U_1} \cos(2\pi U_2)$$
$$Z_1 = \sqrt{-2 \ln U_1} \sin(2\pi U_2)$$

### Geometric Intuition:
Consider the 2D joint Gaussian PDF $f(z_0, z_1) = \frac{1}{2\pi} e^{-(z_0^2 + z_1^2)/2}$. In polar coordinates $(R, \Theta)$ with $z_0 = R \cos \Theta$ and $z_1 = R \sin \Theta$:
- $\Theta \sim \mathcal{U}(0, 2\pi) \implies \Theta = 2\pi U_2$
- $R^2 = z_0^2 + z_1^2 \sim \text{Exp}(1/2) \implies R = \sqrt{-2 \ln U_1}$

---

## 6. Python Implementation: Box-Muller & Density Verification

```python
import numpy as np

def box_muller_transform(n_samples: int = 500_000) -> tuple[np.ndarray, np.ndarray]:
    """
    Generate independent N(0, 1) standard normal samples from U(0, 1)
    using the analytical Box-Muller transformation.
    """
    rng = np.random.default_rng(42)
    # Uniform draws in (0, 1] to avoid ln(0)
    u1 = rng.uniform(1e-12, 1.0, size=n_samples)
    u2 = rng.uniform(0.0, 1.0, size=n_samples)

    r = np.sqrt(-2.0 * np.log(u1))
    theta = 2.0 * np.pi * u2

    z0 = r * np.cos(theta)
    z1 = r * np.sin(theta)
    return z0, z1

def verify_transformation():
    z0, z1 = box_muller_transform(1_000_000)

    print("=== Box-Muller Verification ===")
    print(f"Z0 Mean:     {np.mean(z0):.6f} (Expected: 0.0)")
    print(f"Z0 Variance: {np.var(z0):.6f}  (Expected: 1.0)")
    print(f"Z1 Mean:     {np.mean(z1):.6f} (Expected: 0.0)")
    print(f"Z1 Variance: {np.var(z1):.6f}  (Expected: 1.0)")
    
    # Check correlation between Z0 and Z1
    corr = np.corrcoef(z0, z1)[0, 1]
    print(f"Correlation: {corr:.6f} (Expected: 0.0)")

    # Empirical 68-95-99.7 rule verification
    p_1sigma = np.mean(np.abs(z0) <= 1.0)
    p_2sigma = np.mean(np.abs(z0) <= 2.0)
    p_3sigma = np.mean(np.abs(z0) <= 3.0)
    print(f"\nWithin 1 sigma: {p_1sigma * 100:.2f}% (Expected: 68.27%)")
    print(f"Within 2 sigma: {p_2sigma * 100:.2f}% (Expected: 95.45%)")
    print(f"Within 3 sigma: {p_3sigma * 100:.2f}% (Expected: 99.73%)")

if __name__ == "__main__":
    verify_transformation()
```

---

## 7. Key Takeaways

1. **PDF Values are Densities**: $f_X(x)$ represents probability per unit length; only the integral $\int_a^b f_X(x)dx$ yields true probability.
2. **Point Probability is Zero**: For any single value $c$, $P(X = c) = 0$.
3. **Exponential Distribution**: The continuous analogue of the Geometric distribution, completely memoryless.
4. **Change of Variables**: Differentiating transformed random variables requires the Jacobian determinant $|d(g^{-1}(y))/dy|$ to preserve probability mass.
