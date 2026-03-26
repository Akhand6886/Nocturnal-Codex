---
id: "rust"
name: "Rust"
slug: "rust"
description: "A systems programming language focused on safety, speed, and concurrency, empowering developers to build reliable and efficient software."
iconName: "rust"
year: 2010
creator: "Graydon Hoare (Mozilla)"
paradigm: ["Systems", "Functional", "Concurrent"]
useCases: ["Systems Programming", "WebAssembly", "CLI Tools", "Game Engines", "Embedded Systems"]
website: "https://www.rust-lang.org/"
category: "Systems"
featured: true
difficulty: "Advanced"
topics:
  - section: "Basics"
    description: "Rust fundamentals — variables, types, and control flow."
    items:
      - title: "Introduction to Rust"
        description: "Why Rust, cargo, rustup, and the Rust ecosystem"
      - title: "Variables & Mutability"
        description: "let, let mut, const, shadowing, and Rust's immutability-first approach"
      - title: "Data Types"
        description: "Scalars, compound types, tuples, arrays, and type annotations"
      - title: "Functions"
        description: "fn, parameters, return types, expressions vs statements"
      - title: "Control Flow"
        description: "if/else, loop, while, for, and Rust's expression-based nature"
  - section: "Ownership & Borrowing"
    description: "Rust's core innovation — memory safety without garbage collection."
    items:
      - title: "Ownership Rules"
        description: "The three rules, move semantics, and Copy vs Clone"
      - title: "References & Borrowing"
        description: "Immutable (&T) and mutable (&mut T) references, the borrow checker"
      - title: "Lifetimes"
        description: "Lifetime annotations, elision rules, 'static, and lifetime bounds"
      - title: "Slices"
        description: "String slices (&str), array slices, and fat pointers"
  - section: "Structs, Enums & Pattern Matching"
    description: "Custom types and Rust's powerful pattern system."
    items:
      - title: "Structs"
        description: "Named fields, tuple structs, unit structs, and methods (impl)"
      - title: "Enums"
        description: "Variants, associated data, Option<T>, and Result<T, E>"
      - title: "Pattern Matching"
        description: "match, if let, while let, destructuring, and exhaustive checking"
      - title: "Generics"
        description: "Generic functions, structs, enums, and monomorphization"
  - section: "Traits & Error Handling"
    description: "Polymorphism and robust error management."
    items:
      - title: "Traits"
        description: "Defining traits, impl, default methods, and trait bounds"
      - title: "Trait Objects"
        description: "Dynamic dispatch with dyn Trait, object safety"
      - title: "Error Handling"
        description: "Result, Option, the ? operator, and custom error types"
      - title: "Closures"
        description: "Fn, FnMut, FnOnce, capturing variables, and move closures"
  - section: "Concurrency"
    description: "Fearless concurrency with Rust's type system guarantees."
    items:
      - title: "Threads"
        description: "std::thread, join handles, and thread::spawn"
      - title: "Message Passing"
        description: "Channels (mpsc), sender/receiver, and cross-thread communication"
      - title: "Shared State"
        description: "Mutex<T>, Arc<T>, and atomics"
      - title: "Async Rust"
        description: "async/await, Future trait, tokio, and async runtimes"
  - section: "Advanced Topics"
    description: "Deep Rust for systems-level mastery."
    items:
      - title: "Smart Pointers"
        description: "Box<T>, Rc<T>, RefCell<T>, Cow<T>, and interior mutability"
      - title: "Unsafe Rust"
        description: "Raw pointers, unsafe blocks, FFI, and when unsafe is necessary"
      - title: "Macros"
        description: "Declarative macros (macro_rules!), procedural macros, and derive"
      - title: "Cargo & Crates"
        description: "Workspace management, features, build scripts, and publishing"
---

## Overview

Rust is a multi-paradigm, high-level, general-purpose programming language that emphasizes performance, type safety, and concurrency. It enforces memory safety — meaning all references point to valid memory — without needing a garbage collector. Its borrow checker tracks object lifetimes at compile time, eliminating entire classes of bugs like null pointer dereferences, data races, and use-after-free errors.

## Key Features

- **Memory safety without GC** — Ownership and borrowing system prevents bugs at compile time
- **Zero-cost abstractions** — High-level features with no runtime overhead
- **Fearless concurrency** — The type system prevents data races
- **Pattern matching** — Powerful `match` expressions with exhaustive checking
- **Cargo** — Best-in-class package manager and build system

## Code Example

```rust
fn main() {
    let names: Vec<String> = vec![
        String::from("Alice"),
        String::from("Bob"),
        String::from("Charlie"),
    ];

    let greeting = names
        .iter()
        .map(|name| format!("Hello, {}!", name))
        .collect::<Vec<_>>()
        .join("\n");

    println!("{}", greeting);
}
```

## Learning Resources

- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings (Interactive Exercises)](https://github.com/rust-lang/rustlings)
