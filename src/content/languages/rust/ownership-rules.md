---
title: "Ownership Rules"
description: "The three rules, move semantics, and Copy vs Clone"
---

## What is Ownership?

**Ownership** is Rust’s most unique feature and its way of managing memory. It allows Rust to make memory safety guarantees without needing a garbage collector.

## The Three Rules of Ownership

Wait! You must memorize these three rules. They are the law of the land in Rust:

1.  Each value in Rust has a variable that’s called its **owner**.
2.  There can only be **one owner** at a time.
3.  When the owner goes **out of scope**, the value will be dropped (deleted).

```rust
{                      // s is not valid here, it’s not yet declared
    let s = "hello";   // s is valid from this point forward
    // do stuff with s
}                      // this scope is now over, and s is no longer valid
```

## Move Semantics

When you assign a variable to another variable, Rust **moves** the value. This means the first variable is no longer valid. This prevents "double free" errors!

```rust
let s1 = String::from("hello");
let s2 = s1; // s1 is MOVED to s2.

// println!("{}", s1); // ERROR: value borrowed here after move
```

## Copy vs. Clone

-   **Copy**: Types that are stored on the **stack** (like integers, booleans, chars) have the `Copy` trait. When you assign one to another, the value is copied, and both remain valid.
-   **Clone**: Types that are stored on the **heap** (like `String`) require an explicit `.clone()` call if you want a deep copy of the data.

```rust
let x = 5;
let y = x; // x is STILL valid (it was copied)

let s1 = String::from("hello");
let s2 = s1.clone(); // s1 is STILL valid (it was explicitly cloned)
```

## Ownership and Functions

Passing a variable to a function will move or copy it, just as assignment does. Returning values can also transfer ownership.

```rust
fn main() {
    let s = String::from("hello");
    takes_ownership(s);
    // println!("{}", s); // ERROR: s was moved into the function!
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string goes out of scope and is dropped!
```

## Summary

| Term | Description |
| :--- | :--- |
| **Owner** | The variable responsible for a piece of data |
| **Move** | Transferring ownership from one variable to another |
| **Drop** | Automatic memory cleanup when a variable hits `}` |
| **Copy** | Automatic duplication for stack-only data |
| **Clone** | Explicit deep copy for heap data |
| **Scope** | The `{}` block where a variable is valid |
| **Heap** | Where large, dynamic data (like String) lives |
| **Stack** | Where small, fixed-size data (like i32) lives |
| **Safety** | Prevents "Use-after-free" and "Double-free" bugs |
| **Borrowing** | Using data without taking ownership (See next section!) |
| **RAII** | Resource Acquisition Is Initialization (The core concept!) |
| **Mover** | Rust is a "Mover" language by default! |
