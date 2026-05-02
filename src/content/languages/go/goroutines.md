---
title: "Goroutines"
description: "Lightweight threads, go keyword, and goroutine lifecycle"
---

## What is a Goroutine?

A **Goroutine** is a lightweight thread managed by the **Go runtime**. While traditional OS threads take up about 1-2 MB of memory each, a goroutine starts with only **2 KB**. This means you can run millions of goroutines on a single computer without crashing!

```go
func main() {
    go sayHello() // Start a new goroutine!
    fmt.Println("Main function continues...")
}

func sayHello() {
    fmt.Println("Hello from a goroutine!")
}
```

Wait! If the `main` function finishes, all other goroutines are shut down immediately. In the example above, you might not see "Hello" because the program exits too fast.

## The `go` Keyword

You can turn any function call into a concurrent task simply by adding the **`go`** keyword before it.

```go
go someTask(1, 2, 3)
```

## How it Works: M:N Scheduling

Go uses an **M:N scheduler**, which means it maps **M** goroutines onto **N** OS threads. If one goroutine blocks (e.g., waiting for a file to read), the Go runtime automatically moves the other goroutines to a different OS thread so they can keep running. This is why Go is so efficient at handling many tasks.

## Why use Goroutines?

1.  **Scale**: Run millions of concurrent tasks.
2.  **Efficiency**: Extremely low memory overhead and fast context switching.
3.  **Simplicity**: The syntax is much easier than manual thread management or complex "async/await" loops.

> [!IMPORTANT]
> Goroutines run in the same address space. This means they can share memory, but you must be careful about **Data Races**. Always prefer **Channels** (see next section) to share data between goroutines!

## Summary

| Term | Description |
| :--- | :--- |
| **go** | Keyword to start a goroutine |
| **Main** | The primary goroutine (Program exits when this stops!) |
| **Stack** | Starts at 2KB and grows/shrinks as needed |
| **Scheduler** | The runtime part that manages goroutine execution |
| **Concurrent** | Handling multiple tasks at once |
| **Best For** | Web servers, background tasks, parallel processing |
| **Logic** | "Cheap to create, expensive to forget" (Avoid leaking!) |
| **Safety** | Use `sync.WaitGroup` to wait for goroutines to finish |
| **Identity** | Goroutines don't have IDs (By design!) |
| **Efficiency**| Handled entirely in User Space (No OS syscalls for switching) |
| **Wasm** | Goroutines work perfectly in the browser via WebAssembly |
| **Standard** | Every Go program uses at least one goroutine (main!) |
