---
title: "Shared State"
description: "Mutex<T>, Arc<T>, and atomics"
---

## Sharing Data with Mutexes

Sometimes you **must** share a piece of data between multiple threads. Rust provides the **`Mutex<T>`** (Mutual Exclusion) to allow only one thread to access the data at a time.

```rust
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap(); // Request access
        *num = 6;
    } // Lock is automatically released here!

    println!("m = {:?}", m);
}
```

Wait! You don't have to manually "unlock" a Mutex. Rust uses its **Ownership** system: when the `MutexGuard` (returned by `lock()`) goes out of scope, the lock is automatically released.

## Multi-Threaded Ownership with `Arc`

If you try to move a `Mutex` into multiple threads, the compiler will complain. You need a way for multiple threads to **own** the same Mutex. We use **`Arc<T>`** (Atomic Reference Counter).

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter); // Increment the count
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles { handle.join().unwrap(); }

    println!("Result: {}", *counter.lock().unwrap());
}
```

## Atomic Types

For simple data (like a single integer counter), using a full `Mutex` can be overkill. Rust provides **Atomic Types** in `std::sync::atomic` that are designed for high-performance shared access without locking.

```rust
use std::sync::atomic::{AtomicUsize, Ordering};
let counter = AtomicUsize::new(0);
counter.fetch_add(1, Ordering::SeqCst);
```

## Summary

| Term | Full Name | Description |
| :--- | :--- | :--- |
| **Mutex<T>** | Mutual Exclusion | Only one thread can access data at a time |
| **Arc<T>** | Atomic Ref Count | Allows multiple threads to own data |
| **lock()** | Method | Blocking request for access |
| **Guard** | MutexGuard | Smart pointer that releases lock on `drop` |
| **Atomic** | std::atomic | Lock-free thread-safe primitives |
| **Poison** | Poisoning | What happens to a Mutex if a thread panics while holding the lock |
| **Deadlock** | Design Flaw | When two threads wait for each other's locks |
| **Sync** | Trait | Tells the compiler it's safe to share a type between threads |
| **Send** | Trait | Tells the compiler it's safe to move a type between threads |
| **Interior** | Mutability | Mutex allows changing data even if the Mutex is immutable |
| **Best For** | Caches, shared counters, protected resources |
| **Performance**| Higher overhead than Channels (due to locking) |
