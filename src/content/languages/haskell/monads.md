---
title: "Monads"
description: "Demystifying the most famous concept in functional programming"
---

## What is a Monad?

Wait! Don't panic. A **Monad** is just a way to chain computations together while handling some "Side Effect" (like null values, errors, or I/O) behind the scenes.

A Monad must implement three things:
1.  **Type Constructor**: A wrapper for a value (e.g., `Maybe a`).
2.  **`return` (or `pure`)**: A way to put a normal value into the wrapper.
3.  **`>>=` (Bind)**: A way to chain a function that returns a wrapped value.

## The `Maybe` Monad

The `Maybe` monad is used to handle computations that might fail (return `Nothing`).

```haskell
-- Chaining without checking for null every time!
findUser id >>= getProfile >>= getEmail
```

## The `do` Notation

Wait! To make Monads easier to read, Haskell provides **`do`** notation, which looks like "Imperative" code but is actually just a syntax wrapper for Bind (`>>=`).

```haskell
-- This is still pure functional code!
main = do
    putStrLn "What is your name?"
    name <- getLine
    putStrLn ("Hello " ++ name)
```

## Why use them?

-   **Safety**: Handle errors and edge cases without messy `if/else` nests.
-   **Structure**: Keep your logic clean and linear.
-   **Purity**: Allows "Impure" things (like reading a file) to exist in a "Pure" language.

## Summary

| Term | Description |
| :--- | :--- |
| **>>=** | Bind operator (The heart of the Monad) |
| **return** | Put a value into a Monad |
| **do** | Syntactic sugar for chaining |
| **Maybe** | Monad for optional values |
| **IO** | Monad for interacting with the world |
| **Best For** | Managing complexity and side effects cleanly |
| **Logic** | "Sequential computation in a functional world" |
| **Safety** | Prevents the "Million Dollar Mistake" (Null Pointers) |
| **Modern** | Concepts now appearing in JS (Promises) and Java (Optional) |
| **Standard** | Part of the core Haskell Prelude |
| **Identity** | The #1 meme and #1 power tool of Haskell |
