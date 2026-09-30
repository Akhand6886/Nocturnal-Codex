---
title: "Week 3: Shallow Neural Networks"
description: "Explore 2-layer artificial neural networks, vectorized multi-sample propagation, activation functions (Sigmoid, Tanh, ReLU), backpropagation calculus, and symmetry breaking."
slug: "week-3-shallow-neural-networks"
---

# Shallow Neural Networks

Week 3 transitions from single-neuron logistic regression to **Shallow Neural Networks** containing a hidden layer. We explore architectural representations, vectorized propagation across training samples, compare standard activation functions, derive full 2-layer backpropagation, and investigate why random parameter initialization is essential.

---

## Learning Objectives

By the end of this module, you should be able to:

- Represent a 2-layer neural network using standard mathematical notation.
- Implement forward propagation for single samples and vectorized batches.
- Analyze and compare **Sigmoid**, **Tanh**, **ReLU**, and **Leaky ReLU** activation functions.
- Explain why non-linear activation functions are mathematically mandatory.
- Implement 2-layer backpropagation using matrix calculus.
- Explain the symmetry problem and implement random weight initialization ($W \times 0.01$).

---

## Neural Network Architecture Overview

A **2-layer neural network** contains one hidden layer and one output layer (the input layer is conventionally indexed as layer $0$ and is not counted in network depth).

![2-Layer Neural Network](/images/neural-networks/neural-network-2-layer.png)

In computational graph notation, forward evaluation proceeds sequentially from input to output:

![2-Layer Forward Computation](/images/neural-networks/neural-network-2-layer-forward.png)

### Layer Representations & Notation

![Neural Network Representation](/images/neural-networks/nn-representation.png)

- **Input Layer** ($a^{[0]} = \mathbf{x}$): Input feature vector of dimension $n_x = n^{[0]}$.
- **Hidden Layer** ($a^{[1]}$): Intermediate layer of $n^{[1]}$ neurons whose activations are internal to the model.
- **Output Layer** ($a^{[2]} = \hat{y}$): Generates final prediction $\hat{y}$ with $n^{[2]}$ output units.

Superscripts with square brackets $[l]$ denote the layer index ($l=1, 2, \dots, L$), whereas parenthesized superscripts $(i)$ denote training example index ($i=1, \dots, m$). Subscripts denote individual neurons within a layer.

---

## Computing a Neural Network's Output

Each neuron executes two sequential operations:
1. **Affine Combination**: $z = \mathbf{w}^T \mathbf{x} + b$
2. **Non-Linear Activation**: $a = g(z)$

![Neuron Computation Details](/images/neural-networks/nn-computation.png)

For a network with $n_x = 3$ inputs, $n^{[1]} = 4$ hidden neurons, and $n^{[2]} = 1$ output unit, the single-example matrix shapes are:

| Variable | Shape | Semantic Description |
| :---: | :---: | :--- |
| $\mathbf{x} = \mathbf{a}^{[0]}$ | $(n_x, 1) = (3, 1)$ | Input feature vector |
| $\mathbf{W}^{[1]}$ | $(n^{[1]}, n_x) = (4, 3)$ | Weight matrix connecting input to hidden layer |
| $\mathbf{b}^{[1]}$ | $(n^{[1]}, 1) = (4, 1)$ | Bias vector of hidden layer |
| $\mathbf{z}^{[1]}$ | $(n^{[1]}, 1) = (4, 1)$ | Affine output: $\mathbf{z}^{[1]} = \mathbf{W}^{[1]} \mathbf{x} + \mathbf{b}^{[1]}$ |
| $\mathbf{a}^{[1]}$ | $(n^{[1]}, 1) = (4, 1)$ | Hidden activation: $\mathbf{a}^{[1]} = g^{[1]}(\mathbf{z}^{[1]})$ |
| $\mathbf{W}^{[2]}$ | $(n^{[2]}, n^{[1]}) = (1, 4)$ | Weight matrix connecting hidden to output layer |
| $\mathbf{b}^{[2]}$ | $(n^{[2]}, 1) = (1, 1)$ | Bias of output unit |
| $\mathbf{z}^{[2]}$ | $(n^{[2]}, 1) = (1, 1)$ | Affine output: $\mathbf{z}^{[2]} = \mathbf{W}^{[2]} \mathbf{a}^{[1]} + \mathbf{b}^{[2]}$ |
| $\mathbf{a}^{[2]} = \hat{y}$ | $(n^{[2]}, 1) = (1, 1)$ | Output activation: $\mathbf{a}^{[2]} = \sigma(\mathbf{z}^{[2]})$ |

---

## Vectorization Across $m$ Training Examples

Instead of looping over each example $i \in \{1, \dots, m\}$:

```python
# SLOW: For-loop across m training examples
for i in range(m):
    z1[:, i] = np.dot(W1, x[:, i]) + b1
    a1[:, i] = sigmoid(z1[:, i])
    z2[:, i] = np.dot(W2, a1[:, i]) + b2
    a2[:, i] = sigmoid(z2[:, i])
```

We stack all training samples horizontally into matrix columns:

$$\mathbf{X} = \begin{bmatrix} \vert & \vert & & \vert \\ \mathbf{x}^{(1)} & \mathbf{x}^{(2)} & \dots & \mathbf{x}^{(m)} \\ \vert & \vert & & \vert \end{bmatrix} \in \mathbb{R}^{n_x \times m}$$

### Vectorized Matrix Shapes

| Matrix | Dimensions | Contents |
| :---: | :---: | :--- |
| $\mathbf{X}$ | $(n_x, m)$ | $m$ input training vectors |
| $\mathbf{Z}^{[1]}$ | $(n^{[1]}, m)$ | Hidden affine values for all $m$ examples |
| $\mathbf{A}^{[1]}$ | $(n^{[1]}, m)$ | Hidden activations for all $m$ examples |
| $\mathbf{Z}^{[2]}$ | $(n^{[2]}, m)$ | Output affine values for all $m$ examples |
| $\mathbf{A}^{[2]}$ | $(n^{[2]}, m)$ | Predicted probabilities $\hat{\mathbf{Y}}$ for all $m$ examples |

### 4 Core Vectorized Equations

$$\mathbf{Z}^{[1]} = \mathbf{W}^{[1]} \mathbf{X} + \mathbf{b}^{[1]}$$

$$\mathbf{A}^{[1]} = g^{[1]}(\mathbf{Z}^{[1]})$$

$$\mathbf{Z}^{[2]} = \mathbf{W}^{[2]} \mathbf{A}^{[1]} + \mathbf{b}^{[2]}$$

$$\mathbf{A}^{[2]} = g^{[2]}(\mathbf{Z}^{[2]})$$

```python
# FAST: 4 lines of vectorized NumPy code
Z1 = np.dot(W1, X) + b1
A1 = np.tanh(Z1)            # or np.maximum(0, Z1) for ReLU
Z2 = np.dot(W2, A1) + b2
A2 = 1.0 / (1.0 + np.exp(-Z2))
```

---

## Activation Functions

Every hidden layer requires an activation function $g(z)$ to introduce non-linearity:

| Activation | Formula | Response Curve | Properties & Use Cases |
| :---: | :---: | :---: | :--- |
| **Sigmoid** | ![Sigmoid Formula](/images/neural-networks/sigmoid-latex.svg) | ![Sigmoid Plot](/images/neural-networks/sigmoid.png) | Outputs in $(0, 1)$. Ideal for output layers in binary classification. Rarely used in hidden layers due to gradient vanishing when $|z|$ is large. |
| **Tanh** | ![Tanh Formula](/images/neural-networks/tanh-latex.svg) | ![Tanh Plot](/images/neural-networks/tanh.png) | Outputs in $(-1, 1)$. **Zero-centered**: mean activation is near 0, centering activations for downstream layers. Superior to sigmoid for hidden layers. |
| **ReLU** | $a = \max(0, z)$ | ![ReLU Plot](/images/neural-networks/relu.png) | **Rectified Linear Unit**. The default activation for hidden layers. Derivative is $1$ for $z > 0$, preventing gradient vanishing and accelerating gradient descent convergence. |
| **Leaky ReLU** | $a = \max(0.01z, z)$ | ![Leaky ReLU Plot](/images/neural-networks/leaky-relu.png) | Prevents "dying ReLU" neurons by ensuring a small non-zero slope ($0.01$) when $z < 0$. |

---

## Why Non-Linear Activation Functions Are Mandatory

Suppose we set $g^{[1]}(z) = z$ and $g^{[2]}(z) = z$ (pure linear activations):

$$\mathbf{A}^{[1]} = \mathbf{Z}^{[1]} = \mathbf{W}^{[1]} \mathbf{X} + \mathbf{b}^{[1]}$$

$$\mathbf{A}^{[2]} = \mathbf{Z}^{[2]} = \mathbf{W}^{[2]} \mathbf{A}^{[1]} + \mathbf{b}^{[2]} = \mathbf{W}^{[2]} (\mathbf{W}^{[1]} \mathbf{X} + \mathbf{b}^{[1]}) + \mathbf{b}^{[2]}$$

$$= (\mathbf{W}^{[2]} \mathbf{W}^{[1]}) \mathbf{X} + (\mathbf{W}^{[2]} \mathbf{b}^{[1]} + \mathbf{b}^{[2]}) = \mathbf{W}_{\text{eff}} \mathbf{X} + \mathbf{b}_{\text{eff}}$$

> **Fundamental Theorem:** A composition of linear functions is itself strictly a linear function. An arbitrary $100$-layer neural network using linear activations has identical representational power to standard linear regression. Non-linear activations allow networks to act as universal approximators.

---

## Derivatives of Activation Functions

Backpropagation requires computing $g'(z) \equiv \frac{\mathrm{d}g}{\mathrm{d}z}$:

| Activation Function | Functional Form $a = g(z)$ | Analytical Derivative $g'(z)$ |
| :---: | :---: | :---: |
| **Sigmoid** | $a = \frac{1}{1 + e^{-z}}$ | $g'(z) = a(1 - a)$ |
| **Tanh** | $a = \frac{e^z - e^{-z}}{e^z + e^{-z}}$ | $g'(z) = 1 - a^2$ |
| **ReLU** | $a = \max(0, z)$ | $g'(z) = \begin{cases} 0 & z < 0 \\ 1 & z \ge 0 \end{cases}$ |
| **Leaky ReLU** | $a = \max(0.01z, z)$ | $g'(z) = \begin{cases} 0.01 & z < 0 \\ 1 & z \ge 0 \end{cases}$ |

---

## Gradient Descent for 2-Layer Neural Networks

Given $m$ examples with cross-entropy loss, the complete backpropagation equations are:

### Layer 2 (Output Layer)
$$\mathrm{d}\mathbf{Z}^{[2]} = \mathbf{A}^{[2]} - \mathbf{Y}$$

$$\mathrm{d}\mathbf{W}^{[2]} = \frac{1}{m} \mathrm{d}\mathbf{Z}^{[2]} (\mathbf{A}^{[1]})^T$$

$$\mathrm{d}\mathbf{b}^{[2]} = \frac{1}{m} \sum_{i=1}^m \mathrm{d}\mathbf{Z}^{[2](i)} = \frac{1}{m} \text{np.sum}(\mathrm{d}\mathbf{Z}^{[2]}, \text{axis}=1, \text{keepdims}=\text{True})$$

### Layer 1 (Hidden Layer)
$$\mathrm{d}\mathbf{Z}^{[1]} = \left( (\mathbf{W}^{[2]})^T \mathrm{d}\mathbf{Z}^{[2]} \right) * g'^{[1]}(\mathbf{Z}^{[1]})$$

where $*$ represents the element-wise Hadamard product.

$$\mathrm{d}\mathbf{W}^{[1]} = \frac{1}{m} \mathrm{d}\mathbf{Z}^{[1]} \mathbf{X}^T$$

$$\mathrm{d}\mathbf{b}^{[1]} = \frac{1}{m} \sum_{i=1}^m \mathrm{d}\mathbf{Z}^{[1](i)} = \frac{1}{m} \text{np.sum}(\mathrm{d}\mathbf{Z}^{[1]}, \text{axis}=1, \text{keepdims}=\text{True})$$

### Parameter Updates

$$\mathbf{W}^{[l]} := \mathbf{W}^{[l]} - \alpha \, \mathrm{d}\mathbf{W}^{[l]}, \qquad \mathbf{b}^{[l]} := \mathbf{b}^{[l]} - \alpha \, \mathrm{d}\mathbf{b}^{[l]}$$

---

## Random Weight Initialization & Symmetry Breaking

For logistic regression, zero-initialization ($\mathbf{w} = \mathbf{0}$) works because the objective function is strictly convex. **In multi-layer neural networks, zero initialization fails completely due to the symmetry problem.**

```python
# WRONG: Zero initialization causes symmetry failure
W1 = np.zeros((n1, nx))
W2 = np.zeros((n2, n1))
```

### Why Symmetry Fails
If all weights are initialized to zero:
1. Every hidden neuron computes $z_j^{[1]} = 0 + 0 = 0$.
2. Every hidden neuron produces identical activations $a_1^{[1]} = a_2^{[1]} = \dots = a_{n_1}^{[1]}$.
3. During backpropagation, $\mathrm{d}W_{1j}^{[2]}$ and $\mathrm{d}W_{jk}^{[1]}$ will be identical across all neurons.
4. Hidden units remain identical duplicates through all gradient descent iterations—the network has effectively only $1$ hidden neuron.

### The Solution: Small Random Gaussian Initialization

```python
# CORRECT: Gaussian random initialization with small variance
np.random.seed(42)
W1 = np.random.randn(n1, nx) * 0.01
b1 = np.zeros((n1, 1))                # Zero initialization for biases is fine
W2 = np.random.randn(n2, n1) * 0.01
b2 = np.zeros((n2, 1))
```

### Why Multiply by $0.01$?
If weights are initialized to large numbers (e.g., $10$ or $100$), $z = Wx + b$ will take very large positive or negative values. In Sigmoid and Tanh activations, the slope $g'(z) \to 0$ when $|z|$ is large. This leads to **activation saturation** where gradients vanish, slowing down or stalling gradient descent.

In the next module, we generalize these concepts to **Deep Neural Networks** with arbitrary $L$ layers and develop the cache-based propagation flow.
