---
title: "Functions"
description: "fn, parameters, return types, expressions vs statements"
---

## Defining Functions

In **Rust**, functions are defined using the **`fn`** keyword. Rust uses **snake_case** for function names. The entry point of every Rust program is the `main` function.

```rust
fn main() {
    println!("Main function!");
    another_function();
}

fn another_function() {
    println!("Another function!");
}
```

## Function Parameters

In function signatures, you **must** declare the type of each parameter. This is a deliberate design choice that allows the compiler to provide better error messages.

```rust
fn print_measurement(value: i32, unit: char) {
    println!("The measurement is: {}{}", value, unit);
}
```

## Return Values

Functions can return values to the code that calls them. We don’t name return values, but we declare their type after an arrow (**`->`**).

In Rust, the return value of the function is synonymous with the value of the final expression in the block of the body of a function.

```rust
fn five() -> i32 {
    5 // No semicolon! This is an expression.
}

fn main() {
    let x = five();
    println!("The value of x is: {}", x);
}
```

## Statements vs. Expressions

Wait! This is one of the most important concepts in Rust. 

-   **Statements**: Instructions that perform some action and do not return a value. (e.g., `let x = 6;`). They end with a semicolon.
-   **Expressions**: Evaluate to a resulting value. (e.g., `5 + 6`, `x + 1`). They do **not** end with a semicolon.

```rust
fn plus_one(x: i32) -> i32 {
    x + 1 // Expression: returns the value
    // x + 1; // ERROR: Statement: returns () (unit type)
}
```

> [!TIP]
> If you add a semicolon to the end of an expression, you turn it into a statement, which will then return the "Unit Type" `()`. This is a common source of compiler errors for beginners!

## Summary

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **fn** | `fn name() {}` | Define a function |
| **Params** | `(x: i32, y: f64)` | Parameters must have types |
| **Returns** | `-> i32` | Arrow specifies the return type |
| **Expression** | `x + 1` | Final line without semicolon returns! |
| **Statement** | `let y = 6;` | Instructions ending in `;` |
| **Main** | `fn main() {}` | The program entry point |
| **Unit Type** | `()` | What functions return if they have no output |
| **Snake Case** | `my_function_name` | The standard naming convention |
| **Safety** | Type-checked at compile-time |
| **Inline** | `#[inline]` | Suggestion to the compiler for optimization |
| **Order** | Function definition order doesn't matter in Rust |
| **Recursion** | Functions can call themselves safely |
