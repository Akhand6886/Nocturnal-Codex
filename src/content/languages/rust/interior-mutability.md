---
title: "Interior Mutability"
description: "Mutating data even when you only have an immutable reference"
---

## The Problem: The Borrow Checker's Strictness

Rust's borrow checker is famous for its strictness: you cannot have a mutable reference (`&mut T`) if an immutable reference (`&T`) already exists. This prevents data races but can sometimes be too restrictive for certain design patterns, like the **Observer Pattern** or **Mocking**.

## The Solution: Interior Mutability

**Interior Mutability** is a design pattern in Rust that allows you to mutate data even when there are immutable references to that data. To do this, the pattern uses `unsafe` code inside a data structure to bend the usual rules of mutation and borrowing. 

The most common types that provide interior mutability are `Cell<T>` and `RefCell<T>`.

### 1. `Cell<T>`
`Cell<T>` is for types that implement the `Copy` trait. It works by copying values in and out of the cell. It does NOT give you a reference to the internal value, which makes it safe and fast.

```rust
use std::cell::Cell;

struct Counter {
    count: Cell<u32>,
}

let c = Counter { count: Cell::new(0) };

// Note: 'c' is NOT declared as 'mut'!
c.count.set(c.count.get() + 1); 
println!("Count: {}", c.count.get());
```

### 2. `RefCell<T>`
`RefCell<T>` is for types that do not implement `Copy`. It moves the borrow checking from **compile-time** to **runtime**. 

- `borrow()`: Returns an immutable reference.
- `borrow_mut()`: Returns a mutable reference.

```rust
use std::cell::RefCell;

let x = RefCell::new(vec![1, 2, 3]);

{
    let mut mut_ref = x.borrow_mut();
    mut_ref.push(4);
} // mutable reference is dropped here

println!("Value: {:?}", x.borrow());
```

**CAUTION**: If you violate the borrowing rules at runtime (e.g., calling `borrow_mut()` while a `borrow()` is still active), your program will **panic**.

## Comparison Table

| Feature | `Cell<T>` | `RefCell<T>` |
| :--- | :--- | :--- |
| **Mutation Style** | Copying values | Borrowing references |
| **Check Time** | Compile-time | Runtime (Panic if wrong) |
| **Overhead** | Zero | Small (Reference counting) |
| **Best For** | Small `Copy` types | Complex data structures |

## Summary Checklist
- [x] Interior mutability allows mutation through `&T`.
- [x] Use `Cell` for simple, copyable values.
- [x] Use `RefCell` for complex types needing runtime borrow checks.
- [x] **Warning**: Interior mutability is NOT thread-safe. For multi-threaded mutation, use `Mutex` or `RwLock`.
- [x] Only use this pattern when the standard borrow checker prevents a valid architectural design.
