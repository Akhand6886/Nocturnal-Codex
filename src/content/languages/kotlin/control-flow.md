---
title: "Control Flow"
description: "if, when, and the powerful range expressions in Kotlin"
---

## `if` as an Expression

In **Kotlin**, `if` is not just a statement—it's an **expression**. This means it returns a value, allowing you to use it like a ternary operator.

```kotlin
val max = if (a > b) a else b
```

Wait! There is no `? :` ternary operator in Kotlin because `if` already does the job.

## The `when` Expression

The `when` expression is Kotlin's more powerful version of the `switch` statement. It can check types, ranges, and even custom conditions.

```kotlin
when (x) {
    1 -> println("One")
    2, 3 -> println("Two or Three")
    in 10..20 -> println("Between 10 and 20")
    is String -> println("It's a String!")
    else -> println("Something else")
}
```

## Loops and Ranges

Kotlin makes loops incredibly readable using **Ranges**.

```kotlin
// Loop from 1 to 5
for (i in 1..5) {
    println(i)
}

// Loop through a list
for (item in items) {
    println(item)
}
```

-   **`1..10`**: Range from 1 to 10 (inclusive).
-   **`1 until 10`**: Range from 1 to 9.
-   **`10 downTo 1`**: Counting backwards.
-   **`step 2`**: Changing the increment.

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / else** | Used as a statement OR expression |
| **when** | Powerful pattern matching replacement for switch |
| **for** | Iterating through ranges or collections |
| **while** | Basic loop with condition |
| **range** | `1..10` syntax for numeric sequences |
| **Best For** | Clean and readable branching logic |
| **Logic** | Expression-based flow reduces intermediate variables |
| **Safety** | `when` can be exhaustive (compiler checks all cases) |
| **Modern** | Highly expressive compared to Java |
| **Standard** | Use `when` for anything more complex than a simple if/else |
| **Identity** | Works seamlessly with Kotlin's smart casting |
