---
title: "Trees, Spanning Trees & Hierarchies"
description: "Tree characterization theorems, Cayley's formula via Prüfer sequences, Kirchhoff's matrix tree theorem, AVL self-balancing rotations, and AST compiler structures."
---

## 1. The Geometry of Acyclic Connectivity

In graph theory, a **tree** is the minimal connected structure: it connects all vertices with the absolute minimum number of edges, containing zero redundant pathways or loops.

In computer science, trees provide the universal hierarchical grammar for file systems, JSON/DOM object models, compiler Abstract Syntax Trees (ASTs), and disk-optimized database indexes (B+ Trees).

```
+-----------------------------------------------------------------------------------------+
|                                    EQUIVALENT TREE AXIOMS                               |
+-----------------------------------------------------------------------------------------+
|  For any undirected graph G = (V, E) with |V| = n vertices,                             |
|  the following six mathematical statements are EQUIVALENT:                              |
|                                                                                         |
|  1. G is connected and contains NO cycles.                                              |
|  2. G is connected and has EXACTLY n - 1 edges (|E| = n - 1).                           |
|  3. G contains NO cycles and has EXACTLY n - 1 edges.                                   |
|  4. There exists a UNIQUE simple path between any pair of vertices u, v in V.           |
|  5. G is connected, but removing ANY single edge disconnects it (every edge is a bridge).|
|  6. G has no cycles, but adding ANY single edge creates a unique cycle.                 |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Cayley's Formula & Prüfer Sequences

How many distinct labeled trees can be constructed on $n$ vertices?
For $n = 3$: 3 trees. For $n = 4$: 16 trees. For $n = 5$: 125 trees.

### Theorem (Cayley's Formula, 1889)
The number of distinct labeled trees on $n$ vertices is:

$$T_n = n^{n - 2}$$

### The Prüfer Sequence Bijection (Heinz Prüfer, 1918)
Cayley's formula is proved elegantly by constructing a **bijective mapping** between the set of labeled trees on $n$ vertices and sequences of length $n - 2$ with entries from $\{1, 2, \dots, n\}$.

```
Prüfer Encoding Algorithm:
Repeat until only 2 vertices remain:
1. Find the leaf node with the SMALLEST label.
2. Record the label of its unique neighbor into the sequence.
3. Remove that leaf and its edge from the tree.
```

Because each of the $n - 2$ positions in the sequence can independently take any of the $n$ vertex labels, by the Rule of Product there are exactly:
$$\underbrace{n \times n \times \dots \times n}_{n - 2 \text{ times}} = n^{n - 2} \text{ distinct Prüfer sequences!}$$
Since the encoding is a strict bijection, there are exactly $n^{n-2}$ labeled trees. $\blacksquare$

---

## 3. Spanning Trees & Kirchhoff's Matrix Tree Theorem

A **spanning tree** $T$ of a connected graph $G = (V, E)$ is a subgraph that includes all vertices $V$ and is a tree.

How many spanning trees exist in an arbitrary graph $G$?

### Theorem (Kirchhoff's Matrix Tree Theorem)
Let $\mathbf{A}$ be the adjacency matrix of $G$, and $\mathbf{D} = \text{diag}(\text{deg}(v_1), \dots, \text{deg}(v_n))$ be the degree matrix.
The **Graph Laplacian Matrix** is:

$$\mathbf{L} = \mathbf{D} - \mathbf{A}$$

$$\mathbf{L}_{ij} = \begin{cases} \text{deg}(v_i) & \text{if } i = j \\ -1 & \text{if } i \neq j \text{ and } (v_i, v_j) \in E \\ 0 & \text{otherwise} \end{cases}$$

Delete any row $i$ and column $i$ from $\mathbf{L}$ to produce the reduced cofactor matrix $\mathbf{L}_{(i)}$. 
The total number of spanning trees in $G$ is the **determinant of the cofactor matrix**:

$$\tau(G) = \det(\mathbf{L}_{(i)})$$

---

## 4. Balanced Binary Search Trees (AVL Mechanics)

A binary tree is a rooted tree where each node has at most two children. In an unbalanced Binary Search Tree (BST), pathological insertion sequences ($1, 2, 3, \dots, n$) degrade search latency to worst-case linked-list $O(n)$.

**AVL Trees** (Adelson-Velsky and Landis, 1962) enforce the **Balance Factor invariant**:

$$\text{BF}(v) = \text{Height}(\text{LeftSubtree}) - \text{Height}(\text{RightSubtree}) \in \{-1, 0, +1\}$$

When an insertion or deletion violates $|\text{BF}(v)| > 1$, the tree is rebalanced in $O(1)$ time using **Tree Rotations**:

```
Right Rotation (LL Imbalance):
        [ Z ]                             [ Y ]
       /     \                           /     \
     [ Y ]    T4     =======>          [ X ]   [ Z ]
    /     \                           /   \   /   \
  [ X ]   T3                         T1   T2 T3   T4
 /   \
T1   T2
```

By guaranteeing maximum height $h \le 1.44 \log_2(n + 2)$, AVL trees guarantee $O(\log n)$ worst-case search, insertion, and deletion.

---

## 5. Compilers & Abstract Syntax Trees (AST)

In compiler design (Clang, V8, Rustc), the lexer transforms source text into tokens, and the parser converts tokens into a hierarchical **Abstract Syntax Tree (AST)** according to a Context-Free Grammar.

```
Source Expression: "result = (a + b) * 5"

Parsed Abstract Syntax Tree:
            [ AssignExpr: '=' ]
           /                   \
    [ Identifier: 'result' ]   [ BinaryExpr: '*' ]
                              /                   \
                     [ BinaryExpr: '+' ]      [ Literal: 5 ]
                    /                   \
             [ Identifier: 'a' ]  [ Identifier: 'b' ]
```

Tree traversals execute compiler optimization and code generation passes:
- **Pre-Order Traversal** (Root, Left, Right): Type inference and scoping passes.
- **Post-Order Traversal** (Left, Right, Root): Bottom-up expression evaluation and bytecode generation.
- **In-Order Traversal** (Left, Root, Right): De-compilation and AST pretty-printing.

---

## 6. Python Implementation: Prüfer Sequence Encoder & Decoder

```python
def tree_to_prufer(edges: list[tuple[int, int]], n: int) -> list[int]:
    """
    Encode a labeled tree on n vertices (labeled 1 to n)
    into its unique (n - 2) Prüfer sequence.
    """
    adj = {i: set() for i in range(1, n + 1)}
    degree = {i: 0 for i in range(1, n + 1)}
    for u, v in edges:
        adj[u].add(v)
        adj[v].add(u)
        degree[u] += 1
        degree[v] += 1

    prufer = []
    for _ in range(n - 2):
        # Find leaf with smallest label
        leaf = min(v for v in range(1, n + 1) if degree[v] == 1)
        # Neighbor of the leaf
        neighbor = next(iter(adj[leaf]))
        prufer.append(neighbor)

        # Remove leaf
        adj[neighbor].remove(leaf)
        degree[leaf] -= 1
        degree[neighbor] -= 1

    return prufer

def prufer_to_tree(prufer: list[int], n: int) -> list[tuple[int, int]]:
    """
    Decode a Prüfer sequence of length n - 2 back into its exact labeled tree edges.
    """
    degree = {i: 1 for i in range(1, n + 1)}
    for node in prufer:
        degree[node] += 1

    edges = []
    for node in prufer:
        # Smallest node with degree 1
        leaf = min(v for v in range(1, n + 1) if degree[v] == 1)
        edges.append((leaf, node))
        degree[leaf] -= 1
        degree[node] -= 1

    # Connect remaining two vertices with degree 1
    remaining = [v for v in range(1, n + 1) if degree[v] == 1]
    edges.append((remaining[0], remaining[1]))
    return edges

if __name__ == "__main__":
    n_nodes = 6
    # Define a 6-node tree
    original_edges = [(1, 4), (2, 4), (3, 4), (4, 5), (5, 6)]
    
    seq = tree_to_prufer(original_edges, n=n_nodes)
    print("=== Prüfer Sequence Encoding ===")
    print(f"Original Edges:   {original_edges}")
    print(f"Prufer Sequence:  {seq} (Length: {len(seq)} == {n_nodes - 2})")

    recovered_edges = prufer_to_tree(seq, n=n_nodes)
    print(f"Recovered Edges:  {recovered_edges}")
```

---

## 7. Key Takeaways

1. **Tree Minimality**: Trees are minimally connected graphs with exactly $|V| - 1$ edges.
2. **Cayley's $n^{n-2}$**: Proven via Prüfer sequences, showing an exact bijection between trees and length $n-2$ codes.
3. **Kirchhoff's Matrix Tree Theorem**: Computes the exact number of spanning trees for any arbitrary graph via the Laplacian determinant.
