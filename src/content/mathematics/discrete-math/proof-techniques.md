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

### 2. Proof by Contraposition

Instead of proving $p \rightarrow q$ directly, we prove its **contrapositive**: $\neg q \rightarrow \neg p$. Since a statement and its contrapositive are logically equivalent, this is a valid proof strategy.

**When to use it**: When the conclusion $q$ is hard to work with directly, but $\neg q$ gives you something concrete to start from.

**Example**: Prove that if $n^2$ is even, then $n$ is even.

**Proof (by contraposition)**: We prove the contrapositive: "If $n$ is odd, then $n^2$ is odd."

Assume $n$ is odd. Then $n = 2k + 1$ for some integer $k$.

$n^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$

Since $2k^2 + 2k$ is an integer, $n^2$ is odd by definition. $\square$
