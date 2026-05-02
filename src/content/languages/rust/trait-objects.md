---
title: "Trait Objects"
description: "Dynamic dispatch with dyn Trait, object safety"
---

## Static vs. Dynamic Dispatch

When you use **Trait Bounds** (e.g., `fn f<T: Summary>(x: T)`), Rust uses **Static Dispatch**. The compiler generates a specific version of the function for every type you use. This is very fast.

However, sometimes you need to store different types together in a collection. This requires **Dynamic Dispatch** using **Trait Objects**.

## Defining Trait Objects

A trait object is created by using a reference (`&`) or a smart pointer (`Box<T>`) followed by the **`dyn`** keyword.

```rust
pub struct Screen {
    // A list of items that can all be drawn!
    pub components: Vec<Box<dyn Draw>>,
}
```

Wait! Unlike generics, a `Vec<Box<dyn Draw>>` can contain a `Button`, a `TextField`, and a `Slider` all at the same time, as long as they all implement the `Draw` trait.

## Object Safety

You can only create trait objects from traits that are **"Object Safe."** A trait is object-safe if:
1.  It doesn't require `Self: Sized` (i.e., it can handle types of unknown size).
2.  All its methods are object-safe (they don't use generic parameters or the `Self` type in certain ways).

## Performance Trade-off

Trait objects involve a small performance cost because the compiler can't know the exact type at compile time. It has to look up the correct method to call at **runtime** using a **vtable** (virtual method table).

> [!NOTE]
> Use generics for performance and code reuse within a single type. Use trait objects for flexibility when you need to handle multiple different types in the same way.

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **dyn Trait** | `dyn Draw` | A type that implements a trait |
| **Box<dyn T>**| Smart Pointer | Most common way to use trait objects |
| **Dispatch** | Dynamic | Method look-up happens at runtime |
| **vtable** | Virtual Table | The lookup table used for dynamic dispatch |
| **Object Safe**| Requirement | Not all traits can be trait objects |
| **Flexibility**| High | Store mixed types in one collection |
| **Speed** | Lower | Slower than static dispatch (vtable overhead) |
| **Best For** | Plugins, UI components, heterogeneous lists |
| **Sized** | Trait objects are unsized! (Must be behind a pointer) |
| **Constraint**| Trait objects cannot use generic methods |
| **Pointer** | Every trait object takes up two pointers (data + vtable) |
| **Logic** | "What it can do" matters more than "What it is" |
| **Choice** | Default to generics; switch to `dyn` when necessary |
