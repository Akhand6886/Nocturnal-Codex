---
title: "Functions"
description: "Defining functions and the return value in R"
---

## Defining Functions

In **R**, functions are created using the `function` keyword and assigned to a variable name.

```r
add_numbers <- function(a, b) {
  result <- a + b
  return(result)
}
```

Wait! Like Ruby or Scala, the **last evaluated expression** is automatically returned if you don't use the explicit `return()` keyword.

## Default Arguments

You can provide default values for parameters.

```r
greet <- function(name = "User") {
  paste("Hello,", name)
}
```

## Named Arguments

When calling a function, you can provide arguments by name. This makes your code much easier to read, especially for functions with many parameters.

```r
calculate_total(price = 100, tax = 0.05)
```

## Functionals (`apply` family)

Rists almost never use `for` loops. Instead, we use the **`apply`** family of functions (or the `purrr` package) to apply a function to every item in a collection.

-   **`lapply`**: Apply to a list/vector and return a **List**.
-   **`sapply`**: Apply and "Simplify" the result to a vector.

## Summary

| Term | Description |
| :--- | :--- |
| **function** | Keyword to declare a function |
| **return** | Explicitly returning a value |
| **...** | Passing variable arguments (the "Dots") |
| **args()** | Check the arguments of a function |
| **Best For** | Encapsulating reusable logic and analysis steps |
| **Logic** | "Functional programming for data" |
| **Safety** | R uses "Lazy Evaluation" for function arguments |
| **Modern** | The `purrr` package provides a more consistent alternative to `apply` |
| **Standard** | Use `snake_case` for function names |
| **Identity** | Functions in R are first-class objects |
| **Scope** | R uses lexical scoping (variables inside don't leak outside) |
