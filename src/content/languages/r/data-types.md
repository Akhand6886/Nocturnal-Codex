---
title: "Data Types"
description: "Vectors, Lists, Matrices, and the essential Data Frame in R"
---

## Everything is a Vector

In **R**, there are no "scalars." A single number is actually a vector of length 1. You create vectors using the **`c()`** (combine) function.

```r
scores <- c(85, 90, 78)
names <- c("Alpha", "Beta")
```

## The Standard Types

-   **Numeric**: Decimals (`3.14`)
-   **Integer**: Whole numbers (`42L`)
-   **Character**: Text strings (`"Hello"`)
-   **Logical**: `TRUE` or `FALSE`
-   **Factor**: Categorical data (e.g., "Male", "Female", "Other")

## Advanced Structures

1.  **List**: A collection of items that can be of different types.
2.  **Matrix**: A 2D table where every item must be the same type.
3.  **Data Frame**: The most important type in R. It is a 2D table where every **column** can be a different type (like a spreadsheet or SQL table).

```r
# Creating a Data Frame
df <- data.frame(
  id = c(1, 2, 3),
  name = c("A", "B", "C"),
  score = c(10.5, 20.2, 15.1)
)
```

Wait! In modern R (Tidyverse), we often use a **Tibble**, which is a "lazy" and more user-friendly version of a Data Frame.

## Summary

| Type | Dimensions | All same type? |
| :--- | :--- | :--- |
| **Vector** | 1D | **Yes** |
| **Matrix** | 2D | **Yes** |
| **Array** | nD | **Yes** |
| **List** | 1D | No |
| **Data Frame**| 2D | No (per column) |

## Summary

| Term | Description |
| :--- | :--- |
| **c()** | Combine values into a vector |
| **class()** | Check the type of an object |
| **str()** | Display the structure of an object |
| **factor** | Categorical data with specific "Levels" |
| **NA** | "Not Available" (The R way to handle missing data) |
| **Best For** | Organizing and preparing data for analysis |
| **Logic** | Vectorization: Operations apply to all elements |
| **Safety** | Strong type checking within columns |
| **Modern** | Use `tibble` for better performance and printing |
| **Standard** | Columns in a Data Frame must all be the same length |
| **Identity** | The "Data Frame" concept originated in R |
