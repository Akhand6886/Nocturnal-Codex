---
title: "Equations as Typed Sentences"
slug: "equations-as-typed-sentences"
description: "Deconstructing mathematical nouns, verbs, domains, and typing signatures into legible operational concepts."
---

# Equations as Typed Sentences

The most effective mental model for reading mathematics in computer science is to view **equations as strongly-typed computer code**. Just as a function in TypeScript or Rust declares parameter types, a return type, and an execution contract, a mathematical equation expresses relationships between typed entities.

When an equation feels confusing, it is almost always because the types of the symbols have not yet been made explicit.

---

## 1. Anatomy of an Equation: Nouns, Verbs, and Connectives

Every formula consists of three fundamental linguistic elements:

```
                  ┌────────────── "Subject" Noun (Matrix Transformation)
                  │
             W x  +  b  =  y
             ───  ─  ─  ─  ─
              │   │  │  │  │
              │   │  │  │  └────── "Direct Object" Noun (Output Vector)
              │   │  │  └───────── Dominant Verb ("Equals" or Assignment)
              │   │  └──────────── Additive Translation Vector
              │   └─────────────── Element-wise Binary Operator
              └────────────────── Input Vector
```

### The Three Classes of Verbs:
1. **Definitions ($:=$ or $\equiv$ or $\triangleq$)**:
   - Assigns a name to a computation. It creates a new alias.
   - Example: $D_{\text{KL}}(P \parallel Q) := \sum_{x} P(x) \log \frac{P(x)}{Q(x)}$
2. **Assertions ($=$ or $\approx$ or $\le$)**:
   - Claims that two independently computed expressions yield identical values or approximations under stated conditions.
   - Example: $\mathbb{E}[X + Y] = \mathbb{E}[X] + \mathbb{E}[Y]$
3. **Imperative Updates ($\leftarrow$ or $\rightarrow$)**:
   - Represents an in-place state mutation across discrete time steps $t \to t+1$.
   - Example: $\theta \leftarrow \theta - \eta \nabla_\theta \mathcal{L}(\theta)$

---

## 2. Type Signatures in Mathematics

In modern typed programming:
```typescript
function linearProjection(W: Matrix<d_out, d_in>, x: Vector<d_in>, b: Vector<d_out>): Vector<d_out>
```

In academic paper notation:
$$f: \mathbb{R}^{d_{\text{in}}} \to \mathbb{R}^{d_{\text{out}}}, \quad f(x) = W x + b, \quad \text{where } W \in \mathbb{R}^{d_{\text{out}} \times d_{\text{in}}}, \, b \in \mathbb{R}^{d_{\text{out}}}$$

### Common Number Sets and Their Types:

| Symbol | Mathematical Set | Programming Equivalent | Example in Machine Learning |
| :--- | :--- | :--- | :--- |
| $\mathbb{R}$ | Real numbers | `float32` / `float64` | Continuous weights, logits, losses |
| $\mathbb{R}^d$ | $d$-dimensional vector space | `Tensor[d, float32]` | Word embeddings, hidden states |
| $\mathbb{R}^{M \times N}$| $M \times N$ matrix space | `Tensor[M, N, float32]`| Linear layer weight matrices |
| $\mathbb{N}$ or $\mathbb{Z}^+$| Natural numbers (positive integers) | `uint32` / `int64` | Token IDs, batch sizes, sequence lengths |
| $\{0, 1\}$ | Binary set | `bool` or `uint8` | Classification labels, attention masks |
| $\Delta^K$ | Probability simplex over $K$ classes | `Tensor[K, float32]` where $\sum p_i = 1$ | Softmax output probability distribution |

---

## 3. Resolving Bound vs. Free Variables

A common source of confusion in long equations is failing to distinguish between **Free Variables** (the inputs that the caller passes in) and **Bound Variables** (temporary local variables scoped inside a summation, integral, or quantifier).

Consider the continuous expected value:
$$\mathbb{E}_{x \sim p}[f(x)] = \int_{-\infty}^{\infty} f(x) p(x) \, dx$$

- Here, $x$ is a **Bound (dummy) Variable** scoped strictly inside the integral $\int \dots dx$. It exists only as an iteration accumulator.
- The functions $f$ and $p$ are **Free Variables** passed in from the outer context.
- Replacing $x$ with $z$ does not change the meaning: $\int_{-\infty}^{\infty} f(z) p(z) \, dz$ is identically the same scalar.

```python
# The Python equivalent makes the variable scoping obvious:
def expectation(f, p, domain):
    # 'x' is a bound loop variable, inaccessible outside this scope
    return sum(f(x) * p(x) for x in domain)
```

---

## 4. Reading an Equation Aloud: A Worked Case Study

Consider the binary cross-entropy loss function:
$$\mathcal{L}(y, \hat{y}) = - \Big[ y \log(\hat{y}) + (1 - y) \log(1 - \hat{y}) \Big]$$

### The Step-by-Step Deconstruction:
1. **Types**:
   - $y \in \{0, 1\}$: The ground truth binary label (scalar boolean).
   - $\hat{y} \in (0, 1)$: The model's predicted probability that the label is 1 (scalar float).
2. **The Case Analysis**:
   - When $y = 1$: The right-hand term $(1 - 1)\log(1 - \hat{y}) = 0$ vanishes. The loss simplifies to $-\log(\hat{y})$. If $\hat{y} \to 1$, $\log(1) = 0$, loss is 0. If $\hat{y} \to 0$, $-\log(\hat{y}) \to \infty$.
   - When $y = 0$: The left-hand term $0 \cdot \log(\hat{y}) = 0$ vanishes. The loss simplifies to $-\log(1 - \hat{y})$.
3. **The Spoken Sentence**:
   > *"The binary cross-entropy loss evaluates the negative logarithm of the probability the model assigned to whichever outcome actually occurred."*

By translating abstract algebraic symbols into typed operational statements, mathematical formulas become clear, logical descriptions of executable algorithms.
