---
title: "Futures"
description: "Asynchronous programming and non-blocking computations in Scala"
---

## What is a Future?

A **Future** represents a value that will eventually be available. It allows you to run a task in the background (on a different thread) and continue with other work while you wait for it to finish.

```scala
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

val f: Future[Int] = Future {
  // This runs in the background
  Thread.sleep(1000)
  42
}
```

## Handling Results

Wait! You don't "wait" for a Future to finish (that would block the thread). Instead, you use functional methods or **Callbacks**.

### 1. Functional (Preferred)
```scala
f.map(n => n * 2).foreach(println)
```

### 2. Pattern Matching
```scala
f.onComplete {
  case Success(value) => println(s"Got: $value")
  case Failure(error) => println(s"Failed: $error")
}
```

## `ExecutionContext`

Wait! For a Future to run, it needs an **ExecutionContext** (which is essentially a thread pool). In Scala, this is usually passed as an **Implicit** parameter.

## Why use Futures?

1.  **Scalability**: Handle thousands of simultaneous requests using a small number of threads.
2.  **UI Responsiveness**: Don't freeze the user interface while fetching data or performing math.
3.  **Composition**: Chain multiple background tasks together easily using `map` and `flatMap`.

## Summary

| Term | Description |
| :--- | :--- |
| **Future** | An object representing a delayed computation |
| **Promise** | An object that can be "completed" to fulfill a future |
| **map** | Run logic once the future completes successfully |
| **recover** | Handle errors by providing a fallback value |
| **Await** | Forcing the thread to wait (Use ONLY for testing/debugging!) |
| **Best For** | API calls, database operations, and non-blocking I/O |
| **Logic** | "Event-driven asynchronous programming" |
| **Safety** | Prevents deadlocks and resource exhaustion |
| **Modern** | The standard way to handle concurrency in the Scala ecosystem |
| **Standard** | Use `scala.concurrent` package |
| **Identity** | Futures are Monads (can be used in for-comprehensions!) |
