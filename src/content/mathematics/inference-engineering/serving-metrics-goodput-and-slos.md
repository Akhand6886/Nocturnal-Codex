---
title: "LLM Serving Metrics: Goodput, SLOs & Tail Latency"
slug: "serving-metrics-goodput-and-slos"
description: "Deconstructing TTFT, ITL, Goodput vs Throughput, SLO attainment fractions, and tail latency variance in production LLM systems."
---

# LLM Serving Metrics: Goodput, SLOs & Tail Latency

Evaluating an LLM serving engine cannot be reduced to a single "tokens per second" metric. Autoregressive serving produces multiple user-facing latency dimensions that trade off against aggregate server capacity.

Understanding these metrics is vital for capacity planning, pricing models, and service-level agreement (SLO) compliance.

---

## 1. The Core Latency Metrics: TTFT and ITL

An end-to-end user request consists of two primary latency phases:

```
Request Sent                   First Token Visible            Stream Finished
     │                                  │                            │
     ▼                                  ▼                            ▼
     ├──────────────────────────────────┼────────────────────────────┤
     │  Time To First Token (TTFT)      │   Inter-Token Latency (ITL)│
     │  (Queueing + Prefill Evaluation) │   (Autoregressive Decode)  │
     └──────────────────────────────────┴────────────────────────────┘
```

### A. Time to First Token (TTFT)
The duration from the moment the client sends an HTTP request until the first generated token arrives at the client's screen:

$$\text{TTFT} = t_{\text{queue}} + t_{\text{prefill}}$$

- **What It Measures**: Responsiveness. If TTFT exceeds $1.5\text{–}2.0 \text{ seconds}$, interactive applications feel unresponsive.
- **Controlled By**: Prompt length, prefill compute throughput, and queue depth.

### B. Inter-Token Latency (ITL / Time Per Output Token - TPOT)
The time interval between successive streaming tokens during generation:

$$\text{ITL} = \frac{t_{\text{completion}} - \text{TTFT}}{\text{Total Output Tokens} - 1}$$

- **What It Measures**: Reading fluency. Human reading speed is approximately $200\text{–}300 \text{ words/minute}$ (roughly $4\text{–}6 \text{ tokens/second}$, corresponding to an ITL of $150\text{–}250 \text{ ms}$).
- **Interactive Threshold**: ITL under $30\text{–}50 \text{ ms}$ ($20\text{–}33 \text{ tokens/second}$) feels instantaneous to human readers.
- **Controlled By**: Memory bandwidth, batch size, and decode interference.

---

## 2. Throughput vs. Goodput

In traditional serving, **Throughput** measures raw tokens processed per second across all GPUs:

$$\text{Throughput} = \frac{\sum \text{All Generated Tokens}}{\Delta t} \quad (\text{Tokens / Second})$$

However, raw throughput can be deceptively misleading: a serving engine running at maximum batch capacity might achieve 5,000 tokens/second, but with an ITL of $500 \text{ ms}$ and TTFT of $12 \text{ seconds}$—violating all acceptable user SLAs!

### The Definition of Goodput:
**Goodput** measures the rate of requests or tokens completed **strictly within Service Level Objectives (SLOs)**:

$$\text{Goodput} = \frac{\sum_{i \in \text{SLO Compliant}} \text{Tokens}_i}{\Delta t}$$

$$\text{SLO Attainment} = \frac{\text{Number of Requests Meeting Both TTFT \& ITL Targets}}{\text{Total Requests Completed}}$$

```
Throughput vs. Goodput Curve:
Capacity (Tokens/s)
   ▲
   │                           Raw Throughput (Ignores Latency!)
   │                         ┌──────────────────────────────────
   │                        /
   │                       /
   │                      / ◄── Goodput Peak (Optimal Operating Point!)
   │                     /  ╲
   │                    /    ╲  Violates P99 ITL / Queue Times!
   │                   /      ╲
   └──────────────────┴────────┴────────────────────────────────►
                    Safe Concurrency        Overloaded Concurrency
```

When load exceeds the optimal operating point, queue delays cause SLO attainment to plummet to zero, even while raw throughput remains high.

---

## 3. Tail Latency & The P99 Variance Problem

In production systems, average latency ($\mu$) hides catastrophic outlier experiences. Production SLAs are defined around high percentiles: **P90**, **P95**, and **P99**.

### Factors That Inflate P99 Latency:
1. **Head-of-Line Blocking**: A 32,000-token PDF analysis entering the batch freezes ongoing chat streams.
2. **KV-Cache Eviction / Swapping**: Memory exhaustion triggering disk or CPU memory swaps causes sudden multi-second freezes.
3. **Network Collective Outliers**: In Tensor Parallelism ($TP=8$), every GPU must finish before the All-Reduce collective completes. The slowest single GPU (due to thermal throttling or PCIe bus contention) dictates the speed of the entire cluster.

### Target SLO Reference Table for Enterprise LLM APIs

| Workload Type | Target P95 TTFT | Target P95 ITL | Acceptable Failure Rate |
| :--- | :--- | :--- | :--- |
| **Interactive Chat** | $<800 \text{ ms}$ | $<35 \text{ ms}$ ($>28 \text{ tok/s}$) | $<0.1\%$ |
| **Code Autocompletion** | $<150 \text{ ms}$ | $<20 \text{ ms}$ ($>50 \text{ tok/s}$) | $<0.05\%$ |
| **Background Batch Jobs** | $<30 \text{ seconds}$ | $<100 \text{ ms}$ | $<1.0\%$ |
