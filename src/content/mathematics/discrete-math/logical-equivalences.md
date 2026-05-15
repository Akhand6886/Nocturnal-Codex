---
title: "Logical Equivalences"
description: "The fundamental laws for simplifying and transforming logical expressions — the algebra of logic."
---

## Logical Equivalences

Two propositions are **logically equivalent** ($p \equiv q$) if they have the same truth value under every possible interpretation. Logical equivalences are the "algebra rules" of logic — they allow us to simplify and transform formulas without changing their meaning.

### The Fundamental Laws

These equivalences form the complete toolkit for manipulating propositional formulas:

#### Identity Laws
*   $p \land T \equiv p$
*   $p \lor F \equiv p$

#### Domination Laws
*   $p \lor T \equiv T$
*   $p \land F \equiv F$

#### Idempotent Laws
*   $p \lor p \equiv p$
*   $p \land p \equiv p$

#### Double Negation Law
*   $\neg (\neg p) \equiv p$

#### Commutative Laws
*   $p \lor q \equiv q \lor p$
*   $p \land q \equiv q \land p$

#### Associative Laws
*   $(p \lor q) \lor r \equiv p \lor (q \lor r)$
*   $(p \land q) \land r \equiv p \land (q \land r)$

#### Distributive Laws
*   $p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$
*   $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$

#### De Morgan's Laws
*   $\neg (p \land q) \equiv \neg p \lor \neg q$
*   $\neg (p \lor q) \equiv \neg p \land \neg q$

De Morgan's Laws are arguably the most important equivalences in all of logic. They describe how negation distributes over conjunction and disjunction, and they appear everywhere — from circuit design to database query optimization to programming language semantics.

#### Absorption Laws
*   $p \lor (p \land q) \equiv p$
*   $p \land (p \lor q) \equiv p$

#### Conditional Identities
*   $p \rightarrow q \equiv \neg p \lor q$ (Material Conditional)
*   $p \rightarrow q \equiv \neg q \rightarrow \neg p$ (Contrapositive)
*   $p \leftrightarrow q \equiv (p \rightarrow q) \land (q \rightarrow p)$

The **contrapositive** equivalence is especially important — it is the foundation of **proof by contraposition**, one of the most powerful proof techniques.

### Proving Equivalences: A Worked Example

**Claim**: $\neg (p \rightarrow q) \equiv p \land \neg q$

**Proof by equivalence chain**:

| Step | Formula | Justification |
| :--- | :--- | :--- |
| 1 | $\neg (p \rightarrow q)$ | Given |
| 2 | $\neg (\neg p \lor q)$ | Material Conditional |
| 3 | $\neg (\neg p) \land \neg q$ | De Morgan's Law |
| 4 | $p \land \neg q$ | Double Negation |

This tells us: "The negation of 'if p then q' is 'p is true and q is false'" — which is exactly when a conditional statement fails.
