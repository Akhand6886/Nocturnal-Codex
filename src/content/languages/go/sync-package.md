---
title: "sync Package"
description: "WaitGroup, Mutex, Once, and Pool"
---

## Why the `sync` Package?

While channels are the preferred way to communicate in Go, sometimes you need more traditional low-level synchronization tools. The **`sync`** package provides these primitives.

## 1. `WaitGroup`

A **`WaitGroup`** is used to wait for a collection of goroutines to finish executing.

```go
var wg sync.WaitGroup

for i := 1; i <= 5; i++ {
    wg.Add(1) // Increment the counter
    go func(id int) {
        defer wg.Done() // Decrement the counter when finished
        fmt.Printf("Worker %d starting\n", id)
    }(i)
}

wg.Wait() // Block until the counter is zero!
```

## 2. `Mutex` (Mutual Exclusion)

If you have a piece of data that multiple goroutines need to modify (like a counter), you use a **`Mutex`** to ensure only one goroutine can access it at a time.

```go
var mu sync.Mutex
var count int

func increment() {
    mu.Lock()
    defer mu.Unlock() // Always unlock using defer!
    count++
}
```

Wait! If you only have many **readers** and one **writer**, use **`RWMutex`**. It allows multiple goroutines to read at the same time, but only one to write.

## 3. `sync.Once`

`sync.Once` ensures that a function is executed **exactly once**, no matter how many times it's called or how many goroutines are calling it. This is perfect for initializing singletons or database connections.

```go
var once sync.Once
once.Do(func() {
    // Initialization code runs only once!
})
```

## 4. `sync.Map`

A standard Go map is not safe for concurrent use. `sync.Map` is a specialized map type designed for cases where keys are stable and there are many readers.

## Summary

| Term | Full Name | Description |
| :--- | :--- | :--- |
| **WaitGroup** | `sync.WaitGroup` | Waiting for multiple tasks to finish |
| **Mutex** | `sync.Mutex` | Exclusive access to data (One writer) |
| **RWMutex** | `sync.RWMutex` | Shared read access, exclusive write access |
| **Once** | `sync.Once` | Running a task exactly once |
| **Pool** | `sync.Pool` | Reusing allocated objects to reduce GC pressure |
| **Locker** | Interface | Anything that can `Lock()` and `Unlock()` |
| **Best For** | Low-level state, high-performance counters, caches |
| **Safety** | Prevents Data Races at runtime (Use `go test -race`!) |
| **Deadlock** | Error | When goroutines wait for each other's locks forever |
| **Copying** | WARNING | Do NOT copy a Mutex or WaitGroup after use! |
| **Standard** | Part of the Go core library since day one |
| **Logic** | Use channels for communication; Use sync for state |
