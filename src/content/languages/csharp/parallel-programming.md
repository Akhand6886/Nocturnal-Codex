---
title: "Parallel Programming"
description: "Multi-core processing, Task Parallel Library (TPL), and PLINQ"
---

## Parallel vs. Asynchronous

Wait! These are often confused:
-   **Asynchronous**: "Waiting efficiently." Frees up the thread while doing I/O.
-   **Parallel**: "Doing many things at once." Uses multiple CPU cores to process data faster.

In **C#**, the **Task Parallel Library (TPL)** is the primary tool for parallel programming.

## 1. `Parallel.For` and `Parallel.ForEach`

These are parallel versions of the standard loops. They automatically split the work across all available CPU cores.

```csharp
Parallel.ForEach(images, image => {
    ProcessImage(image); // Runs on multiple cores!
});
```

## 2. PLINQ (Parallel LINQ)

You can turn any LINQ query into a parallel one simply by adding **`.AsParallel()`**.

```csharp
var results = data.AsParallel()
                  .Where(x => ComplexCalculation(x))
                  .ToList();
```

Wait! PLINQ is powerful, but it comes with overhead for merging results. Only use it for truly CPU-intensive tasks.

## 3. Data Parallelism vs. Task Parallelism

-   **Data Parallelism**: Performing the same operation on many items (e.g., `Parallel.ForEach`).
-   **Task Parallelism**: Performing different tasks at the same time (e.g., `Task.WhenAll`).

## Thread Safety

When running code in parallel, you must ensure your data is "Thread-Safe." If multiple threads try to write to the same variable at once, your data will be corrupted. Use **`lock`** or **Concurrent Collections**.

```csharp
private readonly object _lock = new();
lock (_lock) {
    // Only one thread can be here at a time!
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **TPL** | Task Parallel Library |
| **PLINQ** | Parallel LINQ (`.AsParallel()`) |
| **Concurrency** | Managing multiple tasks (can be async or parallel) |
| **Race Condition**| A bug where the result depends on which thread wins the race |
| **Lock** | Preventing multiple threads from accessing data at once |
| **Best For** | Image processing, math, data analysis, massive sorting |
| **Worst For** | Simple tasks (overhead outweighs the benefit) |
| **Logic** | "Divide and Conquer" |
| **Safety** | Always check for thread-safety before parallelizing |
| **Modern** | `Channels` and `Pipelines` for high-performance data streams |
| **Standard** | `System.Threading.Tasks` namespace |
| **Efficiency**| Scales automatically with the number of CPU cores |
