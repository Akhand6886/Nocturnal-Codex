---
title: "Coroutines"
description: "Master asynchronous programming in Kotlin with suspending functions, jobs, and scopes."
category: "Intermediate"
order: 10
---

## The Coroutine Paradigm

Coroutines are "lightweight threads." They allow you to write asynchronous code in a sequential style, avoiding "callback hell" and complex reactive chains.

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Suspending Function** | A function that can pause execution without blocking the thread. |
| **CoroutineScope** | Defines the lifecycle of the coroutine. |
| **Job** | A handle to a coroutine that allows you to control its lifecycle. |
| **Dispatcher** | Determines which thread or thread pool the coroutine runs on. |

### Basic Usage

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking { // Blocks the main thread
    launch { // Launch a new coroutine in the scope of runBlocking
        delay(1000L) // Non-blocking delay for 1 second
        println("World!")
    }
    println("Hello,")
}
```

### Structured Concurrency

Kotlin enforces structured concurrency, meaning new coroutines can only be launched in a specific `CoroutineScope` which delimits the lifetime of the coroutine.

```kotlin
suspend fun doWork() = coroutineScope {
    launch { 
        // Child coroutine 1
    }
    launch {
        // Child coroutine 2
    }
    // scope waits for all children to complete
}
```

### Dispatchers

- `Dispatchers.Main`: UI operations (Android/JavaFX).
- `Dispatchers.IO`: Network/Disk operations.
- `Dispatchers.Default`: CPU-intensive tasks.

### Summary Table

| Feature | Thread | Coroutine |
|---------|--------|-----------|
| **Memory** | Expensive (MBs) | Cheap (Bytes) |
| **Switching** | OS Context Switch | Managed by runtime |
| **Blocking** | Yes | No (Suspending) |
