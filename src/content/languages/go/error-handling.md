---
title: "Error Handling"
description: "error interface, errors.Is/As, wrapping with %w, and sentinel errors"
---

## Errors are Values

In **Go**, error handling is explicit. There are no "exceptions" or `try/catch` blocks. Instead, functions return an **`error`** as their last return value.

```go
func doWork() (int, error) {
    if somethingFailed {
        return 0, errors.New("something went wrong")
    }
    return 42, nil
}
```

Wait! You will see this pattern in almost every Go file you read:
```go
result, err := doWork()
if err != nil {
    // Handle the error!
    return err
}
```

## The `error` Interface

An error in Go is simply any type that implements the built-in `error` interface:

```go
type error interface {
    Error() string
}
```

## Creating Errors

1.  **`errors.New("msg")`**: For simple string errors.
2.  **`fmt.Errorf("failed: %v", err)`**: For building errors with more context.

## Error Wrapping (`%w`)

Since Go 1.13, you can **wrap** an error to add context while still preserving the original error for later inspection. Use the **`%w`** verb in `fmt.Errorf`.

```go
err := doDatabaseWork()
if err != nil {
    return fmt.Errorf("failed to save user: %w", err)
}
```

## Checking Errors (`errors.Is` and `errors.As`)

-   **`errors.Is(err, target)`**: Checks if an error (or any error it wraps) matches a specific value (**Sentinel Error**).
-   **`errors.As(err, &target)`**: Checks if an error matches a specific **type** and extracts the data if it does.

```go
if errors.Is(err, sql.ErrNoRows) {
    // Handle the specific "No Rows" case
}
```

> [!TIP]
> Always check for specific errors using `errors.Is` or `errors.As` rather than comparing strings. This makes your code more robust!

## Summary

| Term | Description |
| :--- | :--- |
| **error** | Built-in interface with `Error()` method |
| **nil** | No error occurred |
| **Sentinel** | A predefined error value (e.g., `io.EOF`) |
| **Wrapping** | Adding context with `fmt.Errorf("... %w", err)` |
| **errors.Is** | Checking for a specific error value |
| **errors.As** | Checking for a specific error type |
| **Best For** | Explicit, safe, and predictable error management |
| **Philosophy** | "Errors are not exceptional; they are expected" |
| **Refactor** | Use `%w` instead of `%v` when passing errors up the chain |
| **Custom** | Create a struct that implements `Error()` for data-rich errors |
| **Sentinel** | Convention: Name them `ErrSomething` (e.g., `ErrNotFound`) |
| **Safety** | Prevents crashes by forcing programmers to handle failures |
| **Identity** | An error can contain a whole stack of wrapped information |
