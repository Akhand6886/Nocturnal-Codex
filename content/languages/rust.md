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
---

## Overview

Rust is a multi-paradigm, high-level, general-purpose programming language that emphasizes performance, type safety, and concurrency. It enforces memory safety — meaning all references point to valid memory — without needing a garbage collector. Its borrow checker tracks object lifetimes at compile time, eliminating entire classes of bugs like null pointer dereferences, data races, and use-after-free errors.

## Key Features

- **Memory safety without GC** — Ownership and borrowing system prevents bugs at compile time
- **Zero-cost abstractions** — High-level features with no runtime overhead
- **Fearless concurrency** — The type system prevents data races
- **Pattern matching** — Powerful `match` expressions with exhaustive checking
- **Cargo** — Best-in-class package manager and build system

## Common Use Cases

- **Systems Programming** — Operating systems, drivers, embedded firmware
- **WebAssembly** — High-performance web applications
- **CLI Tools** — ripgrep, fd, exa, bat
- **Infrastructure** — Cloudflare Workers, Deno internals, Servo
- **Game Development** — Bevy engine, Amethyst

## Code Example

```rust
// Rust's ownership model in action
fn main() {
    let names: Vec<String> = vec![
        String::from("Alice"),
        String::from("Bob"),
        String::from("Charlie"),
    ];

    // Borrowing — no ownership transfer
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
