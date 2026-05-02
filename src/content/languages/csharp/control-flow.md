---
title: "Control Flow"
description: "if/else, switch, and the various loop types in C#"
---

## Conditional Logic (`if`)

In **C#**, the `if` statement evaluates a boolean expression to branch your code.

```csharp
if (age >= 18) {
    Console.WriteLine("Adult");
} else {
    Console.WriteLine("Minor");
}
```

## The Modern `switch`

C# has a very powerful `switch` statement that has evolved into a concise **Switch Expression** in recent versions.

```csharp
string result = status switch {
    "Active" => "Welcome!",
    "Pending" => "Please wait.",
    _ => "Unknown status" // The default case
};
```

## Loops in C#

Wait! C# provides four main types of loops. Choosing the right one makes your code cleaner.

1.  **`for`**: Best for when you know exactly how many times to run.
2.  **`foreach`**: The most common way to iterate through a collection (List, Array, etc.).
3.  **`while`**: Runs as long as a condition is true.
4.  **`do while`**: Runs at least once, then checks the condition.

```csharp
var fruits = new[] { "Apple", "Banana", "Cherry" };

foreach (var fruit in fruits) {
    Console.WriteLine(fruit);
}
```

## Branching Keywords

-   **`break`**: Exits the loop immediately.
-   **`continue`**: Skips the rest of the current iteration and starts the next one.
-   **`return`**: Exits the entire method.

> [!TIP]
> Always prefer `foreach` over `for` when working with collections. It's safer because you can't accidentally go "out of bounds."

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / else** | Basic branching |
| **switch** | Multi-way branching |
| **foreach** | Iterating through collections |
| **while** | Conditional looping |
| **break** | Stop the loop |
| **continue** | Skip current step |
| **yield** | Used for creating custom iterators (Advanced) |
| **Logic** | Control flow dictates the "intelligence" of your app |
| **Safety** | Compiler ensures all paths return a value in methods |
| **Modern** | Switch expressions make code much more functional and clean |
| **Identity** | `foreach` works on any type that implements `IEnumerable` |
| **Standard** | Use braces `{}` even for single-line `if` statements for clarity |
