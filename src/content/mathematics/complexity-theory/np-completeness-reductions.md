---
title: "NP-Completeness & Reductions"
description: "Polynomial-time reductions, the Cook-Levin Theorem, proving NP-completeness, and engineering strategies for NP-hard problems."
---

## 1. Polynomial-Time Reductions ($A \le_p B$)

A reduction is a formal mathematical algorithm for solving problem $A$ using a subroutine that solves problem $B$.

A language $A \subseteq \Sigma^*$ is **Karp-reducible** (or polynomial-time many-one reducible) to language $B \subseteq \Sigma^*$, written:

$$A \le_p B$$

if there exists a deterministic polynomial-time computable function $f: \Sigma^* \to \Sigma^*$ such that for all $x \in \Sigma^*$:

$$x \in A \iff f(x) \in B$$

```
Instance x of Problem A ──► [ Polynomial Reducer f ] ──► Instance f(x) of Problem B
                                                                 │
                                                                 ▼
                                                        [ Black-Box Solver B ]
                                                                 │
                                                                 ▼
YES / NO for A ◄───────────────────────────────────────── YES / NO for B
```

### The Key Properties of Reductions
1. **Tractability Transfer**: If $A \le_p B$ and $B \in \mathbf{P}$, then $A \in \mathbf{P}$.
2. **Hardness Transfer**: If $A \le_p B$ and $A$ is hard, then $B$ must be **at least as hard as $A$**!

---

## 2. NP-Hardness and NP-Completeness

- **NP-Hard**: A language $L$ is **NP-Hard** if every problem in $\mathbf{NP}$ can be reduced to $L$ in polynomial time:
  $$\forall A \in \mathbf{NP}, \quad A \le_p L$$
- **NP-Complete**: A language $L$ is **NP-Complete** if:
  1. $L \in \mathbf{NP}$ (its solutions can be verified in polynomial time).
  2. $L$ is **NP-Hard** (every problem in NP reduces to it).

### The Cook-Levin Theorem (1971)
Stephen Cook and Leonid Levin independently proved that the **Boolean Satisfiability Problem (SAT)** is NP-Complete:

$$\text{SAT} \in \mathbf{NPC}$$

They proved this from scratch by showing that the execution of *any* arbitrary Nondeterministic Turing Machine on input $x$ can be encoded directly as a single massive boolean formula $\phi_{M, x}$ in polynomial time. $\phi_{M, x}$ is satisfiable if and only if machine $M$ accepts $x$.

---

## 3. Karp's 21 NP-Complete Problems: The Cascade of Reductions

Once SAT was established as the "anchor" of NP-completeness, Richard Karp (1972) showed that dozens of fundamental combinatorial problems are also NP-complete by establishing a chain of polynomial reductions:

```
                  SAT
                   │
                   ▼
                 3-SAT
             ┌─────┴─────┐
             ▼           ▼
        Independent    Subset Sum
           Set           │
        ┌────┴────┐      ▼
        ▼         ▼   Knapsack
      Vertex    Clique
      Cover
```

### Proving a New Problem $Y$ is NP-Complete: The 3-Step Recipe
1. **Prove $Y \in \mathbf{NP}$**: Exhibit a polynomial-time verification algorithm $V(x, c)$ that verifies a certificate in $O(|x|^k)$ time.
2. **Choose a known NP-Complete problem $X$** (e.g. 3-SAT, Vertex Cover, Hamiltonian Path).
3. **Construct a polynomial reduction $X \le_p Y$**: Show how to convert any instance of $X$ into an instance of $Y$ in polynomial time such that $x \in X \iff f(x) \in Y$.

---

## 4. Engineering Strategies for NP-Hard Problems in Production

When you prove a problem at work is NP-hard (e.g., optimal vehicle routing, container packing, database query plan scheduling), **stop looking for an exact polynomial-time algorithm**. Instead, apply standard SRE and engineering strategies:

1. **Approximation Algorithms**: Algorithms with proven bounds. For example, the 2-approximation algorithm for Vertex Cover or Christofides' 1.5-approximation algorithm for Metric TSP.
2. **Fixed-Parameter Tractability (FPT)**: Algorithms that scale exponentially only with respect to a small parameter $k$ (e.g. $O(2^k \cdot n)$), which is fast when $k \le 15$.
3. **SAT / SMT / ILP Solvers**: Use modern solvers (Z3, CVC5, Gurobi, OR-Tools). While worst-case exponential, their CDCL (Conflict-Driven Clause Learning) heuristics routinely solve industrial instances with millions of variables in seconds.
4. **Genetic / Simulated Annealing Metaheuristics**: Practical, randomized search algorithms that discover high-quality near-optimal solutions within tight time budgets.
