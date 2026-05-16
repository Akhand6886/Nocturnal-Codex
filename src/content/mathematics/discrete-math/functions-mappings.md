---
title: "Functions & Mappings"
description: "Understanding how elements of one set relate to elements of another. The mathematical basis of computation."
---

## Introduction to Functions

A **function** (or mapping) $f$ from a set $A$ to a set $B$ is an assignment of exactly one element of $B$ to each element of $A$. We write $f: A \rightarrow B$.

*   **Domain**: The set $A$ of input values.
*   **Codomain**: The set $B$ of potential output values.
*   **Range (Image)**: The set of actual output values produced by the function. The range is always a subset of the codomain ($Range \subseteq B$).

If $f(a) = b$, we say $b$ is the **image** of $a$, and $a$ is the **preimage** of $b$.

### Properties of Functions

Functions can have specific structural properties that are crucial for understanding their behavior:

#### 1. Injective (One-to-One)
A function is **injective** if every element in the domain maps to a unique element in the codomain. No two different inputs share the same output.
*   $\forall a, b \in A, \text{ if } f(a) = f(b) \text{ then } a = b$.
*   *CS Example*: Cryptographic hash functions strive to be injective (collision-resistant), though technically they cannot be if the domain is larger than the codomain.

#### 2. Surjective (Onto)
A function is **surjective** if every element in the codomain is mapped to by at least one element in the domain. The range equals the codomain.
*   $\forall b \in B, \exists a \in A \text{ such that } f(a) = b$.

#### 3. Bijective (One-to-One Correspondence)
A function is **bijective** if it is both injective and surjective. Every element in $A$ pairs with exactly one unique element in $B$, and vice versa.
*   *CS Example*: Data serialization and deserialization (e.g., JSON stringify and parse) should ideally form a bijection, ensuring no data is lost or duplicated.

### Inverse Functions

Only bijective functions have an **inverse function**, denoted $f^{-1}: B \rightarrow A$.
If $f(a) = b$, then $f^{-1}(b) = a$.

If a function is not injective, an inverse would require one input to map to multiple outputs (violating the definition of a function). If it is not surjective, the inverse would be undefined for some inputs in $B$.

### Composition of Functions

The **composition** of two functions $f: A \rightarrow B$ and $g: B \rightarrow C$, denoted $g \circ f$, is a new function from $A$ to $C$ defined by:
$(g \circ f)(a) = g(f(a))$

*Note*: The order matters! $(g \circ f)$ means you apply $f$ first, then $g$. Function composition is generally not commutative ($g \circ f \neq f \circ g$).

In programming, this concept is directly applied in functional programming languages (like Haskell or JavaScript with `compose` utilities) to build complex pipelines from simple, pure functions.
