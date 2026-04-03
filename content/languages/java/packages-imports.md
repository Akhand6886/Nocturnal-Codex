---
title: "Packages & Imports"
description: "Organizing code with package, import, and fully qualified names"
---

## What are Java Packages?

In a large project, different libraries might use the same name for a class (e.g., `User` or `Config`). To prevent this **name collision**, Java provides **Packages**. They act like "folders" or "namespaces" for your code.

The most famous package is **`java.util`**, which contains everything from the **Java Collections Framework**.

```java
package com.mygame.physics; // Must be the FIRST line!

public class Gravity {
    // This class lives inside the 'physics' package!
}
```

## Importing Other Classes

To use a class from another package, you must "bring it in" using the **`import`** keyword.

```java
import java.util.ArrayList; // Just one class!
import java.util.List;

// Or search for all classes in a package!
import java.util.*; // Use sparingly!
```

## Automatic Imports

Wait! You never have to import the most common classes like **`String`**, **`System`**, or **`Math`**. They live in the **`java.lang`** package, which is automatically imported into every Java file.

```java
String name = "Alpha"; // No import needed!
```

## Static Imports (JAVA 5+)

A **Static Import** allows you to use `static` members (methods or constants) of a class without mentioning the class name itself.

```java
import static java.lang.Math.*;

double res = sqrt(16) + PI; // Instead of Math.sqrt and Math.PI!
```

## Summary

| Term | Description |
| :--- | :--- |
| **Package** | A folder for organizing your code |
| **Import** | Bringing external classes into your file |
| **java.util** | Standard package for collections |
| **java.lang** | The ONLY automatic package (no import!) |
| **FQN** | `java.util.ArrayList` (Total path to a class) |
| **Best For** | Code separation, preventing name collisions |
| **Collision** | Occurs when same name used in same scope |
| **Safe** | Packages make your code much easier to maintain |
| **Modular** | Group related code into separate folders |
| **FQN Save** | `u1.set(10);` (Fully Qualified Names!) |
| **Naming** | Convention: Reverse domain name (`com.google.util`) |
| **Header** | The `package` line MUST be the first line! |
| **Structure** | Java folder structure MUST match the package name! |
| **Private** | Packages can have "Package-Private" access (default) |
| **Export** | Controlling what other people can see in your package |
| **Refactor** | Move whole packages to separate "Modules" (Java 9+) |
| **Hierarchy**| Sub-packages like `com.google.util.math` |
| **Standard** | Established and trusted worldwide for 25+ years |
| **JVM** | The JVM uses package names to find `.class` files! |
| **Alias** | Java DOES NOT allow name aliases for imports! |
| **Ambiguity** | Use FQN if two imported packages have the SAME class name! |
| **Project** | A "Project" is a collection of related packages |
| **Library** | A "Library" is a pre-written collection of packages |
| **Static** | Import methods/constants with `import static` |
| **Wildcard** | `*` imports ONLY classes, not entire sub-packages! |
