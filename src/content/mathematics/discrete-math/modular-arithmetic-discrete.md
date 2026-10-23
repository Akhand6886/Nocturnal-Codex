---
title: "Modular Arithmetic & Cryptographic Foundations"
description: "Divisibility, Euclidean and Extended Euclidean algorithms, Bézout's identity, modular inverses, Chinese Remainder Theorem, and the RSA cryptosystem."
---

## 1. The Clock Arithmetic of Computing

In digital computing, variables do not have unbounded size—integers overflow and wrap around fixed bit widths (e.g., unsigned 32-bit integers wrap modulo $2^{32}$). 

**Modular Arithmetic** is the mathematics of cyclic structures and remainders. Beyond memory architectures, it forms the mathematical backbone of **public-key cryptography (RSA, Diffie-Hellman, Elliptic Curves)**, hash table distribution, and cyclic redundancy checksums (CRC).

```
+-----------------------------------------------------------------------------------------+
|                               MODULAR ARITHMETIC IN CRYPTOGRAPHY                        |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  FORWARD OPERATION (EASY: O(log e)):                                                    |
|  Modular Exponentiation:  c = m^e mod n    (Computed in microseconds via Square-Multiply)
|                                                                                         |
|  REVERSE OPERATION (INTRACTABLE: Exponential without trapdoor d):                       |
|  Discrete Logarithm / Root: Given c, e, n, finding m is computationally impossible      |
|                             WITHOUT the prime factors of n!                             |
|                                                                                         |
|  THE TRAPDOOR: Knowing phi(n) = (p - 1)(q - 1) allows computing d = e^(-1) mod phi(n).   |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Divisibility & Congruence Relations

### 2.1 The Division Algorithm
For any integer $a$ and positive integer $d > 0$, there exist unique integers $q$ (quotient) and $r$ (remainder) such that:

$$a = q \cdot d + r, \quad \text{where } 0 \le r < d$$

### 2.2 Congruence Modulo $m$
Two integers $a$ and $b$ are **congruent modulo $m$** (written $a \equiv b \pmod m$) if their difference is an integer multiple of $m$:

$$a \equiv b \pmod m \iff m \mid (a - b)$$

#### Fundamental Algebraic Properties:
If $a \equiv b \pmod m$ and $c \equiv d \pmod m$, then:
1. **Addition**: $a + c \equiv b + d \pmod m$.
2. **Multiplication**: $a \cdot c \equiv b \cdot d \pmod m$.
3. **Exponentiation**: $a^k \equiv b^k \pmod m$ for any integer $k \ge 0$.

> **Cancellation Warning**: You CANNOT divide freely in modular arithmetic! $ac \equiv bc \pmod m$ does NOT imply $a \equiv b \pmod m$ unless $\gcd(c, m) = 1$. For example, $2 \times 2 \equiv 2 \times 5 \pmod 6$ ($4 \equiv 10 \pmod 6$), but $2 \not\equiv 5 \pmod 6$!

---

## 3. The Euclidean & Extended Euclidean Algorithms

### 3.1 The Euclidean Algorithm for Greatest Common Divisor ($\gcd$)
Based on the identity: $\gcd(a, b) = \gcd(b, a \bmod b)$.
It terminates in $O(\log(\min(a, b)))$ steps (Lamé's Theorem).

```
Example: Compute gcd(252, 105)
252 = 2 * 105 + 42     --> gcd(252, 105) = gcd(105, 42)
105 = 2 * 42  + 21     --> gcd(105, 42)  = gcd(42, 21)
 42 = 2 * 21  + 0      --> gcd(42, 21)   = 21. gcd = 21.
```

---

### 3.2 Bézout's Identity & The Extended Euclidean Algorithm
For any non-zero integers $a$ and $b$, there exist integers $x$ and $y$ such that:

$$a x + b y = \gcd(a, b)$$

The **Extended Euclidean Algorithm** tracks the quotient steps in reverse to compute $x$ and $y$.

### 3.3 Modular Multiplicative Inverse
An integer $x$ is the **modular inverse of $a$ modulo $m$** (denoted $a^{-1} \pmod m$) if:

$$a x \equiv 1 \pmod m$$

**Theorem**: The modular inverse $a^{-1} \pmod m$ exists **if and only if** $a$ and $m$ are coprime ($\gcd(a, m) = 1$).

*Proof via Bézout*:
If $\gcd(a, m) = 1$, by Bézout's identity:
$$a x + m y = 1$$
Taking this equation modulo $m$:
$$a x + 0 \equiv 1 \pmod m \implies a x \equiv 1 \pmod m$$
The Bézout coefficient $x$ is precisely the modular inverse!

---

## 4. Fermat's Little Theorem & Euler's Totient

### 4.1 Fermat's Little Theorem (FLT)
If $p$ is a prime number and $a$ is an integer not divisible by $p$:

$$a^{p-1} \equiv 1 \pmod p$$

Multiplying both sides by $a$: $a^p \equiv a \pmod p$ for all integers $a$.

### 4.2 Euler's Totient Function $\phi(n)$
Counts the number of positive integers up to $n$ that are relatively prime to $n$:
1. If $p$ is prime: $\phi(p) = p - 1$.
2. If $n = p \cdot q$ where $p, q$ are distinct primes:
   $$\phi(p \cdot q) = (p - 1)(q - 1)$$

### 4.3 Euler's Totient Theorem
For any modulus $n$ and integer $a$ coprime to $n$ ($\gcd(a, n) = 1$):

$$a^{\phi(n)} \equiv 1 \pmod n$$

This theorem is the mathematical engine that guarantees RSA decryption.

---

## 5. The Chinese Remainder Theorem (CRT)

Suppose a distributed database shards data by hashing IDs modulo $m_1 = 3$, $m_2 = 5$, and $m_3 = 7$. Given remainders from each shard, can we uniquely reconstruct the original ID?

### Theorem (CRT)
Let $m_1, m_2, \dots, m_k$ be pairwise coprime positive integers ($\gcd(m_i, m_j) = 1$ for all $i \neq j$). 
For any given integers $a_1, a_2, \dots, a_k$, the system of simultaneous congruences:

$$\begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
\vdots \\
x \equiv a_k \pmod{m_k}
\end{cases}$$

has a **unique solution** modulo $M = m_1 \cdot m_2 \cdots m_k$.

### Constructive Solution Formula:
1. Compute $M = \prod_{i=1}^k m_i$.
2. For each $i$, compute $M_i = M / m_i$.
3. Compute modular inverse $y_i \equiv M_i^{-1} \pmod{m_i}$.
4. The unique solution is:
   $$x = \left( \sum_{i=1}^k a_i M_i y_i \right) \bmod M$$

---

## 6. The RSA Public-Key Cryptosystem

RSA (Rivest, Shamir, Adleman, 1977) allows two parties to communicate securely over an untrusted channel without sharing a secret key in advance.

```
+---------------------------------------------------------------------------------+
|                                 THE RSA PROTOCOL                                |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  1. KEY GENERATION:                                                             |
|     - Pick two massive distinct primes p and q.                                 |
|     - Compute modulus: n = p * q.                                               |
|     - Compute Euler's totient: phi(n) = (p - 1)(q - 1).                         |
|     - Choose public exponent e such that gcd(e, phi(n)) = 1 (typically 65537).  |
|     - Compute private exponent d: d = e^(-1) mod phi(n) via Extended Euclidean. |
|                                                                                 |
|  PUBLIC KEY:  (e, n)   --> Published to the world.                              |
|  PRIVATE KEY: (d, n)   --> Kept secret by receiver.                             |
|                                                                                 |
|  2. ENCRYPTION:                                                                 |
|     Ciphertext c = m^e mod n                                                    |
|                                                                                 |
|  3. DECRYPTION:                                                                 |
|     Plaintext  m = c^d mod n                                                    |
+---------------------------------------------------------------------------------+
```

### Mathematical Proof of Correctness:
We must prove that $c^d \equiv m \pmod n$:
$$c^d \equiv (m^e)^d \equiv m^{ed} \pmod n$$
By definition of modular inverse, $e \cdot d \equiv 1 \pmod{\phi(n)} \implies ed = 1 + k \cdot \phi(n)$ for some integer $k$.
$$m^{ed} = m^{1 + k \phi(n)} = m \cdot (m^{\phi(n)})^k$$
By Euler's Theorem, if $\gcd(m, n) = 1$, then $m^{\phi(n)} \equiv 1 \pmod n$:
$$m^{ed} \equiv m \cdot (1)^k \equiv m \pmod n \quad \blacksquare$$

---

## 7. Python Implementation: Extended Euclidean, Inverses & RSA

```python
def extended_gcd(a: int, b: int) -> tuple[int, int, int]:
    """
    Extended Euclidean Algorithm.
    Returns (gcd, x, y) such that a*x + b*y = gcd(a, b).
    """
    if b == 0:
        return a, 1, 0
    gcd, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return gcd, x, y

def mod_inverse(a: int, m: int) -> int:
    """Compute modular multiplicative inverse a^(-1) mod m."""
    gcd, x, _ = extended_gcd(a, m)
    if gcd != 1:
        raise ValueError(f"Modular inverse does not exist: gcd({a}, {m}) = {gcd} != 1")
    return (x % m + m) % m

def rsa_demo():
    # 1. Key Generation (using modest primes for demonstration)
    p = 61
    q = 53
    n = p * q                      # n = 3233
    phi = (p - 1) * (q - 1)        # phi = 3120

    # Public exponent e (must be coprime to phi)
    e = 17
    # Private exponent d = e^(-1) mod phi
    d = mod_inverse(e, phi)

    print(f"Modulus n = {n}, phi(n) = {phi}")
    print(f"Public Key:  (e={e}, n={n})")
    print(f"Private Key: (d={d}, n={n})")

    # 2. Message Encryption: c = m^e mod n
    message = 65  # ASCII 'A'
    ciphertext = pow(message, e, n)  # Efficient modular exponentiation O(log e)
    print(f"\nOriginal Message:   {message}")
    print(f"Encrypted Ciphertext: {ciphertext}")

    # 3. Message Decryption: m = c^d mod n
    decrypted = pow(ciphertext, d, n)
    print(f"Decrypted Message:   {decrypted}")
    assert decrypted == message, "RSA Decryption failed!"

if __name__ == "__main__":
    rsa_demo()
```

---

## 8. Key Takeaways

1. **Modular Inverses Require Coprimality**: $a^{-1} \pmod m$ exists if and only if $\gcd(a, m) = 1$, computed in $O(\log m)$ via the Extended Euclidean algorithm.
2. **Euler's Totient Power**: $a^{\phi(n)} \equiv 1 \pmod n$ enables trapdoor one-way functions by wrapping exponents modulo $\phi(n)$.
3. **RSA Security**: Decrypting $c = m^e \bmod n$ requires computing $d = e^{-1} \bmod \phi(n)$, which is computationally impossible without factoring $n$ into $p \cdot q$.
