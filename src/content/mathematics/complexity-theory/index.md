---
title: "Complexity Theory"
slug: "complexity-theory"
description: "The study of the fundamental limits of computation. Analyzing the resources required to solve problems and the boundaries of what is possible."
iconName: "math"
topics:
  - section: "Part I: Asymptotic Analysis & Tractability"
    description: "Formal asymptotic bounds, recurrence equations, and the boundary of efficient computation."
    items:
      - title: "Asymptotic Analysis & Master Theorem"
        description: "Formal Big-O, Omega, Theta definitions, recurrence trees, and solving divide-and-conquer recurrences."
        slug: "asymptotic-analysis-master-theorem"
      - title: "Complexity Classes: P vs NP"
        description: "Deterministic vs nondeterministic Turing machines, polynomial verification, and the millenium problem."
        slug: "complexity-classes-p-np"
  - section: "Part II: Reductions & Limits of Computation"
    description: "Proving hardness via polynomial reductions and uncovering undecidable problems."
    items:
      - title: "NP-Completeness & Reductions"
        description: "Cook-Levin Theorem, polynomial reductions (A ≤p B), 3-SAT, Vertex Cover, and coping with NP-hard problems."
        slug: "np-completeness-reductions"
      - title: "Undecidability & Halting Problem"
        description: "Turing machine encodings, diagonalization proofs, the undecidability of the Halting Problem, and Rice's Theorem."
        slug: "undecidability-halting-problem"
---

## Introduction to Complexity Theory

Complexity Theory is the study of **fundamental limitations**. While Algorithm Analysis tells us how fast a specific program runs on a specific machine, Complexity Theory tells us how difficult a problem is *inherently*, independent of programming languages, compilers, or hardware architectures.

### The Landscape of Computation

```
ALL PROBLEMS
├── COMPUTABLE (Decidable)
│   ├── EXPTIME / PSPACE (Intractable)
│   ├── NP (Efficiently Verifiable)
│   │   ├── NP-Complete (Hardest in NP: SAT, TSP, Knapsack)
│   │   └── P (Efficiently Solvable: Sorting, Shortest Path)
│   └── L (Logarithmic Space)
└── UNCOMPUTABLE (Undecidable: Halting Problem, Program Equivalence)
```
