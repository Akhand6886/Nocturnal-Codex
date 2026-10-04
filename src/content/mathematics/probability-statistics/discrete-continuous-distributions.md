---
title: "Discrete & Continuous Distributions"
description: "Key probability distributions in computer systems: Bernoulli, Binomial, Poisson queues, Gaussian noise, and Exponential server lifetimes."
---

## 1. Discrete vs Continuous Random Variables

A **Random Variable** $X$ is a measurable function mapping the sample space $\Omega$ to the real numbers $\mathbb{R}$.

- **Discrete**: Takes values in a countable set $\{x_1, x_2, \dots\}$. Described by a **Probability Mass Function (PMF)**:
  $$p(x) = P(X = x), \quad \sum_x p(x) = 1$$
- **Continuous**: Takes values in an uncountably infinite continuum (e.g. latency in milliseconds). Described by a **Probability Density Function (PDF)**:
  $$P(a \le X \le b) = \int_a^b f(x) \, dx, \quad \int_{-\infty}^\infty f(x) \, dx = 1$$

---

## 2. Core Distributions in Computer Science

### A. Poisson Distribution (Incoming Server Traffic)
Models the number of independent events occurring within a fixed time interval when events arrive at a constant average rate $\lambda$:

$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k \in \{0, 1, 2, \dots\}$$

$$E[X] = \lambda, \quad \text{Var}(X) = \lambda$$

- **CSE Applications**: Modeling HTTP requests arriving at an API gateway per second, database query concurrency, and network packet arrivals in router queues.

### B. Exponential Distribution (Time Between Events & SRE MTTF)
The continuous counterpart to Poisson. Represents the waiting time $T$ between Poisson events:

$$f(t) = \lambda e^{-\lambda t}, \quad t \ge 0$$

$$E[T] = \frac{1}{\lambda}, \quad \text{Var}(T) = \frac{1}{\lambda^2}$$

- **The Memoryless Property**:
  $$P(T > s + t \mid T > s) = P(T > t)$$
  The probability of a component failing in the next hour is identical regardless of how long it has already been running. Used for SRE Mean Time To Failure (MTTF) modeling.

### C. Normal / Gaussian Distribution $\mathcal{N}(\mu, \sigma^2)$
The central distribution in science, governed by the bell curve:

$$f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)$$

- **The 68-95-99.7 Rule**:
  - $68.27\%$ of values lie within $\mu \pm 1\sigma$.
  - $95.45\%$ of values lie within $\mu \pm 2\sigma$.
  - $99.73\%$ of values lie within $\mu \pm 3\sigma$.

```
                       Normal Curve μ ± 3σ
                              ▲
                             / \
                            /   \
                         _.'  |  '._
                       .'     |     '.
                    _.'       |       '._
                  .'          |          '.
    ────────────┴──────┴──────┴──────┴──────┴────────────►
              μ-2σ   μ-σ      μ     μ+σ    μ+2σ
```

---

## 3. The Central Limit Theorem (CLT)

The **Central Limit Theorem** is one of the most remarkable theorems in mathematics:

Let $X_1, X_2, \dots, X_n$ be an independent and identically distributed (i.i.d.) sequence of random variables drawn from **ANY distribution** with mean $\mu$ and finite variance $\sigma^2$. As $n \to \infty$, the sample mean $\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i$ converges in distribution to a Normal distribution:

$$\bar{X}_n \xrightarrow{d} \mathcal{N}\left( \mu, \frac{\sigma^2}{n} \right)$$

$$\frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \xrightarrow{d} \mathcal{N}(0, 1)$$

### Why CLT Matters to Software Engineers
Regardless of how skewed raw user latencies or packet sizes are, **the average latency across batches of requests will always follow a Gaussian distribution**, enabling predictable statistical confidence intervals for monitoring and SLAs.

---

## 4. Python Implementation: Simulating an M/M/1 Server Queue

```python
import numpy as np

def simulate_mm1_queue(arrival_rate: float, service_rate: float, num_requests: int = 10000) -> dict:
    """
    Simulates an M/M/1 Queue:
    - Poisson arrivals (inter-arrival times ~ Exponential(lambda))
    - Exponential service times (~ Exponential(mu))
    """
    assert arrival_rate < service_rate, "Queue is unstable when arrival_rate >= service_rate!"
    
    # Generate inter-arrival and service times
    inter_arrivals = np.random.exponential(1.0 / arrival_rate, size=num_requests)
    service_times = np.random.exponential(1.0 / service_rate, size=num_requests)
    
    arrival_times = np.cumsum(inter_arrivals)
    completion_times = np.zeros(num_requests)
    
    current_time = 0.0
    for i in range(num_requests):
        start_time = max(arrival_times[i], current_time)
        completion_times[i] = start_time + service_times[i]
        current_time = completion_times[i]
        
    total_time_in_system = completion_times - arrival_times
    
    # Theoretical results from Little's Law: W = 1 / (mu - lambda)
    theoretical_W = 1.0 / (service_rate - arrival_rate)
    empirical_W = np.mean(total_time_in_system)
    
    return {
        "arrival_rate": arrival_rate,
        "service_rate": service_rate,
        "utilization_rho": arrival_rate / service_rate,
        "empirical_mean_latency": empirical_W,
        "theoretical_mean_latency": theoretical_W,
        "p99_latency": np.percentile(total_time_in_system, 99),
    }

# 80 req/sec arrival, 100 req/sec server capacity (80% utilization)
results = simulate_mm1_queue(arrival_rate=80.0, service_rate=100.0)
print(f"Utilization (ρ): {results['utilization_rho'] * 100:.1f}%")
print(f"Empirical mean latency: {results['empirical_mean_latency']*1000:.2f} ms")
print(f"Theoretical mean latency: {results['theoretical_mean_latency']*1000:.2f} ms")
print(f"p99 latency: {results['p99_latency']*1000:.2f} ms")
```
