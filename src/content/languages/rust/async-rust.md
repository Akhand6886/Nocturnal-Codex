---
title: "Async Rust"
description: "async/await, Future trait, tokio, and async runtimes"
---

## What is Async Rust?

Wait! **Asynchronous** programming is different from **Threading**. 
-   **Threads**: The OS manages many tasks by switching between them. (High overhead, 1:1).
-   **Async**: The program manages many tasks on a few threads. (Low overhead, M:N).

Async is perfect for **I/O-bound** tasks like web servers or database queries where you spend a lot of time waiting for the network.

## `async` and `await`

You define an asynchronous function using the **`async`** keyword. When you call an async function, it doesn't run immediately—it returns a **`Future`**. You must **`.await`** the future to get the actual result.

```rust
async fn fetch_data() -> String {
    // ... logic ...
    String::from("Data received!")
}

#[tokio::main]
async fn main() {
    let result = fetch_data().await; // Wait for the task to finish
    println!("{}", result);
}
```

## The Future Trait

A **`Future`** is a value that might not be ready yet. It has a `poll` method that the "Runtime" calls to see if the value is ready.

## Async Runtimes (Tokio)

Wait! The Rust standard library does **not** include an async runtime. You must choose a crate to run your async code. **[Tokio](https://tokio.rs)** is the most popular and powerful runtime in the ecosystem.

```toml
# Cargo.toml
[dependencies]
tokio = { version = "1", features = ["full"] }
```

## Parallel vs. Concurrent

-   **Parallel**: Running multiple tasks at the EXACT same time (requires multiple CPU cores).
-   **Concurrent**: Handling multiple tasks by switching between them (can happen on a single core).

Async Rust is primarily about **Concurrency**—handling thousands of tasks efficiently on a small number of threads.

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **async** | `async fn f()` | Marks a function as a Future |
| **await** | `f().await` | Suspends execution until the future is ready |
| **Future** | Trait | The core object representing a pending task |
| **Runtime** | Tokio / async-std | The "engine" that executes async tasks |
| **Non-blocking**| Design | Code that doesn't stop the thread while waiting |
| **I/O Bound** | Use Case | Web servers, databases, network requests |
| **Join** | `tokio::join!` | Running multiple futures at once |
| **Select** | `tokio::select!`| Waiting for the FIRST future to finish |
| **Spawn** | `tokio::spawn` | Offloading a task to the background |
| **Pin** | `Pin<P>` | Ensuring a future doesn't move in memory |
| **Waker** | `Waker` | Tells the runtime a future is ready to be polled again |
| **Zero-Cost** | Abstraction | Async in Rust is as fast as hand-written code |
| **Refactor** | Convert `thread::spawn` to `tokio::spawn` for massive scale |
