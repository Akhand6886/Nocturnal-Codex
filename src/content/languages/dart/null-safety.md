---
title: "Null Safety"
description: "Nullable types, safe calls, and the late keyword in Dart"
---

## Sound Null Safety

In **Dart**, all types are **Non-Nullable** by default. This means a variable cannot hold `null` unless you explicitly say so. This prevents the "billion-dollar mistake" of null pointer exceptions.

```dart
String name = 'Alpha';
// name = null; // ERROR! Compiler won't allow this.
```

## Nullable Types (`?`)

To allow a variable to be null, you add a **`?`** to its type.

```dart
String? name = 'Alpha';
name = null; // SUCCESS!
```

## The Null-Aware Operators

Wait! Dart provides three key operators to handle nulls safely:

1.  **`?.` (Safe Call)**: Access a property only if the object isn't null.
2.  **`??` (Null Coalescing)**: Provide a default value if something is null.
3.  **`!` (Bang)**: Forcefully tell the compiler that a value is definitely not null (DANGEROUS!).

```dart
print(name?.length);      // Returns length or null
var length = name?.length ?? 0; // If null, use 0
```

## The `late` Keyword

Sometimes you know a variable will be initialized later (e.g., in a `initState` method), but you can't set it immediately. Use **`late`** to tell the compiler: "I'll handle this, trust me."

```dart
late String data;
// ... logic ...
data = 'Success'; // Must be set before use!
```

## Summary

| Operator | Description |
| :--- | :--- |
| **?** | Declare a nullable type |
| **?.** | Access property only if NOT null |
| **??** | Provide default value for null |
| **??=** | Assign value ONLY if the variable is null |
| **!** | The "trust me" bang operator (Throws if null!) |
| **late** | Initialize after declaration |
| **Best For** | Eliminating NullPointerExceptions |
| **Logic** | Explicitly handle "nothingness" |
| **Safety** | Compiler ensures you check for null before using a nullable type |
| **Modern** | Sound Null Safety was introduced in Dart 2.12 |
| **Standard** | Avoid using `!` whenever possible; favor `??` or `if` checks |
| **Identity** | Dart's null safety is "Sound," meaning it is guaranteed at runtime |
