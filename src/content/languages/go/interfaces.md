---
title: "Interfaces"
description: "Implicit satisfaction, empty interface, and type assertions"
---

## What is an Interface?

In **Go**, an **Interface** is a set of method signatures. It defines the "behavior" of an object. 

Unlike Java or C#, you don't use a keyword like `implements`. A type satisfies an interface **implicitly** just by having the required methods. This is often called **"Duck Typing."**

```go
type Speaker interface {
    Speak() string
}

type Dog struct{}

// Dog implements Speaker just by defining the method!
func (d Dog) Speak() string {
    return "Woof!"
}
```

## Why use Interfaces?

1.  **Decoupling**: Your code can depend on behaviors (interfaces) rather than concrete implementations (structs).
2.  **Polymorphism**: You can treat different types as the same interface type if they share the same methods.
3.  **Mocking**: Interfaces make it incredibly easy to swap real database connections for "mock" versions during testing.

## The Empty Interface (`interface{}` or `any`)

The **empty interface** specifies zero methods. Because every type has at least zero methods, **every type satisfies the empty interface**. In Go 1.18+, you can use the alias **`any`**.

```go
func printAnything(v any) {
    fmt.Println(v)
}
```

## Type Assertions

A **Type Assertion** allows you to "extract" the underlying concrete value from an interface.

```go
var i interface{} = "hello"

s := i.(string)     // Success! s is now a string
// f := i.(float64) // PANIC! i is not a float64
```

To avoid panics, use the "Comma-OK" pattern:
```go
s, ok := i.(string)
if ok {
    fmt.Println(s)
}
```

## Type Switches

A **Type Switch** is a cleaner way to handle multiple possible types for an interface value.

```go
switch v := i.(type) {
case int:
    fmt.Println("It's an int!")
case string:
    fmt.Println("It's a string!")
default:
    fmt.Println("Unknown type.")
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **Interface** | A set of method signatures |
| **Implicit** | No `implements` keyword required |
| **any** | The empty interface (Satisfied by everything) |
| **Assertion** | `i.(Type)` - Extracting the value |
| **Type Switch** | `switch i.(type)` - Branching by type |
| **Best For** | Decoupling, Testing, Generic data handling |
| **Small** | Idiom: Go interfaces should be tiny (1-3 methods) |
| **Composition** | Interfaces can be embedded in other interfaces |
| **Logic** | "Accept interfaces, return structs" (Go Proverb) |
| **Safety** | Runtime check required for assertions to avoid panics |
| **Identity** | An interface variable contains (Value, Type) |
| **Standard** | `io.Reader`, `io.Writer`, `error`, `fmt.Stringer` |
