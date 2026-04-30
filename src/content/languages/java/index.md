---
id: java
name: Java
slug: java
description: >-
  A robust, object-oriented language designed for portability, powering
  enterprise systems, Android apps, and more.
iconName: java
year: 1995
creator: James Gosling (Sun Microsystems)
paradigm:
  - Object-Oriented
  - Imperative
  - Concurrent
useCases:
  - Enterprise Applications
  - Android Development
  - Big Data
  - Cloud Services
website: 'https://dev.java/'
category: General Purpose
featured: true
difficulty: Intermediate
topics:
  - section: Basics
    description: Java fundamentals and the JVM ecosystem.
    items:
      - title: Introduction to Java
        description: 'JDK, JRE, JVM, and the Java platform architecture'
        slug: introduction-to-java
      - title: Variables & Data Types
        description: 'Primitives, wrapper classes, arrays, and type casting'
        slug: variables-data-types
      - title: Operators & Control Flow
        description: 'Arithmetic, logical operators, if/else, switch, loops'
        slug: operators-control-flow
      - title: Methods
        description: 'Parameters, return types, overloading, and varargs'
        slug: methods
      - title: Packages & Imports
        description: 'Package structure, access modifiers, and classpaths'
        slug: packages-imports
  - section: OOP
    description: Object-oriented programming — Java's core paradigm.
    items:
      - title: Classes & Objects
        description: 'Constructors, this, static vs instance, and initialization blocks'
        slug: classes-objects
      - title: Inheritance
        description: 'extends, super, method overriding, and the Object class'
        slug: inheritance
      - title: Interfaces & Abstract Classes
        description: 'Contracts, default methods, multiple interface implementation'
        slug: interfaces-abstract-classes
      - title: Encapsulation
        description: 'Access modifiers, getters/setters, and information hiding'
        slug: encapsulation
      - title: Polymorphism
        description: 'Runtime vs compile-time polymorphism, casting, instanceof'
        slug: polymorphism
  - section: Collections & Generics
    description: Java's powerful data structure framework.
    items:
      - title: Collections Framework
        description: 'List, Set, Map, Queue — ArrayList, HashMap, TreeSet'
        slug: collections-framework
      - title: Generics
        description: 'Type parameters, bounded types, wildcards, and type erasure'
        slug: generics
      - title: Iterators
        description: 'Iterator, ListIterator, for-each, and Iterable'
        slug: iterators
      - title: Streams API
        description: 'Stream operations — filter, map, reduce, collect, and parallel streams'
        slug: streams-api
  - section: Exception Handling & I/O
    description: Robust error management and file operations.
    items:
      - title: Exceptions
        description: 'try/catch/finally, checked vs unchecked, custom exceptions'
        slug: exceptions
      - title: File I/O
        description: 'BufferedReader, FileWriter, NIO.2, Path, and Files'
        slug: file-i-o
      - title: Serialization
        description: 'Serializable, ObjectInputStream/OutputStream, and transient'
        slug: serialization
  - section: Concurrency
    description: Multi-threaded programming in Java.
    items:
      - title: Threads
        description: 'Thread class, Runnable, and thread lifecycle'
        slug: threads
      - title: Synchronization
        description: 'synchronized, volatile, locks, and thread safety'
        slug: synchronization
      - title: Executors & Thread Pools
        description: 'ExecutorService, Future, CompletableFuture'
        slug: executors-thread-pools
      - title: Virtual Threads
        description: 'Project Loom, lightweight threads (Java 21+)'
        slug: virtual-threads
  - section: Modern Java
    description: Post-Java-8 features and patterns.
    items:
      - title: Records
        description: Immutable data carriers (Java 16+)
        slug: records
      - title: Pattern Matching
        description: 'instanceof pattern, switch expressions, and sealed classes'
        slug: pattern-matching
      - title: Modules
        description: Java Platform Module System (JPMS) and module-info.java
        slug: modules
      - title: Spring Boot
        description: 'Dependency injection, REST APIs, and production-ready services'
        slug: spring-boot
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
