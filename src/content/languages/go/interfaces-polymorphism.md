---
title: "Interfaces & Polymorphism"
description: "Understanding Go's implicit and decoupled approach to polymorphism"
---

## What are Interfaces in Go?

In most languages, you explicitly state that a class implements an interface (e.g., `class Dog implements Animal`). 

In Go, interfaces are **satisfied implicitly**. A type implements an interface by simply implementing its methods. There is no `implements` keyword. This is often called **Duck Typing**: *"If it walks like a duck and quacks like a duck, it's a duck."*

## 1. Defining an Interface

An interface type is defined as a set of method signatures.

```go
type Shape interface {
    Area() float64
}
```

## 2. Implementing the Interface

To implement `Shape`, you just need to create a type with an `Area()` method.

```go
type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}
```

## 3. Polymorphism in Action

You can now write functions that accept the `Shape` interface, and they will work with any type that satisfies it.

```go
func PrintArea(s Shape) {
    fmt.Printf("Area: %.2f\n", s.Area())
}

func main() {
    c := Circle{Radius: 5}
    r := Rectangle{Width: 10, Height: 2}

    PrintArea(c)
    PrintArea(r)
}
```

## The Empty Interface `interface{}`

The empty interface specifies zero methods. Since every type has at least zero methods, **every type satisfies the empty interface**. This is used to handle values of unknown types (similar to `any` in TypeScript or `Object` in Java).

```go
func describe(i interface{}) {
    fmt.Printf("(%v, %T)\n", i, i)
}
```

## Summary Checklist
- [x] Interfaces are collections of method signatures.
- [x] Satisfaction is **implicit** (no `implements` keyword).
- [x] Interfaces enable decoupling between producers and consumers.
- [x] Keep interfaces small (e.g., `Reader`, `Writer`).
- [x] Use `interface{}` (or `any` in Go 1.18+) for generic logic.
- [x] Interfaces are the key to testability and mocking in Go.
---
