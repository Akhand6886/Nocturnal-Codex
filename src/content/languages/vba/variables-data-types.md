---
title: "Variables & Data Types"
description: "Dim, Long, String, and the importance of Option Explicit"
---

## Declaring Variables (`Dim`)

In **VBA**, you declare a variable using the **`Dim`** (Dimension) keyword. 

```vba
Dim name As String
Dim age As Integer
```

Wait! By default, VBA allows you to use variables without declaring them. This is dangerous! Always add **`Option Explicit`** to the very top of your module. It forces you to declare every variable, preventing typos from causing hidden bugs.

## Common Data Types

| Type | Description |
| :--- | :--- |
| **String** | Text data (`"Hello"`) |
| **Integer** | Whole numbers up to 32,767 |
| **Long** | Whole numbers up to 2 billion (Use this for Row counts!) |
| **Double** | Large decimals and scientific numbers |
| **Boolean** | `True` or `False` |
| **Date** | Date and Time values |
| **Variant** | A "catch-all" type that can hold anything (Slow and memory-heavy) |

## Constants (`Const`)

If a value never changes, declare it as a constant.

```vba
Const PI As Double = 3.14159
```

## The `Long` Rule

Wait! Professional VBA developers almost always use **`Long`** instead of `Integer`. Modern computers are optimized for 32-bit (Long) numbers, and an Integer is too small to hold the row count of a modern Excel sheet (over 1 million rows).

## Summary

| Term | Description |
| :--- | :--- |
| **Dim** | Declaring a variable |
| **As** | Defining the data type |
| **Option Exp.** | Force variable declaration (Safety first!) |
| **Long** | The standard type for whole numbers |
| **Variant** | The default type if you don't specify one |
| **Best For** | Efficient memory usage and bug prevention |
| **Logic** | "Strong typing for business data" |
| **Safety** | Prevents "undeclared variable" typos |
| **Modern** | Even in old VBA, type safety is critical |
| **Standard** | Use `Long` for all counters and row indices |
| **Identity** | Variables in VBA are cleared when the macro finishes |
