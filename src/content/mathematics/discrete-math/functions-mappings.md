---
title: "Functions, Mappings & Inverses"
description: "Mathematical mappings, injective (one-to-one), surjective (onto), and bijective functions, function composition algebra, inverse mappings, and hash collision bounds."
---

## 1. Mathematical Formalism of Functions

In computer science, functions are not merely subroutines that accept arguments and return outputs—they are formal mathematical mappings that model transformations, data serialization, compiler semantics, and cryptography.

### Formal Definition
Let $A$ and $B$ be non-empty sets. A **function** (or mapping) $f$ from $A$ to $B$, denoted $f: A \to B$, is a subset of the Cartesian product $A \times B$ such that for every element $a \in A$, there exists a **unique** element $b \in B$ such that $(a, b) \in f$.

We write $f(a) = b$, where:
- $A$ is the **Domain** ($\text{dom}(f)$).
- $B$ is the **Codomain** ($\text{codom}(f)$).
- $b$ is the **image** of $a$ under $f$, and $a$ is a **pre-image** of $b$.
- The **Range** (or Image) of $f$ is the set of all elements in $B$ that are actually mapped to:
  $$\text{Im}(f) = f(A) = \{ b \in B : \exists a \in A \text{ such that } f(a) = b \} \subseteq B$$

```
+-----------------------------------------------------------------------------------------+
|                                    ANATOMY OF A FUNCTION                                |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       DOMAIN A                                       CODOMAIN B                         |
|     +-----------+                                  +-------------------+                |
|     |  ( a_1 )--|--------------------------------->|  ( b_1 )          |                |
|     |           |                                  |        (Range)    |                |
|     |  ( a_2 )--|--------------------------------->|  ( b_2 )          |                |
|     |           |                                  |                   |                |
|     |  ( a_3 )--|-------------\                    |  ( b_3 )          |                |
|     +-----------+              \                   |                   |                |
|                                 \                  |  [ b_4 (Unmapped)]|                |
|                                  \                 +-------------------+                |
|                                   +---------------> ( b_2 )                             |
|                                                                                         |
|  FUNCTION AXIOMS:                                                                       |
|  1. Exhaustive: Every element in Domain A must have an outgoing arrow.                  |
|  2. Deterministic: No element in Domain A can have more than ONE outgoing arrow.        |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Fundamental Function Properties

The structural properties of functions govern whether transformations preserve uniqueness, cover target spaces, or can be run in reverse.

```
+-----------------------------------------------------------------------------------------+
|                               INJECTIVE VS SURJECTIVE VS BIJECTIVE                      |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  1. INJECTIVE (One-to-One):   No two domain inputs share the same codomain output.       |
|                               f(a_1) = f(a_2) ===> a_1 = a_2.                           |
|                               Cardinality requirement: |A| <= |B|.                      |
|                                                                                         |
|  2. SURJECTIVE (Onto):        Every element in codomain is mapped to (Range == B).      |
|                               For every b in B, exists a in A such that f(a) = b.       |
|                               Cardinality requirement: |A| >= |B|.                      |
|                                                                                         |
|  3. BIJECTIVE (1-to-1 Corresp): BOTH INJECTIVE AND SURJECTIVE.                          |
|                               Every a in A pairs with exactly one unique b in B.        |
|                               Cardinality requirement: |A| == |B|.                      |
+-----------------------------------------------------------------------------------------+
```

### 2.1 Injective Functions (One-to-One)
A function $f: A \to B$ is **injective** if distinct elements in the domain map to distinct elements in the codomain:

$$\forall a_1, a_2 \in A, \quad a_1 \neq a_2 \implies f(a_1) \neq f(a_2)$$

Equivalently by contraposition:
$$\forall a_1, a_2 \in A, \quad f(a_1) = f(a_2) \implies a_1 = a_2$$

*CS Example*: In a database table, primary key assignment is an injective mapping from database entities to integers. Cryptographic hash functions strive for pseudo-injectivity (collision resistance).

### 2.2 Surjective Functions (Onto)
A function $f: A \to B$ is **surjective** if its range equals its entire codomain:

$$\forall b \in B, \quad \exists a \in A \text{ such that } f(a) = b$$

*CS Example*: A hash function mapping 64-bit strings to 32-bit buckets is surjective (every bucket can be reached).

### 2.3 Bijective Functions (One-to-One Correspondence)
A function $f: A \to B$ is **bijective** if it is both injective and surjective.
If $A$ and $B$ are finite sets, a bijection exists if and only if $|A| = |B|$.

*CS Examples*:
- Symmetric cryptography (AES-256 block cipher encryption $E_K(P) = C$) is a bijection over 128-bit blocks; if it were not a bijection, decryption would either be ambiguous or impossible!
- Lossless compression and decompression (gzip, zstd) are mutually inverse bijections.

---

## 3. Inverse Functions

A function $f: A \to B$ has an **inverse function** $f^{-1}: B \to A$ if and only if **$f$ is bijective**.

### Why Inverses Require Bijectivity:
1. If $f$ is **not injective**: There exist $a_1 \neq a_2$ such that $f(a_1) = f(a_2) = b$. Then $f^{-1}(b)$ would have to map to both $a_1$ and $a_2$, violating the deterministic requirement of a function.
2. If $f$ is **not surjective**: There exists some $b \in B$ with no pre-image in $A$. Then $f^{-1}(b)$ would be undefined, violating the exhaustive requirement of a function.

When $f$ is bijective, its inverse satisfies:

$$f^{-1}(f(a)) = a \quad (\forall a \in A), \qquad f(f^{-1}(b)) = b \quad (\forall b \in B)$$

$$f^{-1} \circ f = \text{id}_A, \qquad f \circ f^{-1} = \text{id}_B$$

---

## 4. Function Composition

Let $f: A \to B$ and $g: B \to C$. The **composite function** $g \circ f: A \to C$ is defined by:

$$(g \circ f)(a) = g(f(a))$$

```
Function Composition Pipeline:
   [ a in A ] ---- f ----> [ f(a) in B ] ---- g ----> [ g(f(a)) in C ]
   [-------------------------- g o f --------------------------------]
```

### 4.1 Algebraic Properties of Composition
1. **Associative**: For $f: A \to B$, $g: B \to C$, and $h: C \to D$:
   $$h \circ (g \circ f) = (h \circ g) \circ f$$
2. **Non-Commutative**: In general, $g \circ f \neq f \circ g$.
3. **Preservation of Properties**:
   - If $f$ and $g$ are injective, then $g \circ f$ is injective.
   - If $f$ and $g$ are surjective, then $g \circ f$ is surjective.
   - If $f$ and $g$ are bijective, then $g \circ f$ is bijective, and its inverse is:
     $$(g \circ f)^{-1} = f^{-1} \circ g^{-1}$$
     *(Note the reversed order: socks first, then shoes $\implies$ undo shoes first, then socks!)*

---

## 5. Hash Functions & Non-Injectivity

In software engineering, a **Hash Function** maps a potentially unbounded domain (arbitrary byte strings $\mathcal{U} = \{0, 1\}^*$) to a fixed-size codomain of $b$ bits ($\mathcal{B} = \{0, 1\}^b$):

$$h: \{0, 1\}^* \to \{0, 1\}^b$$

### The Inevitability of Collisions
Because $|\mathcal{U}| = \infty$ and $|\mathcal{B}| = 2^b < \infty$, by the **Pigeonhole Principle**, $h$ **cannot be injective**! There exist infinitely many pairs of distinct strings $x \neq y$ such that:

$$h(x) = h(y) \quad (\text{Hash Collision})$$

### Cryptographic Resistance Properties
While injectivity is mathematically impossible, cryptographic hash functions (SHA-256) enforce computational hardness guarantees:

1. **Pre-image Resistance (One-Way)**: Given $y \in \mathcal{B}$, it is computationally intractable to find any $x$ such that $h(x) = y$ (Complexity: $O(2^b)$).
2. **Second Pre-image Resistance (Weak Collision Resistance)**: Given $x$, it is intractable to find $x' \neq x$ such that $h(x) = h(x')$ (Complexity: $O(2^b)$).
3. **Collision Resistance (Strong Collision Resistance)**: It is intractable to find *any* arbitrary pair $x \neq y$ such that $h(x) = h(y)$ (Complexity: $O(2^{b/2})$ due to the Birthday Bound).

---

## 6. Python Implementation: Verifying Function Properties & Inverses

```python
from typing import Callable, Any

def is_injective(f: Callable[[Any], Any], domain: set) -> bool:
    """Test whether function f is injective on a finite domain."""
    seen_outputs = set()
    for x in domain:
        y = f(x)
        if y in seen_outputs:
            return False
        seen_outputs.add(y)
    return True

def is_surjective(f: Callable[[Any], Any], domain: set, codomain: set) -> bool:
    """Test whether function f is surjective onto codomain."""
    image = {f(x) for x in domain}
    return image == codomain

def is_bijective(f: Callable[[Any], Any], domain: set, codomain: set) -> bool:
    """Test whether function f is bijective."""
    return is_injective(f, domain) and is_surjective(f, domain, codomain)

def compose(g: Callable, f: Callable) -> Callable:
    """Return composite function g(f(x))."""
    return lambda x: g(f(x))

if __name__ == "__main__":
    domain_A = {1, 2, 3, 4}
    codomain_B = {"a", "b", "c", "d"}

    # Define a bijective mapping
    mapping = {1: "b", 2: "c", 3: "a", 4: "d"}
    f_bij = lambda x: mapping[x]

    print(f"Is Injective:  {is_injective(f_bij, domain_A)}")
    print(f"Is Surjective: {is_surjective(f_bij, domain_A, codomain_B)}")
    print(f"Is Bijective:  {is_bijective(f_bij, domain_A, codomain_B)}")

    # Construct inverse mapping
    inv_mapping = {v: k for k, v in mapping.items()}
    f_inv = lambda y: inv_mapping[y]

    # Verify (f_inv o f)(x) == x
    identity_check = all(f_inv(f_bij(x)) == x for x in domain_A)
    print(f"Inverse Correctness Verified: {identity_check}")
```

---

## 7. Key Takeaways

1. **Functions are Deterministic Mappings**: Every domain element must map to exactly one codomain element.
2. **Invertibility Requires Bijectivity**: Only functions that are both one-to-one (injective) and onto (surjective) possess an inverse.
3. **Reversed Inverses**: $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$.
4. **Hash Non-Injectivity**: Pigeonhole theorem dictates that any mapping from a larger domain to a smaller codomain must suffer collisions.
