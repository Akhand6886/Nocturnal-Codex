---
title: "Smart Pointers"
description: "Box<T>, Rc<T>, RefCell<T>, Cow<T>, and interior mutability"
---

## What are Smart Pointers?

In **Rust**, a pointer is a general concept for a variable that contains an address in memory. The most common pointers are **References** (`&T`). 

**Smart Pointers**, on the other hand, are data structures that not only act like a pointer but also have additional metadata and capabilities. They usually own the data they point to (references only borrow it).

## 1. `Box<T>`: Heap Allocation

`Box<T>` is the simplest smart pointer. It allows you to store data on the **heap** rather than the stack. 

```rust
let b = Box::new(5);
println!("b = {}", b);
```

### When to use `Box<T>`:
- When you have a type whose size can’t be known at compile time (like a **recursive type**).
- When you have a large amount of data and you want to transfer ownership without copying it.

## 2. `Rc<T>`: Reference Counting

`Rc<T>` stands for **Reference Counted**. It’s used when you want to have **multiple owners** of the same data. It keeps track of the number of references; when the count hits zero, the data is cleaned up.

```rust
use std::rc::Rc;

let a = Rc::new(String::from("hello"));
let b = Rc::clone(&a); // Increments the count
println!("Count: {}", Rc::strong_count(&a)); // 2
```

> [!WARNING]
> `Rc<T>` is for **single-threaded** use only. If you need shared ownership across threads, use **`Arc<T>`** (Atomic Reference Counted).

## 3. Interior Mutability (`RefCell<T>`)

**Interior Mutability** is a design pattern that allows you to mutate data even when you have an immutable reference to that data.

-   **`Cell<T>`**: For types that implement `Copy`. No borrowing rules at runtime.
-   **`RefCell<T>`**: For non-Copy types. It enforces borrowing rules at **runtime** instead of compile time.

```rust
use std::cell::RefCell;

let x = RefCell::new(5);
{
    let mut y = x.borrow_mut(); // Runtime check!
    *y += 1;
}
```

> [!CAUTION]
> If you break the borrowing rules with `RefCell` (e.g., two mutable borrows at once), your program will **panic** at runtime!

## 4. `Cow<T>`: Copy-on-Write

`Cow` (Copy-on-Write) is an enum that allows you to work with data that might be either borrowed or owned. It’s useful for optimizing performance by avoiding unnecessary clones.

## Summary

| Pointer | Thread-Safe | Mutation | Best Use Case... |
| :--- | :--- | :--- | :--- |
| **Box<T>** | Yes | Yes (if mut) | Heap allocation, recursive types |
| **Rc<T>** | No | No | Shared ownership (single thread) |
| **Arc<T>** | Yes | No | Shared ownership (multi-thread) |
| **RefCell<T>**| No | **Yes** | Interior mutability (single thread) |
| **Mutex<T>** | Yes | **Yes** | Interior mutability (multi-thread) |
| **Deref** | Trait | Allows smart pointers to behave like references |
| **Drop** | Trait | Customizes what happens when a pointer goes out of scope |
| **Safety** | High | Prevents memory leaks and invalid access |
| **Modern** | Smart pointers are the backbone of complex Rust apps |
| **Fat Ptr** | Structure | Pointer + metadata (like ref count or capacity) |
