---
title: "Stochastic Processes"
slug: "stochastic-processes"
description: "The study of random variables evolving over time. Essential for modeling network traffic, stock markets, and computer system performance."
iconName: "math"
---

## Introduction to Stochastic Processes

A **Stochastic Process** is a collection of random variables representing the evolution of some system over time. While probability tells us about a single roll of the dice, stochastic processes tell us about the entire history of the game.

### 1. Markov Chains (Discrete Time)
Systems that change states based on a fixed set of probabilities, where the future depends only on the *present*, not the past (the **Markov Property**).
- **Transition Matrix**: A table showing the probability of moving from state A to state B.
- **Stationary Distribution**: The "long-term" behavior of the system. If you run the chain forever, what percentage of time does it spend in each state?
- *Application*: **PageRank** (Google's algorithm) treats the entire web as a massive Markov Chain, where the "important" pages are the ones where a random surfer spends the most time.

### 2. Poisson Processes
Modeling "rare" events that happen at a constant average rate (e.g., users arriving at a website, calls to a support center).
- **Inter-arrival Times**: The time between events follows an **Exponential Distribution**, which is uniquely "memoryless."
- **Counting Process**: How many events happened between time $T_1$ and $T_2$?
- *Application*: Predicting server load, modeling radioactive decay, and simulating customer arrivals in retail.

### 3. Continuous-Time Markov Chains (CTMC)
Like discrete Markov Chains, but the system can stay in a state for a random, continuous amount of time before jumping.
- **Generator Matrix (Q)**: Describes the "rates" of transition between states.
- **Birth-Death Processes**: A specific type of CTMC where you can only move to the next or previous state (e.g., people joining/leaving a queue).
- *Application*: Biological modeling and the foundation of Queuing Theory.

### 4. Queuing Theory
The mathematics of waiting in line.
- **Kendall's Notation**: A standard way to describe a queue (e.g., M/M/1 means Markovian arrivals, Markovian service, and 1 server).
- **Little's Law**: $L = \lambda W$ (Average number of items in a system = Arrival rate $\times$ Average wait time). This is one of the few "laws" in computer science that is always true.
- *Application*: Designing router buffers, CPU task scheduling, and optimizing call center staffing.

---

### Modeling the Unpredictable
Stochastic Processes allow us to build systems that are robust even in the face of randomness. By understanding the mathematics of "chance over time," we can design networks that don't crash under pressure and algorithms that can find order in chaos.
