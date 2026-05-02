---
title: "Testing"
description: "go test, table-driven tests, benchmarks, and fuzzing"
---

## Built-in Testing

**Go** has testing built directly into the language toolchain. You don't need a third-party library to write high-quality tests. 

Any file ending in **`_test.go`** is considered a test file by the Go compiler.

```go
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Expected 5, got %d", result)
    }
}
```

Wait! You run your tests using the command: **`go test`**.

## Table-Driven Tests

The "idiomatic" way to write tests in Go is using **Table-Driven Tests**. This allows you to test many different inputs and outputs using a single loop.

```go
func TestSum(t *testing.T) {
    tests := []struct {
        a, b, want int
    }{
        {1, 2, 3},
        {0, 0, 0},
        {-1, 1, 0},
    }

    for _, tt := range tests {
        got := Sum(tt.a, tt.b)
        if got != tt.want {
            t.Errorf("Sum(%d, %d) = %d; want %d", tt.a, tt.b, got, tt.want)
        }
    }
}
```

## Benchmarking

Go also has built-in support for performance testing. Benchmark functions start with **`Benchmark`** and take a `*testing.B` argument.

```go
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(2, 3)
    }
}
```
Run with: **`go test -bench=.`**

## Fuzz Testing (Go 1.18+)

**Fuzzing** is a type of automated testing which continuously provides random inputs to your program to find bugs that a human might miss.

```go
func FuzzReverse(f *testing.F) {
    f.Add("hello")
    f.Fuzz(func(t *testing.T, orig string) {
        // ... test logic ...
    })
}
```

## Summary

| Term | Command | Description |
| :--- | :--- | :--- |
| **go test** | `go test` | Run all tests in the package |
| **_test.go** | File Naming | Only these files are compiled for tests |
| **testing.T** | Parameter | Object for reporting failures |
| **testing.B** | Parameter | Object for running benchmarks |
| **testing.F** | Parameter | Object for fuzzing |
| **Verbose** | `go test -v` | See detailed output for each test |
| **Coverage** | `go test -cover`| See what % of your code is tested |
| **Best For** | Reliability, Documentation, Refactoring |
| **Logic** | "Clear is better than clever" (applies to tests too!) |
| **Safety** | Catch regressions before they hit production |
| **Fast** | Go tests are designed to be extremely fast |
| **Standard** | No external frameworks (like Jest or JUnit) needed |
| **Race** | `go test -race` | Built-in detector for concurrency bugs! |
