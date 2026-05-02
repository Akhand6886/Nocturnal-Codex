---
title: "Control Flow"
description: "if, switch (no break needed), for (the only loop), defer"
---

## Conditional Branching (`if`)

In **Go**, the `if` statement doesn't require parentheses around the condition. It can also include a short "initialization" statement before the condition.

```go
if x := 10; x > 5 {
    fmt.Println("Large!")
}
```

Wait! Variables declared in the `if` initialization are only in scope until the end of the `if/else` block.

## The Only Loop: `for`

Go has **only one** looping construct: the `for` loop. It can be used in three different ways:

1.  **Standard**: `for i := 0; i < 10; i++ { ... }`
2.  **While-style**: `for x < 100 { ... }`
3.  **Infinite**: `for { ... }`

```go
// Looping through a collection (Range)
for index, value := range mySlice {
    fmt.Println(index, value)
}
```

## `switch` Statement

Go's `switch` is much cleaner than in C or Java.
-   No `break` is needed; it stops after the first matching case automatically.
-   Cases can be expressions, not just constants.
-   A `switch` with no expression is just a cleaner way to write a long `if/else` chain.

```go
switch os := runtime.GOOS; os {
case "darwin":
    fmt.Println("macOS.")
case "linux":
    fmt.Println("Linux.")
default:
    fmt.Println("Something else.")
}
```

## The `defer` Keyword

Wait! This is one of Go's most unique features. **`defer`** schedules a function call to be run **immediately after** the surrounding function returns. It is most commonly used for cleanup (closing files, unlocking mutexes).

```go
func main() {
    defer fmt.Println("world")
    fmt.Println("hello")
}
// Output: hello world
```

> [!TIP]
> Deferred calls are pushed onto a stack. If you have multiple `defer` statements, they will run in **Last-In, First-Out (LIFO)** order.

## Summary

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **if** | `if c { ... }` | Standard conditional |
| **init if** | `if x := 1; x < 5` | Conditional with local variable |
| **for** | `for { ... }` | The ONLY loop in Go |
| **range** | `for k, v := range` | Iterating through slices/maps/channels |
| **switch** | `switch { ... }` | Multi-way branching (no break needed) |
| **defer** | `defer f()` | Delayed execution until return |
| **break** | `break` | Exit a loop or switch |
| **continue** | `continue` | Skip to next loop iteration |
| **fallthrough**| `fallthrough` | Manually force next switch case to run |
| **Logic** | Clean, minimalist, and easy to read |
| **Safety** | Prevents "Dangling else" and "forgotten break" bugs |
