---
title: "Hashing & Randomized Data Structures"
description: "Universal hashing, Bloom filter collision bounds, Count-Min sketches, and reservoir sampling in high-throughput computer systems."
---

## 1. Universal Hashing

In hash tables, if an adversary knows the hash function $h(x)$, they can feed $n$ keys that all hash to the same bucket, degrading lookup performance from $O(1)$ to catastrophic $O(n)$ (Hash Collision Denial of Service).

To defeat this, computer scientists use **Universal Hashing**—choosing a hash function randomly from a carefully constructed family $\mathcal{H}$ of hash functions at runtime.

### Definition of 2-Universal Family
A family $\mathcal{H}$ of hash functions mapping universe $\mathcal{U}$ to $\{0, 1, \dots, m-1\}$ is **2-Universal** if for any distinct keys $x \neq y$:

$$P_{h \in \mathcal{H}}(h(x) = h(y)) \le \frac{1}{m}$$

### Carter-Wegman Hash Family
Choose a large prime $p > |\mathcal{U}|$. For randomly chosen integers $a \in \{1, 2, \dots, p-1\}$ and $b \in \{0, 1, \dots, p-1\}$:

$$h_{a, b}(x) = ((a \cdot x + b) \bmod p) \bmod m$$

This family is guaranteed to be 2-universal, ensuring expected search time in a chained hash table is bounded by $1 + \alpha$ where $\alpha = n / m$ is the load factor.

---

## 2. Bloom Filters: Deriving the False-Positive Bound

A **Bloom Filter** is a space-efficient probabilistic data structure used to test set membership:
- Returns either: **"Definitely NOT in set"** (zero false negatives) or **"Possibly in set"** (small false positive rate $\epsilon$).

### Mathematical Derivation of False-Positive Probability
Given an array of $m$ bits initially set to 0 and $k$ independent universal hash functions $h_1, \dots, h_k$:

1. When inserting an element $x$, set bits $h_1(x), \dots, h_k(x)$ to 1.
2. After inserting $n$ elements, the probability that a specific bit is still 0 is:
   $$\left( 1 - \frac{1}{m} \right)^{kn} \approx \exp\left( -\frac{kn}{m} \right)$$
3. The probability that a bit is 1 is $1 - \exp\left(-\frac{kn}{m}\right)$.
4. For a non-member element $y$, a false positive occurs if all $k$ hash locations are 1:
   $$\epsilon = \left( 1 - \exp\left( -\frac{kn}{m} \right) \right)^k$$

### Optimal Number of Hash Functions
To minimize false positives for fixed $m$ and $n$, take the derivative with respect to $k$ and set to zero:

$$k^* = \frac{m}{n} \ln 2 \approx 0.693 \cdot \frac{m}{n}$$

At this optimal $k^*$, the false positive rate simplifies to:

$$\epsilon^* = 2^{-k^*} \approx (0.6185)^{m/n}$$

To achieve a **$1\%$ false positive rate ($\epsilon = 0.01$)**, we need only **$m/n \approx 9.6$ bits per item** and $k = 7$ hash functions—regardless of whether the keys are 64-bit integers or 100-character URL strings!

```
Inserting Element "user_104"
[Hash 1] ───► Index 3  ──► Bit 3 set to 1
[Hash 2] ───► Index 7  ──► Bit 7 set to 1
[Hash 3] ───► Index 14 ──► Bit 14 set to 1

Bit Array m=16:
[ 0 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 ]
              ▲               ▲                           ▲
```

- **Production Systems**: Cassandra / RocksDB use Bloom filters to avoid expensive disk lookups for non-existent row keys. Akamai and Cloudflare use Bloom filters in CDN cache hierarchies.

---

## 3. Reservoir Sampling (Streaming Algorithm)

How do you select $k$ random samples uniformly from a data stream of unknown, massive, or infinite length $N$ in a single pass using only $O(k)$ memory?

### Algorithm
1. Store the first $k$ items in the reservoir.
2. For each subsequent item $i$ ($i > k$):
   - Generate a random integer $j \in \{1, 2, \dots, i\}$.
   - If $j \le k$, replace reservoir element at index $j$ with the new item.

### Inductive Proof of Uniform Probability
By induction on $i$, the probability that any specific item from the first $N$ elements resides in the reservoir at the end is **strictly equal to $k / N$**.

---

## 4. Python Implementation: Production Bloom Filter

```python
import math
import hashlib

class BloomFilter:
    def __init__(self, expected_elements: int, false_positive_rate: float):
        self.n = expected_elements
        self.fp_rate = false_positive_rate
        
        # Calculate optimal m (bits) and k (hash functions)
        self.m = int(- (self.n * math.log(self.fp_rate)) / (math.log(2) ** 2))
        self.k = int((self.m / self.n) * math.log(2))
        self.bit_array = bytearray((self.m + 7) // 8)

    def _hashes(self, item: str):
        # Double hashing technique: h_i(x) = (h1(x) + i * h2(x)) mod m
        h = hashlib.sha256(item.encode()).digest()
        h1 = int.from_bytes(h[:8], 'big')
        h2 = int.from_bytes(h[8:16], 'big')
        for i in range(self.k):
            yield (h1 + i * h2) % self.m

    def add(self, item: str):
        for bit_index in self._hashes(item):
            byte_idx = bit_index // 8
            bit_mask = 1 << (bit_index % 8)
            self.bit_array[byte_idx] |= bit_mask

    def contains(self, item: str) -> bool:
        for bit_index in self._hashes(item):
            byte_idx = bit_index // 8
            bit_mask = 1 << (bit_index % 8)
            if not (self.bit_array[byte_idx] & bit_mask):
                return False # Definitely not present
        return True # Probably present

# Test 100,000 elements with 1% false positive guarantee
bf = BloomFilter(expected_elements=100000, false_positive_rate=0.01)
print(f"Allocated {bf.m} bits ({bf.m / (8*1024):.1f} KB) with {bf.k} hash functions.")

# Insert 10,000 items
for i in range(10000):
    bf.add(f"session_token_{i}")

assert bf.contains("session_token_500") is True
assert bf.contains("non_existent_token") is False
print("Bloom filter verification complete.")
```
