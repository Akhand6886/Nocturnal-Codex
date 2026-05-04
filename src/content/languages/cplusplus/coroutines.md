---
title: "Coroutines (C++20)"
description: "Mastering high-performance cooperative multitasking and lazy generators"
---

## What are Coroutines?

A **Coroutine** is a function that can suspend its execution and be resumed later. Unlike regular functions (which run until they return or throw), coroutines can "pause" their state, return control to the caller, and pick up exactly where they left off.

In C++, coroutines are **stackless**, meaning they don't have their own call stack, making them extremely lightweight.

## 1. The Three New Keywords

- `co_yield`: Suspends execution and returns a value to the caller (used for Generators).
- `co_await`: Suspends execution until an asynchronous task is complete.
- `co_return`: Finishes the coroutine and returns a final result.

## 2. Example: A Simple Generator

Generators allow you to produce values lazily. You can define an infinite sequence without using infinite memory.

```cpp
#include <coroutine>
#include <iostream>

// This is a simplified "Return Type" boiler plate required for coroutines
struct Generator {
    struct promise_type {
        int current_value;
        Generator get_return_object() { return Generator{handle_type::from_promise(*this)}; }
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        std::suspend_always yield_value(int value) {
            current_value = value;
            return {};
        }
        void unhandled_exception() { std::terminate(); }
        void return_void() {}
    };

    using handle_type = std::coroutine_handle<promise_type>;
    handle_type handle;

    bool next() { handle.resume(); return !handle.done(); }
    int value() { return handle.promise().current_value; }
};

Generator counter(int start, int end) {
    for (int i = start; i <= end; ++i) {
        co_yield i; // Pauses here and returns 'i'
    }
}
```

## 3. Asynchronous Tasks

Coroutines are the foundation for high-performance networking and I/O. Instead of using callbacks or threads, you can "await" a result.

```cpp
Task fetchData() {
    auto data = co_await network.get("https://api.example.com");
    process(data);
    co_return;
}
```

## 4. Why use Coroutines?

1.  **Efficiency**: Millions of coroutines can run on a single thread.
2.  **Readability**: Asynchronous code looks like clean, sequential synchronous code.
3.  **State Management**: The compiler handles saving and restoring local variables for you.
4.  **No Overhead**: No context switching between OS threads.

## Summary Checklist
- [x] Coroutines are functions that can pause (`co_yield` / `co_await`).
- [x] They are stackless and extremely memory-efficient.
- [x] Perfect for **Generators** (lazy sequences) and **Async I/O**.
- [x] The compiler generates the state-saving code for you.
- [x] Use `co_return` to finish the execution.
---
