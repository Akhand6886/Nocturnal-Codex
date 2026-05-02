---
title: "Classes"
description: "Constructors, inheritance, and properties in Kotlin"
---

## Defining Classes

In **Kotlin**, classes are defined using the `class` keyword. By default, classes are **final** (cannot be inherited from) and public.

```kotlin
class User(val name: String, var age: Int) {
    // Body is optional!
}
```

Wait! Notice the **Primary Constructor** is defined directly in the class header. This automatically creates properties for `name` and `age`.

## `init` Blocks

If you need to run initialization logic when a class is created, use the **`init`** block.

```kotlin
class User(name: String) {
    val capitalizedName = name.uppercase()

    init {
        println("Initializing user: $capitalizedName")
    }
}
```

## Inheritance (`open` and `:`)

To allow a class to be inherited, you must mark it with the **`open`** keyword.

```kotlin
open class Shape
class Circle : Shape() // Use ':' for inheritance
```

## Abstract Classes and Interfaces

-   **Abstract Class**: A class that cannot be instantiated and can contain partial implementation.
-   **Interface**: A contract that classes can implement. In Kotlin, interfaces can also contain default implementations for methods.

```kotlin
interface Drawable {
    fun draw() {
        println("Drawing...") // Default implementation
    }
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **class** | Keyword to define a class |
| **val / var** | Property declaration in constructor |
| **init** | Logic run during object creation |
| **open** | Keyword to allow inheritance |
| **sealed** | Restricting inheritance hierarchy (See Sealed section) |
| **abstract** | Class with no direct instantiation |
| **Best For** | Modeling complex objects and behaviors |
| **Logic** | Clean, concise, and safe by default |
| **Safety** | "Final by default" prevents accidental deep inheritance trees |
| **Modern** | No need for `new` keyword! Just call `User()` |
| **Standard** | Use `PascalCase` for all class names |
| **Identity** | Classes are the foundation of Kotlin's OOP |
| **Secondary** | Use `constructor()` inside the body if you need more constructors |
