---
title: "Continuous Batching & Iteration Scheduling"
slug: "continuous-batching-and-scheduling"
description: "How iteration-level scheduling (Orca) allows requests to dynamically enter and leave batches, and managing chunked prefill and preemption budgets."
---

# Continuous Batching & Iteration Scheduling

Traditional deep learning batching schemes were designed for fixed-size vision or classification inputs: a batch of $B$ requests enters together, executes synchronously through all layers, and exits together.

For autoregressive large language models, this static approach creates severe system inefficiency:
1. **Heterogeneous Input Lengths**: One prompt may contain 20 tokens; another may contain 2,000.
2. **Dynamic Generation Lengths**: One request finishes after 10 output tokens; another generates 800 tokens.

If requests are bundled into a static batch, the fast requests remain trapped, waiting idle and consuming GPU memory while the longest request completes.

---

## 1. Static Batching vs. Iteration-Level Continuous Batching

The **Orca** architecture (Yu et al., OSDI 2022) replaced request-level batching with **Iteration-Level Scheduling** (commonly called **Continuous Batching** or **In-Flight Batching**):

```
Static Batching:
Req 1 [████████████████████] Finished! (Must wait...)
Req 2 [████████] Finished!  (Must wait... Idle GPU cores)
Req 3 [████████████████████████████████████████] Still generating...
Batch only completes when Req 3 finishes!

Continuous Batching (Orca / vLLM):
Req 1 [████████████] -> Completed! Ejected immediately.
Req 2 [██████]       -> Completed! Req 4 joins immediately!
Req 3 [████████████████████████████████] Continuing...
Req 4                [██████████████████] Newly arrived prompt joins next iteration!
```

### The Iteration Cycle
At **every single token generation step**:
1. Check if any running sequences generated an `EOS` (end of sequence) token or hit maximum token limits. If so, eject them and release their KV-cache blocks.
2. Check the waiting queue for newly arrived requests.
3. If sufficient free KV-cache blocks exist, admit new requests into the batch.
4. Execute one forward pass across all active sequences simultaneously.

---

## 2. Prefill vs. Decode Contention & Chunked Prefill

While continuous batching dramatically improves throughput, mixing newly arrived prompts (**Prefill**) with active token generation (**Decode**) introduces a new problem: **Latency Spikes**.

Remember from the Roofline model:
- **Prefill** processes thousands of tokens and saturates the GPU's compute cores for hundreds of milliseconds.
- **Decode** needs quick, predictable steps (e.g., 20–30 ms) to preserve low **Inter-Token Latency (ITL)** for streaming users.

If a new 4,000-token prompt is admitted, all ongoing decode requests in that batch experience a sudden 200 ms stall!

### The Solution: Chunked Prefill (Sarathi-Serve)
Rather than executing an entire prompt in one massive pass, **Chunked Prefill** splits long prompts into fixed token chunks (e.g., 512 tokens):

```
Unified Iteration Token Budget = 1,024 Tokens:
┌──────────────────────────────────────┬────────────────────────────┐
│ Chunked Prefill: Req 5 (Tokens 0-511)│ Decode: Req 1, 2, 3, 4     │
│ (Compute-Bound GEMM)                 │ (Bandwidth-Bound GEMV)     │
└──────────────────────────────────────┴────────────────────────────┘
```

By co-scheduling compute-heavy prefill chunks with bandwidth-heavy decode tokens:
1. Decode tokens "piggyback" on the compute-bound prefill step without degrading user-perceived ITL.
2. GPU compute and memory bandwidth are saturated concurrently.

---

## 3. Memory Pressure & Preemption Strategies

What happens during a sudden surge in traffic when GPU memory is 100% full, but ongoing sequences need more KV-cache blocks to keep generating?

The scheduler must execute a **Preemption Policy**:

1. **Swapping (Offloading to CPU RAM)**:
   - The scheduler transfers the KV blocks of the lowest-priority sequence across PCIe into host CPU RAM.
   - When memory frees up, the blocks are transferred back to GPU HBM, and generation resumes.
2. **Recompute (Drop and Re-evaluate)**:
   - The engine drops the sequence's KV cache entirely.
   - When memory becomes available, the sequence is treated as a prompt re-evaluation up to its current position, which is fast thanks to compute-bound parallel prefill.

In modern servers with high-speed PCIe Gen 5 and fast GPU cores, **Recompute** is often preferred over swapping because recomputing a sequence can be faster than waiting on host memory bus transfers!
