---
title: "Discrete Mathematics"
slug: "discrete-math"
description: "The study of mathematical structures that are fundamentally distinct and separable. The bedrock of algorithms, logic, and computation theory."
iconName: "math"
topics:
  - section: Foundations of Logic
    description: The rules of formal reasoning and mathematical statements.
    items:
      - title: Propositional Logic
        description: Logical connectives, truth tables, and tautologies.
        slug: propositional-logic
      - title: Predicate Logic
        description: Quantifiers, variables, and nested predicates.
        slug: predicate-logic
      - title: Logical Equivalences
        description: De Morgan's laws, distributive laws, and conditional identities.
        slug: logical-equivalences
  - section: Proof Techniques
    description: Strategies for proving mathematical theorems and claims.
    items:
      - title: Proof Techniques
        description: Direct proof, contraposition, and proof by contradiction.
        slug: proof-techniques
      - title: Mathematical Induction
        description: Proving statements for all natural numbers.
        slug: mathematical-induction
  - section: Discrete Structures
    description: The fundamental building blocks of discrete mathematics.
    items:
      - title: Set Theory
        description: Operations, subsets, and infinite sets.
        slug: set-theory
      - title: Functions & Mappings
        description: Injective, surjective, and bijective functions.
        slug: functions-mappings
      - title: Relations
        description: Properties, equivalence relations, and partial orders.
        slug: relations
  - section: Combinatorics
    description: The mathematics of counting and arrangement.
    items:
      - title: Counting Principles
        description: The Rule of Sum, Rule of Product, and Inclusion-Exclusion.
        slug: counting-principles
      - title: Permutations & Combinations
        description: Arrangements and selections, with and without replacement.
        slug: permutations-combinations
      - title: The Pigeonhole Principle
        description: A simple but powerful tool for proving existence.
        slug: pigeonhole-principle
  - section: Graph Theory & Trees
    description: The science of connectivity, networks, and hierarchical structures.
    items:
      - title: Introduction to Graph Theory
        description: Vertices, edges, degrees, and graph representations.
        slug: graph-theory-intro
      - title: Trees & Hierarchies
        description: Rooted trees, spanning trees, and ASTs.
        slug: trees-hierarchies
      - title: Graph Algorithms
        description: BFS, DFS, Dijkstra's, and Minimum Spanning Trees.
        slug: graph-algorithms
  - section: Formal Languages & Automata
    description: Mathematical models of computation and grammar.
    items:
      - title: Finite Automata
        description: DFAs, NFAs, regular expressions, and state machines.
        slug: finite-automata
      - title: Turing Machines
        description: The universal model of computation and computability limits.
        slug: turing-machines
---

## Introduction to Discrete Mathematics

Discrete mathematics is the mathematical foundation of computer science. While the physical world is often continuous, the digital world is fundamentally discrete—built on bits, sets, and logical states.

### 1. Logic, Boolean Algebra, and Proofs
- **Propositional & Predicate Logic**: The rules of formal reasoning.
- **Proof Techniques**: Direct proof, Contradiction, and the most important for CS: **Mathematical Induction**.
- **Structural Induction**: Proving properties of recursive data structures (like trees and lists), which is foundational for functional programming and compiler verification.

### 2. Set Theory and Relations
- **Sets and Functions**: The basic building blocks of any mathematical structure.
- **Relations**: Essential for **Relational Databases (SQL)**. Understanding properties like reflexivity and transitivity is key to understanding joins, indexing, and equivalence.
- **Infinite Sets**: The distinction between "Countable" and "Uncountable" infinity (Cantor's Diagonal Argument), which sets the limits of what can be computed.

### 3. Graph Theory: The Science of Connectivity
- **Nodes and Edges**: Modeling social networks, internet routing, and dependency graphs.
- **Trees**: Hierarchical structures used in file systems, DOM trees, and ASTs (Abstract Syntax Trees) in compilers.
- **Algorithms**: Shortest path (Dijkstra's), Minimum Spanning Trees, and Network Flow.

### 4. Combinatorics and Counting
- **Permutations and Combinations**: Calculating the state space of a system.
- **Generating Functions**: A powerful technique for solving counting problems by treating sequences as the coefficients of a polynomial.
- **The Pigeonhole Principle**: A simple but deep tool for proving lower bounds in algorithms.

### 5. Formal Languages and Automata
- **Finite Automata**: Mathematical models of "machines" with a finite number of states.
- **Regex**: The mathematical foundation of string matching and lexing.
- **Turing Machines**: The universal model of computation that defines what any computer can and cannot do.

---

### The Telescope of the Programmer
"Computer Science is no more about computers than astronomy is about telescopes." Discrete math is the telescope. It allows us to see the deep logical structures that make software possible.
