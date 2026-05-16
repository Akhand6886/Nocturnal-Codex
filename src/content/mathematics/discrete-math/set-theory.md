---
title: "Set Theory"
description: "The mathematical science of collections. Understanding sets is the prerequisite for databases, types, and logic."
---

## Introduction to Set Theory

A **set** is an unordered collection of distinct objects, considered as an object in its own right. The objects within a set are called its **elements** or **members**.

We typically denote sets with capital letters ($A, B, C$) and elements with lowercase letters ($a, b, c$). If $x$ is an element of set $A$, we write $x \in A$. If it is not, we write $x \notin A$.

### Describing Sets

1.  **Roster Notation**: Listing elements explicitly inside braces.
    $A = \{1, 2, 3, 4, 5\}$
2.  **Set-Builder Notation**: Defining properties that elements must satisfy.
    $B = \{x \mid x \text{ is an even integer and } x > 0\}$
    (Read as: "The set of all $x$ such that $x$ is an even integer and $x > 0$")

### Subsets and Power Sets

A set $A$ is a **subset** of $B$ (denoted $A \subseteq B$) if every element of $A$ is also an element of $B$.
A set $A$ is a **proper subset** of $B$ (denoted $A \subset B$) if $A \subseteq B$ but $A \neq B$.

The **Power Set** of a set $S$ (denoted $\mathcal{P}(S)$ or $2^S$) is the set of all subsets of $S$, including the empty set $\emptyset$ and $S$ itself.
If $S$ has $n$ elements, $\mathcal{P}(S)$ has $2^n$ elements.

Example: If $S = \{1, 2\}$, then $\mathcal{P}(S) = \{\emptyset, \{1\}, \{2\}, \{1, 2\}\}$.

### Set Operations

Sets can be combined in ways analogous to logical operators:

*   **Union ($A \cup B$)**: The set of elements in $A$, or in $B$, or in both. (Logical OR)
*   **Intersection ($A \cap B$)**: The set of elements in both $A$ and $B$. (Logical AND)
*   **Difference ($A \setminus B$ or $A - B$)**: The set of elements in $A$ but not in $B$.
*   **Complement ($\overline{A}$ or $A^c$)**: The set of elements in the universal set $U$ that are not in $A$. (Logical NOT)

**De Morgan's Laws for Sets**:
*   $\overline{A \cup B} = \overline{A} \cap \overline{B}$
*   $\overline{A \cap B} = \overline{A} \cup \overline{B}$

### Cartesian Product

The **Cartesian Product** of two sets $A$ and $B$ (denoted $A \times B$) is the set of all ordered pairs $(a, b)$ where $a \in A$ and $b \in B$.
$A \times B = \{(a, b) \mid a \in A \text{ and } b \in B\}$

This is foundational for defining relations and databases (a table is a subset of the Cartesian product of its column domains).

### Infinite Sets: Countable vs. Uncountable

Not all infinities are equal.

*   **Countably Infinite**: A set that can be put into a one-to-one correspondence with the natural numbers $\mathbb{N}$. Example: The set of all integers $\mathbb{Z}$, the set of all rational numbers $\mathbb{Q}$, the set of all valid computer programs.
*   **Uncountably Infinite**: A set that is strictly "larger" than $\mathbb{N}$. Example: The set of all real numbers $\mathbb{R}$ between 0 and 1. (Proven via Cantor's Diagonal Argument).

Because the set of computer programs is countable but the set of real-valued functions is uncountable, there are fundamentally more problems than there are programs to solve them!
