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
---

## Overview

C# is a modern, general-purpose programming language developed by Microsoft as part of the .NET platform. It combines the power of C++ with the simplicity of Visual Basic. C# supports strong typing, lexical scoping, and garbage collection. With each release, it continues to add features like pattern matching, records, and top-level statements that keep it modern and expressive.

## Key Features

- **Modern syntax** — Records, pattern matching, nullable reference types
- **.NET ecosystem** — Access to the entire .NET class library
- **LINQ** — Language-integrated query for collections and databases
- **Async/await** — First-class asynchronous programming support
- **Cross-platform** — .NET (Core) runs on Windows, Linux, macOS

## Common Use Cases

- **Game Development** — Unity game engine (primary language)
- **Enterprise Software** — ASP.NET Core web apps and APIs
- **Desktop Applications** — WPF, WinForms, MAUI
- **Cloud & Microservices** — Azure Functions, gRPC services
- **Mobile Apps** — Xamarin / .NET MAUI

## Code Example

```csharp
// C# records and pattern matching
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
