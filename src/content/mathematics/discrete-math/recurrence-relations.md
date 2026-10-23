---
title: "Recurrence Relations & Master Theorem"
description: "Linear homogeneous recurrences with constant coefficients, characteristic roots, Binet's formula, the Master Theorem for divide-and-conquer, and the Akra-Bazzi method."
---

## 1. The Mathematics of Recursive Systems

In computer science, recursive algorithms break problems down into smaller subproblems of the same type. The runtime, memory consumption, and state space of these algorithms are expressed as **Recurrence Relations**—equations that recursively define a sequence in terms of previous terms.

```
+-----------------------------------------------------------------------------------------+
|                                RECURRENCE TAXONOMY IN ALGORITHMS                        |
+-----------------------------------------------------------------------------------------+
|  TYPE 1: LINEAR RECURRENCES          T(n) = c_1 T(n-1) + c_2 T(n-2) + ...              |
|          Solved via: Characteristic Polynomials & Generating Functions                  |
|          Examples: Fibonacci, Tower of Hanoi, Dynamic Programming paths                 |
|                                                                                         |
|  TYPE 2: DIVIDE-AND-CONQUER          T(n) = a T(n/b) + f(n)                             |
|          Solved via: The Master Theorem & Recursion Trees                               |
|          Examples: MergeSort, Binary Search, Fast Fourier Transform (FFT)               |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Linear Homogeneous Recurrence Relations

A linear homogeneous recurrence relation of degree $k$ with constant coefficients has the form:

$$a_n = c_1 a_{n-1} + c_2 a_{n-2} + \dots + c_k a_{n-k}$$

where $c_1, c_2, \dots, c_k$ are real constants and $c_k \neq 0$.

### 2.1 The Characteristic Equation Method
We seek solutions of the exponential form $a_n = r^n$ where $r \neq 0$. Substituting into the recurrence:

$$r^n - c_1 r^{n-1} - c_2 r^{n-2} - \dots - c_k r^{n-k} = 0$$

Dividing by $r^{n-k}$ yields the **Characteristic Equation**:

$$r^k - c_1 r^{k-1} - c_2 r^{k-2} - \dots - c_k = 0$$

### 2.2 Distinct Roots Theorem
If the characteristic equation has $k$ distinct real roots $r_1, r_2, \dots, r_k$, the general solution is a linear combination:

$$a_n = \alpha_1 r_1^n + \alpha_2 r_2^n + \dots + \alpha_k r_k^n$$

The arbitrary constants $\alpha_1, \dots, \alpha_k$ are determined by matching $k$ initial boundary conditions.

### 2.3 Repeated Roots Theorem
If a root $r$ has multiplicity $m$, its contribution to the general solution is:

$$(\alpha_0 + \alpha_1 n + \alpha_2 n^2 + \dots + \alpha_{m-1} n^{m-1}) r^n$$

---

## 3. Derivation of Binet's Formula for Fibonacci Numbers

The Fibonacci sequence is defined by:
$$F_0 = 0, \quad F_1 = 1, \quad F_n = F_{n-1} + F_{n-2} \text{ for } n \ge 2$$

### Step-by-Step Derivation:
1. **Characteristic Equation**:
   $$r^2 - r - 1 = 0$$
2. **Roots via Quadratic Formula**:
   $$r_1 = \frac{1 + \sqrt{5}}{2} = \phi \quad (\text{The Golden Ratio}), \qquad r_2 = \frac{1 - \sqrt{5}}{2} = \psi$$
3. **General Solution**:
   $$F_n = \alpha_1 \left(\frac{1 + \sqrt{5}}{2}\right)^n + \alpha_2 \left(\frac{1 - \sqrt{5}}{2}\right)^n$$
4. **Boundary Conditions**:
   - For $n = 0$: $F_0 = \alpha_1 + \alpha_2 = 0 \implies \alpha_2 = -\alpha_1$
   - For $n = 1$: $F_1 = \alpha_1 \left(\frac{1 + \sqrt{5}}{2}\right) - \alpha_1 \left(\frac{1 - \sqrt{5}}{2}\right) = \alpha_1 \sqrt{5} = 1 \implies \alpha_1 = \frac{1}{\sqrt{5}}$
5. **Exact Closed Form (Binet's Formula)**:

$$F_n = \frac{1}{\sqrt{5}} \left[ \left(\frac{1 + \sqrt{5}}{2}\right)^n - \left(\frac{1 - \sqrt{5}}{2}\right)^n \right]$$

Because $|r_2| = |\frac{1 - \sqrt{5}}{2}| \approx 0.618 < 1$, as $n \to \infty$, $r_2^n \to 0$. Therefore, $F_n = \text{round}\left( \frac{\phi^n}{\sqrt{5}} \right)$, establishing that **Fibonacci numbers grow strictly exponentially at rate $\Theta(\phi^n) \approx \Theta(1.618^n)$**.

---

## 4. The Master Theorem for Divide-and-Conquer

Divide-and-conquer algorithms divide a problem of size $n$ into $a$ subproblems, each of size $n/b$, with $f(n)$ combining cost:

$$T(n) = a T\left(\frac{n}{b}\right) + f(n)$$

where $a \ge 1$, $b > 1$, and $f(n)$ is asymptotically positive.

```
Recursion Tree Visualization:
Level 0:                         f(n)                                 Cost = f(n)
                               /      \
Level 1:                 f(n/b)        f(n/b)   ... [a subproblems]   Cost = a * f(n/b)
                        /      \      /      \
Level log_b(n):        T(1)   T(1)   T(1)   T(1)                      Cost = a^{log_b n} * T(1)
                                                                           = n^{log_b a} * Theta(1)
```

The critical exponent is **$c_{\text{crit}} = \log_b a$**, which represents the leaf-level computational work.

### The Three Master Cases

| Case | Condition | Dominant Factor | Asymptotic Bound $T(n)$ |
| :--- | :--- | :--- | :--- |
| **Case 1: Leaves Dominate** | $f(n) = O(n^{\log_b a - \epsilon})$ for some $\epsilon > 0$ | Leaf nodes $n^{\log_b a}$ dominate total runtime. | $T(n) = \Theta(n^{\log_b a})$ |
| **Case 2: Balanced Work** | $f(n) = \Theta(n^{\log_b a} \log^k n)$ for some $k \ge 0$ | Work is evenly distributed across all tree levels. | $T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$ |
| **Case 3: Root Dominates** | $f(n) = \Omega(n^{\log_b a + \epsilon})$ and $a f(n/b) \le c f(n)$ | Root node $f(n)$ dominates total runtime. | $T(n) = \Theta(f(n))$ |

---

## 5. Classic Algorithm Complexity Derivations

### 5.1 MergeSort
Divides array into 2 halves ($a=2, b=2$), merges in linear time ($f(n) = \Theta(n)$):
$$T(n) = 2T(n/2) + \Theta(n)$$
- $a = 2, b = 2 \implies \log_b a = \log_2 2 = 1$.
- $f(n) = \Theta(n^1) = \Theta(n^{\log_b a} \log^0 n) \implies$ **Case 2 with $k = 0$**.
$$T(n) = \Theta(n^1 \log^1 n) = \Theta(n \log n)$$

### 5.2 Binary Search
Divides problem into 1 half ($a=1, b=2$), constant comparison ($f(n) = \Theta(1)$):
$$T(n) = T(n/2) + \Theta(1)$$
- $a = 1, b = 2 \implies \log_b a = \log_2 1 = 0$.
- $f(n) = \Theta(1) = \Theta(n^0) \implies$ **Case 2 with $k = 0$**.
$$T(n) = \Theta(n^0 \log^1 n) = \Theta(\log n)$$

### 5.3 Strassen's Matrix Multiplication
Multiplies two $n \times n$ matrices using 7 recursive sub-matrix multiplications ($a=7, b=2$), combined in $\Theta(n^2)$ additions:
$$T(n) = 7T(n/2) + \Theta(n^2)$$
- $a = 7, b = 2 \implies \log_b a = \log_2 7 \approx 2.807$.
- $f(n) = \Theta(n^2) = O(n^{2.807 - 0.807}) \implies$ **Case 1**.
$$T(n) = \Theta(n^{\log_2 7}) \approx \Theta(n^{2.807})$$
This beats the standard naive matrix multiplication $O(n^3)$ algorithm!

### 5.4 Karatsuba Large Integer Multiplication
Multiplies two $n$-digit numbers using 3 half-size multiplications:
$$T(n) = 3T(n/2) + \Theta(n)$$
- $\log_b a = \log_2 3 \approx 1.585 \implies$ **Case 1**.
$$T(n) = \Theta(n^{\log_2 3}) \approx \Theta(n^{1.585}) \quad (\text{vs naive } O(n^2))$$

---

## 6. The Akra-Bazzi Generalization

What happens when subproblems have **unequal division sizes** (e.g., $T(n) = T(n/3) + T(2n/3) + \Theta(n)$)? The standard Master Theorem fails!

### The Akra-Bazzi Theorem
For recurrences of the form $T(n) = \sum_{i=1}^k a_i T(b_i n) + g(n)$, find the unique real value $p$ that satisfies:

$$\sum_{i=1}^k a_i b_i^p = 1$$

Then the exact asymptotic solution is:

$$T(n) = \Theta\left( n^p \left( 1 + \int_1^n \frac{g(u)}{u^{p+1}} \, du \right) \right)$$

For $T(n) = T(n/3) + T(2n/3) + O(n)$:
$$(1/3)^p + (2/3)^p = 1 \implies p = 1$$
$$T(n) = \Theta\left( n^1 \left( 1 + \int_1^n \frac{u}{u^2} \, du \right) \right) = \Theta(n \ln n)$$

---

## 7. Python Implementation: Verifying Closed Forms & Master Bounds

```python
import numpy as np

def fibonacci_binet(n: int) -> int:
    """Compute n-th Fibonacci number in O(1) time via Binet's formula."""
    phi = (1.0 + np.sqrt(5.0)) / 2.0
    psi = (1.0 - np.sqrt(5.0)) / 2.0
    return int(round((phi**n - psi**n) / np.sqrt(5.0)))

def count_mergesort_operations(n: int) -> int:
    """Simulate exact operation count T(n) = 2T(n/2) + n for MergeSort."""
    if n <= 1:
        return 0
    left = n // 2
    right = n - left
    # Divide + Merge work
    return count_mergesort_operations(left) + count_mergesort_operations(right) + n

if __name__ == "__main__":
    print("=== Binet's Formula Verification ===")
    for n in range(11):
        print(f"F_{n:<2} = {fibonacci_binet(n)}")

    print("\n=== MergeSort Recurrence Operations (n * log2(n)) ===")
    for power in [8, 10, 12, 14]:
        size = 2**power
        ops = count_mergesort_operations(size)
        theoretical = size * power
        print(f"n = {size:<5} | Measured Operations: {ops:<7} | n * log2(n): {theoretical:<7}")
```

---

## 8. Key Takeaways

1. **Characteristic Roots**: Homogeneous recurrences $a_n = \sum c_i a_{n-i}$ solve to linear combinations of geometric powers $\sum \alpha_i r_i^n$.
2. **Master Exponent $\log_b a$**: Governs divide-and-conquer runtime; compares leaves work ($n^{\log_b a}$) against partition/combine work ($f(n)$).
3. **Akra-Bazzi for Unequal Splits**: When subproblem sizes vary ($n/3 + 2n/3$), solve $\sum a_i b_i^p = 1$.
