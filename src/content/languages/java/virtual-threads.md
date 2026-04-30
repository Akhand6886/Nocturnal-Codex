---
title: "Virtual Threads (JAVA 21+)"
description: "High-scale concurrency with lightweight, JVM-managed threads"
---

## What are Virtual Threads?

Introduced as a standard feature in **JAVA 21**, **Virtual Threads** are the biggest change to Java's concurrency model in over 25 years. 

Prior to this, every Java `Thread` was a "Platform Thread"—a heavy wrapper around an actual thread from the Operating System. **Virtual Threads** are different. They are **lightweight** threads managed entirely by the **JVM**, which makes them incredibly fast and memory-efficient.

```java
// Create MILLIONS of threads! (Zero cost!)
Thread t = Thread.ofVirtual().start(() -> {
    System.out.println("Hello from a Virtual Thread!");
});
```

## Comparisons: Platform vs. Virtual Threads

Wait! Why are Virtual Threads better?

| Feature | Platform Thread | Virtual Thread |
| :--- | :--- | :--- |
| **Cost** | ~1MB memory per thread. | **~1KB memory.** |
| **Limit** | A few thousands (Crash beyond that!). | **VIRTUAL MILLIONS.** |
| **Creation** | Slow (Handled by the OS). | **FAST (Handled by the JVM).** |
| **Stack** | Fixed size on the OS. | **Dynamic size on the Heap.** |

## How it Works: "Mounting"

When a **Virtual Thread** is ready to run, the JVM "mounts" it onto a normal **Platform Thread** (called a Carrier Thread). If the Virtual Thread hits a blocking task (like a file read or network request), the JVM "unmounts" it! 

The Carrier Thread is now free to run a DIFFERENT Virtual Thread. This is how Java can handle millions of tasks with only a few dozen real CPU threads.

## Why Use Virtual Threads?

1.  **Massive Scale**: Perfect for web servers handling 100,000+ simultaneous requests (like a chat app or microservice).
2.  **Simple Code**: No more complex, "non-blocking" async code! You can write simple, synchronous-looking code that is actually highly scalable.
3.  **Efficiency**: Zero cost for switching between tasks.

## Summary

| Term | Description |
| :--- | :--- |
| **Virtual** | Lightweight, JVM-managed thread (~1KB) |
| **Carrier** | The real Platform/OS thread that RUNS the virtual one |
| **Blocking** | When a thread waits for data; virtual threads simply "unmount" |
| **Mount** | Attaching a virtual task to a real CPU thread |
| **Best For** | High-concurrency servers, microservices, huge background jobs |
| **Java 21** | The first standard version with Virtual Threads! |
| **Project L.** | "Project Loom" is the original name of this feature |
| **Safe** | Perfectly compatible with all existing `synchronized` code! |
| **Executor** | `newVirtualThreadPerTaskExecutor()` (The ultimate pool!) |
| **Simple** | Write normal code; get async performance! |
| **Stack** | Virtual stacks live in the Java "Heap" memory |
| **Creation** | `Thread.ofVirtual().start(Runnable)` |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Limit** | Only limited by your available RAM! |
| **Strategy** | Stop using complex "Reactive/Async" libraries; use Virtual! |
| **Safety** | No risk of "Thread Starvation" in high-load situations |
| **Managed** | The JVM automatically handles all mounting logic |
| **Carrier** | A small pool of Platform threads handles all virtual work |
| **Context** | Switching virtual threads is 100x faster than OS threads |
| **Scale** | One server can now handle what five servers used to! |
| **Modern** | The future of all high-performance Java development |
| **Choice** | Continue using Platform threads for heavy CPU-bound math |
| **Refactor** | Replacing standard pools with Virtual Thread executors |
| **Future** | Frameworks like Spring Boot are now built on Virtual Threads! |
