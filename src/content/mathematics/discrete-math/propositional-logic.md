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
*   A **contingency** is a proposition that is neither a tautology nor a contradiction — its truth value depends on the assignment.

### Well-Formed Formulas (WFFs)

Not every string of logical symbols is meaningful. A **Well-Formed Formula** is a syntactically valid expression in propositional logic, defined recursively:

1.  Every propositional variable ($p$, $q$, $r$, ...) is a WFF.
2.  If $\alpha$ is a WFF, then $\neg \alpha$ is a WFF.
3.  If $\alpha$ and $\beta$ are WFFs, then $(\alpha \land \beta)$, $(\alpha \lor \beta)$, $(\alpha \rightarrow \beta)$, and $(\alpha \leftrightarrow \beta)$ are WFFs.
4.  Nothing else is a WFF.

This recursive definition is the foundation for **parsing logical expressions** in compilers and automated theorem provers.

### Logical Equivalence

Two propositions $p$ and $q$ are **logically equivalent** (written $p \equiv q$) if they have the same truth value for every possible assignment of truth values to their variables.

To prove logical equivalence, you can:
1.  Construct truth tables for both sides and verify they match.
2.  Apply known equivalences (identities, De Morgan's laws, etc.) to algebraically transform one into the other.

### Satisfiability

A compound proposition is **satisfiable** if there is at least one assignment of truth values that makes it true. A proposition is **unsatisfiable** if no such assignment exists (i.e., it is a contradiction).

The **Boolean Satisfiability Problem (SAT)** — determining whether a given formula is satisfiable — is one of the most important problems in computer science. It was the first problem proven to be **NP-complete** (Cook-Levin Theorem, 1971), meaning every problem in NP can be reduced to SAT in polynomial time.

### Applications in Computer Science

*   **Circuit Design**: Every digital circuit is a physical implementation of propositional logic.
*   **Software Verification**: SAT solvers are used to verify that programs meet their specifications.
*   **Database Query Optimization**: WHERE clauses in SQL are propositional formulas that the query planner optimizes.
*   **AI and Constraint Satisfaction**: Many AI planning and scheduling problems are solved by encoding them as SAT instances.
