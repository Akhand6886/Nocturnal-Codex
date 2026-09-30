---
title: "Week 2: Neural Networks Basics & Vectorization"
description: "Master binary classification, logistic regression as a 1-neuron neural network, computation graphs, analytical derivative derivations, and NumPy vectorization."
slug: "week-2-neural-networks-basics"
---

# Neural Networks Basics & Vectorization

Week 2 focuses on the mathematical foundations and programming practices of neural networks. We formulate **Logistic Regression** as the simplest possible neural network (a single artificial neuron with a sigmoid activation function), trace derivatives using **computation graphs**, provide the analytical proof of $\mathrm{d}z = a - y$, and establish high-performance **vectorization** patterns with NumPy.

---

## Learning Objectives

By the end of this module, you should be able to:

- Formulate binary classification problems and construct structured input matrices ($\mathbf{X}, \mathbf{Y}$).
- Interpret logistic regression as a single-neuron computational graph.
- Differentiate between a sample **loss function** $\mathcal{L}(\hat{y}, y)$ and the global dataset **cost function** $J(\mathbf{w}, b)$.
- Trace forward evaluation and backpropagation passes across computation graphs using the chain rule.
- Mathematically derive $\frac{\partial \mathcal{L}}{\partial z} = a - y$.
- Eliminate explicit for-loops by writing fully vectorized NumPy implementations with broadcasting.

---

## Binary Classification & Notation

In binary classification, the objective is to learn a mapping $f: \mathbf{x} \to y$, where $y \in \{0, 1\}$. 

A canonical example is **Cat vs. Non-Cat** image classification. Given an input image, determine whether it contains a cat ($y = 1$) or not ($y = 0$).

### Feature Vector Unrolling

In computer memory, a digital image is represented as three 2D color channel matrices: Red (R), Green (G), and Blue (B). For an image of resolution $64 \times 64$ pixels:

![Image Dimensions](/images/neural-networks/n_x_64_64_3_12288.svg)

To prepare this for a neural network, we unroll and flatten the three matrices into a single 1D column feature vector $\mathbf{x}$:

$$\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_{n_x} \end{bmatrix} \in \mathbb{R}^{n_x}, \quad \text{where } n_x = 12{,}288$$

### Dataset Matrices Formulation

Given $m$ training samples $\{(\mathbf{x}^{(1)}, y^{(1)}), (\mathbf{x}^{(2)}, y^{(2)}), \dots, (\mathbf{x}^{(m)}, y^{(m)})\}$, we stack the input feature vectors horizontally into an input matrix $\mathbf{X}$ and targets into $\mathbf{Y}$:

$$\mathbf{X} = \begin{bmatrix} \vert & \vert & & \vert \\ \mathbf{x}^{(1)} & \mathbf{x}^{(2)} & \dots & \mathbf{x}^{(m)} \\ \vert & \vert & & \vert \end{bmatrix} \in \mathbb{R}^{n_x \times m}, \quad \mathbf{Y} = \begin{bmatrix} y^{(1)} & y^{(2)} & \dots & y^{(m)} \end{bmatrix} \in \mathbb{R}^{1 \times m}$$

> **Key Takeaway:** Stacking examples as columns ($\mathbf{X} \in \mathbb{R}^{n_x \times m}$) rather than rows allows linear algebraic vectorization: matrix multiplication computes all $m$ examples concurrently in parallel.

---

## Logistic Regression as a Neural Network

Logistic regression predicts the probability $\hat{y} = P(y = 1 \mid \mathbf{x})$.

![Logistic Regression Equation](/images/neural-networks/lr-eqn.svg)

where the **Sigmoid** activation function $\sigma(z)$ is defined as:

![Sigmoid Function](/images/neural-networks/lr-sigmoid.svg)

Given input vector ![Input x](/images/neural-networks/lr-input.svg), our target satisfies ![Target Probability](/images/neural-networks/lr-target.svg).

```
   Inputs (x)               Affine Combination               Activation Output
  ┌────────┐
  │   x₁   ├─── w₁ ───┐
  ├────────┤          │
  │   x₂   ├─── w₂ ───┼──► [ z = wᵀx + b ] ──► [ a = σ(z) ] ──► ŷ = P(y=1|x)
  ├────────┤          │
  │   x₃   ├─── w₃ ───┘
  └────────┘
```

When $z \to +\infty$, $\sigma(z) \to 1$. When $z \to -\infty$, $\sigma(z) \to 0$. At $z = 0$, $\sigma(z) = 0.5$.

---

## Loss Function vs. Cost Function

Why not use ordinary least squares (mean squared error) $\frac{1}{2}(\hat{y} - y)^2$? In logistic regression with non-linear sigmoid activation, the squared error surface is **non-convex** with numerous local minima. Gradient descent is not guaranteed to converge to the global minimum.

Instead, we formulate the **Cross-Entropy Loss Function** $\mathcal{L}(\hat{y}, y)$ for an individual example:

![Loss Function](/images/neural-networks/lr-loss-function.png)

$$\mathcal{L}(\hat{y}, y) = -\left[ y \log \hat{y} + (1 - y) \log(1 - \hat{y}) \right]$$

### Intuition:
- If $y = 1$: $\mathcal{L}(\hat{y}, 1) = -\log \hat{y}$. To minimize loss, $\hat{y}$ must be as large as possible ($\hat{y} \to 1$).
- If $y = 0$: $\mathcal{L}(\hat{y}, 0) = -\log(1 - \hat{y})$. To minimize loss, $\hat{y}$ must be as small as possible ($\hat{y} \to 0$).

The global **Cost Function** $J(\mathbf{w}, b)$ evaluates the average loss across all $m$ training samples:

![Cost Function](/images/neural-networks/lr-cost-function.png)

$$J(\mathbf{w}, b) = \frac{1}{m} \sum_{i=1}^m \mathcal{L}\left(\hat{y}^{(i)}, y^{(i)}\right) = -\frac{1}{m} \sum_{i=1}^m \left[ y^{(i)} \log \hat{y}^{(i)} + (1 - y^{(i)}) \log\left(1 - \hat{y}^{(i)}\right) \right]$$

### Statistical Justification: Maximum Likelihood Estimation

The cross-entropy cost function directly emerges from maximum likelihood estimation:

![Conditional Probability](/images/neural-networks/prob-conditional.svg)

Taking the negative log likelihood across $m$ conditionally independent observations yields the exact cross-entropy cost $J(\mathbf{w}, b)$:

![Probability Cost](/images/neural-networks/prob-cost.svg)

---

## Gradient Descent

To find the optimal parameter weights $\mathbf{w}$ and bias $b$ that minimize the convex surface $J(\mathbf{w}, b)$, we apply **Gradient Descent**:

![Gradient Descent](/images/neural-networks/gradient-descent.jpeg)

Repeatedly update parameters in the opposite direction of the gradient scaled by the learning rate $\alpha$:

$$\mathbf{w} := \mathbf{w} - \alpha \frac{\partial J}{\partial \mathbf{w}}, \qquad b := b - \alpha \frac{\partial J}{\partial b}$$

---

## Computation Graphs & Derivatives

A **computation graph** breaks down a mathematical expression into a directed acyclic graph where nodes represent elementary operations and edges carry variables.

### Example: $e = (a + b)(b + 1)$

Decompose with intermediate variables:
1. $c = a + b$
2. $d = b + 1$
3. $e = c \cdot d$

![Computation Graph Definition](/images/neural-networks/tree-def.png)

To compute derivatives, we flow backwards from the output node using the **chain rule**:

![Computation Graph Derivatives](/images/neural-networks/tree-eval-derivs.png)

- $\frac{\partial e}{\partial c} = d$
- $\frac{\partial e}{\partial a} = \frac{\partial e}{\partial c} \cdot \frac{\partial c}{\partial a} = d \cdot 1 = d$
- $\frac{\partial e}{\partial b} = \frac{\partial e}{\partial c} \cdot \frac{\partial c}{\partial b} + \frac{\partial e}{\partial d} \cdot \frac{\partial d}{\partial b}$

---

## Mathematical Derivation of $\mathrm{d}z = a - y$

In neural network literature and code, we use shorthand notation:

$$\mathrm{d}z \equiv \frac{\partial \mathcal{L}}{\partial z}, \quad \mathrm{d}a \equiv \frac{\partial \mathcal{L}}{\partial a}, \quad \mathrm{d}w \equiv \frac{\partial \mathcal{L}}{\partial w}, \quad \mathrm{d}b \equiv \frac{\partial \mathcal{L}}{\partial b}$$

Let's derive $\mathrm{d}z$ step-by-step using the chain rule:

$$\frac{\partial \mathcal{L}}{\partial z} = \frac{\partial \mathcal{L}}{\partial a} \cdot \frac{\partial a}{\partial z}$$

### Step 1: Derivative of Loss with respect to Activation $a$
$$\mathcal{L}(a, y) = -y \log a - (1 - y) \log(1 - a)$$

$$\frac{\partial \mathcal{L}}{\partial a} = -\frac{y}{a} - (1 - y) \frac{-1}{1 - a} = -\frac{y}{a} + \frac{1 - y}{1 - a} = \frac{-y(1 - a) + a(1 - y)}{a(1 - a)} = \frac{a - y}{a(1 - a)}$$

### Step 2: Derivative of Sigmoid Activation $a = \sigma(z)$ with respect to $z$
$$a = \sigma(z) = \frac{1}{1 + e^{-z}}$$

$$\frac{\mathrm{d}a}{\mathrm{d}z} = \frac{\mathrm{d}}{\mathrm{d}z} (1 + e^{-z})^{-1} = -(1 + e^{-z})^{-2} \cdot (-e^{-z}) = \frac{e^{-z}}{(1 + e^{-z})^2} = \frac{1}{1 + e^{-z}} \cdot \frac{e^{-z}}{1 + e^{-z}} = a(1 - a)$$

### Step 3: Combine with the Chain Rule
$$\frac{\partial \mathcal{L}}{\partial z} = \frac{\partial \mathcal{L}}{\partial a} \cdot \frac{\mathrm{d}a}{\mathrm{d}z} = \left[\frac{a - y}{a(1 - a)}\right] \cdot \left[a(1 - a)\right] = a - y$$

$$\mathbf{\mathrm{d}z = a - y}$$

The term $(a - y)$ represents the prediction error.

---

## From For-Loops to Vectorization

### The Un-Vectorized Approach (Slow)

For $m$ training examples and $n$ features, nested loops cause performance bottlenecks:

```python
import numpy as np

J = 0
dw = np.zeros((n, 1))
db = 0.0

for i in range(m):
    # Forward pass for example i
    z_i = np.dot(w.T, x[i]) + b
    a_i = 1.0 / (1.0 + np.exp(-z_i))
    J += -(y[i] * np.log(a_i) + (1 - y[i]) * np.log(1 - a_i))
    
    # Backward pass
    dz_i = a_i - y[i]
    for j in range(n):
        dw[j] += x[i][j] * dz_i
    db += dz_i

J /= m
dw /= m
db /= m
```

### The Fully Vectorized Approach (Fast)

By stacking all examples horizontally into matrix $\mathbf{X} \in \mathbb{R}^{n_x \times m}$ and $\mathbf{Y} \in \mathbb{R}^{1 \times m}$:

```python
# 1. Forward Propagation (all m samples in one step)
Z = np.dot(w.T, X) + b                  # Shape: (1, m) via broadcasting
A = 1.0 / (1.0 + np.exp(-Z))            # Shape: (1, m)

# 2. Compute Cost
cost = -1/m * np.sum(Y * np.log(A) + (1 - Y) * np.log(1 - A))

# 3. Backward Propagation
dZ = A - Y                              # Shape: (1, m)
dw = 1/m * np.dot(X, dZ.T)              # Shape: (n_x, 1)
db = 1/m * np.sum(dZ)                   # Scalar

# 4. Parameter Update
w = w - alpha * dw
b = b - alpha * db
```

---

## Broadcasting in Python (NumPy)

NumPy automatically expands (broadcasts) arrays with smaller shapes to match larger arrays during element-wise operations:

![NumPy Broadcasting](/images/neural-networks/theory.broadcast_2.gif)

In `Z = np.dot(w.T, X) + b`:
- `np.dot(w.T, X)` has shape `(1, m)`
- `b` is a scalar `(1, 1)`
- NumPy automatically broadcasts `b` horizontally into a `(1, m)` vector so that `b` is added to every individual column.

### Avoid Rank-1 Arrays!

Never use rank-1 arrays of shape `(n,)` in machine learning code. They exhibit unpredictable matrix multiplication and broadcasting behaviors:

```python
# AVOID: Rank-1 array
a = np.random.randn(5)      # a.shape is (5,) -> Neither a column nor a row!

# USE INSTEAD: Explicit 2D column or row vectors
a_col = np.random.randn(5, 1)  # Shape: (5, 1) - Column vector
a_row = np.random.randn(1, 5)  # Shape: (1, 5) - Row vector

# Reshape defensively if needed
assert(a_col.shape == (5, 1))
```

In the next module, we expand this single-neuron model into **Shallow Neural Networks** with multiple hidden units and non-linear activation functions.
