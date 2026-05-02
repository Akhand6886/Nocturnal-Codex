---
title: "Structs"
description: "Field types, embedding, methods, and pointer receivers"
---

## What is a Struct?

A **Struct** is a collection of fields. In **Go**, structs are the primary way to create custom data types and group related data together.

```go
type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "Alpha", Age: 25}
    fmt.Println(p.Name)
}
```

## Methods on Structs

Go does not have classes. Instead, you define **Methods** on structs by specifying a "Receiver" between the `func` keyword and the function name.

```go
// A method with a Value Receiver
func (p Person) Greet() {
    fmt.Printf("Hi, I'm %s!\n", p.Name)
}
```

## Pointer Receivers vs. Value Receivers

Wait! This is a critical distinction in Go.

-   **Value Receiver**: Operates on a **copy** of the struct. Changes to the struct won't be saved.
-   **Pointer Receiver** (`*`): Operates on the **original** struct. Use this if you want to modify the data or if the struct is large (to avoid copying).

```go
func (p *Person) HaveBirthday() {
    p.Age++ // Modifies the original!
}
```

## Struct Embedding (Not Inheritance!)

Go uses **Embedding** to achieve composition. If you put one struct inside another without a name, the inner struct's fields are "promoted" to the outer struct.

```go
type Employee struct {
    Person // Embedded!
    ID     int
}

e := Employee{Person: Person{Name: "Bob"}, ID: 123}
fmt.Println(e.Name) // Accessed directly!
```

## JSON Tags

Structs are commonly used to handle JSON data. You can add metadata tags to control how fields are serialized.

```go
type User struct {
    Username string `json:"user_name"`
    Password string `json:"-"` // Ignore this field in JSON
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **Struct** | A custom group of named fields |
| **Method** | A function associated with a specific type |
| **Receiver** | The type a method belongs to |
| **Value Rec.** | Method works on a copy |
| **Pointer Rec.**| Method works on the original (Allows modification) |
| **Embedding** | Composition by nesting one struct in another |
| **Tags** | Metadata for serialization (JSON, DB, etc.) |
| **Zero Value** | A struct with all fields at their zero values |
| **Best For** | Modeling data, defining objects, API responses |
| **Logic** | Structs replace Classes in Go's philosophy |
| **Safety** | Capitalized fields are Exported (Public); others are Private |
| **Identity** | Structs are equal if all their fields are equal |
| **Constructor**| Idiom: `func NewPerson(name string) *Person` |
