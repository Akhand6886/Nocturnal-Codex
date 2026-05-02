---
title: "Unsafe Rust"
description: "Raw pointers, unsafe blocks, FFI, and when unsafe is necessary"
---

## What is Unsafe Rust?

All the code we've written so far has been **Safe Rust**, where the compiler guarantees memory safety. **Unsafe Rust** is a "superpower" that allows you to bypass some of those restrictions. 

It exists because the compiler is sometimes **too conservative**—it might reject code that is actually safe just because it can't prove it.

## The Unsafe Superpowers

Inside an **`unsafe`** block, you can do five things you can't do in safe Rust:

1.  Dereference a **Raw Pointer**.
2.  Call an **unsafe function** or method.
3.  Access or modify a **mutable static variable**.
4.  Implement an **unsafe trait**.
5.  Access fields of **unions**.

## Raw Pointers (`*const T` and `*mut T`)

Raw pointers are like C pointers. Unlike references, they:
-   Are allowed to ignore the borrowing rules (many mutable pointers to same data).
-   Are not guaranteed to point to valid memory.
-   Can be null.
-   Don't have automatic cleanup.

```rust
let mut num = 5;

let r1 = &num as *const i32; // Create a raw pointer (Safe!)
let r2 = &mut num as *mut i32;

unsafe {
    println!("r1 is: {}", *r1); // Dereference (Unsafe!)
}
```

## Calling Unsafe Functions

An unsafe function has the `unsafe` keyword before its definition. You can only call it from within an `unsafe` block.

```rust
unsafe fn dangerous() {}

unsafe {
    dangerous();
}
```

## FFI: Foreign Function Interface

Wait! A common use for `unsafe` is talking to code written in other languages (like C).

```rust
extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

> [!CAUTION]
> Using `unsafe` doesn't turn off the borrow checker or other safety checks. It just gives you access to these five specific powers. Use it as a last resort!

## Summary

| Feature | Description |
| :--- | :--- |
| **unsafe** | Keyword used to start an unsafe block or function |
| **Raw Pointer** | `*const T` / `*mut T` (No safety guarantees) |
| **FFI** | Interacting with C or other languages |
| **Static Mut** | Globally mutable state (DANGEROUS!) |
| **Unsafe Trait**| A trait that requires manual safety proof |
| **Safety** | You (the programmer) must guarantee memory safety |
| **Best For** | Low-level drivers, performance optimizations, FFI |
| **Panic** | Unsafe code can still panic! |
| **Logic** | Wrap unsafe code in safe abstractions (like `Vec` or `String`) |
| **Modern** | Most Rust apps have 0% unsafe code! |
| **Memory** | Unsafe is where you do manual memory management |
