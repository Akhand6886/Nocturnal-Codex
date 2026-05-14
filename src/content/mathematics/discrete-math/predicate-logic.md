---
title: "Predicate Logic"
description: "Extending propositional logic with variables and quantifiers to handle more complex statements."
---

## Introduction to Predicate Logic

While propositional logic deals with simple statements, **Predicate Logic** allows us to reason about objects and their properties.

### Predicates

A **predicate** is a statement that contains one or more variables. For example, $P(x)$ might mean "$x$ is greater than 3". The predicate itself has no truth value until a value is assigned to $x$.

### Quantifiers

Quantifiers allow us to express how many objects in a domain satisfy a predicate:

1.  **Universal Quantifier ($\forall x P(x)$)**: "$P(x)$ is true for **all** $x$ in the domain."
2.  **Existential Quantifier ($\exists x P(x)$)**: "There **exists** at least one $x$ in the domain such that $P(x)$ is true."

### Nested Quantifiers

Statements can involve multiple quantifiers. For example:
$\forall x \exists y (x + y = 0)$ means "For every $x$, there exists a $y$ such that $x + y = 0$."

### Negating Quantified Statements (De Morgan's Laws for Quantifiers)

*   $\neg (\forall x P(x)) \equiv \exists x \neg P(x)$
*   $\neg (\exists x P(x)) \equiv \forall x \neg P(x)$

This means that if a statement is not true for all $x$, then there must be at least one $x$ for which it is false.
