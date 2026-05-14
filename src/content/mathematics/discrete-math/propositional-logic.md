---
title: "Propositional Logic"
description: "The study of propositions and the ways in which they can be combined to form new propositions."
---

## Introduction to Propositional Logic

A **proposition** is a declarative sentence that is either true or false, but not both. For example, "The sky is blue" is a proposition, while "Go to your room!" is not.

### Logical Connectives

Propositions can be combined using logical operators to form **compound propositions**:

1.  **Negation ($\neg p$)**: "Not p". If $p$ is true, $\neg p$ is false.
2.  **Conjunction ($p \land q$)**: "p and q". True only if both $p$ and $q$ are true.
3.  **Disjunction ($p \lor q$)**: "p or q". True if at least one of $p$ or $q$ is true.
4.  **Conditional ($p \rightarrow q$)**: "If p, then q". False only if $p$ is true and $q$ is false.
5.  **Biconditional ($p \leftrightarrow q$)**: "p if and only if q". True if $p$ and $q$ have the same truth value.

### Truth Tables

A truth table lists all possible combinations of truth values for a set of propositions and shows the resulting truth value for a compound proposition.

| $p$ | $q$ | $p \land q$ | $p \lor q$ | $p \rightarrow q$ |
| :--- | :--- | :--- | :--- | :--- |
| T | T | T | T | T |
| T | F | F | T | F |
| F | T | F | T | T |
| F | F | F | F | T |

### Tautologies and Contradictions

*   A **tautology** is a compound proposition that is always true, regardless of the truth values of the individual propositions (e.g., $p \lor \neg p$).
*   A **contradiction** is a compound proposition that is always false (e.g., $p \land \neg p$).
