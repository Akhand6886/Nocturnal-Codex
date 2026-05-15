---
title: "Predicate Logic"
description: "Extending propositional logic with variables and quantifiers to handle more complex statements."
---

## Introduction to Predicate Logic

While propositional logic deals with simple statements, **Predicate Logic** (also called **First-Order Logic**) allows us to reason about objects, their properties, and relationships between them. It is strictly more expressive than propositional logic.

### The Domain of Discourse

Every predicate logic statement is interpreted relative to a **domain of discourse** (or **universe**) — the set of all objects we are reasoning about.

*   If the domain is the integers, $\forall x (x^2 \geq 0)$ is true.
*   If the domain is the complex numbers, the same statement is false (e.g., $i^2 = -1$).

The domain must always be explicitly stated or clearly understood from context.

### Predicates

A **predicate** is a statement that contains one or more variables. For example, $P(x)$ might mean "$x$ is greater than 3". The predicate itself has no truth value until a value is assigned to $x$.

**Multi-place predicates** describe relationships: $R(x, y)$ might mean "$x$ is the parent of $y$", turning the predicate into a relation.

### Bound and Free Variables

*   A variable is **bound** if it is governed by a quantifier: in $\forall x P(x)$, $x$ is bound.
*   A variable is **free** if it is not governed by a quantifier: in $P(x) \land \forall y Q(y)$, $x$ is free and $y$ is bound.
*   A formula with no free variables is called a **sentence** and has a definite truth value.

### Quantifiers

Quantifiers allow us to express how many objects in a domain satisfy a predicate:

1.  **Universal Quantifier ($\forall x P(x)$)**: "$P(x)$ is true for **all** $x$ in the domain."
2.  **Existential Quantifier ($\exists x P(x)$)**: "There **exists** at least one $x$ in the domain such that $P(x)$ is true."
3.  **Uniqueness Quantifier ($\exists! x P(x)$)**: "There exists **exactly one** $x$ in the domain such that $P(x)$ is true." This can be expressed as: $\exists x (P(x) \land \forall y (P(y) \rightarrow y = x))$.

### Nested Quantifiers

Statements can involve multiple quantifiers. For example:
$\forall x \exists y (x + y = 0)$ means "For every $x$, there exists a $y$ such that $x + y = 0$."

**The order of quantifiers matters.** Consider these two statements over the integers:

*   $\forall x \exists y (x + y = 0)$ — **True.** For every integer, its negation exists.
*   $\exists y \forall x (x + y = 0)$ — **False.** No single integer is the negation of every integer.

Swapping quantifiers of the same type is safe ($\forall x \forall y$ is the same as $\forall y \forall x$), but swapping different quantifiers changes meaning.

### Negating Quantified Statements (De Morgan's Laws for Quantifiers)

*   $\neg (\forall x P(x)) \equiv \exists x \neg P(x)$
*   $\neg (\exists x P(x)) \equiv \forall x \neg P(x)$

This means that if a statement is not true for all $x$, then there must be at least one $x$ for which it is false.

### Prenex Normal Form

A formula is in **Prenex Normal Form** if it is of the form:

$Q_1 x_1 \, Q_2 x_2 \, \ldots \, Q_n x_n \, \phi(x_1, x_2, \ldots, x_n)$

where each $Q_i$ is either $\forall$ or $\exists$, and $\phi$ is quantifier-free. Any first-order formula can be converted to Prenex Normal Form by:

1.  Eliminating biconditionals and implications.
2.  Moving negations inward using De Morgan's Laws.
3.  Renaming bound variables to avoid conflicts.
4.  Moving all quantifiers to the front.

### Translating English to Logic

A critical skill is translating natural language into predicate logic:

| English | Predicate Logic |
| :--- | :--- |
| "Every student passed the exam." | $\forall x (Student(x) \rightarrow Passed(x))$ |
| "Some students failed." | $\exists x (Student(x) \land Failed(x))$ |
| "No cat likes water." | $\forall x (Cat(x) \rightarrow \neg Likes(x, water))$ |
| "There is exactly one winner." | $\exists! x Winner(x)$ |

**Note**: Universal statements use $\rightarrow$ (implication), while existential statements use $\land$ (conjunction). Mixing these up is one of the most common errors.

### Applications in Computer Science

*   **Type Systems**: Type inference in languages like Haskell and Rust uses first-order unification.
*   **Databases**: SQL queries are essentially predicate logic statements over relational tables.
*   **Program Specifications**: Pre/post-conditions and loop invariants are expressed in predicate logic (e.g., Hoare Logic).
*   **Automated Theorem Proving**: Proof assistants like Coq and Lean operate in higher-order extensions of predicate logic.

---

### Key Takeaway

Predicate logic is the language in which all of mathematics is written. For computer scientists, it bridges the gap between informal requirements ("every user must have a unique email") and formal specifications that can be verified by machines.
