---
title: "Asymptotic Analysis & Master Theorem"
description: "Formal Big-O, Omega, and Theta mathematical bounds, recursion tree analysis, and the Master Theorem for divide-and-conquer algorithms."
---

## 1. Formal Mathematical Definitions of Asymptotic Growth

In computer systems, raw wall-clock execution time varies based on CPU clock speeds, memory hierarchies, and compiler optimization flags. **Asymptotic Analysis** isolates algorithm efficiency by characterizing growth rates as input size $n \to \infty$.

Let $f(n)$ and $g(n)$ be functions mapping $\mathbb{N} \to \mathbb{R}^+$.

### A. Big-$O$ Notation (Asymptotic Upper Bound)
$f(n) \in O(g(n))$ if and only if there exist positive constants $c > 0$ and $n_0 \ge 1$ such that:

$$0 \le f(n) \le c \cdot g(n) \quad \text{for all } n \ge n_0$$

$$\limsup_{n \to \infty} \frac{f(n)}{g(n)} < \infty$$

### B. Big-$\Omega$ Notation (Asymptotic Lower Bound)
$f(n) \in \Omega(g(n))$ if and only if there exist positive constants $c > 0$ and $n_0 \ge 1$ such that:

$$0 \le c \cdot g(n) \le f(n) \quad \text{for all } n \ge n_0$$

### C. Big-$\Theta$ Notation (Asymptotically Tight Bound)
$f(n) \in \Theta(g(n))$ if and only if $f(n) \in O(g(n))$ and $f(n) \in \Omega(g(n))$. There exist constants $c_1, c_2 > 0$ such that:

$$c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n) \quad \text{for all } n \ge n_0$$

```
Running Time
   ▲                                   c₂ · g(n)  (Upper envelope)
   │                                  /
   │                       f(n)  ───/
   │                               /   c₁ · g(n)  (Lower envelope)
   │                             /    /
   │                           /    /
   │                         /    /
   │                        /   /
   │                       /  /
   └──────────────────────┴────────────────► Input Size n
                         n₀
```

---

## 2. Solving Divide-and-Conquer Recurrences: The Master Theorem

Divide-and-conquer algorithms (Mergesort, Karatsuba multiplication, Strassen matrix multiplication) divide a problem of size $n$ into $a$ subproblems of size $n/b$, spending $f(n)$ work combining results:

$$T(n) = a T\left(\frac{n}{b}\right) + f(n), \quad a \ge 1, b > 1$$

The **critical exponent** is:

$$c_{\text{crit}} = \log_b a$$

The asymptotic runtime depends on the horse race between work done at the leaves ($n^{\log_b a}$) and work done at the root ($f(n)$):

| Case | Condition | Intuitive Regime | Closed-Form Solution |
| :--- | :--- | :--- | :--- |
| **Case 1: Leaves Dominate** | $f(n) = O(n^{\log_b a - \epsilon})$ for $\epsilon > 0$ | Work is concentrated at the leaf nodes of the recursion tree. | $T(n) = \Theta(n^{\log_b a})$ |
| **Case 2: Balanced Work** | $f(n) = \Theta(n^{\log_b a} \log^k n)$ for $k \ge 0$ | Every layer of the recursion tree does asymptotically equal work. | $T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$ |
| **Case 3: Root Dominates** | $f(n) = \Omega(n^{\log_b a + \epsilon})$ and regularity condition holds | Work is heavily concentrated at the root divide/combine step. | $T(n) = \Theta(f(n))$ |

---

## 3. Classic CSE Algorithm Analyses

### Mergesort
- Splits array into $a=2$ halves of size $n/2$, with $f(n) = \Theta(n)$ linear merge step:
  $$T(n) = 2 T(n/2) + \Theta(n)$$
  $$a=2, b=2 \implies \log_b a = \log_2 2 = 1$$
  Since $f(n) = \Theta(n^1)$, this falls under **Case 2 ($k=0$)**:
  $$T(n) = \Theta(n \log n)$$

### Karatsuba Fast Integer Multiplication
- Multiplies two $n$-digit numbers using $a=3$ recursive multiplications of $n/2$-digit numbers:
  $$T(n) = 3 T(n/2) + \Theta(n)$$
  $$\log_2 3 \approx 1.585$$
  Since $f(n) = O(n^1) = O(n^{1.585 - 0.585})$, this falls under **Case 1**:
  $$T(n) = \Theta(n^{\log_2 3}) \approx \Theta(n^{1.585}) \ll O(n^2)$$

### Strassen Matrix Multiplication
- Multiplies two $n \times n$ matrices with $a=7$ sub-matrices of size $n/2$:
  $$T(n) = 7 T(n/2) + \Theta(n^2)$$
  $$\log_2 7 \approx 2.807 \implies T(n) = \Theta(n^{2.807}) \ll O(n^3)$$

---

## 4. Python Implementation: Verifying Recurrence Scaling

```python
import time
import numpy as np

def simulate_mergesort_recurrence(n: int) -> int:
    """Computes exact operation count of mergesort recurrence T(n) = 2T(n/2) + n."""
    if n <= 1:
        return 0
    left = simulate_mergesort_recurrence(n // 2)
    right = simulate_mergesort_recurrence(n - n // 2)
    combine_work = n
    return left + right + combine_work

for exp in range(10, 18):
    n = 2 ** exp
    ops = simulate_mergesort_recurrence(n)
    theoretical = n * np.log2(n)
    ratio = ops / theoretical
    print(f"n = 2^{exp:02d} ({n:7d}): ops = {ops:10d} | ops / (n log n) = {ratio:.4f}")
```
