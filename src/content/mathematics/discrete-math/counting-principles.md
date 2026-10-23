---
title: "Counting Principles & Inclusion-Exclusion"
description: "The Rule of Sum and Product, the generalized Principle of Inclusion-Exclusion (PIE), derangements, Stirling numbers, and generating functions."
---

## 1. The Art of Systematic Enumeration

Combinatorics is the branch of mathematics dealing with counting without brute-force enumeration. In algorithm engineering, counting governs:
- **State space bounds** in model checking and game search trees.
- **Dynamic programming state representations** and transitions.
- **Worst-case algorithm complexity** and lower bounds.

```
+-----------------------------------------------------------------------------------------+
|                                  THE FOUNDATIONAL RULES                                 |
+-----------------------------------------------------------------------------------------+
|  RULE OF SUM (Addition):       |A u B| = |A| + |B|      (Mutually exclusive choices)    |
|                                                                                         |
|  RULE OF PRODUCT (Multiply):   |A x B| = |A| * |B|      (Independent sequential steps)  |
|                                                                                         |
|  INCLUSION-EXCLUSION (PIE):    Compensates for overlapping sets to prevent double-count |
+-----------------------------------------------------------------------------------------+
```

---

## 2. The Principle of Inclusion-Exclusion (PIE)

When sets are not disjoint ($A \cap B \neq \emptyset$), simply adding cardinalities counts the intersection twice:

$$|A \cup B| = |A| + |B| - |A \cap B|$$

For three sets:
$$|A \cup B \cup C| = |A| + |B| + |C| - (|A \cap B| + |A \cap C| + |B \cap C|) + |A \cap B \cap C|$$

### General Theorem for $n$ Sets
For any finite sets $A_1, A_2, \dots, A_n$:

$$\left| \bigcup_{i=1}^n A_i \right| = \sum_{k=1}^n (-1)^{k-1} \sum_{1 \le i_1 < i_2 < \dots < i_k \le n} \left| A_{i_1} \cap A_{i_2} \cap \dots \cap A_{i_k} \right|$$

```
Inclusion-Exclusion Venn Diagram (3 Sets):
+-------------------------------+
|             A1                |
|           .---.               |
|         /   +---\--.          |
|        | 1  | 2 | 1 \ A2      |
|         \  / \ / \  /         |
|          .' 2 | 3 |'          |
|         /  \ / \ / \          |
|        | 1  +---+ 1 |         |
|         \    |  |  /          |
|          '---+----+           |
|             A3                |
+-------------------------------+
Alternating signs (+ - + -) ensure each disjoint region is counted exactly once!
```

---

## 3. Classic Application: Derangements ($!n$)

A **derangement** is a permutation of $\{1, 2, \dots, n\}$ such that **no element appears in its original position** ($\pi(i) \neq i$ for all $i$).
*Real-world setting*: Secret Santa gift exchanges, cache evictions where no key stays in its original slot.

Let $S$ be the set of all $n!$ permutations. Let $A_i$ be the set of permutations where element $i$ is in its original position ($\pi(i) = i$).
The number of derangements $D_n = !n$ is the count of permutations belonging to *none* of the $A_i$:

$$D_n = n! - \left| \bigcup_{i=1}^n A_i \right|$$

### Derivation via PIE:
1. $|A_i| = (n - 1)!$ (fix element $i$, permute the remaining $n - 1$).
2. For any pair $i < j$, $|A_i \cap A_j| = (n - 2)!$.
3. For $k$ simultaneous elements fixed: $|A_{i_1} \cap \dots \cap A_{i_k}| = (n - k)!$.
4. There are $\binom{n}{k}$ ways to choose which $k$ elements are fixed.

Applying PIE:
$$\left| \bigcup_{i=1}^n A_i \right| = \sum_{k=1}^n (-1)^{k-1} \binom{n}{k} (n - k)! = \sum_{k=1}^n (-1)^{k-1} \frac{n!}{k!(n-k)!} (n - k)! = n! \sum_{k=1}^n \frac{(-1)^{k-1}}{k!}$$

Subtracting from total permutations $n!$:

$$D_n = n! - n! \sum_{k=1}^n \frac{(-1)^{k-1}}{k!} = n! \left[ 1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \dots + \frac{(-1)^n}{n!} \right] = n! \sum_{k=0}^n \frac{(-1)^k}{k!}$$

Recall the Maclaurin series for $e^x = \sum_{k=0}^\infty \frac{x^k}{k!}$. Setting $x = -1$:
$$e^{-1} = \frac{1}{e} = \sum_{k=0}^\infty \frac{(-1)^k}{k!}$$

Therefore, for any $n \ge 4$:

$$D_n \approx \frac{n!}{e} = \text{round}\left( \frac{n!}{e} \right)$$

> **Profound Probability Fact**: The probability that a random permutation is a complete derangement is $\lim_{n \to \infty} \frac{D_n}{n!} = \frac{1}{e} \approx 36.79\%$, virtually constant regardless of whether $n = 10$ or $n = 1,000,000$!

---

## 4. Stirling Numbers of the Second Kind

How many ways can you partition a set of $n$ distinct objects into $k$ non-empty, unlabeled subsets? This is given by the **Stirling Number of the Second Kind**, denoted $S(n, k)$ or $\left\{ \begin{matrix} n \\ k \end{matrix} \right\}$.

### 4.1 Recurrence Relation
Consider the $n$-th element:
- **Case 1**: It forms its own singleton subset $\{a_n\}$. The remaining $n - 1$ items must be partitioned into $k - 1$ subsets ($S(n-1, k-1)$ ways).
- **Case 2**: It joins one of the existing $k$ non-empty subsets created from the first $n - 1$ items ($k \cdot S(n-1, k)$ ways).

$$S(n, k) = S(n - 1, k - 1) + k \cdot S(n - 1, k)$$

Boundary conditions: $S(n, 1) = 1$, $S(n, n) = 1$, and $S(n, k) = 0$ for $k > n$.

### 4.2 Explicit Formula via PIE
$$S(n, k) = \frac{1}{k!} \sum_{j=0}^k (-1)^{k - j} \binom{k}{j} j^n$$

---

## 5. Generating Functions: The Swiss Army Knife of Counting

A **generating function** transforms a discrete sequence $a_0, a_1, a_2, \dots$ into the coefficients of a formal power series:

$$G(x) = \sum_{n=0}^\infty a_n x^n = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \dots$$

### The Coin Change Problem:
How many ways can you make change for $\$n$ using coins of denominations $1$, $2$, and $5$?
Encode each coin denomination as a polynomial:
- Pennies ($1$): $1 + x + x^2 + x^3 + \dots = \frac{1}{1 - x}$
- Nickels ($5$): $1 + x^5 + x^{10} + x^{15} + \dots = \frac{1}{1 - x^5}$
- Dimes ($10$): $1 + x^{10} + x^{20} + \dots = \frac{1}{1 - x^{10}}$

The generating function for making change is the product:

$$G(x) = \frac{1}{(1 - x)(1 - x^5)(1 - x^{10})}$$

The number of ways to make change for $\$n$ is precisely the **coefficient of $x^n$** in the polynomial expansion! Generating functions convert combinatorial counting problems into polynomial algebra.

---

## 6. Python Implementation: PIE, Derangements & Stirling Numbers

```python
import math

def count_derangements(n: int) -> int:
    """Compute number of derangements !n via analytical PIE formula."""
    total = 0
    for k in range(n + 1):
        sign = (-1) ** k
        total += sign * (math.factorial(n) // math.factorial(k))
    return total

def stirling_second_kind(n: int, k: int) -> int:
    """Compute Stirling number of the second kind S(n, k)."""
    if n == k or k == 1:
        return 1
    if k > n or k == 0:
        return 0
    # Dynamic programming table
    dp = [[0] * (k + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        dp[i][1] = 1
        for j in range(2, min(i + 1, k + 1)):
            dp[i][j] = dp[i - 1][j - 1] + j * dp[i - 1][j]
    return dp[n][k]

if __name__ == "__main__":
    print("=== Derangements (!n) and Convergence to n! / e ===")
    for n in range(1, 10):
        dn = count_derangements(n)
        ratio = dn / math.factorial(n)
        print(f"!{n} = {dn:<8} | Ratio !n / n!: {ratio:.6f} (1/e = {1/math.e:.6f})")

    print("\n=== Stirling Numbers of Second Kind S(n, k) ===")
    n, k = 6, 3
    print(f"Ways to partition {n} items into {k} non-empty sets: S({n}, {k}) = {stirling_second_kind(n, k)}")
```

---

## 7. Key Takeaways

1. **Inclusion-Exclusion Principle**: Systematically subtracts overlaps and adds back undercounted intersections via alternating signs.
2. **Derangements Approach $n! / e$**: Approximately $36.8\%$ of permutations leave zero elements in place.
3. **Generating Functions**: Encode discrete combinatorial sequences into formal polynomials to solve partition problems via multiplication.
