---
title: "Neural Networks & Deep Learning"
slug: "neural-networks"
description: "Master the foundational mathematics, vectorization techniques, and backpropagation mechanics powering modern deep artificial neural networks."
iconName: "brain"
topics:
  - section: "Week 1: Foundations"
    description: "Core concepts, supervised learning workflows, and the data/compute drivers behind modern deep learning."
    items:
      - title: "Introduction to Deep Learning"
        description: "Biological inspirations, artificial neuron models, structured vs unstructured data, and scaling trends."
        slug: "week-1-introduction-to-deep-learning"
  - section: "Week 2: Neural Networks Basics"
    description: "Logistic regression as a single-neuron network, computation graphs, analytical derivatives, and vectorization."
    items:
      - title: "Neural Networks Basics & Vectorization"
        description: "Binary classification, loss vs cost functions, computation graphs, analytical dL/dz derivation, and NumPy broadcasting."
        slug: "week-2-neural-networks-basics"
  - section: "Week 3: Shallow Neural Networks"
    description: "Two-layer architectures, non-linear activation functions, backpropagation equations, and symmetry breaking."
    items:
      - title: "Shallow Neural Networks"
        description: "Hidden layer representations, vectorized multi-sample propagation, Sigmoid vs Tanh vs ReLU, and random initialization."
        slug: "week-3-shallow-neural-networks"
  - section: "Week 4: Deep Architectures"
    description: "Multi-layer deep networks, forward/backward cache flows, matrix dimension verification, and hyperparameters."
    items:
      - title: "Deep Neural Networks & Backprop Cache"
        description: "L-layer network notation, dimension sanity checks, forward-backward cache mechanisms, and parameter tuning."
        slug: "week-4-deep-neural-networks"
---

# Neural Networks & Deep Learning

Welcome to the **Neural Networks & Deep Learning** module in Nocturnal Codex, based on the foundational concepts from Andrew Ng's renowned Deep Learning Specialization (Course 1).

Deep learning is the engine behind modern artificial intelligence—from large language models and speech synthesis to autonomous perception and generative vision. This curriculum deconstructs neural networks down to their core mathematical, algorithmic, and vectorized implementations.

---

## Curriculum Overview

```
                      ┌─────────────────────────────────────────┐
                      │    Week 1: Introduction to Deep Learning│
                      │  (Biological vs Artificial, Scale Laws) │
                      └────────────────────┬────────────────────┘
                                           │
                                           ▼
                      ┌─────────────────────────────────────────┐
                      │    Week 2: Neural Network Basics        │
                      │ (Logistic Regression, Graphs, Vectorize)│
                      └────────────────────┬────────────────────┘
                                           │
                                           ▼
                      ┌─────────────────────────────────────────┐
                      │    Week 3: Shallow Neural Networks      │
                      │(Hidden Layers, Activations, Random Init)│
                      └────────────────────┬────────────────────┘
                                           │
                                           ▼
                      ┌─────────────────────────────────────────┐
                      │    Week 4: Deep Neural Networks         │
                      │ (L-Layers, Dimension Rules, Cache Flow) │
                      └─────────────────────────────────────────┘
```

---

## Core Pillars of the Curriculum

### 1. Vectorized Thinking Over Explicit Loops
Traditional programming relies on nested loops over samples and features. Deep learning relies on **Single Instruction Multiple Data (SIMD)** parallel execution, leveraging GPU and CPU matrix tensor pipelines:

$$\mathbf{Z} = \mathbf{W}^T \mathbf{X} + \mathbf{b}$$

### 2. Computation Graphs & Backpropagation
Every neural network optimization task evaluates a scalar loss $\mathcal{L}(\hat{y}, y)$ through a directed acyclic graph. Derivatives flow backwards via the chain rule:

$$\frac{\partial \mathcal{L}}{\partial w} = \frac{\partial \mathcal{L}}{\partial a} \cdot \frac{\partial a}{\partial z} \cdot \frac{\partial z}{\partial w}$$

### 3. Non-Linear Function Approximation
Without non-linear activations ($g(z)$), any arbitrary $L$-layer neural network collapses into a single linear regression transformation:

$$\hat{y} = \mathbf{W}^{[L]} \mathbf{W}^{[L-1]} \cdots \mathbf{W}^{[1]} \mathbf{x} + \mathbf{b}' = \mathbf{W}_{\text{effective}} \mathbf{x} + \mathbf{b}'$$

Introducing non-linearities such as **ReLU**, **Tanh**, and **GELU** equips the network to approximate any continuous bounded mathematical manifold.

### 4. Cache-Based Deep Forward/Backward Passes
Deep multi-layer architectures pass intermediate linear outputs ($Z^{[l]}$) and activation tensors ($A^{[l]}$) into memory caches during the forward step, allowing the backward gradient flow to compute $\mathrm{d}W^{[l]}$ and $\mathrm{d}b^{[l]}$ in a single pass without recomputation.

---

## Getting Started

Navigate through the 4 weekly modules using the learning path below or the curriculum sidebar on the left. Each topic contains mathematical formulations, interactive code blocks, and visual diagrams.
