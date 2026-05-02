---
title: "Lifetimes"
description: "Lifetime annotations, elision rules, 'static, and lifetime bounds"
---

## What are Lifetimes?

**Lifetimes** are a way for the Rust compiler to ensure that all references are valid for as long as they are being used. Most of the time, Rust **infers** lifetimes automatically, but sometimes you need to provide **Lifetime Annotations** to clarify the relationship between different references.

## The Problem: Dangling References

If you have a function that takes two strings and returns one of them, Rust needs to know which string the returned reference belongs to.

```rust
// This will NOT compile without lifetime annotations!
// fn longest(x: &str, y: &str) -> &str {
//     if x.len() > y.len() { x } else { y }
// }
```

## Lifetime Annotation Syntax

Lifetime names start with an apostrophe (`'`) and are usually short, like `'a`. They go inside angle brackets `< >`.

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

Wait! This doesn't *change* how long the variables live. It just tells the compiler: "The returned reference will live as long as the **shorter** of the two inputs."

## Lifetime Elision Rules

Because writing `'a` everywhere is tedious, the Rust team implemented **Elision Rules**. These are common patterns where the compiler can automatically fill in the lifetimes for you.

1.  Each input parameter gets its own lifetime.
2.  If there is exactly one input lifetime, that lifetime is assigned to all output lifetimes.
3.  If there are multiple inputs but one of them is `&self`, the lifetime of `self` is assigned to all outputs.

## The `'static` Lifetime

A reference with the `'static` lifetime can live for the **entire duration** of the program. All string literals have the `'static` lifetime.

```rust
let s: &'static str = "I have a static lifetime.";
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **Annotation** | `'a` | Identifying a scope for a reference |
| **Generic** | `<'a>` | Declaring a lifetime on a function or struct |
| **Static** | `'static` | Reference that lives as long as the program |
| **Elision** | Automatic | Compiler inferring lifetimes for you |
| **Bound** | `T: 'a` | Type T must live at least as long as 'a |
| **Safety** | Prevents references from outliving their data |
| **Compiler** | Lifetimes are only checked at compile time |
| **Logic** | "Relationship" management, not memory management |
| **Structs** | Structs holding references MUST have annotations |
| **Modern** | Non-Lexical Lifetimes (NLL) reduce the need for `'a` |
| **Zero-Cost** | Lifetimes have zero runtime overhead |
| **Ref** | Every reference in Rust HAS a lifetime! |
| **Borrow C.** | Lifetimes are the secret fuel for the borrow checker |
