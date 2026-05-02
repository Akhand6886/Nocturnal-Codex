---
title: "Async & Await"
description: "Non-blocking I/O and asynchronous programming in .NET"
---

## Why Asynchronous?

In modern apps, tasks like reading a file or calling an API can take time. If you do this on the **Main Thread**, your application will "freeze" or stop responding. **Async/Await** allows you to perform these tasks in the background without blocking the UI or server threads.

```csharp
public async Task<string> FetchDataAsync() {
    var client = new HttpClient();
    string result = await client.GetStringAsync("https://api.example.com");
    return result;
}
```

## Task and Task<T>

-   **`Task`**: Represents an operation that returns nothing (`void`).
-   **`Task<T>`**: Represents an operation that returns a value of type `T`.

## The `await` Keyword

Wait! The `await` keyword tells the compiler: "Suspend this method until this task finishes, but let the rest of the application keep running."

## Error Handling in Async

You use standard `try/catch` blocks. When an error happens in an async task, it is "captured" and re-thrown when you `await` the task.

```csharp
try {
    await DoWorkAsync();
} catch (Exception ex) {
    Console.WriteLine($"Error: {ex.Message}");
}
```

## Best Practices

1.  **Async All the Way**: Once you start using async, your entire call chain should be async.
2.  **Avoid `void`**: Use `Task` instead of `async void` (except for UI event handlers).
3.  **Naming**: By convention, async methods should end with the suffix **`Async`**.

> [!IMPORTANT]
> Never use `.Result` or `.Wait()` on an async task. This can cause **Deadlocks** where your application freezes forever. Always use `await`.

## Summary

| Term | Description |
| :--- | :--- |
| **async** | Keyword that enables the `await` keyword in a method |
| **await** | Suspension point for asynchronous execution |
| **Task** | The primary object representing asynchronous work |
| **ValueTask** | Optimized version of Task for high-performance scenarios |
| **Cancellation**| Using `CancellationToken` to stop long-running tasks |
| **Best For** | Web requests, Database calls, File I/O |
| **Logic** | Scaling: Handle more requests with fewer threads |
| **Safety** | Prevents deadlocks and UI freezes |
| **Modern** | `IAsyncEnumerable<T>` for streaming data asynchronously |
| **Standard** | Part of .NET since 2012 (C# 5.0) |
| **Efficiency**| Frees up the thread to do other work while waiting |
