---
title: "Source Generators"
description: "Metaprogramming and code generation at compile-time"
---

## What is a Source Generator?

A **Source Generator** is a feature in the .NET compiler (Roslyn) that lets you inspect your code and generate **additional** C# source files during compilation. 

Unlike **Reflection**, which happens at runtime and can be slow, Source Generators happen at **compile-time**, resulting in much faster and more efficient applications.

## How they Work

1.  **Analyze**: The generator looks at your code (using attributes or partial classes).
2.  **Generate**: It creates new C# code based on what it found.
3.  **Compile**: The newly generated code is compiled along with your original code.

## A Practical Example: `JSON`

Instead of the JSON library using reflection to "figure out" your objects every time they are serialized, a Source Generator can create optimized code to handle your specific classes perfectly.

```csharp
[JsonSerializable(typeof(MyUser))]
public partial class MyContext : JsonSerializerContext { }
```

Wait! Notice the **`partial`** keyword. Source Generators almost always work with partial classes so they can "add" code to your existing definitions.

## Why use Source Generators?

1.  **Performance**: Remove the need for slow runtime reflection.
2.  **Productivity**: Automatically generate repetitive code (like `INotifyPropertyChanged` or Data Mappers).
3.  **AOT Compatibility**: Since everything is generated at compile-time, it works perfectly with "Ahead-of-Time" compilation for mobile and web.

## Summary

| Term | Description |
| :--- | :--- |
| **Roslyn** | The .NET compiler platform that powers generators |
| **partial** | Key requirement for classes that use generators |
| **Attribute** | Often used to "mark" where code should be generated |
| **AOT** | Ahead-of-Time compilation (Fast startup!) |
| **Metaprogram.**| Code that writes code |
| **Best For** | Serializers, Mappers, Dependency Injection, UI boilerplate |
| **Logic** | "Shift runtime work to compile-time" |
| **Safety** | Errors in generated code are caught during build |
| **Modern** | Replaces heavy use of T4 templates and Reflection |
| **Standard** | Used heavily in ASP.NET Core and MAUI |
| **Efficiency**| Zero runtime overhead for the generated features |
| **Tooling** | You can see the generated files in Visual Studio's Solution Explorer |
