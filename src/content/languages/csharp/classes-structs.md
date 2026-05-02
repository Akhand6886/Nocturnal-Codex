---
title: "Classes & Structs"
description: "Reference types vs Value types in C# custom data structures"
---

## What is a Class?

A **Class** is the primary building block of **C#**. It is a **Reference Type** (stored on the heap) that defines a blueprint for objects. Classes support inheritance and polymorphism.

```csharp
public class User {
    public string Name { get; set; } // Property
    public int Age { get; set; }
    
    public void Display() => Console.WriteLine(Name);
}
```

## What is a Struct?

A **Struct** is similar to a class but is a **Value Type** (stored on the stack). Structs are used for small, lightweight data structures that don't need inheritance.

```csharp
public struct Point {
    public int X;
    public int Y;
}
```

## Classes vs. Structs

Wait! This is a common interview question. When should you use which?

| Feature | Class | Struct |
| :--- | :--- | :--- |
| **Type** | Reference Type | **Value Type** |
| **Memory** | Heap | **Stack** |
| **Inheritance**| Yes | No |
| **Default Val**| `null` | **Zeroed out values** |
| **Copying** | Copying the reference | **Copying the actual data** |

## Properties (`get; set;`)

In C#, we rarely use public fields. Instead, we use **Properties**. They look like fields but are actually special methods that allow you to control how data is read and written.

```csharp
private int _age;
public int Age {
    get => _age;
    set {
        if (value >= 0) _age = value;
    }
}
```

## Constructors

A **Constructor** is a special method called when you create an instance of a class or struct. It has the same name as the class.

```csharp
public User(string name) {
    Name = name;
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **new** | Keyword used to create an instance |
| **this** | Reference to the current instance |
| **static** | Shared across all instances of the class |
| **partial** | Splitting a class definition across multiple files |
| **readonly** | Field that can only be set in the constructor |
| **Best For** | Modeling complex objects (Classes) or simple data (Structs) |
| **Logic** | Classes represent "Entities"; Structs represent "Values" |
| **Safety** | Access modifiers (`public`, `private`, `protected`) |
| **Modern** | `Record` types combine the best of both (See Records section) |
| **Standard** | Use `PascalCase` for properties and `_camelCase` for private fields |
| **Memory** | GC cleans up classes; Structs are cleaned up when the scope ends |
| **Identity** | Reference equality (Classes) vs Value equality (Structs) |
