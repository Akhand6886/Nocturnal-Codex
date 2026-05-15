---
title: "Mathematical Induction"
description: "The most powerful proof technique for statements about natural numbers — the domino principle of mathematics."
---

## Introduction to Mathematical Induction

**Mathematical induction** is a proof technique used to establish that a statement $P(n)$ is true for all natural numbers $n \geq n_0$ (typically $n_0 = 0$ or $n_0 = 1$). It is the mathematical formalization of the **domino effect**.

### The Principle

To prove $\forall n \geq n_0, P(n)$:

1.  **Base Case**: Prove $P(n_0)$ is true.
2.  **Inductive Step**: Prove that for any arbitrary $k \geq n_0$, if $P(k)$ is true (**inductive hypothesis**), then $P(k+1)$ is also true.

If both steps succeed, then $P(n)$ holds for all $n \geq n_0$.

**Intuition**: You push over the first domino (base case). Each domino is set up to knock over the next one (inductive step). Therefore, all dominoes fall.

### Example 1: Sum of First $n$ Natural Numbers

**Claim**: $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$ for all $n \geq 1$.

**Base Case** ($n = 1$): $\sum_{i=1}^{1} i = 1$ and $\frac{1(2)}{2} = 1$. ✓

**Inductive Step**: Assume the formula holds for $k$ (inductive hypothesis):
$\sum_{i=1}^{k} i = \frac{k(k+1)}{2}$

We need to show it holds for $k + 1$:

$\sum_{i=1}^{k+1} i = \sum_{i=1}^{k} i + (k+1) = \frac{k(k+1)}{2} + (k+1) = \frac{k(k+1) + 2(k+1)}{2} = \frac{(k+1)(k+2)}{2}$

This is exactly the formula with $n = k + 1$. $\square$

### Example 2: Divisibility

**Claim**: $6$ divides $n^3 - n$ for all $n \geq 0$.

**Base Case** ($n = 0$): $0^3 - 0 = 0$, and $6 \mid 0$. ✓

**Inductive Step**: Assume $6 \mid (k^3 - k)$, i.e., $k^3 - k = 6m$ for some integer $m$.

$(k+1)^3 - (k+1) = k^3 + 3k^2 + 3k + 1 - k - 1 = (k^3 - k) + 3k^2 + 3k = 6m + 3k(k+1)$

Since either $k$ or $k+1$ is even, $k(k+1)$ is always even, so $3k(k+1)$ is divisible by 6. Therefore $6 \mid ((k+1)^3 - (k+1))$. $\square$

### Common Pitfalls

1.  **Forgetting the base case**: Without it, the inductive step proves nothing. Consider: "All horses are the same color" — the inductive step seems valid, but the base case fails at $n = 2$.
2.  **Not using the inductive hypothesis**: If your inductive step doesn't actually use the assumption that $P(k)$ is true, you're probably doing a direct proof, not induction.
3.  **Wrong base case**: Make sure you prove the base case for the correct starting value, especially when the claim says "for all $n \geq 2$" instead of "for all $n \geq 1$".
