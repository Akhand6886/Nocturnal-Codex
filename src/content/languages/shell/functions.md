---
title: "Functions"
description: "Organizing shell logic into reusable blocks"
---

## Defining Functions

In **Bash**, functions are defined using a simple syntax. You don't specify parameters in the definition.

```bash
greet() {
    local name=$1
    echo "Hello, $name!"
}
```

## Passing Arguments

Wait! Just like a script, functions get their arguments through the special variables **`$1`**, **`$2`**, etc.

```bash
greet "Alpha"
```

## The `local` Keyword

Wait! This is critical. By default, all variables in a shell script are **Global**. If you don't use the **`local`** keyword inside a function, your variables might overwrite something else in your script and cause a major bug.

## Return Values

Functions in shell don't "return" a value like in other languages. They return an **Exit Status** (0-255). 
-   **0**: Success.
-   **1+**: Error.

If you want to "return" a string, you **`echo`** it and then capture it using command substitution:

```bash
get_status() {
    echo "Ready"
}

status=$(get_status)
```

## Summary

| Term | Description |
| :--- | :--- |
| **function_name()**| Syntax for declaring a function |
| **local** | Essential for scoping variables |
| **$1, $2...** | Arguments passed to the function |
| **$?** | Checking the success of the function call |
| **$( )** | Capturing function output |
| **Best For** | Reusability and breaking down complex scripts |
| **Logic** | "Procedural blocks of shell commands" |
| **Safety** | `local` prevents variable name collisions |
| **Modern** | Clean and modular script design |
| **Standard** | Use `snake_case` for function names |
| **Identity** | Functions allow scripts to be organized like real programs |
