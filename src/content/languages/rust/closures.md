---
title: "Closures"
description: "Fn, FnMut, FnOnce, capturing variables, and move closures"
---

## What is a Closure?

**Closures** are anonymous functions you can save in a variable or pass as arguments to other functions. Unlike normal functions, closures can **capture** values from the scope in which they are defined.

```rust
let add_one = |x: i32| x + 1;
let result = add_one(5);
```

The syntax uses vertical pipes **`| |`** for parameters and optional curly braces for the body.

## Capturing Variables

Wait! Closures can capture variables from their environment in three ways, which map to the three `Fn` traits:

1.  **Borrowing Immutablely**: The closure uses a reference to the variable. (Trait: **`Fn`**)
2.  **Borrowing Mutablely**: The closure modifies the variable. (Trait: **`FnMut`**)
3.  **Taking Ownership**: The closure takes full control of the variable. (Trait: **`FnOnce`**)

```rust
let list = vec![1, 2, 3];
let only_borrows = || println!("From closure: {:?}", list); // Captures by reference
```

## The `move` Keyword

If you want to force a closure to take **ownership** of the values it uses (e.g., when passing a closure to a new thread), use the **`move`** keyword.

```rust
use std::thread;

let list = vec![1, 2, 3];

thread::spawn(move || {
    println!("From thread: {:?}", list);
}).join().unwrap();
```

## Closures in Iterators

Closures are most commonly used with iterators to perform operations on collections.

```rust
let v = vec![1, 2, 3];
let v2: Vec<i32> = v.iter().map(|x| x + 1).collect();
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **Closure** | `|x| x + 1` | Anonymous function |
| **Capture** | Automatic | Using variables from the outer scope |
| **move** | `move || ...` | Force taking ownership of captures |
| **Fn** | Trait | Can be called multiple times, only borrows |
| **FnMut** | Trait | Can be called multiple times, mutates captures |
| **FnOnce** | Trait | Can be called exactly once, takes ownership |
| **Inference** | Type-safe | Compiler usually infers parameter types |
| **Lazy** | Deferred | Code only runs when the closure is CALLED |
| **Best For** | Iterators, thread spawning, callbacks |
| **Memory** | Captured variables are stored in the closure's environment |
| **Sized** | Closures have unique, unnameable types |
| **Polymorph** | Use `impl Fn` or `Box<dyn Fn>` for function parameters |
| **Efficiency**| Small closures are often inlined by the compiler |
| **Identity** | Each closure has its own unique internal type |
