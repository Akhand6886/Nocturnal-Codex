---
title: "Introduction to Java"
description: "Write Once, Run Anywhere: The power of the JVM and bytecode"
---

## What is Java?

**Java** is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Its most famous slogan, **"Write Once, Run Anywhere" (WORA)**, perfectly describes its main benefit: Java code can run on any device that has a Java Virtual Machine (JVM).

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to the world of Java!");
    }
}
```

## The JVM Architecture

Wait! How does "Run Anywhere" actually work? 

1.  **Compiler**: Your `.java` source code is compiled into **Bytecode** (`.class` files).
2.  **Bytecode**: This is an intermediate language that is NOT specific to any CPU.
3.  **JVM**: The Java Virtual Machine reads the bytecode and translates it into the specific machine code of your computer (Windows, Mac, Linux, or Android).

## Key Features of Java

-   **Object-Oriented**: Everything in Java (almost) is an Object. This makes code modular and reusable.
-   **Platform Independent**: Thanks to the JVM.
-   **Automatic Memory Management**: Java uses a **Garbage Collector** to automatically delete objects that are no longer needed. No manual `free()` or `delete`!
-   **Secure**: Java runs in a "sandbox" (the JVM), preventing code from directly accessing system memory or hardware.
-   **Multithreaded**: Built-in support for running multiple tasks at once.

## The Modern Java Ecosystem

-   **Enterprise**: Most banking and insurance systems are built on Java (Spring Boot).
-   **Android**: Java was the original language of Android development.
-   **Big Data**: Hadoop, Spark, and Cassandra are all written in Java.
-   **Scientific**: used widely in AI and data science before Python took the lead.

## Summary

| Feature | Description |
| :--- | :--- |
| **Creator** | James Gosling (Sun Microsystems, 1995) |
| **Owner** | Oracle Corporation |
| **Platform** | JVM (Java Virtual Machine) |
| **Paradigm** | Object-Oriented (Strictly Class-based) |
| **Main Tool** | JDK (Java Development Kit) |
| **Main Build** | Maven, Gradle |
| **Best For** | Backend Apps, Android, Enterprise Systems |
| **Safety** | Strong static typing and Garbage Collection |
| **History** | Java started as "Oak" in 1991 |
| **Versions** | Major updates every 6 months (LTS versions: 8, 11, 17, 21) |
| **Bytecode** | The universal language of the JVM |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Library** | Massive standard library (The Java API) |
| **Open Source**| OpenJDK is the free, community-driven version |
| **Portability**| Identical behavior across all operating systems |
| **Strong Type**| Variables must have a declared type at compile-time |
| **Main Method**| `public static void main(String[] args)` (The entry point!) |
| **Package** | Organizes code into logical folders (namespaces) |
| **Import** | Use `import` to bring in external tools |
| **Interface** | Defines what a class MUST do (See Interfaces) |
| **JRE** | Java Runtime Environment (Just for running apps) |
| **JDK** | Java Development Kit (Everything you need to BUILD apps) |
| **Jit** | Just-In-Time compiler (Speeds up Java while it runs!) |
