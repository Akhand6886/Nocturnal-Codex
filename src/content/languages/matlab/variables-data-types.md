---
title: "Variables & Data Types"
description: "Scalars, Vectors, Matrices, and the 1-based indexing rule"
---

## Everything is a Matrix

In **MATLAB**, even a single number (a scalar) is stored as a 1x1 matrix.

```matlab
a = 10;          % Scalar (1x1 matrix)
b = [1, 2, 3];   % Row Vector (1x3 matrix)
c = [1; 2; 3];   % Column Vector (3x1 matrix)
```

## Matrix Creation

You create matrices using square brackets **`[ ]`**.
-   Use **spaces** or **commas** to separate elements in a row.
-   Use **semicolons** to separate rows.

```matlab
M = [1 2 3; 4 5 6; 7 8 9]; % 3x3 matrix
```

## 1-Based Indexing

Wait! This is the most important thing for programmers coming from other languages. In MATLAB, **indexing starts at 1**, not 0.

```matlab
x = [10 20 30];
disp(x(1)); % Prints 10
```

## Common Data Types

| Type | Description |
| :--- | :--- |
| **double** | Default type for all numbers (64-bit float) |
| **single** | 32-bit floating point |
| **int8 / int16 / ...** | Signed integers of various sizes |
| **char** | Character arrays (for text) |
| **string** | Modern string objects (for text) |
| **logical** | `true` (1) or `false` (0) |

## Cells and Structs

1.  **Cell Array**: A matrix where each element can be a different type or size. Use curly braces **`{ }`**.
2.  **Struct**: A structure with named fields (like a class or a dictionary).

```matlab
person.name = 'Alpha';
person.age = 25;
```

## Summary

| Term | Description |
| :--- | :--- |
| **[ ]** | Syntax for creating a matrix |
| **( )** | Syntax for accessing matrix elements |
| **{ }** | Syntax for creating/accessing cell arrays |
| **;** | Suppress output in the command window |
| **ans** | Default variable name for results not assigned to a variable |
| **Best For** | Efficiently handling mathematical and physical data |
| **Logic** | "Matrix-first" design |
| **Safety** | Out-of-bounds access is caught immediately |
| **Modern** | The `string` type is now preferred over `char` arrays |
| **Standard** | Use `snake_case` for variables by convention |
| **Identity** | High-precision numeric computing |
