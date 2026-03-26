---
id: "csharp"
name: "C#"
slug: "csharp"
description: "A modern, object-oriented language by Microsoft for building Windows applications, games, and cloud services."
iconName: "csharp"
year: 2000
creator: "Anders Hejlsberg (Microsoft)"
paradigm: ["Object-Oriented", "Functional", "Event-Driven"]
useCases: ["Game Development", "Enterprise Applications", "Cloud Services", "Desktop Apps"]
website: "https://dotnet.microsoft.com/en-us/languages/csharp"
category: "General Purpose"
featured: false
difficulty: "Intermediate"
topics:
  - section: "Basics"
    description: "C# fundamentals and the .NET platform."
    items:
      - title: "Introduction to C#"
        description: ".NET platform, CLI, and the C# compilation model"
      - title: "Variables & Types"
        description: "Value types vs reference types, var, and nullable types"
      - title: "Control Flow"
        description: "if/else, switch expressions, for, foreach, while"
      - title: "Methods"
        description: "Parameters (ref, out, in), overloading, and expression-bodied members"
      - title: "Strings"
        description: "Interpolation, verbatim strings, Span<char>, and StringBuilder"
  - section: "OOP"
    description: "Object-oriented programming in C#."
    items:
      - title: "Classes & Structs"
        description: "Properties, constructors, destructors, and init-only setters"
      - title: "Inheritance & Interfaces"
        description: "sealed, abstract, virtual, interface default methods"
      - title: "Generics"
        description: "Generic classes, methods, constraints, and covariance/contravariance"
      - title: "Records"
        description: "Immutable reference types with value equality (C# 9+)"
      - title: "Pattern Matching"
        description: "is, switch expressions, property patterns, and relational patterns"
  - section: "LINQ & Collections"
    description: "Language-integrated queries and data processing."
    items:
      - title: "LINQ Basics"
        description: "from/where/select, method syntax, and deferred execution"
      - title: "LINQ Operations"
        description: "GroupBy, Join, Aggregate, OrderBy, and custom operators"
      - title: "Collections"
        description: "List<T>, Dictionary<TK,TV>, HashSet<T>, and concurrent collections"
  - section: "Async Programming"
    description: "Asynchronous patterns in C#."
    items:
      - title: "async/await"
        description: "Task, Task<T>, ValueTask, and async method patterns"
      - title: "Parallel Programming"
        description: "Parallel.ForEach, PLINQ, and data parallelism"
      - title: "Channels"
        description: "Producer-consumer with System.Threading.Channels"
  - section: "Modern C#"
    description: "Latest features in C# 10-12."
    items:
      - title: "Primary Constructors"
        description: "Constructor parameters on class/struct declarations"
      - title: "Collection Expressions"
        description: "Simplified collection initialization with spread operator"
      - title: "Source Generators"
        description: "Compile-time code generation for serialization, DI, and more"
      - title: "ASP.NET Core"
        description: "Minimal APIs, controllers, middleware, and dependency injection"
---

## Overview

C# is a modern, general-purpose programming language developed by Microsoft as part of the .NET platform. It combines the power of C++ with the simplicity of Visual Basic. C# supports strong typing, lexical scoping, and garbage collection. With each release, it continues to add features like pattern matching, records, and top-level statements that keep it modern and expressive.

## Key Features

- **Modern syntax** — Records, pattern matching, nullable reference types
- **.NET ecosystem** — Access to the entire .NET class library
- **LINQ** — Language-integrated query for collections and databases
- **Async/await** — First-class asynchronous programming support
- **Cross-platform** — .NET (Core) runs on Windows, Linux, macOS

## Code Example

```csharp
public record Point(double X, double Y);

public static string Classify(Point point) => point switch
{
    { X: 0, Y: 0 } => "Origin",
    { X: var x, Y: 0 } => $"On X-axis at {x}",
    { X: 0, Y: var y } => $"On Y-axis at {y}",
    _ => $"Point({point.X}, {point.Y})"
};
```

## Learning Resources

- [Microsoft C# Documentation](https://learn.microsoft.com/en-us/dotnet/csharp/)
- [C# in Depth](https://csharpindepth.com/)
- [.NET Interactive Tutorials](https://dotnet.microsoft.com/en-us/learn)
