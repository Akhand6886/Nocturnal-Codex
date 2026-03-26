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
---

## Overview

Scala is a strong statically typed language that fuses functional and object-oriented programming. It runs on the JVM and interoperates seamlessly with Java. Scala's expressive type system, pattern matching, and immutability-first approach make it particularly suited for building scalable distributed systems. Apache Spark, the dominant big data framework, is written in Scala.

## Key Features

- **Functional + OOP** — Seamlessly blends both paradigms
- **Powerful type system** — Higher-kinded types, type classes, path-dependent types
- **Pattern matching** — Deep structural matching on case classes
- **Immutability by default** — `val` over `var` philosophy
- **Akka** — Actor-based concurrency for distributed systems

## Code Example

```scala
// Scala case classes and pattern matching
case class Person(name: String, age: Int)

val people = List(Person("Alice", 30), Person("Bob", 17), Person("Charlie", 25))

val adults = people.collect {
  case Person(name, age) if age >= 18 => s"$name (age $age)"
}
println(adults.mkString(", ")) // Alice (age 30), Charlie (age 25)
```

## Learning Resources

- [Scala Official Docs](https://docs.scala-lang.org/)
- [Scala Exercises](https://www.scala-exercises.org/)
- [Rock the JVM](https://rockthejvm.com/)
