---
title: "Modules (JPMS)"
description: "Java Platform Module System: Organizing large codebases (Java 9+)"
---

## What are Java Modules?

Introduced in **Java 9**, the **Java Platform Module System (JPMS)** is a major update to how Java code is organized and compiled. Prior to this, Java relied on the classpath, which was slow and prone to "JAR hell" (where different libraries randomly conflict with each other).

Modules solve these problems by allowing you to **export** specific packages to the outside world and **require** only the modules your code actually needs.

```java
// module-info.java (The Module Descriptor!)
module com.mygame.physics {
    requires java.sql;      // I need the database!
    exports com.mygame.api; // Let others use my API!
}
```

## Comparisons: Classpath vs. Module Path

Wait! Why did we add modules after 20 years of Java development?

-   **Classpath**: "Flat" logic. If a class is found, it's used. No privacy between JARs.
-   **Module Path**: "Structural" logic. Every module defines exactly what it shows and what it uses.

| Feature | Classpath | Module Path |
| :--- | :--- | :--- |
| **Logic** | Text-based search. | Pre-compiled, binary links. |
| **Speed** | Slow (Same code re-scanned every time!) | FAST (JVM knows exactly where everything is!) |
| **Encapsulation**| None. Everything is "Public" to everyone. | **Strong.** Only things with `exports` are visible! |

## Creating a Module

1.  **Define**: Create a file named **`module-info.java`** in the root of your package structure.
2.  **Declare**: Use the `module` keyword to name your module.
3.  **Export**: Explicitly list which packages should be visible to other modules.

```java
module com.myproject.core {
    // Only 'utils' is visible outside!
    exports com.myproject.core.utils; 
}
```

## Why Use Modules?

1.  **Scalability**: Essential for massive enterprise projects with 1,000s of classes.
2.  **Security**: Internal code (like sensitive data handlers) can be hidden forever.
3.  **Lean JRE**: You can use the `jlink` tool to create a tiny "custom Java Runtime" that contains ONLY the modules your app needs. This is perfect for Docker and Cloud deployments!

## Summary

| Term | Description |
| :--- | :--- |
| **module** | A named, self-contained group of code |
| **module-info** | The special file that defines the module |
| **requires** | Declaring a dependency on another module |
| **exports** | Making a package public to everyone |
| **opens** | Allowing "Reflection" access to a package |
| **provides** | Declaring a Service Implementation |
| **uses** | Declaring a Service Interface requirement |
| **Best For** | Enterprise apps, library development, Cloud/Docker |
| **Java 9** | The first version with "Project Jigsaw" (Modules!) |
| **Speed** | Faster startup times for large-scale apps |
| **Transitive** | `requires transitive` (I need it, and my users will too!) |
| **Modular** | The whole Java Standard Library is now modular! |
| **Standard** | Established and trusted worldwide for 10+ years |
| **Encapsulate**| No more accessing internal `com.sun.*` classes! |
| **Library** | Most modern Java libraries (Spring 6+) are modular! |
| **Jlink** | Tool to create a custom, tiny Java Runtime |
| **Jmod** | The new binary format for compiled modules |
| **Structure** | Modules help keep your architecture "Clean" |
| **Implicit** | Every module implicitly `requires java.base`! |
| **Unnamed** | Code on the old classpath is in an "Unnamed Module" |
| **Safety** | Prevents "JAR Hell" and conflicting class files |
| **Testing** | Modules make it harder to "cheat" and access private data |
| **Refactor** | Splitting a single project into many modules |
| **Modern** | All development after Java 17 should be modular! |
