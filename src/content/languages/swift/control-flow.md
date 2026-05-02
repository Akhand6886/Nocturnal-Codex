---
title: "Control Flow"
description: "if, switch, and loops in Swift"
---

## Conditional Logic (`if`)

In **Swift**, the parentheses around the condition are optional, but the braces `{}` are **required**, even for single lines.

```swift
if score >= 100 {
    print("Victory!")
} else {
    print("Keep playing")
}
```

## The Powerful `switch`

Wait! `switch` in Swift is much more powerful than in other languages.
-   **No "Fallthrough"**: It stops after matching one case (no need for `break`).
-   **Must be Exhaustive**: You must handle every possible value or provide a `default` case.
-   **Ranges**: You can match against ranges of values.

```swift
switch score {
case 0..<50:
    print("Low")
case 50...100:
    print("High")
default:
    print("Out of range")
}
```

## Loops in Swift

Swift provides two main types of loops:

1.  **`for-in`**: The most common way to iterate through a range or collection.
2.  **`while`**: Runs as long as a condition is true.

```swift
for index in 1...5 {
    print("Index is \(index)")
}

let names = ["Alpha", "Beta", "Gamma"]
for name in names {
    print("Hello \(name)")
}
```

## Guard Statements

Wait! The **`guard`** statement is a special type of conditional used to exit a function early if a condition is not met. It makes your code much cleaner by avoiding "nested if" hell.

```swift
guard age >= 18 else {
    return // Exit early
}
print("Access granted")
```

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / else** | Basic branching |
| **switch** | Advanced pattern matching |
| **for-in** | Iteration through ranges and arrays |
| **while** | Basic conditional loop |
| **guard** | Early exit (Essential for clean code!) |
| **break / cont.**| Controlling loop execution |
| **Logic** | "Safety first" branching |
| **Safety** | Compiler ensures `switch` handles all cases |
| **Modern** | Ranges (`...` and `..<`) make loops very readable |
| **Standard** | Use `guard` for validating inputs at the start of a function |
| **Identity** | Control flow in Swift is designed to prevent "Spaghetti Code" |
