---
id: "go"
name: "Go"
slug: "go"
description: "A fast, statically-typed language by Google designed for simplicity, concurrency, and building scalable systems."
iconName: "go"
year: 2009
creator: "Robert Griesemer, Rob Pike, Ken Thompson (Google)"
paradigm: ["Procedural", "Concurrent"]
useCases: ["Cloud Infrastructure", "CLI Tools", "Microservices", "DevOps"]
website: "https://go.dev/"
category: "Systems"
featured: true
difficulty: "Beginner"
topics:
  - section: "Basics"
    description: "Go fundamentals — syntax, types, and program structure."
    items:
      - title: "Introduction to Go"
        description: "Why Go, installation, go run, and Hello World"
      - title: "Variables & Types"
        description: "var, :=, basic types, zero values, and type conversion"
      - title: "Functions"
        description: "Multiple return values, named returns, and variadic functions"
      - title: "Control Flow"
        description: "if, switch (no break needed), for (the only loop), defer"
      - title: "Packages & Imports"
        description: "Package system, visibility (capitalization), and go mod"
  - section: "Data Structures"
    description: "Go's built-in composite types."
    items:
      - title: "Arrays & Slices"
        description: "Fixed-size arrays, dynamic slices, append, copy, and capacity"
      - title: "Maps"
        description: "Hash maps, iteration, delete, and comma-ok idiom"
      - title: "Structs"
        description: "Field types, embedding, methods, and pointer receivers"
      - title: "Pointers"
        description: "Address-of (&), dereference (*), and no pointer arithmetic"
  - section: "Interfaces & Error Handling"
    description: "Go's approach to polymorphism and errors."
    items:
      - title: "Interfaces"
        description: "Implicit satisfaction, empty interface, and type assertions"
      - title: "Error Handling"
        description: "error interface, errors.Is/As, wrapping with %w, and sentinel errors"
      - title: "Panic & Recover"
        description: "When to panic, defer+recover pattern, and stack unwinding"
  - section: "Concurrency"
    description: "Go's killer feature — goroutines and channels."
    items:
      - title: "Goroutines"
        description: "Lightweight threads, go keyword, and goroutine lifecycle"
      - title: "Channels"
        description: "Unbuffered, buffered, directional channels, and close"
      - title: "Select"
        description: "Multiplexing channels, timeout, and non-blocking operations"
      - title: "sync Package"
        description: "WaitGroup, Mutex, Once, and Pool"
      - title: "Context"
        description: "Cancellation, deadlines, and request-scoped values"
  - section: "Advanced Topics"
    description: "Production-ready Go techniques."
    items:
      - title: "Generics (1.18+)"
        description: "Type parameters, constraints, and generic data structures"
      - title: "Testing"
        description: "go test, table-driven tests, benchmarks, and fuzzing"
      - title: "Reflection"
        description: "reflect package, type inspection, and use cases"
      - title: "CGo"
        description: "Calling C code from Go and performance considerations"
---

## Overview

Go (or Golang) is an open-source programming language designed at Google. It is syntactically similar to C but with memory safety, garbage collection, structural typing, and built-in concurrency through goroutines. Go's simplicity and speed of compilation make it ideal for building cloud infrastructure, network services, and command-line tools. Docker, Kubernetes, and Terraform are all written in Go.

## Key Features

- **Goroutines** — Lightweight concurrent execution with channels for communication
- **Fast compilation** — Compiles to native machine code in seconds
- **Simple syntax** — Deliberately minimal; one way to do things
- **Built-in tooling** — `go fmt`, `go test`, `go vet`, `go mod` out of the box
- **Static binary** — Single binary deployment with no dependencies

## Code Example

```go
package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    messages := []string{"Hello", "from", "Go", "goroutines!"}

    for _, msg := range messages {
        wg.Add(1)
        go func(m string) {
            defer wg.Done()
            fmt.Println(m)
        }(msg)
    }
    wg.Wait()
}
```

## Learning Resources

- [A Tour of Go](https://go.dev/tour/)
- [Effective Go](https://go.dev/doc/effective_go)
- [Go by Example](https://gobyexample.com/)
