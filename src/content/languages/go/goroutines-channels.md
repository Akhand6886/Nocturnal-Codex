---
title: "Goroutines & Channels"
description: "Mastering Go's unique concurrency model (CSP)"
---

## What are Goroutines?

A **Goroutine** is a lightweight thread managed by the Go runtime. They are incredibly cheap compared to OS threads—you can start hundreds of thousands of them on a single laptop.

To start a goroutine, simply use the `go` keyword before a function call.

```go
func sayHello() {
    fmt.Println("Hello from a goroutine!")
}

func main() {
    go sayHello() // Runs concurrently
    time.Sleep(time.Second) // Wait so main doesn't exit immediately
}
```

## Channels: Communication is Key

Go follows the philosophy: *"Do not communicate by sharing memory; instead, share memory by communicating."* 

**Channels** are the pipes that connect concurrent goroutines. You can send values into channels from one goroutine and receive those values in another goroutine.

```go
func main() {
    ch := make(chan string)

    go func() {
        ch <- "Data from worker" // Send data
    }()

    msg := <-ch // Receive data (blocks until data is available)
    fmt.Println(msg)
}
```

## Buffered vs. Unbuffered Channels

- **Unbuffered**: (Default) Sending blocks until a receiver is ready. Good for synchronous coordination.
- **Buffered**: Sending only blocks when the buffer is full. Good for throughput.

```go
ch := make(chan int, 2) // Buffer of size 2
ch <- 1
ch <- 2 // Doesn't block
```

## The `select` Statement

The `select` statement lets a goroutine wait on multiple communication operations. It's like a `switch` for channels.

```go
select {
case msg1 := <-ch1:
    fmt.Println("Received", msg1)
case ch2 <- 42:
    fmt.Println("Sent to ch2")
case <-time.After(time.Second):
    fmt.Println("Timeout!")
}
```

## Summary Checklist
- [x] Goroutines are lightweight (starting at ~2KB).
- [x] Use `go` to run any function concurrently.
- [x] Use channels to pass data between goroutines safely.
- [x] Unbuffered channels are for synchronization; Buffered for performance.
- [x] Use `select` to handle multiple channels or timeouts.
- [x] Always close channels from the sender side when done.
