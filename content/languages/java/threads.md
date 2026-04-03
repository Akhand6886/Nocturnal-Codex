---
title: "Threads"
description: "Parallel execution with Runnable, Thread, and join()"
---

## What are Java Threads?

In **Java**, a **thread** is a "sub-process" or "lightweight process" that runs in the background. It allows your program to perform multiple tasks at the same time (Concurrent Execution). Every Java program has at least one thread: the **Main Thread**.

```java
public class MyThread extends Thread {
    public void run() {
        System.out.println("Running in the background!");
    }
}

MyThread t = new MyThread();
t.start(); // Start the background thread!
```

## Comparisons: Two ways to Create Threads

Wait! Should you extend the `Thread` class or use the `Runnable` interface?

| Method | Behavior | Best Use Case... |
| :--- | :--- | :--- |
| **Thread** | Extend `java.lang.Thread`. | Quick, simple tasks. |
| **Runnable** | Implement `java.lang.Runnable`. | **Recommended!** (Better for long-term design). |

```java
// Recommended Way: Uses a Lambda!
Thread t = new Thread(() -> {
    System.out.println("Hello from Runnable!");
});
t.start();
```

## Managing Thread Execution

-   **`start()`**: Kicks off the background thread (Does NOT call `run()` directly!).
-   **`sleep(ms)`**: Pauses the current thread for a specific amount of time.
-   **`join()`**: Pauses the calling thread (usually Main) until the background thread finishes its work.

```java
Thread t = new Thread(() -> doWork());
t.start();
t.join(); // WAIT for 't' to finish before continuing!
```

## Why use Threads?

1.  **Responsiveness**: Keep your UI responsive while a background task (like a file download) is running.
2.  **Performance**: Use all the cores in your modern multi-core CPU.
3.  **Scalability**: Handle many simultaneous requests (like in a web server).

## Summary

| Term | Description |
| :--- | :--- |
| **Thread** | A single execution "path" |
| **Main** | The first thread that runs the `main()` method |
| **Runnable** | The task that should be run by the thread |
| **start()** | Initiate the thread's execution |
| **join()** | Wait for a thread to die |
| **sleep()** | Temporarily pause a thread |
| **Best For** | Multi-tasking, background processing, CPU intensive apps |
| **Safety** | Threads must be carefully managed (See Synchronization!) |
| **Modern** | Use "Virtual Threads" (Java 21+) for massive scalability |
| **Lambda** | Threads are perfect with `x -> ...` logic! |
| **Priority** | `t.setPriority(10)` (Ask the OS to run it faster!) |
| **Daemon** | `t.setDaemon(true)` (A thread that won't stop the app from exiting) |
| **Interrupted**| Check if thread was told to stop with `.isInterrupted()` |
| **Exception** | `InterruptedException` must be caught during sleep/join |
| **Lifecycle** | NEW -> RUNNABLE -> BLOCKED -> WAITING -> TERMINATED |
| **Native** | Threads are "Mapped" to actual Operating System threads |
| **Platform** | Behavior might slightly differ between OSs |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Resource** | Each thread uses memory for its own stack (usually ~1MB) |
| **Context** | Switching between 1000s of threads can slow down the CPU |
| **Worker** | A generic "Worker" thread that handles background data |
| **UI Thread** | Never perform long-running tasks in the main/UI thread! |
| **Safety** | Global variables are SHARED between all threads! |
| **Deadlock** | When two threads wait for each other FOREVER (AVOID!) |
| **Scheduler** | The JVM part that decides which thread runs next |
