---
id: "java"
name: "Java"
slug: "java"
description: "A robust, object-oriented language designed for portability, powering enterprise systems, Android apps, and more."
iconName: "java"
year: 1995
creator: "James Gosling (Sun Microsystems)"
paradigm: ["Object-Oriented", "Imperative", "Concurrent"]
useCases: ["Enterprise Applications", "Android Development", "Big Data", "Cloud Services"]
website: "https://dev.java/"
category: "General Purpose"
featured: true
difficulty: "Intermediate"
topics:
  - section: "Basics"
    description: "Java fundamentals and the JVM ecosystem."
    items:
      - title: "Introduction to Java"
        description: "JDK, JRE, JVM, and the Java platform architecture"
      - title: "Variables & Data Types"
        description: "Primitives, wrapper classes, arrays, and type casting"
      - title: "Operators & Control Flow"
        description: "Arithmetic, logical operators, if/else, switch, loops"
      - title: "Methods"
        description: "Parameters, return types, overloading, and varargs"
      - title: "Packages & Imports"
        description: "Package structure, access modifiers, and classpaths"
  - section: "OOP"
    description: "Object-oriented programming — Java's core paradigm."
    items:
      - title: "Classes & Objects"
        description: "Constructors, this, static vs instance, and initialization blocks"
      - title: "Inheritance"
        description: "extends, super, method overriding, and the Object class"
      - title: "Interfaces & Abstract Classes"
        description: "Contracts, default methods, multiple interface implementation"
      - title: "Encapsulation"
        description: "Access modifiers, getters/setters, and information hiding"
      - title: "Polymorphism"
        description: "Runtime vs compile-time polymorphism, casting, instanceof"
  - section: "Collections & Generics"
    description: "Java's powerful data structure framework."
    items:
      - title: "Collections Framework"
        description: "List, Set, Map, Queue — ArrayList, HashMap, TreeSet"
      - title: "Generics"
        description: "Type parameters, bounded types, wildcards, and type erasure"
      - title: "Iterators"
        description: "Iterator, ListIterator, for-each, and Iterable"
      - title: "Streams API"
        description: "Stream operations — filter, map, reduce, collect, and parallel streams"
  - section: "Exception Handling & I/O"
    description: "Robust error management and file operations."
    items:
      - title: "Exceptions"
        description: "try/catch/finally, checked vs unchecked, custom exceptions"
      - title: "File I/O"
        description: "BufferedReader, FileWriter, NIO.2, Path, and Files"
      - title: "Serialization"
        description: "Serializable, ObjectInputStream/OutputStream, and transient"
  - section: "Concurrency"
    description: "Multi-threaded programming in Java."
    items:
      - title: "Threads"
        description: "Thread class, Runnable, and thread lifecycle"
      - title: "Synchronization"
        description: "synchronized, volatile, locks, and thread safety"
      - title: "Executors & Thread Pools"
        description: "ExecutorService, Future, CompletableFuture"
      - title: "Virtual Threads"
        description: "Project Loom, lightweight threads (Java 21+)"
  - section: "Modern Java"
    description: "Post-Java-8 features and patterns."
    items:
      - title: "Records"
        description: "Immutable data carriers (Java 16+)"
      - title: "Pattern Matching"
        description: "instanceof pattern, switch expressions, and sealed classes"
      - title: "Modules"
        description: "Java Platform Module System (JPMS) and module-info.java"
      - title: "Spring Boot"
        description: "Dependency injection, REST APIs, and production-ready services"
---

## Overview

Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Its "write once, run anywhere" philosophy means compiled Java code runs on all platforms that support the JVM without recompilation. Java remains one of the most popular programming languages, particularly for enterprise server-side applications.

## Key Features

- **Platform independence** — JVM enables cross-platform execution
- **Strong type system** — Compile-time type checking prevents many common errors
- **Automatic memory management** — Garbage collection handles memory lifecycle
- **Multithreading** — Built-in support for concurrent programming
- **Mature ecosystem** — Spring, Hibernate, Maven, Gradle

## Code Example

```java
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie", "Diana");

        String result = names.stream()
            .filter(name -> name.length() > 3)
            .map(String::toUpperCase)
            .collect(Collectors.joining(", "));

        System.out.println(result); // ALICE, CHARLIE, DIANA
    }
}
```

## Learning Resources

- [Official Java Tutorials](https://dev.java/learn/)
- [Baeldung](https://www.baeldung.com/)
- [Java Design Patterns](https://java-design-patterns.com/)
