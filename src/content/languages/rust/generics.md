---
title: "Generics"
description: "Generic functions, structs, enums, and monomorphization"
---

## What are Generics?

**Generics** are placeholders for types. They allow you to write code that can work with many different types without duplicating logic.

## Generic Functions

To define a generic function, we place the type parameter inside angle brackets `< >` after the function name.

```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

Wait! What is `PartialOrd`? That's a **Trait Bound**. It tells Rust: "You can use any type `T`, as long as that type can be compared!"

## Generic Structs and Enums

You can also use generics in your custom data types.

```rust
struct Point<T> {
    x: T,
    y: T,
}

enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

## Performance: Monomorphization

Wait! Does using generics make my code slower? **No.**

Rust uses a process called **Monomorphization**. At compile time, Rust looks at all the places you used a generic and generates **specific code** for each type you used.

1.  You write `Option<T>`.
2.  You use `Option<i32>` and `Option<f64>`.
3.  The compiler generates two real enums: `Option_i32` and `Option_f64`.

This means generics in Rust have **zero runtime overhead**!

## Generic Methods

You can also implement methods for generic structs.

```rust
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **Generics** | `<T>` | Placeholder for a type |
| **Bound** | `T: Trait` | Restricting allowed types |
| **Function** | `fn f<T>(x: T)` | Reusable logic for any type |
| **Struct** | `struct S<T> { ... }`| Data that can hold any type |
| **Enum** | `enum E<T> { ... }` | Variants that can hold any type |
| **impl** | `impl<T> S<T>` | Implementing behavior for generic types |
| **Zero-Cost** | Monomorphization | No performance hit compared to manual code |
| **Standard** | `Vec<T>`, `Option<T>`, `Result<T, E>` |
| **Binary Size**| Code generation | Can lead to larger binaries if many types used |
| **Naming** | Convention: Single uppercase letters (T, U, V) |
| **Multi** | `<T, U>` | Using multiple different generic types |
| **Logic** | Code once; use everywhere! |
