---
title: "Channels"
description: "Unbuffered, buffered, directional channels, and close"
---

## What are Channels?

**Channels** are the pipes that connect concurrent goroutines. You can send values into channels from one goroutine and receive those values in another goroutine. 

Go’s philosophy is: **"Do not communicate by sharing memory; instead, share memory by communicating."**

```go
ch := make(chan string) // Create a channel

go func() {
    ch <- "ping" // SEND a value
}()

msg := <-ch // RECEIVE a value
```

## Unbuffered vs. Buffered Channels

### 1. Unbuffered (Default)
Sends and receives are **blocking**. A sender will wait until a receiver is ready to take the data. This provides a strong guarantee of synchronization.

```go
ch := make(chan int)
```

### 2. Buffered
Buffered channels have a capacity. Sends only block when the buffer is **full**. Receives only block when the buffer is **empty**.

```go
ch := make(chan int, 2) // Buffer of 2
ch <- 1 // Does not block
ch <- 2 // Does not block
// ch <- 3 // BLOCKS (Buffer is full!)
```

## Closing Channels

A sender can **`close`** a channel to indicate that no more values will be sent. 

```go
close(ch)
```

Wait! Only the **sender** should close a channel, never the receiver. Sending to a closed channel will cause a **panic**.

## Range over Channels

You can use a `for range` loop to receive values from a channel until it is closed.

```go
for msg := range ch {
    fmt.Println(msg)
}
```

## Directional Channels

When using channels as function parameters, you can specify if the function only sends or only receives.

-   **`chan<- T`**: Send-only channel.
-   **`<-chan T`**: Receive-only channel.

```go
func ping(pings chan<- string, msg string) {
    pings <- msg
}
```

## Summary

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **make** | `make(chan T)` | Creating a channel |
| **<-** | `ch <- v` | Sending data |
| **<-** | `v := <-ch` | Receiving data |
| **close** | `close(ch)` | Closing a channel |
| **len** | `len(ch)` | Number of items in buffer |
| **cap** | `cap(ch)` | Total capacity of buffer |
| **Deadlock** | Error | When all goroutines are sleeping/waiting |
| **Safety** | Thread-safe | Built-in mechanism for communication |
| **Best For** | Orchestration, pipelines, and data flow |
| **Sync** | Unbuffered channels synchronize two tasks |
| **Async** | Buffered channels allow tasks to move at different speeds |
| **Logic** | "Don't share memory; share data" |
| **Zero Val**| `nil` | Sending to or receiving from a `nil` channel blocks forever! |
