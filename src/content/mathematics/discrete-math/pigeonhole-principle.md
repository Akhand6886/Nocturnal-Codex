---
title: "The Pigeonhole Principle"
description: "A deceptively simple observation that proves the existence of unexpected collisions and patterns."
---

## The Basic Principle

The **Pigeonhole Principle** states a painfully obvious truth: If you have $k$ pigeonholes and $n$ pigeons, and $n > k$, then at least one pigeonhole must contain more than one pigeon.

In mathematical terms: If a function $f: A \rightarrow B$ has $|A| > |B|$, then $f$ cannot be injective (one-to-one). There must be some $a_1, a_2 \in A$ such that $f(a_1) = f(a_2)$.

**Example 1**: In any group of 367 people, there must be at least two people with the exact same birthday (ignoring leap years, there are 366 possible birthdays).

**Example 2**: If you have 10 pairs of black socks and 10 pairs of white socks in a drawer, how many individual socks must you pull out in the dark to guarantee a matching pair?
*Pigeons*: Socks drawn. *Pigeonholes*: Colors (2). To get 2 pigeons in one hole, you need $n > 2$. Thus, 3 socks guarantee a pair.

## The Generalized Pigeonhole Principle

If $n$ objects are placed into $k$ boxes, then at least one box must contain at least $\lceil n/k \rceil$ objects.
*(The $\lceil x \rceil$ ceiling function rounds up to the nearest integer).*

**Example**: What is the minimum number of students required in a class to guarantee that at least 5 of them receive the same grade, if the possible grades are A, B, C, D, and F?
Boxes $k = 5$. We want $\lceil n/5 \rceil = 5$.
This implies $n/5 > 4$, so $n > 20$. The minimum number is 21.

## Applications in Computer Science

The Pigeonhole Principle is a fundamental tool for proving theoretical limits in computer science.

### 1. Hash Collisions

A hash function takes an arbitrarily large input and produces a fixed-size output (e.g., a 256-bit hash). Since the set of possible inputs (infinite) is larger than the set of possible outputs ($2^{256}$), the Pigeonhole Principle dictates that **hash collisions are mathematically unavoidable**. There exist two different files with the exact same SHA-256 hash.

### 2. Lossless Compression Limits

Can we write a compression algorithm that makes *every* file smaller?
No. By the Pigeonhole Principle, there are fewer files of length $N-1$ bits than there are of length $N$ bits. If a compression algorithm maps all $N$-bit files to smaller files, it must map multiple $N$-bit files to the same compressed file (a collision), making decompression impossible. Any lossless compression algorithm that makes some files smaller *must* make some other files larger.

### 3. Graph Theory and Networks

In any network (graph) with 2 or more nodes where every node is connected to at least one other node, there are always at least two nodes with the exact same number of connections (degree). 
*(Proof: Pigeons are the $n$ nodes. Pigeonholes are the possible degrees $1$ to $n-1$. Since there are $n$ nodes and $n-1$ possible degrees, two nodes must share a degree.)*
