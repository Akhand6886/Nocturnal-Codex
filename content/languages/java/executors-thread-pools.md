---
title: "Executors & Thread Pools"
description: "Managing threads efficiently with ExecutorService and Callable"
---

## What is an ExecutorService?

In **Java**, creating a **Thread** is expensive for your computer's memory (~1MB per thread). If you create 1,000 threads for 1,000 tasks, your application will crash! 

The **ExecutorService** (introduced in **JAVA 5**) provides a **Thread Pool**—a collection of "worker threads" that are kept alive and reused for different tasks. This is much faster and safer than creating threads manually.

```java
import java.util.concurrent.*;

// Create 4 worker threads!
ExecutorService pool = Executors.newFixedThreadPool(4);

// Submit a task!
pool.submit(() -> {
    System.out.println("Task running via pool!");
});

pool.shutdown(); // Close when done!
```

## Comparisons: Runnable vs. Callable

Wait! What if you want your background task to **return a value**? A normal `Runnable` cannot send data back. Use a **`Callable`** instead.

| Interface | Returns... | Throws... | Use Case |
| :--- | :--- | :--- | :--- |
| **Runnable** | void | No Exceptions | Fire-and-forget. |
| **Callable<V>**| V (any type) | Exceptions | Task with a result. |

## Handling Results: The `Future<V>`

When you submit a `Callable` to a pool, it returns a **`Future`** object—a "I'll give it to you soon" promise. You can check if the task is finished and get the result later.

```java
// Logic to calculate a total later!
Callable<Integer> task = () -> 2 + 2;

Future<Integer> res = pool.submit(task);
// ... do other work ...
int total = res.get(); // BLOCKS until the result is ready!
```

## Most Common Thread Pool Types

| Pool Type | Behavior | Best Use Case... |
| :--- | :--- | :--- |
| **Fixed** | Fixed number of threads. | Reliable, stable load. |
| **Cached** | Creates threads as needed. | High number of short tasks. |
| **Scheduled** | Runs periodic tasks. | Timed intervals (e.g., a clock). |
| **Single** | Exactly ONE background thread. | Sequential execution. |

## Summary

| Term | Description |
| :--- | :--- |
| **Executor** | Higher-level API for running tasks |
| **Pool** | A collection of pre-made background threads |
| **Tasks** | Runnable or Callable objects |
| **Future** | A placeholder for a result that isn't ready yet |
| **shutdown()** | Gently stop the pool; let current tasks finish |
| **invokeAll()** | Run many tasks and wait for them all! |
| **Best For** | Servers, heavy processing, safe multi-tasking |
| **Efficiency** | Avoid the cost of re-creating threads |
| **Control** | Limit how much memory your app can use! |
| **Modern** | Virtual Threads (Java 21+) use a unique executor! |
| **Queue** | Tasks wait in a queue if all threads are busy |
| **Reject** | If the queue is full, the task is "rejected"! |
| **Time Out** | `res.get(5, SECONDS)` (Stop waiting if it takes too long!) |
| **Completab** | `CompletableFuture` (The ultimate way to link async work!) |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Managed** | JVM handles all thread scheduling for you |
| **Context** | Fewer threads = less overhead for the CPU |
| **Resource** | A pool of 10 threads is a fixed memory cost |
| **Hierarchy**| `ExService` -> `ScheduledExService` |
| **Lifecycle** | Submit -> Execute -> Shutdown -> Finish |
