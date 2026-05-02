---
title: "Select"
description: "Multiplexing channels, timeout, and non-blocking operations"
---

## What is `select`?

The **`select`** statement lets a goroutine wait on multiple communication operations. It’s like a `switch` statement but specifically for **Channels**.

```go
select {
case msg1 := <-ch1:
    fmt.Println("Received", msg1)
case msg2 := <-ch2:
    fmt.Println("Received", msg2)
}
```

Wait! If multiple cases are ready at the same time, `select` picks one **at random**.

## Timeouts with `select`

Because `select` blocks until one of its cases can run, you can use it to implement timeouts by adding a case that waits for a timer.

```go
select {
case res := <-c1:
    fmt.Println(res)
case <-time.After(1 * time.Second):
    fmt.Println("Timeout!")
}
```

## Non-Blocking Operations

By adding a **`default`** case, you can make your channel operations non-blocking. If no other case is ready, the `default` case runs immediately.

```go
select {
case msg := <-messages:
    fmt.Println("received message", msg)
default:
    fmt.Println("no message received")
}
```

## Empty `select`

An empty `select` statement (`select {}`) blocks forever. This is occasionally used in main to keep the program alive while background goroutines do work.

> [!NOTE]
> `select` is the key to building complex concurrent patterns like the **Fan-in**, **Fan-out**, and **Worker Pools**.

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **select** | `select { ... }` | Multiplexing channel communications |
| **case** | `case <-ch:` | Waiting for a channel event |
| **default** | `default:` | Run if no channels are ready (Non-blocking) |
| **time.After**| `<-time.After(d)` | Standard way to handle timeouts |
| **Random** | Logic | Ties are broken randomly to avoid starvation |
| **Best For** | Timeouts, Cancellation, Multiplexing |
| **Safety** | Prevents deadlocks by providing a "way out" |
| **Loop** | `for { select { ... } }` | Common pattern for long-running workers |
| **Channel** | `nil` | Cases with `nil` channels are never selected |
| **Logic** | The primary way to orchestrate multiple streams of data |
| **Modern** | Powering high-performance cloud tools like Kubernetes |
| **Wasm** | Perfect for handling UI events and network tasks simultaneously |
