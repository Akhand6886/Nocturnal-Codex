---
title: "Permutations & Combinations"
description: "The mathematics of arrangements and selections. Essential for probability and algorithm analysis."
---

## Permutations: When Order Matters

A **permutation** is an arrangement of objects in a specific order.

### 1. Permutations without Replacement

How many ways can we arrange $n$ distinct objects?
The first position has $n$ choices, the second has $n-1$, and so on. This is $n$ factorial, denoted $n!$.
$n! = n \times (n-1) \times \ldots \times 2 \times 1$
*(Note: $0! = 1$ by definition).*

If we only want to arrange $r$ objects out of $n$ available objects, we use the formula for a **$r$-permutation of $n$ items**, denoted $P(n, r)$ or ${}_nP_r$:
$P(n, r) = \frac{n!}{(n-r)!}$

*Example*: How many 3-letter passwords can be made from the letters A,B,C,D,E without repeating letters?
$P(5, 3) = \frac{5!}{2!} = 5 \times 4 \times 3 = 60$.

### 2. Permutations with Replacement

If we arrange $r$ objects from a set of $n$ distinct objects, and repetition is allowed, the formula is simply:
$n^r$

*Example*: How many 3-letter passwords can be made from A,B,C,D,E if letters can be repeated?
$5^3 = 125$.

## Combinations: When Order Doesn't Matter

A **combination** is a selection of objects where the order of selection is irrelevant. A hand of cards is a combination; a password is a permutation.

### 1. Combinations without Replacement

How many ways can we select a group of $r$ objects from $n$ distinct objects?
This is an $r$-combination of $n$ items, denoted $C(n, r)$, ${}_nC_r$, or $\binom{n}{r}$ ("n choose r").

Since order doesn't matter, we take the number of permutations $P(n, r)$ and divide by the number of ways to arrange those $r$ items ($r!$):
$C(n, r) = \frac{n!}{r!(n-r)!}$

*Example*: How many ways can you choose a 3-person committee from a group of 5 people?
$C(5, 3) = \frac{5!}{3!2!} = \frac{120}{6 \times 2} = 10$.

### 2. Combinations with Replacement (Stars and Bars)

Selecting $r$ items from $n$ categories, where repetition is allowed, is famously solved using the "Stars and Bars" technique.
The formula is:
$C(n+r-1, r)$

*Example*: You are buying 4 donuts. The shop has 3 flavors: glazed, chocolate, and jelly. How many different combinations can you buy?
$n=3, r=4 \rightarrow C(3+4-1, 4) = C(6, 4) = 15$.

## Binomial Theorem and Pascal's Triangle

Combinations are deeply connected to algebra. The coefficient of $x^k y^{n-k}$ in the expansion of $(x + y)^n$ is precisely $\binom{n}{k}$. This is the **Binomial Theorem**.

These coefficients form **Pascal's Triangle**, where each number is the sum of the two directly above it. This gives us Pascal's Identity:
$\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$
