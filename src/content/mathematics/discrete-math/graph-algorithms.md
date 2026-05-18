---
title: "Graph Algorithms"
description: "Exploring networks efficiently. Traversals, shortest paths, and minimum spanning trees in algorithmic practice."
---

## Graph Traversals

To analyze or search a graph, we must visit its vertices systematically without getting trapped in infinite cycles.

### 1. Breadth-First Search (BFS)

BFS explores a graph level by level, radiating outward from a starting vertex $s$. It visits all immediate neighbors before moving to neighbors of neighbors.

*   **Data Structure**: Operates using a **Queue** (First-In, First-Out).
*   **Time Complexity**: $O(|V| + |E|)$ when using an adjacency list.
*   **Key Property**: In an unweighted graph, BFS is guaranteed to discover the shortest path (minimum number of edges) from the source vertex to any reachable vertex.

### 2. Depth-First Search (DFS)

DFS plunges as deeply as possible along each branch before backtracking.

*   **Data Structure**: Operates using a **Stack** (Last-In, First-Out), often implemented implicitly via recursion.
*   **Time Complexity**: $O(|V| + |E|)$ when using an adjacency list.
*   **Key Applications**:
    *   **Cycle Detection**: Finding back-edges during traversal.
    *   **Topological Sorting**: Ordering vertices in a Directed Acyclic Graph (DAG) such that for every directed edge $u \to v$, vertex $u$ comes before $v$.

## Shortest Path Algorithms

Finding the optimal route between vertices in a weighted graph is a foundational problem in computer science.

### Dijkstra's Algorithm

Dijkstra's algorithm finds the shortest path from a single source vertex $s$ to all other vertices in a weighted graph with **non-negative edge weights**.

*   **Mechanism**: It maintains a set of unvisited nodes and calculates tentative distances. At each step, it greedily selects the unvisited vertex with the smallest known distance, visits its neighbors, and updates their shortest known distances.
*   **Data Structure**: Requires a **Priority Queue** (Min-Heap) to efficiently fetch the closest unvisited node.
*   **Time Complexity**: $O((|V| + |E|) \log |V|)$ using an adjacency list and binary heap.
*   **Limitation**: Fails if the graph contains negative weight edges. (In such cases, the Bellman-Ford algorithm must be used).

## Minimum Spanning Tree Algorithms

Given a connected, undirected, weighted graph, how do we connect all vertices with the minimum possible total edge weight?

### 1. Kruskal's Algorithm

Kruskal's algorithm builds the Minimum Spanning Tree (MST) by picking edges in increasing order of weight.

*   **Mechanism**: Sort all edges from lightest to heaviest. Iterate through the sorted edges, adding each edge to the growing MST unless it creates a cycle with previously selected edges.
*   **Data Structure**: Relies heavily on the **Disjoint-Set (Union-Find)** data structure to perform near-constant time cycle checks.
*   **Time Complexity**: $O(|E| \log |E|)$ due to sorting the edges.

### 2. Prim's Algorithm

Prim's algorithm builds the MST vertex by vertex, growing a single connected tree.

*   **Mechanism**: Start with an arbitrary vertex. Greedily select the minimum-weight edge connecting any vertex in the growing tree to a vertex outside the tree. Repeat until all vertices are included.
*   **Data Structure**: Operates similarly to Dijkstra's algorithm, utilizing a **Priority Queue**.
*   **Time Complexity**: $O((|V| + |E|) \log |V|)$ using an adjacency list and binary heap.

## Applications in Computer Science

*   **GPS Navigation**: Mapping services use variations of Dijkstra's algorithm (like A* search) to calculate the fastest driving routes.
*   **Network Routing Protocols**: OSPF (Open Shortest Path First) uses Dijkstra's algorithm to determine the best path for data packets across the internet.
*   **Telecommunication Network Design**: Laying fiber-optic cables or electrical grids across cities uses Minimum Spanning Tree algorithms to minimize infrastructure costs while guaranteeing full connectivity.
*   **Package Managers and Build Tools**: npm, cargo, and make use topological sorting on dependency DAGs to determine the correct installation or compilation order.
