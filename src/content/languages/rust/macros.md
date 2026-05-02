---
title: "Macros"
description: "Declarative macros (macro_rules!), procedural macros, and derive"
---

## What are Macros?

**Macros** are a way of writing code that writes other code—a technique known as **metaprogramming**. Unlike functions, which operate on values, macros operate on the **source code** itself.

## 1. Declarative Macros (`macro_rules!`)

Declarative macros are the most common. They look like a `match` expression but for code patterns.

```rust
#[macro_export]
macro_rules! say_hi {
    () => {
        println!("Hi!");
    };
    ($name:expr) => {
        println!("Hi, {}!", $name);
    };
}

fn main() {
    say_hi!();
    say_hi!("Alpha");
}
```

Wait! Why use macros instead of functions?
-   **Variadic Arguments**: Macros can take a varying number of arguments (like `vec![1, 2, 3]`).
-   **Compile-time logic**: Macros are expanded before the code is compiled.

## 2. Procedural Macros

Procedural macros act more like functions: they take a stream of code as input, operate on it, and produce a stream of code as output. There are three types:

1.  **Custom `#[derive]`**: Automatically implement traits (e.g., `#[derive(Debug)]`).
2.  **Attribute-like**: Create custom attributes (e.g., `#[route(GET, "/")]`).
3.  **Function-like**: Macros that look like function calls but are more powerful.

## Differences: Macros vs. Functions

| Feature | Functions | Macros |
| :--- | :--- | :--- |
| **Logic** | Values | **Tokens / Source Code** |
| **Arguments** | Fixed number | **Variable (Variadic)** |
| **Complexity** | Easy to write | **Harder to write and debug** |
| **Performance**| Small runtime cost | **Zero runtime cost** (Expanded at compile time) |

> [!TIP]
> Always prefer functions over macros unless you specifically need variadic arguments or compile-time code generation.

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **!** | `name!()` | How you call a macro |
| **macro_rules!**| Declarative | Pattern-matching on source code |
| **derive** | `#[derive(T)]` | Auto-implementing a trait |
| **Attribute** | `#[my_attr]` | Metadata-driven code generation |
| **Expansion** | Compile-time | Macros are "unrolled" into real code by the compiler |
| **Variadic** | `...` | Handling any number of arguments |
| **Hygiene** | Safety | Rust macros are "hygienic"—they don't accidentally leak variables |
| **Proc-macro** | Advanced | Rust code that manipulates the AST (Abstract Syntax Tree) |
| **Standard** | `println!`, `vec!`, `panic!`, `format!` |
| **Debug** | `cargo expand` | View the code after macros have been expanded |
| **Meta** | Programming | Writing code that generates code |
