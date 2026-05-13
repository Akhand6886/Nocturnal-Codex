---
title: "Numerical Analysis"
slug: "numerical-analysis"
description: "The mathematics of calculation and approximation. Solving complex problems using numerical methods, iteration, and error analysis."
iconName: "math"
---

## Introduction to Numerical Analysis

Computers are great at arithmetic, but they struggle with "continuous" math like calculus and differential equations. **Numerical Analysis** is the bridge that allows us to take continuous mathematical problems and turn them into discrete calculations that a CPU can solve. It is the science of **approximate** calculation.

### 1. Root Finding
How do we solve equations like $f(x) = 0$ when there is no simple formula?
- **Bisection Method**: A robust method that repeatedly halves an interval—slow but guaranteed to converge.
- **Newton-Raphson Method**: Uses the derivative to "shoot" toward the root. Extremely fast (quadratic convergence) but can fail if the starting guess is poor.
- **Secant Method**: Like Newton's, but uses two points instead of a derivative.

### 2. Numerical Integration
Calculating the "area under a curve" when we can't find an antiderivative.
- **Trapezoidal Rule**: Approximates the area as a series of trapezoids.
- **Simpson's Rule**: Uses parabolas to fit the curve, providing much higher accuracy with the same number of points.
- **Gaussian Quadrature**: Selecting optimal points to calculate the integral perfectly for polynomials of a certain degree.

### 3. Solving Differential Equations (ODEs)
Modeling systems that change over time (e.g., physics engines, population growth).
- **Euler's Method**: The simplest method—taking small linear steps. It is often too inaccurate for real-world use.
- **Runge-Kutta Methods (RK4)**: The "gold standard" for ODEs. It uses multiple intermediate steps to achieve high precision. Most physics engines use a variation of this.

### 4. Error Analysis and Floating Point
In numerical math, we almost never get the *exact* answer.
- **Truncation Error**: The error caused by using an approximation (like a Taylor series) instead of the infinite series.
- **Round-off Error**: The error caused by the limited precision of floating-point numbers (IEEE 754).
- **Condition Number**: Measures how sensitive a problem is to small changes in input. A "well-conditioned" problem gives reliable results, while an "ill-conditioned" one can explode with error.

---

### The Power of Approximation
Numerical Analysis is what allows us to simulate the weather, design airplanes, and train neural networks. It proves that a "good enough" approximation, calculated quickly, is often more valuable than an exact solution that can't be found.
