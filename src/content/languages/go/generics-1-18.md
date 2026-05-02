---
title: "Generics (1.18+)"
description: "Type parameters, constraints, and generic data structures"
---

## What are Generics?

Introduced in **Go 1.18**, **Generics** allow you to write code that works with multiple types without sacrificing type safety or using the empty interface (`any`). 

You use square brackets **`[ ]`** to define type parameters.

```go
func PrintSlice[T any](s []T) {
    for _, v := range s {
        fmt.Println(v)
    }
}
```

Wait! Why use generics?
1.  **Code Reuse**: Write a function once and use it for `int`, `string`, or custom structs.
2.  **Type Safety**: The compiler ensures you are using the correct types at compile time (no more runtime type assertions).
3.  **Performance**: Generics in Go are as fast as non-generic code because the compiler handles the details for you.

## Type Constraints

You can limit which types can be used with your generic function using **Constraints**. 

```go
// T must be either an int or a float64
func Sum[T int | float64](a, b T) T {
    return a + b
}
```

## The `comparable` Constraint

Wait! Go provides a built-in constraint called **`comparable`**. It is satisfied by any type that can be compared using `==` or `!=`. This is most commonly used for map keys.

```go
func Find[T comparable](s []T, target T) int {
    for i, v := range s {
        if v == target {
            return i
        }
    }
    return -1
}
```

## Generic Structs

You can also create custom data structures that work with any type.

```go
type List[T any] struct {
    elements []T
}
```

## The `any` Alias

In Go 1.18+, `any` is an alias for the empty interface `interface{}`. It is the most common constraint used when you truly don't care about the underlying type.

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **Type Param** | `[T any]` | Placeholder for a type |
| **Constraint** | `[T int | string]` | Limiting allowed types |
| **any** | Alias | Shortcut for `interface{}` |
| **comparable** | Constraint | Types that support `==` and `!=` |
| **~ (Tilde)** | `~int` | Constraint includes types WITH the underlying type `int` |
| **Generic Fn** | `func f[T](x T)` | Logic for multiple types |
| **Generic Struct**| `type S[T] struct`| Data structure for multiple types |
| **Best For** | Collections, utility functions, algorithms (sorting, searching) |
| **Safety** | Catch type errors at compile time |
| **Clean** | Removes the need for repetitive `interface{}` boilerplate |
| **Modern** | The biggest update to Go since its release |
| **Binary Size**| Code generation | Can slightly increase binary size |
| **Logic** | "Don't use generics until you find yourself writing the same code twice" |
