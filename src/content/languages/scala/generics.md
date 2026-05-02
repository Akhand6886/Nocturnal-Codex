---
title: "Generics"
description: "Type parameters, Variance, and Lower/Upper bounds in Scala"
---

## What are Generics?

**Generics** allow you to write classes and methods that can work with any data type, while still maintaining full type safety. You use square brackets **`[T]`** (unlike the `<T>` used in Java) to define a type parameter.

```scala
class Box[T](val content: T)

val intBox = new Box[Int](42)
val stringBox = new Box[String]("Hello")
```

## Variance: `+` and `-`

Wait! This is a unique and advanced feature of **Scala**.
-   **`+T` (Covariant)**: If `Dog` is a `Animal`, then `Box[Dog]` is a `Box[Animal]`.
-   **`-T` (Contravariant)**: If `Dog` is a `Animal`, then `Box[Animal]` is a `Box[Dog]`.

```scala
class List[+A] // Lists are covariant in Scala
```

## Type Bounds

Sometimes you want to restrict which types can be used.
-   **`T <: Animal` (Upper Bound)**: T must be a subclass of Animal.
-   **`T >: Dog` (Lower Bound)**: T must be a superclass of Dog.

```scala
def process[T <: Animal](a: T) = { ... }
```

## Why use Generics?

1.  **Type Safety**: The compiler ensures you don't accidentally add the wrong type to a collection.
2.  **Code Reuse**: Write one list, one cache, or one repository for any type.
3.  **Documentation**: The types themselves serve as documentation for your code.

## Summary

| Term | Description |
| :--- | :--- |
| **[T]** | The syntax for a type parameter |
| **[+T]** | Covariant: Preserves inheritance relationship |
| **[-T]** | Contravariant: Reverses inheritance relationship |
| **<:** | Upper bound (Subtype of...) |
| **>:** | Lower bound (Supertype of...) |
| **Best For** | Collections, Repositories, and complex Frameworks |
| **Logic** | "Abstract over types safely" |
| **Safety** | Catch type-related bugs at compile-time |
| **Modern** | Essential for building generic Big Data pipelines |
| **Standard** | Use `T`, `U`, `A`, `B` as conventional type names |
| **Identity** | Generics in Scala are checked at compile-time and erased at runtime |
