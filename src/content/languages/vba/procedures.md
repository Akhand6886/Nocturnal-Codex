---
title: "Procedures"
description: "Subs vs Functions: The building blocks of VBA code"
---

## What is a Procedure?

A **Procedure** is a block of code that performs a specific task. In **VBA**, there are two primary types of procedures: **Subs** and **Functions**.

## 1. Sub Procedures (`Sub`)

A **Sub** (Subroutine) performs an action but does **not** return a value. These are the "Macros" that you run by clicking a button.

```vba
Sub GreetUser()
    MsgBox "Hello, User!"
End Sub
```

## 2. Function Procedures (`Function`)

A **Function** performs a calculation and **returns** a value. You can use these in your code, or even call them directly from an Excel cell (a "User Defined Function" or UDF).

```vba
Function AddTwo(a As Long, b As Long) As Long
    AddTwo = a + b
End Function
```

Wait! In VBA, you "return" a value by assigning it to the **name of the function itself**.

## Passing Arguments

You can pass data into procedures.
-   **ByVal**: Passes a copy of the data (Safe).
-   **ByRef**: Passes a reference to the data (Default). Changes to the variable inside the sub will affect the original variable outside!

## Public vs. Private

-   **Public**: Available to all modules in the project (Default).
-   **Private**: Available only within the module where it is defined.

## Summary

| Term | Description |
| :--- | :--- |
| **Sub** | An action-oriented block (Macro) |
| **Function** | A value-returning block (UDF) |
| **End Sub** | Keyword to finish a Sub |
| **ByVal** | Passing by value (Copy) |
| **ByRef** | Passing by reference (Original) |
| **Best For** | Organizing your code into modular, reusable steps |
| **Logic** | "Separate actions from calculations" |
| **Safety** | Use `Private` for utility subs to keep the "Macro List" clean |
| **Modern** | Functions can handle massive arrays of data efficiently |
| **Standard** | Use `PascalCase` for procedure names |
| **Identity** | The #1 way to extend Excel's built-in features |
