---
title: "Introduction to Rust"
description: "Why Rust, cargo, rustup, and the Rust ecosystem"
---

## What is Rust?

**Rust** is a systems programming language that provides memory safety without a garbage collector. It was designed at Mozilla Research and has topped the "most loved language" charts for years. It combines the performance of C++ with a much safer and modern development experience.

```rust
fn main() {
    println!("Hello, Nocturnal Codex!");
}
```

## Why Choose Rust?

1.  **Memory Safety**: Rust's compiler (specifically the **Borrow Checker**) ensures that your program won't crash due to memory errors like null pointers or buffer overflows.
2.  **Performance**: Rust has no runtime or garbage collector. It is "zero-cost," meaning its abstractions don't slow down your code.
3.  **Fearless Concurrency**: The type system prevents "Data Races" at compile time, making multi-threaded programming much easier.
4.  **Modern Tooling**: It comes with **Cargo**, a world-class package manager and build system.

## The Toolchain: Rustup & Cargo

Wait! How do you actually build things in Rust? You use these three main tools:

-   **rustup**: The installer and version manager. It keeps your compiler up to date.
-   **rustc**: The actual compiler that turns your code into an executable.
-   **Cargo**: The project manager. You'll use this for 99% of your work.

### Useful Cargo Commands

```bash
cargo new my_project  # Create a new project
cargo build           # Compile your code
cargo run             # Compile and run in one step
cargo check           # Quickly check if your code compiles (no build)
cargo test            # Run your project's unit tests
```

## The Rust Ecosystem

Rust isn't just a language; it's a massive ecosystem of libraries called **Crates**. You can find thousands of high-quality crates on **[crates.io](https://crates.io)**.

> [!TIP]
> Use `cargo check` frequently during development. It's much faster than `cargo build` because it doesn't generate the final binary—it only checks the logic!

## Summary

| Feature | Description |
| :--- | :--- |
| **Safety** | Memory safety guaranteed at compile-time |
| **Speed** | Blazing fast (comparable to C and C++) |
| **Concurrency**| Type system prevents data races |
| **Tooling** | Cargo handles builds, tests, and dependencies |
| **Standard** | Edition system (2015, 2018, 2021) ensures stability |
| **Open Source**| Community-driven and incredibly active |
| **Best For** | Systems, WebAssembly, CLI tools, Backend services |
| **Borrowing** | Core concept that replaces garbage collection |
| **Zero-Cost** | Abstractions that don't add runtime overhead |
| **Wasm** | Top-tier support for high-performance web apps |
| **Modern** | Algebraic data types, pattern matching, and traits |
| **Stable** | Code written years ago still compiles perfectly today |
