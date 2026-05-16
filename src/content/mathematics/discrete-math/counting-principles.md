---
title: "Counting Principles"
description: "The fundamental rules for determining the size of finite sets without enumerating every element."
---

## Introduction to Combinatorics

Combinatorics is the branch of mathematics dealing with counting, arrangement, and probability. In computer science, it is essential for analyzing algorithm complexity, determining state spaces, and calculating probabilities.

Before learning complex formulas, we must master the foundational rules of counting.

### The Rule of Sum (Addition Principle)

If a task can be performed in exactly one of two ways, and the first way has $m$ choices and the second way has $n$ choices, then the task can be performed in $m + n$ ways.

*In terms of sets*: If $A$ and $B$ are **disjoint** (mutually exclusive) sets, then $|A \cup B| = |A| + |B|$.

**Example**: You want to buy one vehicle. The dealership has 15 cars and 5 trucks. You have $15 + 5 = 20$ choices.

### The Rule of Product (Multiplication Principle)

If a task consists of a sequence of two independent steps, where the first step can be done in $m$ ways and the second step can be done in $n$ ways, then the total task can be done in $m \times n$ ways.

*In terms of sets*: The cardinality of the Cartesian product of two sets is the product of their cardinalities. $|A \times B| = |A| \times |B|$.

**Example**: A website requires a password consisting of one uppercase letter followed by one digit. There are $26 \times 10 = 260$ possible passwords.

### The Principle of Inclusion-Exclusion (PIE)

The Rule of Sum only works when choices are mutually exclusive (disjoint sets). What if there is overlap?

If sets $A$ and $B$ share elements, adding their sizes counts the shared elements twice. We must subtract the intersection to get the correct count:

**For two sets**:
$|A \cup B| = |A| + |B| - |A \cap B|$

**For three sets**:
$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$

**Example**: How many integers from 1 to 100 are divisible by 2 or 5?
*   Divisible by 2 ($|A|$): $100 / 2 = 50$
*   Divisible by 5 ($|B|$): $100 / 5 = 20$
*   Divisible by both 2 and 5 (i.e., divisible by 10) ($|A \cap B|$): $100 / 10 = 10$
*   Total: $50 + 20 - 10 = 60$.

### Tree Diagrams

When choices are not entirely independent, or the rules change based on previous choices, **Tree Diagrams** are a visual way to enumerate the state space. They are particularly useful for understanding branching algorithms, game trees (like chess), and decision processes.
