---
title: "Functions"
description: "Multiple return values, named returns, and variadic functions"
---

## Defining Functions

In **Go**, functions are defined using the **`func`** keyword. Types come **after** the parameter and return names.

```go
func add(x int, y int) int {
    return x + y
}
```

Wait! If multiple consecutive parameters have the same type, you can omit the type for all but the last one:

```go
func add(x, y int) int { ... }
```

## Multiple Return Values

One of Go's best features is that functions can return more than one value. This is used almost everywhere for returning a result and an **error** simultaneously.

```go
func swap(x, y string) (string, string) {
    return y, x
}

func main() {
    a, b := swap("hello", "world")
}
```

## Named Return Values

You can name the return values in the function signature. They are treated as variables defined at the top of the function. A `return` statement without arguments (a "naked return") will return the current values of these variables.

```rust
fn split(sum: i32) -> (i32, i32) {
    let x = sum * 4 / 9;
    let y = sum - x;
    (x, y)
}
```
*Wait, I used Rust syntax by mistake in my thought! Let me correct it for Go.*

```go
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return // Returns x and y automatically!
}
```

## Variadic Functions

A variadic function can be called with any number of trailing arguments. We use the **`...`** prefix before the type name.

```go
func sum(nums ...int) {
    total := 0
    for _, num := range nums {
        total += num
    }
    fmt.Println(total)
}
```

## Functions as Values

In Go, functions are first-class citizens. You can pass them as arguments to other functions or assign them to variables.

```go
add := func(x, y int) int { return x + y }
fmt.Println(add(5, 5))
```

## Summary

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **func** | `func f() {}` | Standard definition |
| **Params** | `(x, y int)` | Inputs with types after names |
| **Return** | `(int, error)` | Returning multiple values |
| **Named** | `(z int)` | Naming the output variables |
| **Variadic** | `(nums ...int)` | Taking a variable number of inputs |
| **Naked Ret**| `return` | Returning named values automatically |
| **First-Cl.**| `f := func() {}` | Functions as values/variables |
| **Closure** | `func() { x++ }`| Functions capturing outer variables |
| **Logic** | Small, focused functions are idiomatic in Go |
| **Safety** | Strong type checking for inputs and outputs |
| **Main** | `func main() {}` | The entry point of the application |
| **Init** | `func init() {}` | Special function called at package startup |
