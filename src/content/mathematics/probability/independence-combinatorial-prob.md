---
title: "Independence & Combinatorial Probability"
description: "Statistical independence, pairwise vs mutual independence, the Birthday Paradox, cryptographic collision bounds, and the Coupon Collector problem."
---

## 1. Statistical Independence

Independence is arguably the single most important concept distinguishing probability theory from general measure theory. Two events are independent when the occurrence of one provides zero information about the likelihood of the other.

### 1.1 Formal Definition
Events $A$ and $B$ are **statistically independent** (denoted $A \perp\!\!\!\perp B$) if and only if:

$$P(A \cap B) = P(A) \cdot P(B)$$

Equivalently, assuming $P(B) > 0$:

$$P(A \mid B) = P(A)$$

```
Independent Events: P(A | B) == P(A)
Knowing B occurred neither increases nor shrinks the probability measure of A.
```

---

## 2. Pairwise Independence vs. Mutual Independence

A common and dangerous engineering trap is assuming that because every pair of events is independent, the entire collection of events is mutually independent.

### 2.1 Mutual Independence Definition
A collection of events $\{A_1, A_2, \dots, A_n\}$ is **mutually independent** if for *every* subset of indices $J \subseteq \{1, 2, \dots, n\}$:

$$P\left(\bigcap_{j \in J} A_j\right) = \prod_{j \in J} P(A_j)$$

For $n$ events, checking mutual independence requires verifying $2^n - n - 1$ distinct equations.

### 2.2 The XOR Counterexample (Bernstein's Construction)
Consider flipping two fair, independent coins, $C_1, C_2 \in \{0, 1\}$. Define three events:
- $A$: First coin is heads ($C_1 = 1$), so $P(A) = 1/2$.
- $B$: Second coin is heads ($C_2 = 1$), so $P(B) = 1/2$.
- $C$: The parity check satisfies $C_1 \oplus C_2 = 0$ (both coins match), so $P(C) = 1/2$.

Let's test pairwise independence:
1. $P(A \cap B) = P(C_1 = 1, C_2 = 1) = 1/4 = P(A)P(B)$ $\implies$ **Pairwise independent!**
2. $P(A \cap C) = P(C_1 = 1, C_2 = 1) = 1/4 = P(A)P(C)$ $\implies$ **Pairwise independent!**
3. $P(B \cap C) = P(C_1 = 1, C_2 = 1) = 1/4 = P(B)P(C)$ $\implies$ **Pairwise independent!**

Now test the triple intersection:
$$P(A \cap B \cap C) = P(C_1 = 1, C_2 = 1, 1 \oplus 1 = 0) = 1/4$$
However:
$$P(A) \cdot P(B) \cdot P(C) = \frac{1}{2} \cdot \frac{1}{2} \cdot \frac{1}{2} = \frac{1}{8} \neq \frac{1}{4}$$

> **Key Engineering Takeaway**: Pairwise independence does NOT imply mutual independence! If you know both $A$ and $B$, $C$ is completely deterministic ($P(C \mid A \cap B) = 1 \neq 1/2$). This property is exploited in **linear secret sharing schemes** and **universal hash functions**.

---

## 3. The Birthday Paradox & Hash Collision Math

How many randomly generated keys can be inserted into a hash table of size $N$ before the probability of at least one collision exceeds $50\%$?

### 3.1 Mathematical Derivation
Let $k$ items be inserted independently and uniformly into $N$ buckets ($N$ possible hash values).
Let $E$ be the event that *no two items collide*.

The first item has $N$ choices out of $N$. The second item must pick from the remaining $N-1$ buckets, the third from $N-2$, up to the $k$-th item from $N-(k-1)$:

$$P(\text{No Collision}) = \frac{N}{N} \cdot \frac{N-1}{N} \cdot \frac{N-2}{N} \cdots \frac{N - (k-1)}{N} = \prod_{i=0}^{k-1} \left(1 - \frac{i}{N}\right)$$

Using the Taylor series approximation $e^{-x} \approx 1 - x$ for small $x$:

$$1 - \frac{i}{N} \approx e^{-i / N}$$

Substituting into the product:

$$P(\text{No Collision}) \approx \prod_{i=0}^{k-1} e^{-i / N} = \exp\left( -\sum_{i=0}^{k-1} \frac{i}{N} \right) = \exp\left( -\frac{k(k-1)}{2N} \right) \approx e^{-k^2 / (2N)}$$

The probability of **at least one collision** is:

$$P(\text{At least one collision}) = 1 - P(\text{No Collision}) \approx 1 - e^{-k^2 / (2N)}$$

```
Probability of Collision vs Number of Hashes k:
P(Collision)
 1.0 |                                       .------------
     |                                   _.-'
 0.5 |------------------------------_.-'  <-- k ≈ 1.177 * sqrt(N)
     |                          _.-'
 0.0 +-----------------------------------------------------
     0                      sqrt(N)                     N
```

### 3.2 Finding the 50% Collision Threshold
Setting $P(\text{Collision}) = 0.5$:
$$1 - e^{-k^2 / (2N)} = 0.5 \implies e^{-k^2 / (2N)} = 0.5$$
Taking natural logarithms on both sides:
$$-\frac{k^2}{2N} = \ln(0.5) = -\ln(2) \implies k^2 = 2N \ln(2)$$

$$k \approx \sqrt{2 \ln(2) N} \approx 1.1774 \sqrt{N}$$

### 3.3 Cryptographic Implications (Birthday Attacks)
| Hash Function | Digest Bits ($b$) | Total Space ($N = 2^b$) | Operations to 50% Collision ($O(\sqrt{N})$) |
| :--- | :--- | :--- | :--- |
| **CRC32** | $32$ bits | $2^{32} \approx 4.29 \times 10^9$ | $\approx 77,163$ hashes |
| **MD5** | $128$ bits | $2^{128} \approx 3.4 \times 10^{38}$ | $\approx 2^{64} \approx 1.84 \times 10^{19}$ hashes |
| **SHA-256** | $256$ bits | $2^{256} \approx 1.15 \times 10^{77}$ | $\approx 2^{128} \approx 3.40 \times 10^{38}$ hashes |

> **Birthday Bound Principle**: An algorithm with an $n$-bit security output provides at most $n/2$ bits of security against collision attacks!

---

## 4. The Coupon Collector's Problem

Suppose a system must sample all $n$ distinct partitions of a distributed database, or collect $n$ distinct software license tokens. Each trial randomly and uniformly yields one coupon from $\{1, 2, \dots, n\}$.

How many total random trials $T$ are needed until all $n$ distinct coupons are observed at least once?

### 4.1 Derivation via Linearity of Expectation
Decompose the total time $T$ into stages:
$$T = X_0 + X_1 + X_2 + \dots + X_{n-1}$$
where $X_i$ is the number of trials needed to collect the $(i+1)$-th new coupon after $i$ distinct coupons have already been acquired.

When $i$ coupons are owned, each subsequent trial has probability $p_i$ of discovering a brand-new coupon:
$$p_i = \frac{n - i}{n} = 1 - \frac{i}{n}$$

$X_i$ is a **Geometric random variable** with parameter $p_i$. The expected value of a geometric random variable with parameter $p$ is $E[X] = 1/p$:

$$E[X_i] = \frac{1}{p_i} = \frac{n}{n - i}$$

By **Linearity of Expectation** (which holds regardless of whether the variables are independent):

$$E[T] = \sum_{i=0}^{n-1} E[X_i] = \sum_{i=0}^{n-1} \frac{n}{n - i} = n \left( \frac{1}{n} + \frac{1}{n-1} + \dots + \frac{1}{2} + 1 \right) = n \sum_{k=1}^n \frac{1}{k}$$

The sum $\sum_{k=1}^n \frac{1}{k}$ is the $n$-th **Harmonic number** $H_n$. For large $n$:
$$H_n = \ln(n) + \gamma + O\left(\frac{1}{n}\right)$$
where $\gamma \approx 0.5772$ (Euler-Mascheroni constant).

Therefore:

$$E[T] = n H_n = n \ln(n) + \gamma n + O(1) = \Theta(n \ln n)$$

```
Expected Samples to Collect All n Items:
n = 10     --> E[T] ≈ 10 * 2.929  = 29.3 samples
n = 100    --> E[T] ≈ 100 * 5.187 = 518.7 samples
n = 1,000  --> E[T] ≈ 1000 * 7.485 = 7,485 samples
```

---

## 5. Python Implementation: Simulating Hash Collisions & Coupon Collector

```python
import numpy as np

def birthday_paradox_simulation(n_buckets: int = 365, trials: int = 50_000):
    """
    Monte Carlo test of Birthday Paradox collision threshold
    against theoretical formula k ≈ sqrt(2 * ln(2) * N).
    """
    theoretical_k = int(np.sqrt(2 * np.log(2) * n_buckets))
    print(f"Bucket space N = {n_buckets}, Theoretical 50% threshold k = {theoretical_k}")

    collision_counts = 0
    rng = np.random.default_rng(42)

    for _ in range(trials):
        # Draw theoretical_k items uniformly with replacement
        samples = rng.integers(0, n_buckets, size=theoretical_k)
        if len(samples) != len(np.unique(samples)):
            collision_counts += 1

    simulated_prob = collision_counts / trials
    print(f"Empirical P(Collision at k={theoretical_k}) = {simulated_prob:.4f}")
    assert 0.48 <= simulated_prob <= 0.52, "Simulation diverged from theoretical expectation!"

def coupon_collector_simulation(n_coupons: int = 100, trials: int = 5_000):
    """
    Simulate the Coupon Collector process to verify E[T] = n * H_n.
    """
    rng = np.random.default_rng(42)
    # Theoretical H_n
    h_n = np.sum(1.0 / np.arange(1, n_coupons + 1))
    theoretical_et = n_coupons * h_n

    total_steps = []
    for _ in range(trials):
        collected = set()
        steps = 0
        while len(collected) < n_coupons:
            draw = rng.integers(0, n_coupons)
            collected.add(draw)
            steps += 1
        total_steps.append(steps)

    sim_mean = np.mean(total_steps)
    print(f"Coupons N = {n_coupons}")
    print(f"Theoretical E[T] = {theoretical_et:.2f}")
    print(f"Simulated   E[T] = {sim_mean:.2f}")

if __name__ == "__main__":
    print("=== Testing Birthday Collision Bound ===")
    birthday_paradox_simulation(n_buckets=365)
    print("\n=== Testing Coupon Collector ===")
    coupon_collector_simulation(n_coupons=100)
```

---

## 6. Summary & Algorithmic Rules

1. **Independence Requires Product Rule**: $P(A \cap B) = P(A)P(B)$.
2. **Pairwise vs Joint Independence**: Pairwise independence does not protect against joint or parity dependencies. Always check higher-order subsets.
3. **Birthday Bound**: A space of size $N$ suffers collisions in only $O(\sqrt{N})$ samples. Never rely on 32-bit hashes for global uniqueness.
4. **Coupon Collector**: Visiting every element of a space of size $N$ randomly requires $O(N \ln N)$ samples, not $O(N)$.
