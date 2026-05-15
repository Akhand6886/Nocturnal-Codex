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
