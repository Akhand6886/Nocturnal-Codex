---
title: "Asyncio & Event Loop"
description: "Mastering single-threaded concurrency in Python"
---

## What is Asyncio?

**Asyncio** is a library used to write concurrent code using the `async`/`await` syntax. Unlike multi-threading, which uses multiple OS threads, asyncio runs everything on a **single thread** using an **Event Loop**.

It is perfect for **I/O-bound** tasks (network requests, database queries, file reading) where the CPU spends most of its time waiting for a response.

## The Event Loop

The **Event Loop** is the heart of every asyncio application. It manages and distributes execution of different tasks. It keeps track of all running tasks and when one task is waiting for I/O, the loop pauses it and runs another task.

### The `async` and `await` keywords

- `async def`: Defines a **coroutine**. Calling this function doesn't run it immediately; it returns a coroutine object.
- `await`: Pauses the execution of the current coroutine until the awaited task is complete, yielding control back to the event loop.

```python
import asyncio

async def fetch_data():
    print("Fetching data...")
    await asyncio.sleep(2) # Non-blocking wait
    print("Data received!")
    return {"data": 123}

async def main():
    # Run fetch_data in the background
    task = asyncio.create_task(fetch_data())
    
    print("Doing other work...")
    await asyncio.sleep(1)
    
    result = await task
    print(f"Result: {result}")

asyncio.run(main())
```

## Running Tasks in Parallel

To run multiple tasks simultaneously and wait for all of them to finish, use `asyncio.gather()`.

```python
async def main():
    # Runs all 3 concurrently!
    results = await asyncio.gather(
        fetch_data(),
        fetch_data(),
        fetch_data()
    )
    print(results)
```

## Key Rules of Asyncio

1.  **Don't block the loop**: Never use blocking calls like `time.sleep()` or `requests.get()` inside an `async def` function. Use `asyncio.sleep()` or `httpx.get()` instead.
2.  **Await everything**: If you call an `async` function without `await`, it will not run!
3.  **CPU-bound tasks**: Asyncio is **not** for heavy math or image processing. Use `multiprocessing` for those.

## Summary Checklist
- [x] Asyncio uses an **Event Loop** on a single thread.
- [x] Perfect for I/O-bound tasks.
- [x] Use `async def` for coroutines and `await` for yielding.
- [x] Use `asyncio.gather()` for parallel execution.
- [x] Avoid blocking code at all costs inside the loop.
- [x] High performance for web servers and scrapers.
