---
id: "scala"
name: "Scala"
slug: "scala"
description: "A JVM language combining object-oriented and functional programming for scalable, concurrent systems."
iconName: "scala"
year: 2004
creator: "Martin Odersky"
paradigm: ["Object-Oriented", "Functional"]
useCases: ["Big Data", "Distributed Systems", "Web Development", "Data Engineering"]
website: "https://www.scala-lang.org/"
category: "Data"
featured: false
difficulty: "Advanced"
topics:
  - section: "Basics"
    items:
      - title: "Introduction to Scala"
        description: "Scala 3 vs 2, sbt, and JVM interop"
      - title: "Values & Variables"
        description: "val vs var, type inference, and expressions"
      - title: "Functions"
        description: "def, anonymous functions, and higher-order functions"
      - title: "Control Flow"
        description: "if/else as expression, for comprehensions, and match"
  - section: "FP & Pattern Matching"
    items:
      - title: "Case Classes"
        description: "Immutable data, copy(), and structural equality"
      - title: "Pattern Matching"
        description: "Match expressions, guards, extractors, and sealed traits"
      - title: "Options & Either"
        description: "Safe null handling and error representation"
      - title: "Collections"
        description: "List, Map, Set — immutable by default, map/flatMap/filter"
  - section: "Types & Traits"
    items:
      - title: "Traits"
        description: "Stackable modifications, mixins, and linearization"
      - title: "Generics"
        description: "Variance, bounds, and context bounds"
      - title: "Implicits / Given"
        description: "Implicit conversions, type classes, and Scala 3 given/using"
  - section: "Concurrency & Big Data"
    items:
      - title: "Futures"
        description: "Asynchronous computation with Future and ExecutionContext"
      - title: "Akka Actors"
        description: "Actor model for concurrent and distributed systems"
      - title: "Apache Spark"
        description: "RDDs, DataFrames, and distributed data processing"
---

## Overview

Scala is a strong statically typed language that fuses functional and object-oriented programming. It runs on the JVM and interoperates seamlessly with Java. Scala's expressive type system, pattern matching, and immutability-first approach make it particularly suited for building scalable distributed systems. Apache Spark is written in Scala.

## Key Features

- **Functional + OOP** — Seamlessly blends both paradigms
- **Powerful type system** — Higher-kinded types, type classes, path-dependent types
- **Pattern matching** — Deep structural matching on case classes
- **Immutability by default** — `val` over `var` philosophy
- **Akka** — Actor-based concurrency for distributed systems

## Code Example

```scala
case class Person(name: String, age: Int)

val people = List(Person("Alice", 30), Person("Bob", 17), Person("Charlie", 25))

val adults = people.collect {
  case Person(name, age) if age >= 18 => s"$name (age $age)"
}
println(adults.mkString(", "))
```

## Learning Resources

- [Scala Official Docs](https://docs.scala-lang.org/)
- [Scala Exercises](https://www.scala-exercises.org/)
- [Rock the JVM](https://rockthejvm.com/)
