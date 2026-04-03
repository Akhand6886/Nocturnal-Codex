---
title: "Pattern Matching (JAVA 16+)"
description: "instanceof checks with direct bindings and modern switch logic"
---

## What is Pattern Matching in Java?

Introduced as a standard feature in **JAVA 16**, **Pattern Matching** is a powerful way to "extract" data from an object if it matches a specific type or structure. 

Prior to this, you had to perform two separate steps (a check and a cast), which was repetitive and error-prone. With **Pattern Matching**, you do it in **ONE** line!

```java
Object obj = "Hello, Java!";

// Modern Way!
if (obj instanceof String s) {
    // Variable 's' is already a String!
    System.out.println(s.toUpperCase());
}
```

## Comparisons: The Old Way vs. The Modern Way

Wait! Why did we change this after 25 years?

-   **Old**: `if (obj instanceof String) { String s = (String) obj; ... }` (Repeating "String" three times!)
-   **Modern**: `if (obj instanceof String s) { ... }` (Check and bind in one step!)

## Pattern Matching with `switch` (JAVA 17+)

Java's powerful `switch` statements can now also perform pattern matching! This is perfect for handling complex hierarchies of data (like different shapes or user roles).

```java
static String getLabel(Object obj) {
    return switch (obj) {
        case Integer i -> "An Integer: " + i;
        case String s  -> "A String: " + s;
        case null      -> "Value is Null!";
        default        -> "Unknown Object.";
    };
}
```

## Guiding Patterns: The `when` Clause (JAVA 21+)

You can even add extra logic (guards) to your pattern matching to make it even more precise.

```java
return switch (obj) {
    case String s when s.length() > 10 -> "A LONG String!";
    case String s -> "A short string.";
    default -> "Unknown.";
};
```

## Summary

| Term | Description |
| :--- | :--- |
| **instanceof**| Type checking with automatic binding |
| **Pattern** | The combination of a type + a variable name |
| **Binding** | Automatically creating a variable if the match is true |
| **Switch** | Type-safe branching for many different data types |
| **when** | Add extra logical "guards" to a match |
| **Best For** | Processing mixed types, complex object handling |
| **Modern** | Java 16 (instanceof), Java 17/21 (switch) |
| **Safe** | Prevents most "ClassCastException" bugs! |
| **Clean** | Removes repetitive (and boring!) boilerplate code |
| **Final** | The bound variable (`s`) is implicitly `final`! |
| **Scope** | Variable only exists where the check is TRUE! |
| **Recursive** | Pattern matching can also unpack complex Records! |
| **Null** | Switch patterns now handle `null` cases explicitly! |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Exhaustive** | Switch with patterns MUST handle all possible cases! |
| **Return** | Ideal for returning different values from a complex logic |
| **Record** | `case User(String n, int a)` (Modern unpacking!) |
| **Seal** | Works perfectly with "Sealed Classes" (See below!) |
| **Safety** | Compiler will NOT let you use the variable if match fails! |
| **Logic** | Code once; use for many different types! |
| **Identity** | An object never "forgets" its real type internally |
| **Structure** | Java folder structure MUST match the package name! |
| **Package** | Organizes code into logical folders (namespaces) |
| **Library** | A "Library" is a pre-written collection of packages |
| **Static** | Import methods/constants with `import static` |
| **Wildcard** | `*` imports ONLY classes, not entire sub-packages! |
