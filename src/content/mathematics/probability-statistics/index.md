---
title: "Probability & Statistics"
slug: "probability-statistics"
description: "The logic of uncertainty and the science of data inference. Essential for probabilistic machine learning and system performance analysis."
iconName: "math"
topics:
  - section: "Part I: Probability Axioms & Random Variables"
    description: "Sample spaces, conditional probability, Bayes theorem, and fundamental probability distributions."
    items:
      - title: "Probability Axioms & Bayes' Theorem"
        description: "Kolmogorov axioms, conditional probability, Bayes' rule, and naive Bayesian classification."
        slug: "probability-axioms-bayes"
      - title: "Discrete & Continuous Distributions"
        description: "Bernoulli, Binomial, Poisson (server queues), Gaussian (normal), and Exponential distributions."
        slug: "discrete-continuous-distributions"
      - title: "Expectation, Variance & Tail Bounds"
        description: "Linearity of expectation, covariance, Markov's inequality, Chebyshev's inequality, and Chernoff bounds."
        slug: "random-variables-expectations"
  - section: "Part II: Stochastic Processes & Randomized Algorithms"
    description: "Probabilistic algorithms, hashing collisions, Markov chains, and empirical hypothesis testing."
    items:
      - title: "Markov Chains & Random Walks"
        description: "Transition probability matrices, Chapman-Kolmogorov equations, stationary distributions, and graph walks."
        slug: "markov-chains-random-walks"
      - title: "Hashing & Randomized Data Structures"
        description: "Universal hashing, Bloom filter collision bounds, Count-Min Sketch, and reservoir sampling."
        slug: "hashing-randomized-algorithms"
      - title: "Hypothesis Testing & A/B Experimentation"
        description: "Null hypothesis, p-values, Type I/II errors, t-tests, Z-scores, and sample size calculations for production A/B tests."
        slug: "hypothesis-testing-ab-testing"
---

## Introduction to Probability & Statistics

Probability is the logic of uncertainty. In Computer Science and Engineering, systems are rarely deterministic: network latency fluctuates, packet drops occur stochastically, users behave unpredictably, and machine learning models reason over distributions rather than absolutes.

### Core Mathematical Applications in CSE

1. **System Performance & Queuing Theory**: Modeling microservice request queues, buffer saturation, and server autoscaling using Poisson processes and $M/M/k$ queuing models.
2. **Probabilistic Data Structures**: Delivering sub-millisecond lookups on billion-element datasets using Bloom filters, HyperLogLog, and Count-Min Sketches.
3. **Evidence-Based Engineering**: Validating UI changes, ranking algorithms, and backend architectures via rigorous statistical hypothesis testing and A/B experimentation.
4. **Machine Learning & AI**: Training neural networks using Maximum Likelihood Estimation (MLE), Bayesian inference, and stochastic gradient optimization.
