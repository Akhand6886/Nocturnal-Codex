---
title: "Introduction to Go"
description: "Why Go, installation, go run, and Hello World"
---

## What is Go?

**Go** (often called **Golang**) is an open-source programming language developed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. It was designed to solve Google's engineering challenges: slow builds, complex codebases, and the need for efficient concurrency.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Nocturnal Codex!")
}
```

## Why Choose Go?

1.  **Simplicity**: Go has a very small, clean syntax. There is usually only one "idiomatic" way to write a piece of code.
2.  **Concurrency**: Built-in support for **Goroutines** (lightweight threads) and **Channels** makes concurrent programming easy and efficient.
3.  **Fast Compilation**: Go was designed for speed. Large projects compile in seconds, not minutes.
4.  **Static Binaries**: Go compiles into a single, static binary. You don't need to install a runtime (like Java or Python) on your server to run your app.

## The Go Toolchain

Wait! How do you actually run Go code? You use the **`go`** command:

-   **`go run main.go`**: Compiles and runs your program in one step.
-   **`go build`**: Compiles your code into an executable binary.
-   **`go fmt`**: Automatically formats your code to follow the standard style (No more arguments about tabs vs spaces!).
-   **`go mod init`**: Starts a new module to manage your project's dependencies.

## Key Philosophies

-   **Composition over Inheritance**: Go does not have classes or inheritance. It uses **Structs** and **Interfaces**.
-   **Error Handling**: Go treats errors as values. You'll see `if err != nil` everywhere—this ensures that errors are never ignored.
-   **Garbage Collection**: Go manages memory for you automatically, so you don't have to worry about manual allocation.

> [!TIP]
> The most important tool in your Go journey is `go fmt`. Run it on every file before you commit! Most editors (like VS Code) do this automatically on save.

## Summary

| Feature | Description |
| :--- | :--- |
| **Creator** | Google (2009) |
| **Type System**| Static, Strong, and Inferenced |
| **Concurrency**| Goroutines and Channels |
| **Memory** | Garbage Collected |
| **Tooling** | Built-in build, test, and format tools |
| **Speed** | Near-C performance with Python-like simplicity |
| **Best For** | Cloud infra, Microservices, CLI tools, DevOps |
| **Philosophy** | Less is more; Simplicity over features |
| **Binary** | Single, self-contained executable |
| **Modules** | The standard way to manage dependencies (since 1.11) |
| **Standard L.**| Robust library for networking, HTTP, and JSON |
| **Wasm** | Compiles to WebAssembly for browser performance |
