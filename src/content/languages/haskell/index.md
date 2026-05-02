---
id: haskell
name: Haskell
slug: haskell
description: "An advanced, purely functional programming language with strong static typing and lazy evaluation."
iconName: command
category: "Functional"
difficulty: "Advanced"
featured: true
relatedLanguages: ["scala", "elixir", "lisp"]
---

# Haskell: Pure Functional Power

Haskell is a purely functional language, meaning functions have no side effects. This makes code easier to reason about, test, and parallelize.

## Core Philosophies

- **Purity**: A function's output depends only on its input.
- **Immutability**: Once a value is defined, it never changes.
- **Lazy Evaluation**: Expressions are only evaluated when their results are actually needed.
- **Static Typing**: Types are checked at compile-time, catching a vast category of bugs.

## A Taste of Haskell

```haskell
-- A function to calculate the factorial of a number
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- Usage
main = print (factorial 5) -- 120
```

## Why Haskell?

Haskell is used where correctness and performance are critical, such as in financial systems, compilers, and formal verification.

## Summary Table

| Feature | Description |
|---------|-------------|
| **Typeclasses** | A way to define generic interfaces (similar to traits or protocols). |
| **Monads** | A design pattern used to handle side effects (like I/O or state) in a pure way. |
| **GHC** | The Glasgow Haskell Compiler, the most popular implementation. |
| **Cabal/Stack** | Build tools and package managers for Haskell. |
