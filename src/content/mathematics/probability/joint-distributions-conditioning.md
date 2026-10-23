---
title: "Joint Distributions & Conditional Expectation"
description: "Joint and marginal distributions, independence of random variables, conditional expectation, Adam's law (Tower property), and Eve's law of total variance."
---

## 1. Multivariate Probability Systems

In realistic engineering settings, random variables rarely exist in isolation. In deep learning embeddings, autonomous driving sensor fusion, or distributed system metrics (CPU load vs network latency), we model multiple interacting random variables simultaneously.

A **joint distribution** models the simultaneous behavior of random vector $\mathbf{X} = (X_1, X_2, \dots, X_n)$.

```
+-----------------------------------------------------------------------------------------+
|                              THE JOINT & MARGINAL DECOMPOSITION                         |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|                             JOINT DENSITY f(x, y)                                       |
|               Captures ALL mutual dependencies and interactions                         |
|                                                                                         |
|                    /                                      \                             |
|    Integrate over y                                        Integrate over x             |
|                  v                                          v                           |
|       MARGINAL f_X(x) = int f(x, y) dy           MARGINAL f_Y(y) = int f(x, y) dx       |
|                                                                                         |
|                  \                                          /                           |
|                   Condition: f(y|x) = f(x, y) / f_X(x)                                  |
|                                     v                                                   |
|                        CONDITIONAL EXPECTATION E[Y | X]                                 |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Mathematical Formalism: Joint & Marginal Distributions

### 2.1 Discrete Case: Joint PMF
The joint probability mass function of two discrete random variables $X$ and $Y$ is:

$$p_{X, Y}(x, y) = P(X = x, Y = y)$$

Subject to:
1. $p_{X, Y}(x, y) \ge 0$ for all $(x, y)$.
2. $\sum_x \sum_y p_{X, Y}(x, y) = 1$.

#### Marginal PMF ("Summing Out"):
To recover the distribution of $X$ alone, we marginalize out $Y$:

$$p_X(x) = \sum_{y} p_{X, Y}(x, y)$$

---

### 2.2 Continuous Case: Joint PDF
For continuous random variables $X$ and $Y$, the joint PDF satisfies:

$$P((X, Y) \in A) = \iint_A f_{X, Y}(x, y) \, dx \, dy$$

Subject to:
1. $f_{X, Y}(x, y) \ge 0$.
2. $\int_{-\infty}^\infty \int_{-\infty}^\infty f_{X, Y}(x, y) \, dx \, dy = 1$.

#### Marginal PDF ("Integrating Out"):
$$f_X(x) = \int_{-\infty}^\infty f_{X, Y}(x, y) \, dy, \qquad f_Y(y) = \int_{-\infty}^\infty f_{X, Y}(x, y) \, dx$$

---

## 3. Independence of Random Variables

Random variables $X$ and $Y$ are **independent** ($X \perp\!\!\!\perp Y$) if their joint distribution factorizes into the product of their marginals for all $x, y$:

$$f_{X, Y}(x, y) = f_X(x) \cdot f_Y(y) \quad \text{(Continuous)}$$
$$p_{X, Y}(x, y) = p_X(x) \cdot p_Y(y) \quad \text{(Discrete)}$$

### Crucial Consequence: Factorization of Expectation
If $X$ and $Y$ are independent, then for any functions $g$ and $h$:

$$E[g(X) h(Y)] = E[g(X)] \cdot E[h(Y)]$$

In particular, $E[XY] = E[X]E[Y]$, which guarantees that their **covariance is strictly zero**:

$$\text{Cov}(X, Y) = E[XY] - E[X]E[Y] = 0$$

> **Warning**: The converse is NOT generally true! Zero covariance ($\text{Cov}(X, Y) = 0$) implies linear independence, but $X$ and $Y$ can still share strong non-linear dependencies (e.g., $X \sim \mathcal{N}(0, 1)$ and $Y = X^2$).

---

## 4. Conditional Distributions & Conditional Expectation

### 4.1 Conditional Density
Given $f_X(x) > 0$, the conditional density of $Y$ given $X = x$ is:

$$f_{Y \mid X}(y \mid x) = \frac{f_{X, Y}(x, y)}{f_X(x)}$$

### 4.2 Conditional Expectation as a Function
For a fixed observed value $X = x$, the conditional expectation is a scalar number:

$$E[Y \mid X = x] = \int_{-\infty}^\infty y f_{Y \mid X}(y \mid x) \, dy$$

However, before $X$ is observed, $E[Y \mid X]$ is a **random variable** itself—specifically, a function of the random variable $X$:

$$g(X) = E[Y \mid X]$$

---

## 5. The Law of Total Expectation (Adam's Law / Tower Property)

What is the expected value of the conditional expectation?

### Theorem: Adam's Law
$$E[E[Y \mid X]] = E[Y]$$

### Mathematical Proof:
$$\begin{aligned}
E[E[Y \mid X]] &= \int_{-\infty}^\infty E[Y \mid X = x] f_X(x) \, dx \\
&= \int_{-\infty}^\infty \left( \int_{-\infty}^\infty y \frac{f_{X, Y}(x, y)}{f_X(x)} \, dy \right) f_X(x) \, dx \\
&= \int_{-\infty}^\infty \int_{-\infty}^\infty y f_{X, Y}(x, y) \, dy \, dx \\
&= \int_{-\infty}^\infty y \left( \int_{-\infty}^\infty f_{X, Y}(x, y) \, dx \right) dy \\
&= \int_{-\infty}^\infty y f_Y(y) \, dy = E[Y] \quad \blacksquare
\end{aligned}$$

---

## 6. The Law of Total Variance (Eve's Law)

The total variance of $Y$ can be partitioned into two distinct sources: variance within groups plus variance between groups.

### Theorem: Eve's Law
$$\text{Var}(Y) = E[\text{Var}(Y \mid X)] + \text{Var}(E[Y \mid X])$$

```
+---------------------------------------------------------------------------------+
|                                 EVE'S LAW DECOMPOSITION                         |
+---------------------------------------------------------------------------------+
|  Total Variance Var(Y) = E[Var(Y | X)]       +       Var(E[Y | X])              |
|                             |                             |                     |
|                 "Expected Unexplained Noise"     "Variance Explained by X"      |
|               Average spread within each slice   How much the predictions shift |
+---------------------------------------------------------------------------------+
```

### Proof:
Recall that $\text{Var}(Z) = E[Z^2] - (E[Z])^2$.
1. Expanding the first term $E[\text{Var}(Y \mid X)]$:
   $$E[\text{Var}(Y \mid X)] = E[E[Y^2 \mid X] - (E[Y \mid X])^2] = E[E[Y^2 \mid X]] - E[(E[Y \mid X])^2]$$
   By Adam's Law, $E[E[Y^2 \mid X]] = E[Y^2]$:
   $$E[\text{Var}(Y \mid X)] = E[Y^2] - E[(E[Y \mid X])^2]$$

2. Expanding the second term $\text{Var}(E[Y \mid X])$:
   $$\text{Var}(E[Y \mid X]) = E[(E[Y \mid X])^2] - (E[E[Y \mid X]])^2 = E[(E[Y \mid X])^2] - (E[Y])^2$$

3. Adding both equations together:
   $$\begin{aligned}
   E[\text{Var}(Y \mid X)] + \text{Var}(E[Y \mid X]) &= \left( E[Y^2] - E[(E[Y \mid X])^2] \right) + \left( E[(E[Y \mid X])^2] - (E[Y])^2 \right) \\
   &= E[Y^2] - (E[Y])^2 = \text{Var}(Y) \quad \blacksquare
   \end{aligned}$$

---

## 7. Python Implementation: Verifying Adam's and Eve's Laws

```python
import numpy as np

def verify_adams_and_eves_laws(n_samples: int = 1_000_000):
    """
    Simulate a hierarchical system:
    X: Server class (0: low tier, 1: medium tier, 2: high tier)
    Y: Request processing time given server tier X
    """
    rng = np.random.default_rng(42)

    # Server class chosen with prior probabilities [0.5, 0.3, 0.2]
    x_classes = rng.choice([0, 1, 2], p=[0.5, 0.3, 0.2], size=n_samples)

    # Mean and standard deviation per server tier
    # Class 0: mean=100ms, sigma=15ms
    # Class 1: mean=60ms,  sigma=8ms
    # Class 2: mean=20ms,  sigma=3ms
    tier_means = np.array([100.0, 60.0, 20.0])
    tier_sigmas = np.array([15.0, 8.0, 3.0])

    # Sample Y conditioned on X
    y_latency = rng.normal(loc=tier_means[x_classes], scale=tier_sigmas[x_classes])

    # 1. Total empirical mean and variance of Y
    total_mean_y = np.mean(y_latency)
    total_var_y = np.var(y_latency)

    # 2. Compute conditional expectations E[Y | X] and Var(Y | X)
    conditional_expectations = tier_means[x_classes]
    conditional_variances = (tier_sigmas[x_classes]) ** 2

    # Adam's Law: E[E[Y | X]] == E[Y]
    adams_prediction = np.mean(conditional_expectations)

    # Eve's Law: Var(Y) == E[Var(Y|X)] + Var(E[Y|X])
    expected_cond_var = np.mean(conditional_variances)
    var_of_cond_exp = np.var(conditional_expectations)
    eves_prediction = expected_cond_var + var_of_cond_exp

    print("=== Adam's Law Verification ===")
    print(f"Empirical E[Y]:         {total_mean_y:.4f} ms")
    print(f"Adam's Law E[E[Y | X]]: {adams_prediction:.4f} ms")

    print("\n=== Eve's Law Verification ===")
    print(f"Total Var(Y):                   {total_var_y:.4f}")
    print(f"E[Var(Y|X)] (Within variance):  {expected_cond_var:.4f}")
    print(f"Var(E[Y|X]) (Between variance): {var_of_cond_exp:.4f}")
    print(f"Eve's Sum:                      {eves_prediction:.4f}")

    assert np.isclose(total_mean_y, adams_prediction, atol=1e-2)
    assert np.isclose(total_var_y, eves_prediction, atol=1e-1)
    print("\nMathematical Laws Verified Successfully.")

if __name__ == "__main__":
    verify_adams_and_eves_laws()
```

---

## 8. Summary & Key Takeaways

1. **Joint to Marginal**: Marginalization integrates (or sums) out unwanted variables from the joint density.
2. **Conditional Expectation is an Optimal Predictor**: $E[Y \mid X]$ is the minimum mean square error (MMSE) estimator of $Y$ given $X$.
3. **Adam's Law (Tower Property)**: Averaging the best local predictions across all inputs recovers the overall global expectation ($E[E[Y|X]] = E[Y]$).
4. **Eve's Law**: Variance splits cleanly into within-group uncertainty and between-group shift.
