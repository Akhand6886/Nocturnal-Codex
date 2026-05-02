---
title: "Introduction to C#"
description: "Why C#, .NET, and your first Hello World program"
---

## What is C#?

**C#** (pronounced "C-Sharp") is a modern, object-oriented, and type-safe programming language developed by Microsoft. It runs on the **.NET** framework and is the language of choice for building Windows apps, enterprise software, and games using the **Unity** engine.

```csharp
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, Nocturnal Codex!");
    }
}
```

## Why Choose C#?

1.  **Versatility**: Use it for Web (ASP.NET), Mobile (MAUI), Desktop (WPF/WinForms), and Games (Unity).
2.  **Productivity**: Modern features like LINQ, Async/Await, and Pattern Matching make coding fast and expressive.
3.  **Safety**: Strong typing and automatic memory management (Garbage Collection) prevent many common bugs.
4.  **Ecosystem**: Backed by Microsoft and a massive community, with the world-class **Visual Studio** IDE.

## The .NET Ecosystem

Wait! C# doesn't run in a vacuum. It runs on **.NET**, which provides:
-   **Runtime (CLR)**: Handles memory, security, and compilation (JIT).
-   **Class Libraries**: Thousands of built-in types for everything from JSON to Networking.
-   **SDK & CLI**: Tools for building and running your apps (`dotnet build`, `dotnet run`).

## C# Evolution

C# moves fast! Every year, a new version is released with "Quality of Life" improvements. Modern C# (version 10, 11, 12+) is much more concise and powerful than the older versions you might see in legacy codebases.

> [!TIP]
> Use the `dotnet` CLI. It's the modern, cross-platform way to manage your C# projects on Windows, macOS, and Linux.

## Summary

| Feature | Description |
| :--- | :--- |
| **Creator** | Anders Hejlsberg (Microsoft) |
| **Paradigm** | Object-Oriented, Component-Oriented |
| **Memory** | Garbage Collected |
| **Tooling** | Visual Studio, VS Code, JetBrains Rider |
| **Framework** | .NET (Open Source, Cross-Platform) |
| **Speed** | High performance (Near-native with JIT/AOT) |
| **Best For** | Enterprise, Web Backends, Game Dev (Unity) |
| **Logic** | Clean, structured, and highly readable |
| **Safety** | Prevents null pointer and memory corruption bugs |
| **Modern** | Records, Pattern Matching, and Primary Constructors |
| **Binary** | Compiles to Intermediate Language (IL), then to Machine Code |
| **Standard** | ECMA-334 and ISO/IEC 23270 |
