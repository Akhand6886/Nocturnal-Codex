---
title: "Coroutines Foundations"
description: "Mastering asynchronous and non-blocking programming in Kotlin"
---

## What are Coroutines?

A **Coroutine** is a "lightweight thread." Like Go's goroutines, they allow you to run tasks concurrently without the heavy overhead of OS threads. 

The biggest advantage of Coroutines is that they allow you to write asynchronous code that looks and behaves like **synchronous** code.

## 1. The `suspend` Keyword

The most fundamental concept is the `suspend` function. A suspend function can pause its execution without blocking the underlying thread. It can only be called from another suspend function or a coroutine builder.

```kotlin
suspend fun fetchData(): String {
    delay(1000) // Non-blocking delay
    return "Data from server"
}
```

## 2. Coroutine Builders

To start a coroutine, you use builders like `launch` or `async`.

- `launch`: "Fire and forget." Returns a `Job`. Use it for tasks that don't return a result.
- `async`: Returns a `Deferred` (like a Promise). Use it when you need a return value.

```kotlin
fun main() = runBlocking { // Bridge between sync and async
    val job = launch {
        println("Working in background...")
    }
    
    val result = async {
        fetchData()
    }
    
    println("Result: ${result.await()}")
}
```

## 3. Dispatchers: Choosing the Thread

Dispatchers tell the coroutine which thread to run on.

- `Dispatchers.Main`: UI operations (Android).
- `Dispatchers.IO`: Optimized for disk or network I/O.
- `Dispatchers.Default`: CPU-intensive tasks (sorting, math).

```kotlin
withContext(Dispatchers.IO) {
    // Perform database query here
}
```

## 4. Structured Concurrency

Kotlin enforces **Structured Concurrency**, meaning new coroutines can only be launched in a specific `CoroutineScope`. This ensures that when a scope is cancelled, all its children are cancelled too, preventing memory leaks.

## Summary Checklist
- [x] Coroutines are lightweight and non-blocking.
- [x] Use `suspend` for functions that perform long-running tasks.
- [x] Use `launch` for side-effects and `async` for results.
- [x] Use `await()` to get the result from `async`.
- [x] Choose the right `Dispatcher` (IO, Main, Default).
- [x] Structured concurrency prevents orphaned tasks.
---
