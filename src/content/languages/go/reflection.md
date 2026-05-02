---
title: "Reflection"
description: "reflect package, type inspection, and use cases"
---

## What is Reflection?

**Reflection** is the ability of a program to inspect its own structure (types and values) at runtime. In **Go**, this is handled by the **`reflect`** package.

```go
import "reflect"
```

## Type and Value

There are two primary types in the `reflect` package:
1.  **`reflect.Type`**: Represents the Go type (e.g., `int`, `string`, `MyStruct`).
2.  **`reflect.Value`**: Represents the actual data inside the variable.

```go
x := 42
t := reflect.TypeOf(x)  // int
v := reflect.ValueOf(x) // 42
```

Wait! Reflection is powerful but should be used as a last resort. It is slower than regular code and can cause your program to panic if you are not careful with types.

## Inspecting Structs

Reflection is most commonly used to inspect struct fields and tags (e.g., in a JSON serializer or an ORM).

```go
type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

u := User{1, "Alpha"}
t := reflect.TypeOf(u)

for i := 0; i < t.NumField(); i++ {
    field := t.Field(i)
    fmt.Printf("Field: %s, Tag: %s\n", field.Name, field.Tag.Get("json"))
}
```

## The "Laws of Reflection"

1.  Reflection goes from interface value to reflection object.
2.  Reflection goes from reflection object to interface value.
3.  To modify a reflection object, the value must be settable (it must be a pointer!).

> [!WARNING]
> "Reflection is never elegant." (Rob Pike). Only use it if you are building a generic library that absolutely must work with any possible type.

## Summary

| Term | Description |
| :--- | :--- |
| **TypeOf** | Get the `reflect.Type` of a variable |
| **ValueOf** | Get the `reflect.Value` of a variable |
| **Kind** | The underlying type (e.g., `reflect.Struct`, `reflect.Int`) |
| **Interface()**| Converting a `reflect.Value` back to `any` |
| **Settability**| Whether a value can be changed via reflection (requires pointer!) |
| **Best For** | JSON encoders, ORMs, DI containers, template engines |
| **Speed** | Significantly slower than direct code |
| **Safety** | Bypasses compile-time type safety; prone to runtime panics |
| **Logic** | Use type switches or generics instead of reflection whenever possible |
| **Standard** | `encoding/json` uses reflection to map bytes to structs |
| **Metadata** | The only way to read struct "Tags" at runtime |
| **Tooling** | Essential for building generic tools and frameworks |
