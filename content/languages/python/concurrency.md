---
title: "Concurrency"
description: "threading, multiprocessing, asyncio, and the GIL"
---

## What is Concurrency in Python?

**Concurrency** is the art of handling multiple tasks at the same time. The best approach for concurrency depends on your task's workload: Is it **CPU-bound** (e.g., heavy math, image compression) or **I/O-bound** (e.g., waiting for API responses, file downloads)?

```python
# Task Types:
# CPU-bound:  10! / (5! * 5!)
# I/O-bound:  requests.get("https://google.com")
```

## The GIL: Global Interpreter Lock

In **CPython** (the standard Python), the **GIL** is a lock that only allows one thread to execute Python bytecode at a time. This means that **threads won't speed up CPU-bound tasks** — they'll only help for I/O tasks.

> **Wait!** If you need true parallel CPU processing, use **multiprocessing**.

## 1. Threading (I/O-bound)

Python's `threading` module is perfect for tasks that spend most of their time waiting for external services (like a network response).

```python
import threading
import time

def task(name):
    print(f"Starting {name}...")
    time.sleep(2) # Waiting (Simulating Network/IO)
    print(f"Finished {name}!")

# Create and start 2 threads!
t1 = threading.Thread(target=task, args=("A",))
t2 = threading.Thread(target=task, args=("B",))

t1.start()
t2.start()

# Wait for both to finish!
t1.join()
t2.join()
```

## 2. Multiprocessing (CPU-bound)

The `multiprocessing` module side-steps the GIL by spawning an entirely new instance of the Python interpreter for each task. This is the **only** way to use multiple CPU cores for heavy computation.

```python
from multiprocessing import Process
import os

def cpu_heavy_task(n):
    # This runs in a separate CORE!
    print(f"Calculating {n} on Process: {os.getpid()}")
    return sum(i * i for i in range(n))

if __name__ == "__main__":
    p = Process(target=cpu_heavy_task, args=(10000000,))
    p.start()
    p.join()
```

## 3. AsyncIO (Modern: Single-Threaded Concurrency)

`asyncio` is the modern approach for non-blocking I/O. It uses an **Event Loop** to manage thousands of tasks within a single thread. Instead of spawning new threads, it "yields" control whenever it waits for I/O.

```python
import asyncio

async def fetch_data():
    print("Fetching...")
    await asyncio.sleep(2) # Non-blocking wait!
    print("Done!")
    return {"data": 123}

async def main():
    # Run multiple async tasks concurrently!
    results = await asyncio.gather(fetch_data(), fetch_data())
    print(results)

# Run the event loop!
asyncio.run(main())
```

## Comparisons: Which should I use?

| Framework | Best Workload | Mechanism |
| :--- | :--- | :--- |
| **threading** | I/O (Network, API) | Shared memory; limited by GIL. |
| **multiprocessing**| CPU (Math, Images) | Multiple processes (No GIL issue). |
| **asyncio** | High-scale I/O (Web server) | Single-threaded; cooperative multitasking.|

## Common Concurrency Pitfalls

1.  **Race Conditions**: When two threads try to modify the same variable at the same time. Use `threading.Lock()` to prevent this.
2.  **Deadlocks**: When two threads are waiting for each other to release a lock.
3.  **GIL Confusion**: Trying to use `threading` to speed up a `for i in range(100000000)` loop.

## Summary

| Term | Description |
| :--- | :--- |
| **GIL** | A lock that limits execution to 1 thread at a time |
| **Thread** | Lightweight, shared memory, good for I/O |
| **Process** | Heavier, separate memory, good for CPU-heavy math |
| **AsyncIO**| High-performance I/O within one thread using an event loop |
| **Lock** | Object used to prevent race conditions |
| **Event Loop** | The engine that runs asyncio tasks |
| **Await** | Tell Python to pause this task and work on another while waiting |
| **Pool** | Use `ThreadPoolExecutor` or `ProcessPoolExecutor` for managing tasks |
| **Best For**| Scraping, Web Servers, Data Processing |
| **Race Condition** | Two tasks fighting for the same data |
| **Coroutines**| Functions defined with `async def` |
| **Future** | An object representing a result that isn't ready yet |
| **Blocking**| Code that stops everything else (e.g., `time.sleep()`) |
| **Non-blocking**| Code that allows other tasks to run while waiting |
