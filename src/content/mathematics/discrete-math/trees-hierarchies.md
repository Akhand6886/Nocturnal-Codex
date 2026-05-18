---
title: "Trees & Hierarchies"
description: "Connected, acyclic graphs. The fundamental structure for hierarchical data, search algorithms, and syntax analysis."
---

## What is a Tree?

In graph theory, a **tree** is an undirected graph that is connected and contains no cycles. 

A collection of disconnected trees is called a **forest**.

### Fundamental Properties of Trees

Any graph $G = (V, E)$ with $n$ vertices is a tree if and only if it satisfies any (and thus all) of the following equivalent statements:
1.  $G$ is connected and has exactly $n - 1$ edges ($|E| = |V| - 1$).
2.  $G$ contains no cycles, and adding any single new edge between existing vertices creates exactly one cycle.
3.  $G$ is connected, but removing any single edge disconnects the graph (every edge is a "bridge").
4.  There exists exactly one simple path between any two vertices in $G$.

### Rooted Trees

When we designate one specific vertex as the **root**, we impart a hierarchical orientation to the tree, directing all edges away from the root.

#### Terminology
*   **Parent**: The vertex directly above a given node on the path to the root.
*   **Child**: Any vertex directly below a given node.
*   **Siblings**: Nodes that share the same parent.
*   **Leaf (Terminal Node)**: A vertex with no children.
*   **Internal Node**: A vertex with at least one child.
*   **Depth of a Node**: The length of the unique path from the root to that node. (The root is at depth 0).
*   **Height of a Tree**: The maximum depth of any leaf in the tree.

### Binary Trees and Variations

A **binary tree** is a rooted tree where every node has at most two children, commonly referred to as the left child and right child.

*   **Full Binary Tree**: Every node has either 0 or 2 children.
*   **Complete Binary Tree**: Every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. (Ideal for array-based Heap implementations).
*   **Balanced Binary Tree**: The height of the left and right subtrees of every node differ by at most 1 (e.g., AVL trees, Red-Black trees). This guarantees $O(\log n)$ search and insertion times.

### Spanning Trees

A **spanning tree** of a connected, undirected graph $G$ is a subgraph that includes all vertices of $G$ and is a tree. Every connected graph has at least one spanning tree.

If the graph is weighted, a **Minimum Spanning Tree (MST)** is a spanning tree whose sum of edge weights is as small as possible. Finding an MST is a classic problem solved by Kruskal's and Prim's algorithms.

### Applications in Computer Science

Trees are ubiquitous in software engineering:

*   **Abstract Syntax Trees (ASTs)**: Compilers parse source code into an AST representing the hierarchical syntactic structure of the program before generating machine code or bytecode.
*   **File Systems**: Operating systems structure directories and files as a rooted tree.
*   **The Document Object Model (DOM)**: Web browsers parse HTML documents into a tree of nodes representing elements, attributes, and text.
*   **Database Indexing (B-Trees)**: Relational databases use highly branching, self-balancing search trees (B-Trees and B+ Trees) to enable rapid disk-based retrieval and range queries.
*   **Decision Trees**: Used in artificial intelligence and machine learning to model classification and regression rules.
