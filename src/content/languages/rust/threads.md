---
title: "Threads"
description: "std::thread, join handles, and thread::spawn"
---

## Fearless Concurrency

One of Rust’s main goals is "Fearless Concurrency." This means that the type system and the **Borrow Checker** prevent most common concurrency bugs (like data races) at compile time.

## Spawning Threads

You create a new thread in Rust using the **`thread::spawn`** function and passing it a closure containing the code you want to run.

```rust
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```

Wait! If the main thread finishes, the spawned thread will be shut down immediately, even if it's not done. To wait for a thread to finish, you use a **`JoinHandle`**.

## Using Join Handles

`thread::spawn` returns a `JoinHandle`. Calling `.join()` on it will block the current thread until the spawned thread has completed its work.

```rust
let handle = thread::spawn(|| {
    // ... work ...
});

handle.join().unwrap(); // Wait here!
```

## Moving Data into Threads

Because a spawned thread might live longer than the main thread, it cannot "borrow" local variables from the main thread. You must use the **`move`** keyword to transfer ownership of the data into the thread.

```rust
let v = vec![1, 2, 3];

let handle = thread::spawn(move || {
    println!("Here's a vector: {:?}", v);
});
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **spawn** | `thread::spawn(|| ...)` | Creating a new OS thread |
| **join** | `handle.join()` | Wait for a thread to finish |
| **move** | `move || ...` | Moving ownership into the thread |
| **sleep** | `thread::sleep(d)` | Pausing the current thread |
| **Safety** | Compile-time | Prevents data races via ownership rules |
| **Handle** | `JoinHandle<T>` | Object returned by spawn |
| **Best For** | Parallel processing, long-running tasks |
| **Panics** | Propagation | If a thread panics, `join()` returns an `Err` |
| **Memory** | Stack size | Default is usually 2MB per thread |
| **Efficiency**| OS Threads | Rust uses 1:1 threads (one OS thread per Rust thread) |
| **Logic** | Threads have no built-in way to share data (use Channels!) |
| **Constraint**| Data moved into a thread must be `'static` or owned |
| **Identity** | `thread::current().id()` (Getting the thread ID) |
