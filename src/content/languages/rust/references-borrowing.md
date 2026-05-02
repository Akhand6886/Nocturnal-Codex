---
title: "References & Borrowing"
description: "Immutable (&T) and mutable (&mut T) references, the borrow checker"
---

## What is Borrowing?

Wait! If every function took ownership of its arguments, coding would be a nightmare. **Borrowing** allows you to pass a reference to a value instead of the value itself.

We use the **`&`** symbol to create a reference.

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // We PASS a reference!
    println!("The length of '{}' is {}.", s1, len); // s1 is STILL valid!
}

fn calculate_length(s: &String) -> usize { // We TAKE a reference!
    s.len()
}
```

## Mutable References (`&mut`)

By default, references are **immutable**. You cannot change what you have borrowed. If you want to modify the value, you must use a **mutable reference**.

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

## The Golden Rules of Borrowing

Rust’s **Borrow Checker** enforces two major rules to prevent "Data Races":

1.  You can have **any number** of immutable references (`&T`) OR
2.  You can have **exactly one** mutable reference (`&mut T`).
3.  You cannot have both at the same time.

```rust
let mut s = String::from("hello");

let r1 = &s;
let r2 = &s;
// let r3 = &mut s; // ERROR: cannot borrow `s` as mutable because it is already borrowed as immutable
```

## Dangling References

Rust prevents "Dangling Pointers"—references that point to memory that has been deleted. The compiler will stop you if you try to return a reference to a local variable.

```rust
// fn dangle() -> &String {
//     let s = String::from("hello");
//     &s // ERROR: s will be dropped here!
// }
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **Reference** | `&T` | Borrowing without ownership |
| **Mut Ref** | `&mut T` | Borrowing with modification permission |
| **Dereference**| `*r` | Accessing the value behind the reference |
| **Safety** | Prevents data races at compile time |
| **Borrow C.** | The part of the compiler that enforces these rules |
| **Exclusive** | Mutable references are "Exclusive" |
| **Shared** | Immutable references are "Shared" |
| **Scope** | A reference's lifetime ends at its last usage |
| **Modern** | Non-Lexical Lifetimes (NLL) make borrowing easier |
| **Zero-Cost** | References are just pointers (no runtime overhead!) |
| **Logic** | You can have many readers OR one writer. Never both! |
| **Safety** | Prevents "Dangling pointers" and "Use-after-free" |
