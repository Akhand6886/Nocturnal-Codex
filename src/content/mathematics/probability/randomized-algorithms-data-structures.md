---
title: "Randomized Algorithms & Probabilistic Data Structures"
description: "Las Vegas vs Monte Carlo algorithms, 2-universal hashing, Bloom filters false-positive mathematics, Count-Min sketch, and Reservoir sampling."
---

## 1. Tradeoffs in Probabilistic Computing

When processing multi-terabyte data streams or building high-frequency distributed systems, deterministic exact algorithms are often constrained by the physical limits of memory and time. 

By accepting an infinitesimal, mathematically bounded probability of error $\epsilon$ or variance in runtime, **randomized algorithms** and **probabilistic data structures** achieve exponential speedups and sub-linear space bounds:

```
+-----------------------------------------------------------------------------------------+
|                         LAS VEGAS VS MONTE CARLO ALGORITHMS                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  LAS VEGAS ALGORITHMS:                                                                  |
|  - Correctness: STRICTLY DETERMINISTIC (100% correct, zero error probability).          |
|  - Runtime: RANDOM VARIABLE (e.g., Randomized QuickSort: Expected O(N log N)).          |
|                                                                                         |
|  MONTE CARLO ALGORITHMS:                                                                |
|  - Correctness: BOUNDED PROBABILITY OF ERROR (e.g., Error <= epsilon).                  |
|  - Runtime: DETERMINISTIC BOUNDED TIME (e.g., Bloom Filter O(k), Miller-Rabin O(k log N)).|
+-----------------------------------------------------------------------------------------+
```

---

## 2. Universal Hashing

In standard hash tables, if an adversary knows the fixed hash function $h(x)$, they can feed an input sequence that maps to the identical bucket, degrading lookup performance from $O(1)$ to worst-case $O(N)$ (Denial-of-Service exploit).

**Universal Hashing** selects a hash function $h$ at runtime uniformly at random from a family $\mathcal{H}$ of hash functions.

### Formal Definition (2-Universal Family)
A finite collection of hash functions $\mathcal{H}$ mapping a universe $\mathcal{U}$ to $\{0, 1, \dots, m-1\}$ is **2-universal** if for every pair of distinct keys $x \neq y \in \mathcal{U}$:

$$P_{h \sim \mathcal{H}}(h(x) = h(y)) \le \frac{1}{m}$$

The probability of collision between any two distinct keys is no higher than if hash values were assigned by a completely random oracle.

### Carter-Wegman Construction
Choose a prime $p > |\mathcal{U}|$. Define:

$$h_{a, b}(x) = ((a x + b) \bmod p) \bmod m$$

for $a \in \{1, 2, \dots, p-1\}$ and $b \in \{0, 1, \dots, p-1\}$. The family $\mathcal{H} = \{h_{a, b}\}$ is provably 2-universal.

---

## 3. Bloom Filters: False Positive Probability Derivation

A **Bloom Filter** is a space-efficient probabilistic data structure used to test set membership:
- Zero False Negatives: If the filter returns `False`, the element is **guaranteed** not in the set.
- Small False Positives: If the filter returns `True`, the element is **probably** in the set with error $\epsilon$.

```
Bloom Filter Structure (m bits, k hash functions):
Key "alice" ---> [ h1 ] ---> Index 2   ===> Bit array: [0, 0, 1, 0, 1, 0, 1, 0]
            ---> [ h2 ] ---> Index 4                           ^     ^     ^
            ---> [ h3 ] ---> Index 6                           h1    h2    h3
```

### 3.1 Mathematical Derivation of Error $\epsilon$
Let the filter have $m$ bits, initially all 0, and use $k$ independent uniform hash functions. We insert $n$ distinct elements into the filter.

1. **Probability a bit remains 0 after 1 hash operation**:
   $$1 - \frac{1}{m}$$
2. **Probability a bit remains 0 after inserting $n$ elements ($k \times n$ total hash operations)**:
   $$p_0 = \left(1 - \frac{1}{m}\right)^{kn} \approx e^{-kn / m}$$
3. **Probability a bit is 1 after $n$ insertions**:
   $$p_1 = 1 - p_0 \approx 1 - e^{-kn / m}$$
4. **Probability of a False Positive $\epsilon$**:
   A query for an uninserted key yields a false positive if all $k$ hashed bit positions are already set to 1:
   $$\epsilon = (p_1)^k \approx \left( 1 - e^{-kn / m} \right)^k$$

### 3.2 Finding the Optimal Number of Hash Functions $k^*$
To minimize $\epsilon$ for a given bit-to-item ratio $m/n$, take the natural log and differentiate with respect to $k$:

$$k^* = \frac{m}{n} \ln 2 \approx 0.6931 \frac{m}{n}$$

### 3.3 Optimal Sizing Formulas
Substituting $k^*$ into the false positive formula:

$$\epsilon = \left( 1 - e^{-\ln 2} \right)^{(m/n) \ln 2} = \left(\frac{1}{2}\right)^{(m/n) \ln 2} = 2^{-(m/n) \ln 2} = e^{-(m/n) (\ln 2)^2}$$

Solving for required bits $m$:

$$m = -\frac{n \ln \epsilon}{(\ln 2)^2} \approx -1.4427 \cdot n \ln \epsilon$$

```
Target Error vs Bits per Element (m / n):
- False Positive 1%   (eps = 0.01)  --> m/n ≈  9.6 bits/element (k = 7 hashes)
- False Positive 0.1% (eps = 0.001) --> m/n ≈ 14.4 bits/element (k = 10 hashes)
```

---

## 4. Count-Min Sketch: Frequency Estimation on Data Streams

In real-time streaming engines (Kafka, Flink, network routers), we must estimate the frequency of packet source IPs or query tokens without storing all raw records.

A **Count-Min Sketch** consists of a 2D array of counters with $d$ rows and $w$ columns, using $d$ independent hash functions $h_1, \dots, h_d$:

```
Row 1: [ h_1 ] ---> [ 0 | 14 | 0 | 2 | 8 | 0 ]
Row 2: [ h_2 ] ---> [ 3 | 0 | 25 | 0 | 0 | 1 ]
...
Row d: [ h_d ] ---> [ 0 | 0 | 12 | 4 | 0 | 9 ]
Frequency Estimate = min(Row 1[h_1(x)], Row 2[h_2(x)], ..., Row d[h_d(x)])
```

### Theoretical Guarantees:
For given precision parameters $\epsilon$ (accuracy tolerance) and $\delta$ (failure probability):
- Set width $w = \lceil e / \epsilon \rceil$.
- Set depth $d = \lceil \ln(1 / \delta) \rceil$.

The estimated frequency $\hat{f}_x$ satisfies:

$$f_x \le \hat{f}_x \le f_x + \epsilon \|\mathbf{f}\|_1$$

with probability at least $1 - \delta$, where $\|\mathbf{f}\|_1$ is the total count of all stream items.

---

## 5. Reservoir Sampling (Algorithm R)

How do you select a uniformly random sample of $k$ items from a streaming data source of **unknown and potentially infinite length $N$**, in a single pass ($O(N)$ time) using only $O(k)$ memory?

### Algorithm:
1. Store the first $k$ items in the reservoir.
2. For each subsequent incoming item at step $i$ ($i > k$):
   - Generate a random integer $r \in [1, i]$.
   - If $r \le k$, replace `reservoir[r - 1]` with the incoming item.
   - Otherwise, discard the incoming item.

### Mathematical Proof by Induction:
We claim that after processing $n$ elements, every element has an exact probability $\frac{k}{n}$ of residing in the reservoir.

**Base Case**: For $n = k$, every element is placed in the reservoir with probability $k/k = 1$. Base case holds.

**Inductive Step**: Assume the claim holds for step $n$. At step $n+1$:
1. The new $(n+1)$-th element is chosen with probability:
   $$P(\text{New element chosen}) = \frac{k}{n+1}$$
2. An existing element in the reservoir survives if it is not evicted by the new item. It is evicted only if the new element is accepted ($k/(n+1)$) and this specific element is picked for replacement ($1/k$):
   $$P(\text{Survives step } n+1) = 1 - \left( \frac{k}{n+1} \cdot \frac{1}{k} \right) = 1 - \frac{1}{n+1} = \frac{n}{n+1}$$
3. By the induction hypothesis, its probability of being in the reservoir before step $n+1$ was $\frac{k}{n}$. Therefore, its probability of remaining in the reservoir after step $n+1$ is:
   $$P(\text{In reservoir at } n+1) = \frac{k}{n} \cdot \frac{n}{n+1} = \frac{k}{n+1} \quad \blacksquare$$

---

## 6. Python Implementation: Bloom Filter & Reservoir Sampling

```python
import math
import mmh3  # MurmurHash3
import numpy as np

class BloomFilter:
    """
    Space-optimal Bloom Filter with provable false-positive bound.
    """
    def __init__(self, expected_elements: int, false_positive_rate: float):
        self.n = expected_elements
        self.eps = false_positive_rate

        # Optimal sizing formulas
        self.m = int(math.ceil(- (self.n * math.log(self.eps)) / (math.log(2) ** 2)))
        self.k = int(round((self.m / self.n) * math.log(2)))
        self.bit_array = np.zeros(self.m, dtype=bool)

    def _hashes(self, item: str):
        # Double hashing technique: h_i(x) = (h1(x) + i * h2(x)) mod m
        h1 = mmh3.hash(item, seed=0)
        h2 = mmh3.hash(item, seed=42)
        for i in range(self.k):
            yield (h1 + i * h2) % self.m

    def add(self, item: str):
        for bit_index in self._hashes(item):
            self.bit_array[bit_index] = True

    def __contains__(self, item: str) -> bool:
        return all(self.bit_array[bit_index] for bit_index in self._hashes(item))

def reservoir_sample_stream(stream, k: int, seed: int = 42) -> list:
    """
    Reservoir sampling (Algorithm R) on an arbitrary iterator.
    """
    rng = np.random.default_rng(seed)
    reservoir = []

    for i, item in enumerate(stream, start=1):
        if i <= k:
            reservoir.append(item)
        else:
            j = rng.integers(1, i + 1)
            if j <= k:
                reservoir[j - 1] = item

    return reservoir

if __name__ == "__main__":
    # Test Reservoir Sampling
    large_stream = range(1, 100_001)  # 100,000 items
    sample = reservoir_sample_stream(large_stream, k=5)
    print("=== Reservoir Sampling (5 samples from 100k items) ===")
    print("Sample:", sample)
```

---

## 7. Key Takeaways

1. **2-Universal Hashing**: Bounds collision probability to $\le 1/m$, rendering hash tables immune to adversarial collision degradation.
2. **Bloom Filter Geometry**: Requires $\approx 1.44 \log_2(1/\epsilon)$ bits per item with $k^* = 0.693(m/n)$ hash functions for zero false negatives and $\epsilon$ false positives.
3. **Reservoir Sampling**: Selects uniform samples of size $k$ from streaming pipelines of unknown length in a single pass with exact probability $k/N$.
