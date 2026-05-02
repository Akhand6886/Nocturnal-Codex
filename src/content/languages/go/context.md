---
title: "Context"
description: "Cancellation, deadlines, and request-scoped values"
---

## What is `Context`?

In **Go**, the **`context`** package is used to carry deadlines, cancellation signals, and other request-scoped values across API boundaries and between goroutines. It is essential for building robust servers that can cancel long-running tasks if a user disconnects.

```go
import "context"
```

Wait! You will see `ctx context.Context` as the **first argument** in thousands of Go functions. This is the standard convention!

## 1. Cancellation (`WithCancel`)

When you create a cancellation context, you get a `cancel` function. Calling this function tells all goroutines using that context to stop their work.

```go
ctx, cancel := context.WithCancel(context.Background())

go func(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            return // Stop working!
        default:
            // Do work...
        }
    }
}(ctx)

cancel() // Trigger the stop!
```

## 2. Deadlines and Timeouts

You can set a hard limit on how long a task should take.

-   **`WithTimeout`**: Cancels after a specific duration (e.g., 5 seconds).
-   **`WithDeadline`**: Cancels at a specific point in time (e.g., 5:00 PM).

```go
ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel() // Always call cancel to release resources!
```

## 3. Passing Values (`WithValue`)

Context can also store small pieces of data (like a user ID or an authentication token) that need to travel through many function calls.

```go
ctx := context.WithValue(parent, "userID", 123)
user := ctx.Value("userID")
```

> [!CAUTION]
> Don't use context values for passing optional parameters to functions. Use them only for data that is truly "request-scoped" (like trace IDs or auth data).

## Summary

| Term | Description |
| :--- | :--- |
| **Background** | `context.Background()` - The root context |
| **TODO** | `context.TODO()` - Placeholder when you're unsure |
| **Done()** | Channel that closes when the context is cancelled |
| **Err()** | Why the context was cancelled (`DeadlineExceeded` or `Canceled`) |
| **WithCancel** | Creating a context that can be stopped manually |
| **WithTimeout**| Creating a context that stops after a duration |
| **Best For** | Web servers, database queries, API clients |
| **Convention** | Always pass `ctx` as the FIRST parameter of a function |
| **Safety** | Prevents "Goroutine Leaks" (orphaned tasks) |
| **Logic** | Propagation: Parent cancellation flows to all children |
| **Immutability**| Contexts are immutable; you always derive NEW ones |
| **Standard** | Used by almost every Go library (SQL, HTTP, gRPC) |
