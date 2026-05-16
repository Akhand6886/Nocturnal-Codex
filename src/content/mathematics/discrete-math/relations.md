---
title: "Relations"
description: "How objects associate with one another. The theory behind databases, graphs, and ordering."
---

## Introduction to Relations

A **binary relation** $R$ from a set $A$ to a set $B$ is a subset of the Cartesian product $A \times B$. If $(a, b) \in R$, we say that $a$ is related to $b$, often written as $a \ R \ b$.

Relations are more general than functions. A function requires every input to map to exactly one output. A relation has no such restrictions; one element can relate to many, or to none at all.

### Properties of Relations

When a relation is defined on a single set $A$ (i.e., $R \subseteq A \times A$), we can analyze its structural properties. Let $R$ be a relation on set $A$:

1.  **Reflexive**: Every element is related to itself.
    $\forall a \in A, (a, a) \in R$
2.  **Symmetric**: If $a$ is related to $b$, then $b$ is related to $a$.
    $\forall a, b \in A, \text{ if } (a, b) \in R \text{ then } (b, a) \in R$
3.  **Antisymmetric**: If $a$ relates to $b$ and $b$ relates to $a$, they must be the same element. (It never goes "both ways" between distinct elements).
    $\forall a, b \in A, \text{ if } (a, b) \in R \text{ and } (b, a) \in R \text{ then } a = b$
4.  **Transitive**: If $a$ relates to $b$, and $b$ relates to $c$, then $a$ relates to $c$.
    $\forall a, b, c \in A, \text{ if } (a, b) \in R \text{ and } (b, c) \in R \text{ then } (a, c) \in R$

### Equivalence Relations

A relation that is **reflexive**, **symmetric**, and **transitive** is called an **Equivalence Relation**.

Equivalence relations are powerful because they partition a set into non-overlapping **equivalence classes**. All elements in an equivalence class are "equivalent" to each other under the relation.

*Example*: Modular arithmetic. "Congruence modulo 5" is an equivalence relation on integers. It partitions all integers into 5 distinct classes based on their remainder when divided by 5.

### Partial Orders

A relation that is **reflexive**, **antisymmetric**, and **transitive** is called a **Partial Order** (or Poset).

Partial orders represent hierarchies or dependencies where some elements precede others, but not all elements are necessarily comparable.

*Example*: The "subset" relation ($\subseteq$) on the power set of a set is a partial order. $\{1\} \subseteq \{1, 2\}$, but $\{1\}$ and $\{2\}$ are not subsets of each other (they are incomparable).

In computer science, resolving a partial order into a linear sequence is called **Topological Sorting** (used in build systems and task scheduling).

### Representing Relations

Relations can be visualized and stored in several ways:

1.  **Directed Graphs**: Nodes are elements, directed edges represent the relation.
2.  **Adjacency Matrices**: A boolean matrix where $M_{ij} = 1$ if $(i, j) \in R$. This representation turns relational properties into matrix properties (e.g., symmetry means the matrix is its own transpose).
3.  **Relational Databases**: Tables in SQL are literal manifestations of relations, where rows represent tuples in the subset of a Cartesian product.
