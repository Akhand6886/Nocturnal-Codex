---
title: "Proof Techniques"
description: "The core strategies for constructing mathematical proofs — the art of rigorous argument."
---

## Introduction to Mathematical Proofs

A **proof** is a valid argument that establishes the truth of a mathematical statement. Unlike empirical evidence (testing a million cases), a proof provides absolute certainty. Learning to construct proofs is the single most important skill in mathematics and theoretical computer science.

### Terminology

*   **Theorem**: A major result that has been proven.
*   **Lemma**: A "helper" result used to prove a theorem.
*   **Corollary**: A result that follows directly from a theorem.
*   **Conjecture**: A statement believed to be true but not yet proven.
*   **Axiom**: A statement accepted as true without proof.

### 1. Direct Proof

The most straightforward technique. To prove $p \rightarrow q$, you assume $p$ is true and use definitions, axioms, and previously proven results to show that $q$ must also be true.

**Example**: Prove that the sum of two even integers is even.

**Proof**: Let $a$ and $b$ be even integers. By definition, $a = 2k$ and $b = 2m$ for some integers $k$ and $m$. Then:

$a + b = 2k + 2m = 2(k + m)$

Since $k + m$ is an integer, $a + b$ is even by definition. $\square$
