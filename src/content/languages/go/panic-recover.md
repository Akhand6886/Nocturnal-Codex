---
title: "Panic & Recover"
description: "When to panic, defer+recover pattern, and stack unwinding"
---

## What is a Panic?

A **Panic** is an unrecoverable error that stops the execution of your program immediately. It is similar to an "Exception" in other languages, but it should only be used for situations the program cannot possibly recover from (like an array index out of bounds or a lost database connection during startup).

```go
func main() {
    panic("Something went horribly wrong!")
}
```

## The Lifecycle of a Panic

1.  **Starts**: The program stops executing current logic.
2.  **Unwinds**: All **`defer`** functions are executed in LIFO order.
3.  **Crashes**: The program terminates and prints a stack trace.

## Recovering from a Panic

Wait! You can stop a panic from crashing your program using the **`recover`** function. This **must** be called inside a **`defer`** function.

```go
func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()

    panic("CRASH!")
    fmt.Println("This line never runs.")
}
```

## When to use Panic?

-   **Development**: Catching programmer errors (like `nil` pointer dereferences).
-   **Startup**: If the app cannot start without a specific config file or environment variable.
-   **NEVER** use panic for normal error handling (like a missing file or an invalid user input). Use the `error` interface instead!

> [!CAUTION]
> Recovering from a panic doesn't mean your program is in a "safe" state. Be careful when continuing execution after a recovery!

## Summary

| Term | Description |
| :--- | :--- |
| **panic()** | Stop execution and start unwinding |
| **recover()**| Stop a panic and return its value |
| **defer** | Where `recover` MUST be called |
| **Unwinding**| Running all deferred functions after a panic |
| **Stack Trace**| The detailed error log printed during a crash |
| **Best For** | Startup failures, internal sanity checks |
| **Worst For** | Regular error handling (Use `error` instead!) |
| **Runtime** | Go's runtime panics on divide-by-zero or OOB index |
| **Safe** | Recovering allows you to log the error before exiting |
| **Logic** | "Don't panic; handle your errors" (Go Proverb) |
| **Standard** | Use `log.Fatal` for startup errors instead of raw panic |
| **Safety** | Prevents the whole server from crashing due to one bad request |
