---
title: "Smart Pointers Deep Dive"
description: "Mastering Box, Rc, and Arc for heap allocation and shared ownership"
---

## What are Smart Pointers?

In Rust, references (`&T`) are just pointers to data. **Smart Pointers** are data structures that act like pointers but also have additional metadata and capabilities (like reference counting). 

The most common smart pointers are `Box<T>`, `Rc<T>`, and `Arc<T>`.

## 1. `Box<T>`: Heap Allocation

`Box<T>` is the simplest smart pointer. it allows you to store data on the **heap** rather than the stack. When the box goes out of scope, the heap data is deallocated.

### Use Cases:
- When you have a type whose size can't be known at compile time (recursive types).
- When you want to transfer ownership of a large amount of data without copying it.

```rust
// Recursive type using Box
enum List {
    Cons(i32, Box<List>),
    Nil,
}
```

## 2. `Rc<T>`: Single-Threaded Shared Ownership

`Rc` stands for **Reference Counted**. Use `Rc<T>` when you want multiple parts of your program to "own" the same data. It keeps a count of the number of references to the data; when the count hits zero, the data is cleaned up.

**LIMITATION**: `Rc<T>` is NOT thread-safe.

```rust
use std::rc::Rc;

let shared_data = Rc::new(String::from("Shared"));
let a = Rc::clone(&shared_data);
let b = Rc::clone(&shared_data);

println!("Reference count: {}", Rc::strong_count(&shared_data)); // Output: 3
```

## 3. `Arc<T>`: Atomic Shared Ownership

`Arc` stands for **Atomic Reference Counted**. It is identical to `Rc<T>` but the reference count is updated using atomic operations, making it **thread-safe**.

**COST**: Atomicity has a small performance overhead compared to `Rc`.

```rust
use std::sync::Arc;
use std::thread;

let shared = Arc::new(vec![1, 2, 3]);

for _ in 0..3 {
    let clone = Arc::clone(&shared);
    thread::spawn(move || {
        println!("{:?}", clone);
    });
}
```

## Comparison Summary

| Pointer | Ownership | Thread-Safe | Mutation |
| :--- | :--- | :--- | :--- |
| **`Box<T>`** | Single | Yes | Yes (if mut) |
| **`Rc<T>`** | Multiple | **No** | No (use `RefCell`) |
| **`Arc<T>`** | Multiple | **Yes** | No (use `Mutex`) |

## Summary Checklist
- [x] Use `Box` for heap allocation and recursive types.
- [x] Use `Rc` for shared ownership in a single thread.
- [x] Use `Arc` for shared ownership across multiple threads.
- [x] `Rc` and `Arc` only provide **immutable** access by default.
- [x] Combine `Rc` with `RefCell` or `Arc` with `Mutex` for shared mutability.
