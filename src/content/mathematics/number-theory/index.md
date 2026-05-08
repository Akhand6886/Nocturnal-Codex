---
title: "Number Theory"
slug: "number-theory"
description: "The study of integers, primes, and their deep properties. The mathematical backbone of modern cryptography and secure communications."
iconName: "math"
---

## Introduction to Number Theory

Number Theory is one of the oldest branches of mathematics, yet it is the foundation of the most critical modern technology: **cryptography**. Every time you make a secure online transaction or send an encrypted message, you are relying on theorems that mathematicians proved centuries ago.

### 1. Prime Numbers and Factorization
Primes are the "atoms" of arithmetic. Every integer greater than 1 can be uniquely decomposed into a product of primes.
- **Fundamental Theorem of Arithmetic**: Every integer has a unique prime factorization. This uniqueness is what makes primes so powerful in cryptography.
- **Sieve of Eratosthenes**: An ancient algorithm for finding all primes up to a given limit, still used as a baseline for prime generation.
- **Prime Distribution**: The Prime Number Theorem tells us that primes become sparser as numbers grow, but never run out. Approximately `n / ln(n)` primes exist below `n`.

### 2. Modular Arithmetic
The arithmetic of remainders—the "clock math" that powers encryption.
- **Congruences**: `a ≡ b (mod n)` means `a` and `b` leave the same remainder when divided by `n`.
- **Fermat's Little Theorem**: If `p` is prime and `a` is not divisible by `p`, then `a^(p-1) ≡ 1 (mod p)`. This is a core building block of RSA.
- **Chinese Remainder Theorem (CRT)**: Allows reconstruction of a number from its remainders. Used to speed up RSA decryption by a factor of ~4x.
- *Application*: Hashing functions, checksums, and load balancing (e.g., `hash(key) % num_servers`).

### 3. The Euclidean Algorithm
One of the oldest and most elegant algorithms in existence.
- **GCD (Greatest Common Divisor)**: `gcd(a, b)` can be computed in `O(log(min(a,b)))` time using repeated division.
- **Extended Euclidean Algorithm**: Finds integers `x, y` such that `ax + by = gcd(a, b)`. This is how we compute **modular inverses**, a critical step in RSA key generation.
- *Application*: Computing modular multiplicative inverses for public-key cryptography.

### 4. RSA and Public-Key Cryptography
The crown jewel application of Number Theory in computer science.
- **Key Generation**: Choose two large primes `p` and `q`. The security of RSA relies on the computational difficulty of factoring the product `n = p * q`.
- **Euler's Totient Function φ(n)**: Counts the integers less than `n` that are coprime to `n`. For RSA, `φ(n) = (p-1)(q-1)`.
- **The Trapdoor**: Multiplying two primes is fast (`O(n²)`), but factoring their product is believed to be computationally infeasible for large numbers—this asymmetry is the foundation of secure communication.

### 5. Primality Testing
How do we know a number is prime without trial division?
- **Miller-Rabin Test**: A probabilistic algorithm that can determine primality with high confidence in polynomial time.
- **AKS Primality Test**: The first deterministic polynomial-time primality test, proving that `PRIMES ∈ P`.
- *Application*: Generating the large primes needed for cryptographic key pairs.

---

### The Guardian of the Digital World
Every HTTPS connection, every cryptocurrency transaction, every encrypted message relies on the simple, beautiful properties of prime numbers. Number Theory is the silent guardian of our digital privacy.
