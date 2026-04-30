---
title: "Records (JAVA 14+)"
description: "Data carriers with automatic getters, hashCode, equals, and toString"
---

## What are Java Records?

Introduced as a standard feature in **JAVA 16**, **Records** are a concise and modern way to created classes that only "carry" data. We often use these for database results, API responses, or simple "Point" objects.

Prior to Records, you had to write 50+ lines for a simple data class (Fields, Constructors, Getters/Setters, `equals`, `hashCode`, and `toString`). With a **Record**, you do it in **ONE** line!

```java
// Modern Data Class!
public record User(String name, int age) {}

User u = new User("Alpha", 25);
System.out.println(u.name()); // Auto-generated getter!
System.out.println(u.toString()); // Auto-generated toString!
```

## How it Works: Behind the Scenes

Wait! When you create a Record, the Java compiler automatically generates:

1.  **Private Final** fields for every component.
2.  **Public Accessors** (Getters) — e.g., `name()` instead of `getName()`.
3.  **Canonical Constructor** (To initialize all data).
4.  **equals()** and **hashCode()** (To compare records by their content!).
5.  **toString()** (To print the user's data cleanly).

## Comparisons: Class vs. Record

| Feature | Standard Class | Record |
| :--- | :--- | :--- |
| **Logic** | Full methods, logic, and state. | **Pure data carrier.** |
| **Mutable** | Can be changed (Setters). | **Immutable** (Cannot be changed!). |
| **Getter** | `getName()` | `name()` |
| **Boilerplate**| 50-100 lines. | **1 line.** |

## Customizing Records: The Compact Constructor

You can still add validation logic to your Record using a **Compact Constructor**. This runs before the data is saved.

```java
public record User(String name, int age) {
    public User {
        if (age < 0) throw new IllegalArgumentException("Age cannot be negative!");
    }
}
```

## Why use Records?

1.  **Readability**: Focus on the data, not the boilerplate code.
2.  **Safety**: Immutable data prevents most multi-threading bugs!
3.  **Modern**: The standard way to model data in modern Java projects.

## Summary

| Term | Description |
| :--- | :--- |
| **Record** | Concise, immutable data carrier |
| **Component** | The data fields defined in `record(x, y)` |
| **Accessor** | The auto-generated getter method (`x()`) |
| **Immutable** | Data that cannot be modified once it is created |
| **Boilerplate**| Repetitive, generic code (Automatically removed!) |
| **Best For** | API data, database records, simple points |
| **Modern** | Java 14 (Preview), Java 16 (Standard) |
| **Safety** | No risk of accidentally changing data after creation |
| **Clean** | Perfectly compatible with all standard Java tools |
| **Final** | All record fields are `final` (cannot be changed!) |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Identity** | Records with the SAME data are equal (`u1.equals(u2)`) |
| **Local** | You can define a Record INSIDE a method! |
| **JSON** | Perfect for mapping Jackson/GSON API objects |
| **Compact** | Add validation logic with `public Record { ... }` |
| **Interface** | Records CAN implement interfaces! |
| **Inherit** | Records CANNOT extend other classes (They extend `java.lang.Record`) |
| **Final Class**| All Records are `final` (no children allowed!) |
| **Pattern** | Works perfectly with Pattern Matching (Java 16+)! |
| **Memory** | Low memory overhead, just like a normal object |
| **Format** | Cleanest way to write a "Plain Old Java Object" (POJO) |
| **Standard** | Replaces many uses of libraries like Lombok! |
| **Logic** | You can add static methods or instance methods to a Record! |
