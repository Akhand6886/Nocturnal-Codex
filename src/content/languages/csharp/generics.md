---
title: "Generics"
description: "Type-safe code reuse using type parameters and constraints"
---

## What are Generics?

**Generics** allow you to write a class or method that can work with any data type, while still maintaining full type safety. You use angle brackets **`<T>`** to define a type parameter.

```csharp
public class Box<T> {
    public T Content { get; set; }
}

var intBox = new Box<int> { Content = 42 };
var stringBox = new Box<string> { Content = "Hello" };
```

## Generic Methods

You can also make individual methods generic.

```csharp
public T GetDefault<T>() => default(T);
```

## Generic Constraints (`where`)

Wait! Sometimes you need to restrict which types can be used. You do this with the **`where`** keyword.

```csharp
// T must be a class and must have a parameterless constructor
public class Repository<T> where T : class, new() {
    public T Create() => new T();
}
```

## Common Constraints

| Constraint | Description |
| :--- | :--- |
| **where T : class** | T must be a reference type |
| **where T : struct**| T must be a value type |
| **where T : new()** | T must have a public parameterless constructor |
| **where T : Base** | T must inherit from `Base` |
| **where T : I...** | T must implement interface `I...` |

## Why use Generics?

1.  **Type Safety**: No more "casting" from `object`.
2.  **Performance**: Avoids "Boxing" (converting value types to objects), which is slow.
3.  **Code Reuse**: Write one list, one repository, one cache for all types.

## Summary

| Term | Description |
| :--- | :--- |
| **T** | Convention for Type Parameter |
| **default(T)** | Gets the "empty" value for a type (`0`, `null`, etc.) |
| **typeof(T)** | Gets the runtime type information |
| **covariance** | Using a more derived type (Advanced) |
| **contravariance**| Using a more base type (Advanced) |
| **Best For** | Collections, Repositories, API responses |
| **Logic** | "Write once, run for any type safely" |
| **Safety** | Catch type-related bugs at compile-time |
| **Modern** | The foundation of all .NET collections since 2.0 |
| **Identity** | Generics in .NET are "reified" (runtime knows the types) |
| **Efficiency**| No runtime overhead; specialized code is generated |
