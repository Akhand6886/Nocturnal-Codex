---
title: "Poisson Processes & Queuing Theory"
description: "Poisson arrival streams, memoryless interarrival times, M/M/1 and M/M/k queuing systems, Little's Law, and cloud autoscaling SLAs."
---

## 1. Modeling Asynchronous Event Streams

In cloud architectures, network switches, and database connection pools, requests arrive unpredictably from millions of distributed clients. Modeling these streams deterministically is impossible. 

The **Poisson Process** is the canonical mathematical model for random event arrivals in continuous time.

```
Continuous Timeline:
---x---------x----x-----------x-------------x----x---------> Time t
   |<-- T1 ->|<T2>|<--- T3 -->|<---- T4 --->|<T5>|
   Interarrival times T_i ~ Exponential(lambda) are i.i.d.!
```

---

## 2. The Poisson Counting Process

Let $N(t)$ denote the total number of arrivals occurring in the time interval $[0, t]$. The stochastic process $\{N(t), t \ge 0\}$ is a **Poisson Process with rate $\lambda > 0$** if:

1. **Starts at Zero**: $N(0) = 0$.
2. **Independent Increments**: The number of arrivals in non-overlapping time intervals are statistically independent.
3. **Stationary Increments**: The number of arrivals in any interval of length $\tau$ depends only on $\tau$, distributed as:
   $$N(t + \tau) - N(t) \sim \text{Poisson}(\lambda \tau)$$
   $$P(N(t + \tau) - N(t) = k) = \frac{(\lambda \tau)^k e^{-\lambda \tau}}{k!}, \quad k \in \{0, 1, 2, \dots\}$$

### 2.1 Equivalence to Exponential Interarrival Times
Let $T_1, T_2, \dots$ be the elapsed times between consecutive arrivals.
$$P(T_1 > t) = P(N(t) = 0) = \frac{(\lambda t)^0 e^{-\lambda t}}{0!} = e^{-\lambda t}$$
The CDF of $T_1$ is $F(t) = 1 - e^{-\lambda t}$, which is precisely the **Exponential distribution $\text{Exp}(\lambda)$**!

> **Theorem**: A counting process is a Poisson process with rate $\lambda$ if and only if its interarrival times $T_i$ are independent and identically distributed $\text{Exp}(\lambda)$ random variables.

---

## 3. Superposition & Thinning (Splitting)

Modern microservice architectures split and merge traffic streams continuously:

```
+---------------------------------------------------------------------------------+
|                       MERGING & SPLITTING POISSON STREAMS                       |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  SUPERPOSITION (MERGING):                                                       |
|  Stream 1 [Rate lambda_1] ---+                                                  |
|                              |===> Combined Stream [Rate lambda_1 + lambda_2]   |
|  Stream 2 [Rate lambda_2] ---+                                                  |
|                                                                                 |
|  THINNING (SPLITTING):                                                          |
|                              +--- Route to Service A (prob p)   [Rate p * lambda]
|  Input Stream [Rate lambda] -+                                                  |
|                              +--- Route to Service B (prob 1-p) [Rate (1-p)*lambda]
+---------------------------------------------------------------------------------+
```

- **Superposition Theorem**: If independent Poisson streams with rates $\lambda_1, \lambda_2, \dots, \lambda_k$ are merged, the aggregated stream is a Poisson process with rate $\Lambda = \sum_{i=1}^k \lambda_i$.
- **Thinning Theorem**: If arrivals from a Poisson stream with rate $\lambda$ are independently routed to destination $A$ with probability $p$ and destination $B$ with probability $1-p$, the resulting streams are **independent Poisson processes** with rates $p\lambda$ and $(1-p)\lambda$.

---

## 4. Kendall's Notation for Queues

In queuing theory, systems are classified by **Kendall's Notation**:

$$A / S / c / K$$

- $A$: Arrival process distribution ($M = \text{Markovian/Poisson}, D = \text{Deterministic}, G = \text{General}$).
- $S$: Service time distribution ($M = \text{Exponential}, D = \text{Deterministic}, G = \text{General}$).
- $c$: Number of parallel server instances ($1, 2, \dots, \infty$).
- $K$: Maximum queue buffer capacity (defaults to $\infty$).

---

## 5. The $M/M/1$ Queuing System

The $M/M/1$ queue represents a single server with Poisson arrival rate $\lambda$ and exponentially distributed service times with service rate $\mu$.

```
Arrivals (rate lambda) ---> [ BUFFER:  * * * * ] ---> [ SERVER: mu ] ---> Completed
```

### 5.1 Traffic Intensity & Stability Condition
The **traffic intensity** (server utilization) is defined as:

$$\rho = \frac{\lambda}{\mu}$$

- If $\rho < 1$: The server processes jobs faster than they arrive. A stable steady state exists.
- If $\rho \ge 1$: The queue grows infinitely ($L \to \infty$); system brownout occurs!

### 5.2 Steady-State State Probabilities
Let $p_n$ be the stationary probability that exactly $n$ customers/requests are in the system (either waiting or being served). By solving the continuous-time birth-death balance equations:

$$p_n = (1 - \rho) \rho^n, \quad n \in \{0, 1, 2, \dots\}$$

The probability that the server is completely idle is $p_0 = 1 - \rho$.

---

## 6. Little's Law & Response Latency

One of the most celebrated and universal theorems in operations research and systems engineering is **Little's Law**:

### Theorem (Little's Law)
In any stable queuing system, the long-term average number of requests in the system ($L$) equals the long-term average arrival rate ($\lambda$) multiplied by the average time a request spends in the system ($W$):

$$L = \lambda W$$

```
+---------------------------------------------------------------------------------+
|                                    LITTLE'S LAW                                 |
+---------------------------------------------------------------------------------+
|                                                                                 |
|                Average Concurrency (L) = Arrival Rate (lambda) * Latency (W)    |
|                                                                                 |
|  Example: If an API handles 1,000 req/sec (lambda) with average 50ms latency (W),
|           the number of concurrent active in-flight requests is:                |
|           L = 1000 * 0.050 = 50 concurrent requests.                            |
+---------------------------------------------------------------------------------+
```

### 6.1 Derivation of $M/M/1$ Latency
For an $M/M/1$ queue, the expected number of requests in the system is:

$$L = \sum_{n=0}^\infty n p_n = (1 - \rho) \sum_{n=0}^\infty n \rho^n = \frac{\rho}{1 - \rho}$$

Applying Little's Law ($W = L / \lambda$):

$$W = \frac{\rho}{\lambda(1 - \rho)} = \frac{\lambda / \mu}{\lambda(1 - \lambda / \mu)} = \frac{1}{\mu - \lambda}$$

```
Latency Explosion as Utilization Approaches 100%:
Response Time W
   ^
   |                                     |
   |                                    /
   |                                   /
 5 |                                 .'
   |                              .-'
 1 |-------------------------..-''
   +-------------------------+-----------+------> Utilization rho = lambda / mu
   0                        0.5         1.0
   At rho = 50%: W = 2x base service time
   At rho = 90%: W = 10x base service time
   At rho = 99%: W = 100x base service time!
```

> **Production Engineering Rule**: NEVER run servers above $70\text{--}80\%$ average utilization! As $\rho \to 1$, response latency explodes hyper-linearly due to queue backlog.

---

## 7. Python Implementation: Discrete-Event $M/M/1$ Simulation

```python
import numpy as np

def simulate_mm1_queue(arrival_rate: float = 80.0, service_rate: float = 100.0, n_requests: int = 200_000):
    """
    Simulate an M/M/1 queue using discrete-event scheduling.
    Compare simulated metrics against Little's Law and analytical formulas.
    """
    rng = np.random.default_rng(42)
    rho = arrival_rate / service_rate
    assert rho < 1.0, "System is unstable (rho >= 1.0)!"

    # Generate exponential interarrival and service times
    interarrivals = rng.exponential(scale=1.0 / arrival_rate, size=n_requests)
    service_times = rng.exponential(scale=1.0 / service_rate, size=n_requests)

    arrival_times = np.cumsum(interarrivals)
    departure_times = np.zeros(n_requests)

    # Event loop: track server departure time
    current_server_free_time = 0.0
    for i in range(n_requests):
        service_start = max(arrival_times[i], current_server_free_time)
        departure_times[i] = service_start + service_times[i]
        current_server_free_time = departure_times[i]

    # Calculate system latency W (time in system = departure - arrival)
    latencies = departure_times - arrival_times
    empirical_w = np.mean(latencies)
    theoretical_w = 1.0 / (service_rate - arrival_rate)

    # Calculate average concurrency L via Little's Law
    empirical_l = arrival_rate * empirical_w
    theoretical_l = rho / (1.0 - rho)

    print(f"=== M/M/1 Queue Simulation (lambda={arrival_rate}, mu={service_rate}, rho={rho:.2f}) ===")
    print(f"Mean Latency W (Simulated):   {empirical_w * 1000:.3f} ms")
    print(f"Mean Latency W (Theoretical): {theoretical_w * 1000:.3f} ms")
    print(f"Average Items L (Simulated):  {empirical_l:.3f}")
    print(f"Average Items L (Theoretical):{theoretical_l:.3f}")

    assert np.isclose(empirical_w, theoretical_w, rtol=0.03), "Latency diverged from theory!"

if __name__ == "__main__":
    simulate_mm1_queue(arrival_rate=80.0, service_rate=100.0)
```

---

## 8. Summary & SRE Rules of Thumb

1. **Exponential Interarrivals**: Poisson arrival streams mean interarrival gaps are memoryless exponentials.
2. **Little's Law is Invariant**: $L = \lambda W$ holds regardless of the distribution of arrivals or service times.
3. **The Hockey-Stick Latency Curve**: $W = 1 / (\mu - \lambda)$ causes latency to asymptote to infinity near $100\%$ capacity. Always size autoscalers to trigger before reaching $\rho > 0.75$.
