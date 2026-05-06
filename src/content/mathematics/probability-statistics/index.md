---
title: "Probability & Statistics"
slug: "probability-statistics"
description: "The mathematics of uncertainty, data analysis, and inference. Essential for AI, machine learning, and performance analysis."
iconName: "math"
---

## Introduction to Probability & Statistics

Probability is the logic of uncertainty. In a world of "noisy" data and unpredictable users, statistics provides the tools to build systems that can learn and adapt.

### 1. Probability Theory and Bayes' Theorem
- **Conditional Probability**: The probability of an event occurring given that another event has already occurred.
- **Bayes' Theorem**: The foundation of **Probabilistic Machine Learning**. It allows us to update our beliefs (priors) based on new evidence (likelihood). 
  - *Application*: Spam filters (Naive Bayes) use this to determine the probability a message is spam based on the words it contains.

### 2. Random Variables and Distributions
Mapping outcomes to numbers.
- **Discrete Distributions**: Bernoulli, Binomial (e.g., success/failure of a server request).
- **Continuous Distributions**: Normal (Gaussian) Distribution is found everywhere in nature and is a core assumption in many ML algorithms due to the Central Limit Theorem.

### 3. Statistical Inference
Making sense of data.
- **Maximum Likelihood Estimation (MLE)**: The primary method for estimating the parameters of a model.
- **Hypothesis Testing**: Using P-values and Confidence Intervals to determine if a change (like an A/B test) is actually significant or just random noise.

### 4. Stochastic Processes
- **Markov Chains**: Modeling systems that change state over time based only on the current state.
- *Application*: Speech recognition, weather forecasting, and simulating stock market trends.

---

### Mathematics of "Maybe"
In CSE, we rarely have 100% certainty. Statistics allows us to quantify our doubt and make the best possible decision given the data we have.

