---
title: "Introduction to Haskell"
description: "The pure functional programming language with lazy evaluation"
---

## What is Haskell?

**Haskell** is a general-purpose, statically-typed, purely functional programming language with non-strict evaluation and strong static typing. It is named after logician Haskell Curry.

```haskell
main = putStrLn "Hello, Nocturnal Codex!"
```

## Why Haskell?

1.  **Purely Functional**: Every function is a "Pure" function. Given the same input, it will always return the same output, and it has no side effects.
2.  **Lazy Evaluation**: Haskell doesn't calculate the value of an expression until it is actually needed. This allows you to define infinite data structures!
3.  **Strong Typing**: The compiler is incredibly smart. If your code compiles, it is very likely to work correctly.
4.  **Concise**: You can express complex logic in just a few lines of code.

## The Toolchain

-   **GHC (Glasgow Haskell Compiler)**: The standard compiler.
-   **GHCi**: The interactive REPL where you can test code snippets.
-   **Cabal / Stack**: Build tools and package managers.

## 3. Summary

| Feature | Description |
| :--- | :--- |
| **Paradigm** | Purely Functional |
| **Typing** | Static, Strong, Inferred |
| **Evaluation** | Lazy (Non-strict) |
| **Best For** | Math, Compilers, Finance, High-reliability systems |
| **Logic** | Declarative and mathematical |
| **Safety** | Extremely high; prevents entire classes of bugs |
| **Modern** | Powering modern blockchain (Cardano) and backend tools |
| **Standard** | Haskell 2010 is the current stable report |
| **Identity** | The "Golden Standard" of functional programming |
