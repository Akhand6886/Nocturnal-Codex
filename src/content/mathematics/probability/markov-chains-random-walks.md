---
title: "Markov Chains & Random Walks"
description: "Discrete-time Markov chains, transition matrices, Chapman-Kolmogorov equations, ergodicity, stationary distributions, PageRank, and Gambler's ruin."
---

## 1. Memoryless Stochastic Sequences

A **Markov Chain** is a mathematical model for systems that transition between states according to probabilistic rules, where the future state depends exclusively on the current state and not on the history of previous states.

### 1.1 The Markov Property
A discrete-time sequence of random variables $X_0, X_1, X_2, \dots$ taking values in a discrete state space $\mathcal{S}$ satisfies the **Markov Property** if for all time steps $t \ge 0$ and states $i_0, i_1, \dots, i, j \in \mathcal{S}$:

$$P(X_{t+1} = j \mid X_t = i, X_{t-1} = i_{t-1}, \dots, X_0 = i_0) = P(X_{t+1} = j \mid X_t = i)$$

```
Past States                       Present State                Future State
[ X_0, X_1, ..., X_{t-1} ]  ===>  [    X_t    ]  ===========>  [  X_{t+1}  ]
      (Irrelevant!)                 (Condition)                   (Predicted)
```

---

## 2. Transition Matrices & Chapman-Kolmogorov

### 2.1 The Transition Probability Matrix
When transition probabilities do not depend on time $t$ (time-homogeneous), we represent transitions with an $N \times N$ **Transition Matrix** $\mathbf{P}$:

$$P_{ij} = P(X_{t+1} = j \mid X_t = i)$$

#### Axioms of Row-Stochastic Matrices:
1. Non-negativity: $P_{ij} \ge 0$ for all $i, j \in \mathcal{S}$.
2. Total row probability equals 1:
   $$\sum_{j \in \mathcal{S}} P_{ij} = 1 \quad (\mathbf{P}\mathbf{1} = \mathbf{1})$$

### 2.2 The Chapman-Kolmogorov Equations
How do we calculate the probability of transitioning from state $i$ to state $j$ in exactly $n$ steps ($P_{ij}^{(n)}$)?

$$P_{ij}^{(m+n)} = \sum_{k \in \mathcal{S}} P_{ik}^{(m)} P_{kj}^{(n)}$$

In matrix notation, the $n$-step transition matrix is simply the matrix power:

$$\mathbf{P}^{(n)} = \mathbf{P}^n$$

Given an initial state probability distribution vector $\mathbf{\pi}_0$, the probability distribution at step $n$ is:

$$\mathbf{\pi}_n = \mathbf{\pi}_0 \mathbf{P}^n$$

---

## 3. Classification of States & Long-Term Behavior

To understand whether a Markov chain stabilizes in the long run, we classify its states:

```
+-----------------------------------------------------------------------------------------+
|                                    STATE CLASSIFICATION                                 |
+-----------------------------------------------------------------------------------------+
|  COMMUNICATION: i <-> j if each state can eventually be reached from the other.         |
|                                                                                         |
|  IRREDUCIBILITY: A chain is irreducible if all states communicate (single class).       |
|                                                                                         |
|  RECURRENCE:                                                                            |
|  - Recurrent: Return probability f_i = P(ever return to i) == 1.                        |
|  - Transient: Return probability f_i < 1 (chain eventually abandons state forever).      |
|                                                                                         |
|  PERIODICITY: State i has period d = gcd{n >= 1 : P_{ii}^(n) > 0}.                      |
|  - Aperiodic: Period d = 1 (no deterministic cyclical trapping).                        |
|                                                                                         |
|  ERGODIC CHAIN: Both IRREDUCIBLE and APERIODIC with finite positive recurrence.         |
+-----------------------------------------------------------------------------------------+
```

---

## 4. Stationary Distributions & The Ergodic Theorem

A probability distribution $\mathbf{\pi} = (\pi_1, \pi_2, \dots, \pi_N)$ is a **Stationary Distribution** (invariant measure) if:

$$\mathbf{\pi} \mathbf{P} = \mathbf{\pi} \quad \text{and} \quad \sum_{i} \pi_i = 1$$

In linear algebra terms, $\mathbf{\pi}$ is a **left eigenvector of $\mathbf{P}$ corresponding to the eigenvalue $\lambda = 1$**.

### The Fundamental Convergence Theorem (Perron-Frobenius)
If a Markov chain is **finite, irreducible, and aperiodic (ergodic)**:
1. There exists a **unique** stationary distribution $\mathbf{\pi}$.
2. For *any* initial distribution $\mathbf{\pi}_0$:
   $$\lim_{n \to \infty} \mathbf{P}^n = \mathbf{1} \mathbf{\pi} \implies \lim_{n \to \infty} \mathbf{\pi}_0 \mathbf{P}^n = \mathbf{\pi}$$
3. The expected return time to state $i$ is inversely proportional to its stationary probability:
   $$E[T_i \mid X_0 = i] = \frac{1}{\pi_i}$$

---

## 5. Google's PageRank: The World's Most Famous Markov Chain

How does a search engine rank billions of hyperlinked webpages? Larry Page and Sergey Brin modeled the web as a graph random walk:

```
Web Graph:
  [ Page A ] <=====> [ Page B ]
      |                  |
      v                  v
  [ Page C ] ======> [ Page D ]
```

### The Random Surfer Model
A virtual user starts at a random page. At each step:
- With probability $d \approx 0.85$ (the **damping factor**), the surfer clicks a random outbound link.
- With probability $1 - d = 0.15$, the surfer gets bored and teleports uniformly to an arbitrary webpage across the entire web.

### The Google Matrix $\mathbf{G}$
Let $\mathbf{P}$ be the raw link transition matrix where $P_{ij} = 1 / \text{deg}_{\text{out}}(i)$ if a link exists. To eliminate dead ends (dangling nodes) and periodic loops, the **Google Matrix** $\mathbf{G}$ is defined as:

$$\mathbf{G} = d \mathbf{P} + \frac{1 - d}{N} \mathbf{E}$$

where $\mathbf{E} = \mathbf{1}\mathbf{1}^T$ is an $N \times N$ matrix of all ones.

Because every entry of $\mathbf{G}$ is strictly positive ($G_{ij} > 0$), by the Perron-Frobenius theorem $\mathbf{G}$ is guaranteed to be irreducible and aperiodic! The dominant eigenvector $\mathbf{\pi} \mathbf{G} = \mathbf{\pi}$ yields the global **PageRank score** for every webpage.

---

## 6. Gambler's Ruin Random Walk

A gambler starts with $\$i$. In each round:
- Wins $\$1$ with probability $p$.
- Loses $\$1$ with probability $q = 1 - p$.
The game ends when the gambler reaches $\$N$ (bank broke) or $\$0$ (gambler broke). Both $0$ and $N$ are **absorbing states**.

```
State Line:
  [ 0 (Ruin) ] <--- [ 1 ] <---> [ 2 ] <---> ... <---> [ N-1 ] ---> [ N (Win) ]
```

Let $P_i$ be the probability of reaching $\$N$ starting from $\$i$.
By the Law of Total Probability:
$$P_i = p P_{i+1} + q P_{i-1}$$
Subject to boundary conditions $P_0 = 0$ and $P_N = 1$.

Solving this second-order linear recurrence relation:
$$P_i = \begin{cases} \frac{i}{N} & \text{if } p = 0.5 \text{ (Fair game)} \\ \frac{1 - (q/p)^i}{1 - (q/p)^N} & \text{if } p \neq 0.5 \end{cases}$$

> **House Edge Reality**: If $p = 0.49$ (European roulette), starting with $\$100$ and playing until $\$200$ against a casino with $N = 200$:
> $$P_{100} = \frac{1 - (0.51/0.49)^{100}}{1 - (0.51/0.49)^{200}} \approx 0.0179 \quad (1.79\% \text{ chance of winning!})$$

---

## 7. Python Implementation: PageRank via Power Iteration

```python
import numpy as np

def compute_pagerank(adj_matrix: np.ndarray, d: float = 0.85, tol: float = 1e-10, max_iter: int = 500) -> np.ndarray:
    """
    Compute Google PageRank stationary distribution using Power Iteration.
    adj_matrix: N x N binary adjacency matrix where adj[i, j] = 1 means link from i to j.
    """
    n = adj_matrix.shape[0]
    out_degrees = np.sum(adj_matrix, axis=1)

    # Build raw transition matrix P with dangling node handling
    p = np.zeros((n, n), dtype=float)
    for i in range(n):
        if out_degrees[i] > 0:
            p[i, :] = adj_matrix[i, :] / out_degrees[i]
        else:
            p[i, :] = 1.0 / n  # Teleport if no outbound links

    # Construct irreducible Google Matrix G
    google_matrix = d * p + (1.0 - d) / n

    # Power Iteration: pi_{k+1} = pi_k * G
    pi = np.full(n, 1.0 / n)
    for iteration in range(max_iter):
        pi_next = pi @ google_matrix
        if np.linalg.norm(pi_next - pi, ord=1) < tol:
            print(f"PageRank converged in {iteration + 1} iterations.")
            return pi_next
        pi = pi_next

    return pi

def demonstrate_pagerank():
    # 4-page web graph
    # 0 links to 1, 2
    # 1 links to 2
    # 2 links to 0
    # 3 links to 2
    links = np.array([
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 1, 0]
    ], dtype=float)

    ranks = compute_pagerank(links)
    print("\n=== PageRank Scores ===")
    for page_id, score in enumerate(ranks):
        print(f"Page {page_id}: {score:.5f} ({score * 100:.2f}%)")

    most_authoritative = np.argmax(ranks)
    print(f"\nHighest ranked page: Page {most_authoritative}")

if __name__ == "__main__":
    demonstrate_pagerank()
```

---

## 8. Key Takeaways

1. **Markov Property**: The future depends solely on the current state.
2. **Matrix Powering**: $n$-step transitions are computed by $\mathbf{P}^n$.
3. **Ergodic Convergence**: Any irreducible, aperiodic chain converges to a unique stationary distribution $\mathbf{\pi} \mathbf{P} = \mathbf{\pi}$.
4. **Google PageRank**: Adding a small random teleportation probability ($1 - d$) guarantees ergodicity over the entire web graph.
