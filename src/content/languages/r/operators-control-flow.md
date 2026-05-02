---
title: "Operators & Control Flow"
description: "Assignment, arithmetic, and branching in the R language"
---

## The Assignment Operator (`<-`)

Wait! While you can use `=` in **R**, the community standard is the "Left Arrow" operator **`<-`**. It is used to assign values to variables.

```r
x <- 10
y <- x + 5
```

## Arithmetic Operators

-   **`^`** or **`**`**: Exponentiation (`2^3` is 8)
-   **`%%`**: Modulo (Remainder)
-   **`%/%`**: Integer Division

## Conditional Logic (`if`)

Braces `{}` are required for multiple lines.

```r
if (score > 90) {
  print("Excellent")
} else if (score > 80) {
  print("Good")
} else {
  print("Try again")
}
```

Wait! R also has a vectorized `if` called **`ifelse()`**. It checks a whole vector at once.

```r
results <- ifelse(scores > 50, "Pass", "Fail")
```

## Loops in R

While R has `for` and `while` loops, they are often slower than vectorized operations. You should only use loops when you absolutely cannot perform the task using a vectorized function.

```r
for (i in 1:10) {
  print(i)
}
```

## Summary

| Operator | Description |
| :--- | :--- |
| **<-** | The standard assignment operator |
| **== / !=** | Equality and Inequality |
| **& / |** | Vectorized Logical AND/OR |
| **&& / ||** | Single-value Logical AND/OR (for `if` statements) |
| **%in%** | Check if value is in a collection |
| **Best For** | Building logic into your data analysis |
| **Logic** | "Favor vectorized operations over manual loops" |
| **Safety** | R handles missing values (`NA`) specially in logic |
| **Modern** | The `case_when` function from `dplyr` is the modern "Switch" |
| **Standard** | Use `<-` for variables; reserve `=` for function arguments |
| **Identity** | The `<-` operator is a unique legacy of the S language |
