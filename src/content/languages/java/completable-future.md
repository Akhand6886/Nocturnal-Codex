---
title: "CompletableFuture"
description: "Mastering asynchronous and non-blocking futures in Java"
---

## What is CompletableFuture?

Introduced in Java 8, **CompletableFuture** is a powerful enhancement of the traditional `Future`. It allows you to write non-blocking asynchronous code by providing a functional API to chain tasks, handle errors, and combine multiple results.

## 1. Running Async Tasks

You can run tasks in a background thread (usually in the `ForkJoinPool.commonPool()`) using `supplyAsync`.

```java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    // Heavy computation or network call
    return "Data fetched";
});
```

## 2. Chaining Transformations

The real power of `CompletableFuture` is the ability to chain operations using `thenApply`, `thenAccept`, or `thenCompose`.

- `thenApply`: Transforms the result (like `map`).
- `thenAccept`: Consumes the result (like `forEach`).
- `thenCompose`: Flattens nested futures (like `flatMap`).

```java
CompletableFuture<Integer> lengthFuture = CompletableFuture.supplyAsync(() -> "Hello")
    .thenApply(String::length)
    .thenApply(len -> len * 2);

lengthFuture.thenAccept(result -> System.out.println("Result: " + result));
```

## 3. Combining Futures

You can wait for multiple futures to finish before proceeding.

- `thenCombine`: Combines two independent futures.
- `allOf`: Waits for a collection of futures to complete.
- `anyOf`: Proceeds as soon as any one future completes.

```java
CompletableFuture<String> combined = future1.thenCombine(future2, (res1, res2) -> {
    return res1 + " " + res2;
});
```

## 4. Exception Handling

Unlike traditional `Future.get()`, which throws checked exceptions, `CompletableFuture` handles errors fluently.

- `exceptionally`: Provides a fallback value if an error occurs.
- `handle`: Processes both the result AND the exception.

```java
CompletableFuture<String> safeFuture = future.exceptionally(ex -> {
    System.err.println("Error: " + ex.getMessage());
    return "Fallback Data";
});
```

## 5. Async vs. Sync Chaining

Every method has an `Async` variant (e.g., `thenApplyAsync`). 
- Without `Async`: The task runs on the same thread as the previous stage.
- With `Async`: The task is submitted to a different thread pool.

## Summary Checklist
- [x] `CompletableFuture` is non-blocking and functional.
- [x] Use `supplyAsync` to start a background task.
- [x] Use `thenApply` to transform results.
- [x] Use `thenCompose` to avoid nested futures (`Future<Future<T>>`).
- [x] Always handle exceptions using `exceptionally`.
- [x] Perfect for high-concurrency web servers and microservices.
---
