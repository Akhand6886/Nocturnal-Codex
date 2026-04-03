---
title: "Coroutines (C++20)"
description: "Suspension, co_yield, co_await, and co_return"
---

## What are C++ Coroutines?

Introduced in **C++20**, **Coroutines** are a massive update to the **C++** language. They are special functions that can **suspend** their execution at a certain point and **resume** it later, while still remembering all their local variables and state.

Unlike normal functions (which either run to completion or throw an error), a coroutine is "stateful." This makes it the perfect tool for **Asynchronous Programming** and **Generator Functions**.

```cpp
#include <coroutine>

// A coroutine returns a special 'handle' or object!
Generator<int> count() {
    int val = 0;
    while (true) {
        co_yield val++; // SUSPEND: Return val and stop!
    }
}
```

## Comparisons: Normal Functions vs. Coroutines

| Feature | Function | Coroutine |
| :--- | :--- | :--- |
| **Logic** | Runs to the end (or `return`) | Can pause (`co_yield`) and restart. |
| **State** | Lost when it returns | Kept in a special "Coroutine Frame" on the heap. |
| **Stack** | Uses the system Stack | Stackless (Managed by the Coroutine Frame). |

## The Three New Keywords

Coroutines use three unique keywords to control their flow:

1.  **`co_yield`**: Returns a value to the caller and **pauses** the coroutine.
2.  **`co_await`**: Pauses the coroutine until an asynchronous task (like a file read or network request) is finished.
3.  **`co_return`**: Returns a final result and **ends** the coroutine.

## Why Use Coroutines?

1.  **Infinite Generators**: Produce values one-by-one without storing them all in memory (like a never-ending list of numbers).
2.  **Modern Async**: Write asynchronous code (like fetching data) that looks exactly like normal, synchronous code. No more "callback hell"!
3.  **Performance**: Much more efficient than building a massive system of threads.

## Summary

| Feature | Key / Syntax | Purpose |
| :--- | :--- | :--- |
| **Pause & Return**| `co_yield x` | A "Generator" step |
| **Wait** | `co_await f()` | Asynchronous "Wait" |
| **End** | `co_return res` | Final result |
| **Best For** | Generators, Async APIs, Event loops |
| **Modern** | C++20 required! |
| **Memory** | O(1) space (Doesn't store the whole result!) |
| **Frame** | The hidden object that stores the coroutine's state |
| **Promise** | The internal object that manages the coroutine's logic |
| **Handle** | The object you use to resume the coroutine from outside |
| **Library** | Coroutines are "Low-level" — usually you'll use a library! |
| **Efficiency** | Avoids the overhead of creating and joining threads |
| **Recursion** | Coroutines can even call themselves! |
| **Suspend** | The coroutine stops EXACTLY at the current line |
| **Resume** | The coroutine starts EXACTLY where it left off |
| **Awaiter** | The underlying object that `co_await` interacts with |
| **Standard** | C++23 added `std::generator` (Official generator support!) |
| **System** | Perfect for high-performance network servers |
| **Future** | Replacing older callback-based architectures |
| **Check** | Verify support in your compiler (Clang/GCC/MSVC) |
| **Complex** | Hard to write from scratch; easy to use via libraries! |
