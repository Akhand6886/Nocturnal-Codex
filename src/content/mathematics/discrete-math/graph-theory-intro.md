---
title: "Introduction to Graph Theory"
description: "The mathematical foundation of networks, connectivity, and relational structures in computer science."
---

## What is a Graph?

A **graph** $G$ is a mathematical structure consisting of two sets: $G = (V, E)$.
*   **$V$ (Vertices or Nodes)**: A non-empty set of distinct elements.
*   **$E$ (Edges or Links)**: A set of pairs of vertices, representing connections between them.

Graphs are arguably the most versatile data structure in computer science, capable of modeling everything from computer networks and social media connections to roadmap navigation and garbage collection dependencies.

### Types of Graphs

1.  **Undirected Graphs**: Edges have no direction; they are unordered pairs $\{u, v\}$. If node $A$ is connected to node $B$, then $B$ is also connected to $A$.
2.  **Directed Graphs (Digraphs)**: Edges have a direction; they are ordered pairs $(u, v)$. An edge from $A$ to $B$ does not imply an edge from $B$ to $A$.
3.  **Weighted Graphs**: Each edge is assigned a numerical value (weight or cost), representing distance, latency, capacity, or financial cost.
4.  **Multigraphs**: Multiple edges can connect the same pair of vertices, or edges can connect a vertex to itself (self-loops). A **simple graph** contains no self-loops or parallel edges.

### Vertex Degree and the Handshaking Lemma

The **degree** of a vertex $v$, denoted $\deg(v)$, is the number of edges incident to it (connected to it).

In a directed graph, we distinguish between:
*   **Indegree ($\deg^-(v)$)**: Number of head endpoints directed into $v$.
*   **Outdegree ($\deg^+(v)$)**: Number of tail endpoints directed out of $v$.

#### The Handshaking Lemma
In any undirected graph, the sum of the degrees of all vertices equals twice the number of edges:
$\sum_{v \in V} \deg(v) = 2|E|$

*Corollary*: Every undirected graph has an even number of vertices with an odd degree.

### Special Graph Structures

*   **Complete Graph ($K_n$)**: A simple graph with $n$ vertices where every pair of distinct vertices is connected by an edge. It has $\frac{n(n-1)}{2}$ edges.
*   **Cycle ($C_n$)**: A graph with $n$ vertices ($n \geq 3$) connected in a single closed loop ($v_1 \to v_2 \to \ldots \to v_n \to v_1$).
*   **Bipartite Graph**: A graph whose vertices can be divided into two disjoint sets $V_1$ and $V_2$ such that every edge connects a vertex in $V_1$ to a vertex in $V_2$. There are no edges within $V_1$ or within $V_2$. (Used for matching problems, like assigning workers to jobs).

### Graph Representations in Code

To process graphs in software, we must represent them in memory. The two primary representations are:

#### 1. Adjacency Matrix
A 2D array (matrix) $M$ of size $|V| \times |V|$, where $M[i][j] = 1$ (or the edge weight) if there is an edge from vertex $i$ to vertex $j$, and $0$ otherwise.
*   **Pros**: $O(1)$ time to check if an edge exists between two vertices.
*   **Cons**: $O(|V|^2)$ space complexity, which is highly inefficient for sparse graphs (graphs with relatively few edges).

#### 2. Adjacency List
An array or hash map where each vertex $v$ stores a list of its adjacent vertices (neighbors).
*   **Pros**: $O(|V| + |E|)$ space complexity, making it extremely memory-efficient for sparse graphs. Fast iteration over a vertex's neighbors.
*   **Cons**: $O(\deg(v))$ time to check if a specific edge exists between $u$ and $v$.

### Applications in Computer Science

*   **Social Networks**: Modeling friend connections (undirected) or follower relationships (directed).
*   **The World Wide Web**: Web pages are vertices, hyperlinks are directed edges. (The foundation of Google's PageRank algorithm).
*   **Garbage Collection**: Tracing reachability in memory allocation graphs to find unreferenced objects.
*   **Compilers and Build Systems**: Representing module dependencies as a Directed Acyclic Graph (DAG) to determine build order.
