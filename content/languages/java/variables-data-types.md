---
title: "Variables & Data Types"
description: "Primitives, wrapper classes, reference types, and 'var' (JAVA 10+)"
---

## Strong Typing in Java

**Java** is a **Statically Typed** language. This means every variable must have a declared type before it can be used, and the compiler checks these types *before* the program ever runs. This makes Java code very safe and predictable.

## 1. Primitive Data Types

Java has **eight** "primitive" types which are the basic building blocks of all data. They are not objects; they are stored directly in the computer's memory.

| Category | Type | Size (Typical) | Example |
| :--- | :--- | :--- | :--- |
| **Integer** | `byte`, `short`, `int`, `long` | 1, 2, 4, 8 bytes | `100, -50` |
| **Floating Point**| `float`, `double`| 4, 8 bytes | `1.23, 10.5` |
| **Character** | `char` | 2 bytes (Unicode) | `'A', '1', '$'` |
| **Boolean** | `boolean` | 1 bit (virtually) | `true, false` |

```java
int count = 10;
double price = 19.99;
char initial = 'A';
boolean isAvailable = true;
```

## 2. Reference Types (Objects)

A **Reference Type** is a variable that "refers" to an object in memory. The most common reference type is the **`String`**.

```java
String name = "Alpha";
int[] numbers = {1, 2, 3}; // Arrays are also reference types!
```

> **Wait!** Primitives start with a lowercase letter (`int`); Reference types start with an uppercase letter (`String`).

## 3. Wrapper Classes

Every primitive type has a corresponding **Wrapper Class** (e.g., `int` -> `Integer`). These allow you to treat primitives as objects, which is required for using the Java Collections Framework (like `ArrayList`).

```java
// Autoboxing: Primitive to Wrapper!
Integer wrappedCount = 10; 

// Unboxing: Wrapper back to Primitive!
int rawCount = wrappedCount;
```

## 4. Modern Feature: Local Variable Type Inference (`var`)

Since **Java 10**, you can use the **`var`** keyword to let the compiler "infer" the type from the value you've assigned. This keeps your code clean and readable!

```java
var message = "Hello, Java!"; // Infers String!
var scores = new ArrayList<Integer>(); // Infers ArrayList!
```

## Summary

| Type | Examples | Description |
| :--- | :--- | :--- |
| **byte/short** | `127, 32767` | Small whole numbers |
| **int/long** | `10, 100000L` | Medium to large numbers |
| **float/double** | `1.2f, 3.14` | Decimals |
| **char** | `'X', '\n'` | Single Unicode character |
| **boolean** | `true, false` | Logic and branching |
| **var** | `var x = 10;` | Modern type inference (Java 10+) |
| **String** | `"Hello, Ali!"`| Text (An Object, not a primitive!) |
| **Best For** | Storing and managing application data |
| **Primitive** | Stores values directly in memory |
| **Reference** | Stores the MEMORY ADDRESS of an object |
| **Final** | `final int X = 10;` (Value cannot be changed!) |
| **Constant** | Use `static final` for global constants |
| **Default** | Primitives have automatic defaults (0, null, etc.) |
| **Scope** | Variables ONLY exist inside the `{}` where they were created |
| **Naming** | camelCase (e.g., `userScoreCount`) |
| **Casting** | `(int) 3.14` (Explicitly convert double to int) |
| **Promotion** | `int` is auto-promoted to `double` in math operations |
| **Overflow** | Java doesn't protect against numbers exceeding their size! |
| **Unicode** | Every `char` in Java is a 16-bit Unicode character |
| **Null** | Reference types can be `null`, primitives CANNOT! |
| **Instance** | `instanceof` (Check if object is a specific type!) |
| **Compare** | Use `==` for primitives; use `.equals()` for objects! |
| **Memory** | Primitives = Stack; Objects = Heap |
| **Safety** | Compiler will NOT let you use an uninitialized variable! |
| **Garbage C** | Only reference types are cleaned up by the GC |
