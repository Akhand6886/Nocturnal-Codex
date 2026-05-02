---
title: "Types & Typeclasses"
description: "Understanding Haskell's powerful type system"
---

## Everything has a Type

In **Haskell**, types are verified at compile time. You can explicitly define them or let the compiler infer them.

```haskell
add :: Int -> Int -> Int
add x y = x + y
```

## Common Types

| Type | Description |
| :--- | :--- |
| **Int** | Fixed-precision integer |
| **Integer** | Arbitrary-precision integer (Infinite!) |
| **Float / Double**| Floating point numbers |
| **Bool** | True or False |
| **Char** | A single Unicode character |
| **String** | A list of characters (`[Char]`) |

## What are Typeclasses?

Wait! **Typeclasses** are like "Interfaces" in other languages, but more powerful. They define a set of behaviors for a type.

-   **`Eq`**: Types that can be checked for equality (`==`, `/=`).
-   **`Ord`**: Types that can be ordered (`<`, `>`, `<=`).
-   **`Show`**: Types that can be converted to strings.
-   **`Read`**: Types that can be parsed from strings.

```haskell
-- Defining a custom type that derives behaviors
data Point = Point Float Float deriving (Show, Eq)
```

## Summary

| Term | Description |
| :--- | :--- |
| **::** | "Has type" operator |
| **->** | Function mapping operator |
| **data** | Keyword to define a new type |
| **type** | Keyword to create a type alias |
| **deriving** | Automatically implement typeclass behaviors |
| **Best For** | Enforcing correctness and self-documenting code |
| **Logic** | "Data types as the foundation of logic" |
| **Safety** | Prevents null pointers and type mismatch errors |
| **Modern** | Generalized Algebraic Data Types (GADTs) for advanced patterns |
| **Standard** | Use `PascalCase` for types and typeclasses |
| **Identity** | Haskell's type system is a work of art |
