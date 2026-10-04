---
title: "Markov Chains & Random Walks"
description: "Stochastic process transitions, the Chapman-Kolmogorov equations, stationary distributions, and random walks on networks in computer science."
---

## 1. Discrete-Time Markov Chains (DTMC)

A stochastic process $\{X_0, X_1, X_2, \dots\}$ taking values in a discrete state space $S = \{s_1, s_2, \dots, s_n\}$ is a **Markov Chain** if it satisfies the **Markov Property (Memorylessness)**:

$$P(X_{t+1} = s_j \mid X_t = s_i, X_{t-1} = s_{t-1}, \dots, X_0 = s_0) = P(X_{t+1} = s_j \mid X_t = s_i) = P_{ij}$$

The future state depends **only on the current state**, completely independent of the historical path taken to reach it.

### The Transition Probability Matrix
The transition probabilities form an $n \times n$ stochastic matrix $P$:

$$P = \begin{bmatrix}
P_{11} & P_{12} & \dots & P_{1n} \\
P_{21} & P_{22} & \dots & P_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
P_{n1} & P_{n2} & \dots & P_{nn}
\end{bmatrix}, \quad \text{where } \sum_{j=1}^n P_{ij} = 1 \text{ for all } i$$

```
         ┌────────┐     P₁₂     ┌────────┐
         │ State  ├────────────►│ State  │
         │   1    │◄────────────┤   2    │
         └──┬─────┘     P₂₁     └───┬────┘
        P₁₁ │                       │ P₂₂
            ▼                       ▼
          (Loop)                  (Loop)
```

---

## 2. Multi-Step Transitions & Chapman-Kolmogorov

The probability of transitioning from state $i$ to state $j$ in exactly $k$ steps is given by the matrix power:

$$P^{(k)} = P^k$$

The **Chapman-Kolmogorov Equations** state:

$$P_{ij}^{(m + n)} = \sum_{k \in S} P_{ik}^{(m)} P_{kj}^{(n)}$$

If the initial probability distribution across states is given by a row vector $\pi_0$, the distribution at step $t$ is:

$$\pi_t = \pi_0 P^t$$

---

## 3. Stationary Distributions and Ergodicity

A probability vector $\pi = [\pi_1, \pi_2, \dots, \pi_n]$ ($\sum_i \pi_i = 1$) is a **Stationary Distribution** if:

$$\pi P = \pi$$

In linear algebra terms, $\pi$ is the **left eigenvector** of $P$ corresponding to eigenvalue $\lambda = 1$.

### The Ergodic Theorem
If a finite Markov chain is:
1. **Irreducible**: It is possible to reach every state from any other state in a finite number of steps.
2. **Aperiodic**: The greatest common divisor of all possible return path lengths to any state is 1.

Then the chain is **Ergodic**, meaning there exists a **unique stationary distribution $\pi$**, and regardless of the starting state $\pi_0$:

$$\lim_{t \to \infty} \pi_0 P^t = \pi$$

---

## 4. Random Walks on Graphs & Node Embeddings

Let $G = (V, E)$ be an undirected connected graph with adjacency matrix $A$ and vertex degrees $d(u) = \sum_v A_{uv}$.

A **Random Walk** moves from node $u$ to a neighbor $v$ with probability:

$$P_{uv} = \frac{A_{uv}}{d(u)}$$

The stationary distribution of a random walk on an undirected graph is directly proportional to node degree:

$$\pi_u = \frac{d(u)}{2|E|}$$

- **CSE Applications**:
  - **Graph Representation Learning (DeepWalk, Node2Vec)**: Random walks simulate sentences of nodes, which are then passed into Skip-Gram models to generate vector embeddings.
  - **Community Detection (Walktrap Algorithm)**: Random walks tend to get trapped inside densely connected communities before escaping across bridges.

---

## 5. Python Implementation: Simulating Cache Eviction via Markov Chains

```python
import numpy as np

def compute_stationary_distribution(P: np.ndarray) -> np.ndarray:
    """
    Computes exact stationary distribution π solving π P = π and sum(π) = 1.
    Formulates as linear system: (P.T - I) * π = 0 with constraint sum(π) = 1.
    """
    n = P.shape[0]
    A = np.copy(P.T) - np.eye(n)
    # Replace last equation with normalization constraint sum(pi) = 1
    A[-1, :] = 1.0
    b = np.zeros(n)
    b[-1] = 1.0
    
    pi = np.linalg.solve(A, b)
    return pi

# Transition matrix for user navigation: Home (0), Search (1), Product (2), Checkout (3)
P = np.array([
    [0.1, 0.6, 0.3, 0.0],
    [0.2, 0.3, 0.4, 0.1],
    [0.1, 0.2, 0.4, 0.3],
    [0.8, 0.1, 0.1, 0.0]
])

pi = compute_stationary_distribution(P)
states = ["Home", "Search", "Product", "Checkout"]
for s, prob in zip(states, pi):
    print(f"Stationary probability for {s:8s}: {prob * 100:.2f}%")
```
