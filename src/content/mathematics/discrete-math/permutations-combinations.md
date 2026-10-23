---
title: "Permutations, Combinations & Stars and Bars"
description: "Arrangement theory, selections with and without replacement, multiset permutations, the Stars and Bars theorem, Pascal's identity, and the Multinomial theorem."
---

## 1. The Taxonomy of Combinatorial Selections

When selecting $r$ items from a set of $n$ distinct objects, the mathematical formula depends on two fundamental axes:
1. **Order**: Does the sequence matter? (Permutations vs Combinations).
2. **Repetition**: Can an object be selected more than once? (With vs Without replacement).

```
+-----------------------------------------------------------------------------------------+
|                                 THE 4-WAY SELECTION MATRIX                              |
+-----------------------------------------------------------------------------------------+
|                          WITHOUT REPLACEMENT                  WITH REPLACEMENT          |
|  -------------------------------------------------------------------------------------  |
|  ORDER MATTERS           Permutations                         Sequences with Repetition |
|  (Permutations)          P(n, r) = n! / (n - r)!              n^r                       |
|                                                                                         |
|  ORDER DOES NOT MATTER   Combinations                         Stars and Bars            |
|  (Combinations)          C(n, r) = n! / (r! * (n - r)!)       C(n + r - 1, r)           |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Permutations & Multiset Arrangements

### 2.1 Permutations Without Replacement
An ordered arrangement of $r$ distinct elements chosen from $n$ distinct elements:

$$P(n, r) = n \times (n - 1) \times (n - 2) \times \dots \times (n - r + 1) = \frac{n!}{(n - r)!}$$

### 2.2 Multiset Permutations (Permutations with Indistinguishable Objects)
How many distinct strings can be formed by rearranging the letters in **$\text{MISSISSIPPI}$**?
Total letters $n = 11$: $1 \text{ M}, 4 \text{ I}, 4 \text{ S}, 2 \text{ P}$.

If all letters were distinct, there would be $11!$ permutations. But permuting the $4$ identical $\text{I}$'s among themselves produces identical strings ($4!$ identical duplicates). 

#### Theorem:
The number of distinct permutations of $n$ objects where $n_1$ are of type 1, $n_2$ of type 2, ..., $n_k$ of type $k$ (with $\sum n_i = n$) is the **Multinomial Coefficient**:

$$\binom{n}{n_1, n_2, \dots, n_k} = \frac{n!}{n_1! \, n_2! \cdots n_k!}$$

For $\text{MISSISSIPPI}$:
$$\frac{11!}{1! \times 4! \times 4! \times 2!} = \frac{39,916,800}{1 \times 24 \times 24 \times 2} = 34,650 \text{ distinct anagrams.}$$

---

## 3. Combinations: Unordered Selections

The number of ways to choose an unordered subset of $r$ elements from $n$ distinct elements:

$$\binom{n}{r} = C(n, r) = \frac{P(n, r)}{r!} = \frac{n!}{r!(n - r)!}$$

### Key Symmetries & Identities:
1. **Complementary Symmetry**:
   $$\binom{n}{r} = \binom{n}{n - r}$$
   *(Choosing $r$ elements to include is identical to choosing $n - r$ elements to leave behind).*
2. **Pascal's Identity**:
   $$\binom{n}{r} = \binom{n - 1}{r - 1} + \binom{n - 1}{r}$$
   *Combinatorial Proof*: Focus on element $x_n$. Any subset of size $r$ either includes $x_n$ (must choose remaining $r-1$ from $n-1$) or excludes $x_n$ (must choose all $r$ from $n-1$). $\blacksquare$

---

## 4. Combinations with Replacement: Stars and Bars

How many ways can you distribute $r$ identical computational tasks across $n$ distinct server worker threads?
Equivalently: How many non-negative integer solutions exist for:

$$x_1 + x_2 + \dots + x_n = r, \quad \text{where } x_i \ge 0$$

### The Geometric Stars and Bars Encoding
Represent the $r$ identical tasks as **Stars** ($\star$), and use $n - 1$ vertical **Bars** ($|$) to partition them into $n$ bins:

```
Distributing r = 7 tasks across n = 3 servers:
Server 1: 3 tasks       Server 2: 1 task        Server 3: 3 tasks
     *  *  *         |          *          |         *  *  *
```

Any valid distribution corresponds to a distinct arrangement of $r$ stars and $n - 1$ bars.
Total positions in the sequence:
$$\text{Total symbols} = r + (n - 1)$$
To form a configuration, we simply choose which $r$ positions will be stars (or which $n - 1$ positions will be bars):

$$\binom{n + r - 1}{r} = \binom{n + r - 1}{n - 1}$$

#### Positive Integer Solutions ($x_i \ge 1$):
If every server must receive at least 1 task, pre-assign 1 task to each of the $n$ servers ($r' = r - n$). The remaining $r - n$ tasks are distributed freely:

$$\binom{(r - n) + n - 1}{n - 1} = \binom{r - 1}{n - 1}$$

---

## 5. The Binomial & Multinomial Theorems

### 5.1 The Binomial Theorem
For any real numbers $x, y$ and non-negative integer $n$:

$$(x + y)^n = \sum_{k=0}^n \binom{n}{k} x^{n - k} y^k$$

#### Combinatorial Proof:
$$(x + y)^n = \underbrace{(x + y)(x + y)\cdots(x + y)}_{n \text{ factors}}$$
When expanding the product, each term chooses either $x$ or $y$ from each factor. The term $x^{n-k} y^k$ arises whenever we choose $y$ from exactly $k$ factors (and $x$ from the remaining $n - k$). There are $\binom{n}{k}$ ways to make this choice. $\blacksquare$

### 5.2 Classic Binomial Sum Corollaries:
1. Setting $x = 1, y = 1$:
   $$\sum_{k=0}^n \binom{n}{k} = \binom{n}{0} + \binom{n}{1} + \dots + \binom{n}{n} = 2^n \quad (\text{Total subsets in power set } \mathcal{P}(A))$$
2. Setting $x = 1, y = -1$:
   $$\sum_{k=0}^n (-1)^k \binom{n}{k} = 0 \implies \sum_{k \text{ even}} \binom{n}{k} = \sum_{k \text{ odd}} \binom{n}{k} = 2^{n - 1}$$

---

## 6. Vandermonde's Identity

For non-negative integers $m, n, r$:

$$\binom{m + n}{r} = \sum_{k=0}^r \binom{m}{k} \binom{n}{r - k}$$

*Combinatorial Proof*:
Suppose a committee of $r$ software engineers must be formed from a department of $m$ frontend developers and $n$ backend developers.
The total number of committees is $\binom{m + n}{r}$.
Alternatively, we can partition by the number $k$ of frontend developers chosen ($0 \le k \le r$): choose $k$ frontend engineers ($\binom{m}{k}$) and remaining $r - k$ backend engineers ($\binom{n}{r - k}$). Summing over all possible $k$ yields the identical total. $\blacksquare$

---

## 7. Python Implementation: Stars and Bars & Binomial Expansion

```python
import math

def stars_and_bars(n_bins: int, r_items: int, min_per_bin: int = 0) -> int:
    """
    Count number of ways to distribute r identical items into n distinct bins.
    min_per_bin: 0 for non-negative solutions, 1 for strictly positive solutions.
    """
    if min_per_bin == 1:
        if r_items < n_bins:
            return 0
        return math.comb(r_items - 1, n_bins - 1)
    else:
        return math.comb(n_bins + r_items - 1, r_items)

def multinomial_coefficient(counts: list[int]) -> int:
    """Compute multinomial coefficient n! / (n1! * n2! * ... * nk!)."""
    n = sum(counts)
    numerator = math.factorial(n)
    denominator = 1
    for c in counts:
        denominator *= math.factorial(c)
    return numerator // denominator

if __name__ == "__main__":
    # Stars and Bars: Distribute 10 microservice tasks across 3 worker nodes
    ways = stars_and_bars(n_bins=3, r_items=10, min_per_bin=0)
    print("=== Stars and Bars Distribution ===")
    print(f"Ways to distribute 10 tasks across 3 workers: {ways} ways")

    # Multiset permutations: "MISSISSIPPI" (1 M, 4 I, 4 S, 2 P)
    mississippi_perms = multinomial_coefficient([1, 4, 4, 2])
    print("\n=== Multiset Permutations ===")
    print(f"Permutations of 'MISSISSIPPI': {mississippi_perms:,}")
```

---

## 8. Key Takeaways

1. **Permutations vs Combinations**: Permutations track order ($P(n, r)$); combinations discard order ($C(n, r) = P(n, r)/r!$).
2. **Stars and Bars**: Solves selections with replacement and linear Diophantine sum equations via $\binom{n + r - 1}{r}$.
3. **Binomial Identities**: $\sum_{k=0}^n \binom{n}{k} = 2^n$ directly counts total subsets in the power set.
