---
title: "Strings"
description: "Immutability, Interpolation, and StringBuilder"
---

## What is a String?

In **C#**, a **String** is an object of type `System.String`. It represents a sequence of Unicode characters.

```csharp
string greeting = "Hello, Nocturnal Codex!";
```

## String Immutability

Wait! Strings in C# are **Immutable**. This means once a string is created, it cannot be changed. When you "modify" a string (e.g., adding text), you are actually creating a **brand new string** in memory.

```csharp
string s = "A";
s += "B"; // A new string "AB" is created; the old "A" is discarded.
```

## String Interpolation (`$""`)

The most common and readable way to combine strings is using **Interpolation**. You prefix the string with `$` and put your variables inside `{}`.

```csharp
string name = "Alpha";
int age = 25;
string message = $"Hello, {name}! You are {age} years old.";
```

## Verbatim Strings (`@""`)

Use the `@` prefix for strings that contain many backslashes (like file paths) or span multiple lines.

```csharp
string path = @"C:\Users\Alpha\Documents";
string multi = @"This is a
multi-line string.";
```

## `StringBuilder`: For Performance

If you are modifying a string thousands of times (like in a loop), using `+=` will be very slow and waste memory. Instead, use the **`StringBuilder`** class.

```csharp
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.Append(i);
}
string final = sb.ToString();
```

## Summary

| Term | Description |
| :--- | :--- |
| **Immutable** | Cannot be changed after creation |
| **Interpolation**| `$"{var}"` - Modern way to format strings |
| **Verbatim** | `@"..."` - Ignores escape characters |
| **StringBuilder**| Best for massive string manipulation |
| **Interning** | Optimization where the runtime reuses identical strings |
| **Substring** | Getting a part of a string |
| **Split / Join** | Converting between strings and arrays |
| **Best For** | User input, logging, JSON, HTML generation |
| **Logic** | Text handling is the core of most applications |
| **Safety** | Strings are reference types but behave like value types |
| **Modern** | `ReadOnlySpan<char>` for ultra-high performance text parsing |
| **Standard** | Use `string.IsNullOrEmpty(s)` to check for empty strings |
| **Identity** | Strings use UTF-16 encoding internally |
