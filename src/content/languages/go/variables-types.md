---
title: "Variables & Types"
description: "var, :=, basic types, zero values, and type conversion"
---

## Declaring Variables

In **Go**, there are two main ways to declare variables:

### 1. The `var` Keyword
Use `var` for package-level variables or when you want to declare a variable without immediately assigning a value.

```go
var x int = 10
var y = "Hello" // Type is inferred as string
var z int       // Initialized to 0 (the Zero Value)
```

### 2. Short Declaration (`:=`)
This is the most common way to declare variables inside a function. It is concise and infers the type automatically.

```go
func main() {
    message := "Hi!" // Declares and initializes
    count := 42
}
```

Wait! You can **only** use `:=` inside a function. At the package level (outside functions), you must use `var`.

## Basic Types

| Category | Types | Examples |
| :--- | :--- | :--- |
| **Integers** | `int`, `int8`, `uint64` | `int` size depends on the OS (32 or 64-bit) |
| **Floats** | `float32`, `float64` | Default for `:=` is `float64` |
| **Strings** | `string` | Immutable sequence of bytes |
| **Boolean** | `bool` | `true` or `false` |

## Zero Values

In Go, variables are never "undefined." If you don't provide an initial value, the variable is automatically initialized to its **Zero Value**:

-   `0` for numeric types.
-   `false` for booleans.
-   `""` for strings.
-   `nil` for pointers, functions, interfaces, slices, channels, and maps.

## Constants (`const`)

Constants are declared like variables but with the `const` keyword. They cannot be changed after declaration.

```go
const Pi = 3.14
```

## Type Conversion

Go is very strict about types. You cannot perform operations between different types (like adding an `int` and a `float64`) without explicit conversion.

```go
i := 42
f := float64(i) // Manual conversion
```

## Summary

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **var** | `var x int` | Standard declaration |
| **:=** | `x := 10` | Short declaration (Inside fn only) |
| **const** | `const X = 5` | Immutable value |
| **Zero Value** | `int` -> 0 | Default values for all types |
| **int** | `int` | Platform-dependent integer |
| **string** | `"hello"` | Immutable text |
| **bool** | `true` | Boolean logic |
| **Infer** | `x := 5` | Automatic type detection |
| **Convert** | `T(v)` | Explicit type casting |
| **Multiple** | `a, b := 1, 2` | Declaring many variables at once |
| **Blank** | `_` | The "Blank Identifier" (Used to ignore values) |
| **Iota** | `iota` | Special constant generator for Enums |
