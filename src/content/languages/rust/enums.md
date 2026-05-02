---
title: "Enums"
description: "Variants, associated data, Option<T>, and Result<T, E>"
---

## What is an Enum?

An **Enum** (short for enumeration) allows you to define a type by enumerating its possible **variants**. While structs let you group fields together, enums let you say a value is one of a possible set of values.

```rust
enum IpAddrKind {
    V4,
    V6,
}
```

## Enums with Data

Wait! Unlike enums in many other languages, Rust enums can hold data directly inside their variants. This makes them incredibly powerful for modeling complex states.

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

## The `Option` Enum

Rust does not have a "null" value. Instead, it uses the **`Option<T>`** enum to represent a value that could be something or nothing.

```rust
enum Option<T> {
    None,
    Some(T),
}

let some_number = Some(5);
let absent_number: Option<i32> = None;
```

This forces you to handle the `None` case explicitly, preventing the famous "Null Pointer Exception" that plagues other languages.

## The `Result` Enum

The **`Result<T, E>`** enum is used for error handling. It represents either a success (`Ok`) or a failure (`Err`).

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

## Methods on Enums

Just like structs, you can define methods on enums using `impl`.

```rust
impl Message {
    fn call(&self) {
        // ... logic ...
    }
}
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **Enum** | `enum Name { ... }` | Defining a set of variants |
| **Variant** | `Name::Variant` | One of the possible choices |
| **Data** | `V(String)` | Variants can hold tuples or structs |
| **Option** | `Some(x) / None` | Replaces the concept of "null" |
| **Result** | `Ok(x) / Err(e)` | Standard way to handle errors |
| **Match** | `match x { ... }` | How to extract data from an enum |
| **Generic** | `<T>` | Enums can work with any type |
| **State** | Best for modeling "One of many" logic |
| **Safety** | Prevents "Null pointer" and "Unhandled error" bugs |
| **Memory** | Enums take up as much space as their largest variant |
| **Standard** | `Option` and `Result` are imported by default! |
| **Logic** | Enums are "Sum Types" (Total possibilities = sum of variants) |
