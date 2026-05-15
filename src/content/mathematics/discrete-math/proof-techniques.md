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

### 3. Proof by Contradiction

To prove a statement $p$, assume $\neg p$ and show this leads to a **logical contradiction** (a statement that is always false). Since $\neg p$ leads to an impossibility, $p$ must be true.

**When to use it**: When you need to prove something exists or something is impossible, and direct construction is not feasible.

**Example**: Prove that $\sqrt{2}$ is irrational.

**Proof (by contradiction)**: Assume, for the sake of contradiction, that $\sqrt{2}$ is rational. Then $\sqrt{2} = \frac{a}{b}$ where $a, b$ are integers with no common factors (i.e., the fraction is in lowest terms).

Squaring both sides: $2 = \frac{a^2}{b^2}$, so $a^2 = 2b^2$.

This means $a^2$ is even, so $a$ is even (proven by contraposition above). Let $a = 2c$.

Then $4c^2 = 2b^2$, so $b^2 = 2c^2$, which means $b$ is also even.

But if both $a$ and $b$ are even, they share a common factor of 2 — contradicting our assumption that the fraction was in lowest terms. $\square$

This is one of the most famous proofs in all of mathematics, first attributed to the ancient Greeks.

### 4. Proof by Cases (Exhaustion)

When the domain of discourse can be divided into a finite number of cases, we prove the statement separately for each case.

**Example**: Prove that $n^2 + n$ is even for all integers $n$.

**Proof**: Consider two cases:

*   **Case 1** ($n$ is even): $n = 2k$. Then $n^2 + n = 4k^2 + 2k = 2(2k^2 + k)$, which is even.
*   **Case 2** ($n$ is odd): $n = 2k + 1$. Then $n^2 + n = (2k+1)^2 + (2k+1) = 4k^2 + 4k + 2 = 2(2k^2 + 2k + 1)$, which is even.

Since $n$ must be either even or odd, and the result holds in both cases, $n^2 + n$ is always even. $\square$

### 5. Constructive vs. Non-Constructive Existence Proofs

*   A **constructive proof** of $\exists x P(x)$ explicitly exhibits an object $a$ and shows $P(a)$ is true.
*   A **non-constructive proof** shows that the existence of such an object must follow logically, without producing a specific example.

**Constructive example**: "There exists an irrational number." Proof: $\sqrt{2}$ is irrational (proven above).

**Non-constructive example**: "There exist irrational numbers $a$ and $b$ such that $a^b$ is rational."

Consider $\sqrt{2}^{\sqrt{2}}$. If it's rational, we're done ($a = b = \sqrt{2}$). If it's irrational, let $a = \sqrt{2}^{\sqrt{2}}$ and $b = \sqrt{2}$. Then $a^b = (\sqrt{2}^{\sqrt{2}})^{\sqrt{2}} = \sqrt{2}^2 = 2$, which is rational. Either way, such $a, b$ exist — but we haven't determined which case is actually true.

### 6. Uniqueness Proofs

To prove $\exists! x P(x)$ (there exists a **unique** $x$), you must show two things:

1.  **Existence**: $\exists x P(x)$ — at least one such $x$ exists.
2.  **Uniqueness**: If $P(a)$ and $P(b)$, then $a = b$ — no two different objects satisfy $P$.
