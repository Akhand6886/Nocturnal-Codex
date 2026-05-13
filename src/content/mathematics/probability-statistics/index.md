---
title: "Probability & Statistics"
slug: "probability-statistics"
description: "The logic of uncertainty and the science of data inference. Essential for probabilistic machine learning and system performance analysis."
iconName: "math"
---

## Introduction to Probability & Statistics

Probability is the logic of uncertainty. In a world of "noisy" data and unpredictable users, statistics provides the tools to build systems that can learn, predict, and adapt.

### 1. Bayes' Theorem: The Logic of Evidence
- **Prior, Likelihood, and Posterior**: How we update our beliefs when we see new data.
- **Probabilistic Programming**: Using libraries like PyMC or Pyro to build models that incorporate uncertainty directly into the code.
- *Application*: Spam filters, medical diagnosis, and autonomous driving all rely on Bayesian updates to make decisions under uncertainty.

### 2. Distributions and the Central Limit Theorem
- **Discrete vs Continuous**: Bernoulli (True/False), Binomial (Multiple trials), and Poisson (Arrival rates).
- **The Normal (Gaussian) Distribution**: The "Bell Curve." 
- **The Central Limit Theorem (CLT)**: The mathematical proof that the average of many random variables tends toward a normal distribution, regardless of the original distribution. This is why the Gaussian is the default assumption in almost all ML and data science.

### 3. Monte Carlo Methods
Using randomness to solve deterministic problems.
- **Simulation**: If a math problem is too hard to solve exactly, we can simulate it millions of times and look at the average result.
- **Markov Chain Monte Carlo (MCMC)**: The engine of modern Bayesian statistics, allowing us to sample from complex, high-dimensional probability distributions.
- *Application*: Calculating the risk of a financial portfolio or the path of light in a 3D rendering engine (Ray Tracing).

### 4. Statistical Inference and Machine Learning
- **MLE (Maximum Likelihood Estimation)**: Finding the parameters that make the observed data "most likely." This is the foundation of training most neural networks.
- **Correlation vs. Causality**: A critical pitfall. Statistics can tell us that two things happen together, but not that one causes the other.
- **Hypothesis Testing**: Using P-values and A/B tests to determine if a change in a website's UI actually improved conversion or was just random noise.

---

### The Mathematics of "Maybe"
In CSE, we rarely have 100% certainty. Statistics allows us to quantify our doubt and make the best possible decisions given the data we have. It is the language of **Evidence-Based Engineering**.
