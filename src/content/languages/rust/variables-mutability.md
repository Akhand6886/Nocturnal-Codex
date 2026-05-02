---
title: "Variables & Mutability"
description: "let, let mut, const, shadowing, and Rust's immutability-first approach"
---

## Immutability by Default

In **Rust**, variables are **immutable** by default. This is one of the language's core design decisions to help you write safer code. Once a value is bound to a name, you cannot change that value.

```rust
fn main() {
    let x = 5;
    // x = 6; // ERROR: cannot assign twice to immutable variable `x`
}
```

## Mutability (`mut`)

If you want to be able to change a value, you must explicitly declare the variable as **mutable** using the **`mut`** keyword.

```rust
fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x); // 5
    x = 6;
    println!("The value of x is: {}", x); // 6
}
```

## Constants (`const`)

Wait! What's the difference between an immutable variable (`let`) and a **Constant** (`const`)?

1.  **Mutability**: You are never allowed to use `mut` with `const`. Constants are always immutable.
2.  **Type Annotation**: You **must** annotate the type of a constant.
3.  **Timing**: Constants are evaluated at compile-time. They can be declared in any scope, including the global scope.

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

## Variable Shadowing

Shadowing allows you to declare a new variable with the same name as a previous one. The new variable "shadows" the old one until it goes out of scope or is shadowed again.

```rust
fn main() {
    let x = 5;
    let x = x + 1; // Shadows the first x
    
    {
        let x = x * 2; // Shadows the second x within this scope
        println!("Inner value of x: {}", x); // 12
    }
    
    println!("Outer value of x: {}", x); // 6
}
```

> [!NOTE]
> Shadowing is different from `mut` because we are effectively creating a *new* variable. This allows us to change the **type** of the value while keeping the same name!

## Summary

| Feature | Syntax | Mutable? | Scope |
| :--- | :--- | :--- | :--- |
| **let** | `let x = 5;` | No | Local |
| **let mut** | `let mut x = 5;` | Yes | Local |
| **const** | `const X: u32 = 5;`| Never | Global/Local |
| **Shadowing**| `let x = "hi";` | Creating a new binding | Local |
| **Default** | Immutability-first for safety and concurrency |
| **Type** | Shadowing can change types; `mut` cannot! |
| **Naming** | Variables: `snake_case`; Constants: `SCREAMING_SNAKE_CASE` |
| **Logic** | Use `mut` only when necessary; use shadowing for transformations |
| **Safety** | Prevents accidental modifications in complex systems |
| **Global** | Only `const` (and `static`) can exist outside `fn main` |
| **Performance**| Shadowing has zero runtime overhead |
