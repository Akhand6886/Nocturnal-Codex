---
title: "Exceptions"
description: "try/catch, checked vs unchecked, and custom exception handling"
---

## What are Java Exceptions?

In **Java**, an **exception** is a special object that indicates that something went wrong during the execution of your program. If not "caught" or "handled", it will cause the program to crash. Errors are not your enemy—they are a guide to identifying and fixing bugs!

```java
// A simple exception (ArithmeticException!)
// System.out.println(10 / 0);

// Handle it!
try {
  System.out.println(10 / 0);
} catch (ArithmeticException e) {
  System.out.println("Error caught: Don't divide by zero!");
}
// 1. "Error caught: Don't divide by zero!" (Program continues!)
```

## Handling Exceptions with `try/catch/finally`

-   **`try`**: Block of code you want to "monitor" for errors.
-   **`catch(err)`**: Block that runs ONLY if a specific error occurs.
-   **`finally`**: Block that runs **no matter what**, whether an error occurred or not. Use this for cleanup logic (like closing a file or hiding a loading spinner).

```java
try {
  // Logic that might fail
  int res = divide(10, 0);
} catch (Exception e) {
  // Handle the error!
  System.err.println("Task failed: " + e.getMessage());
} finally {
  System.out.println("Process complete.");
}
```

## Creating Custom Exceptions

For large-scale projects, it's often more descriptive to create your own Exception types.

```java
// Customize by inheriting from the base 'Exception' class
public class DatabaseException extends Exception {
    public DatabaseException(String message) {
        super(message);
    }
}

// throw new DatabaseException("Cannot connect!");
```

## Comparisons: Checked vs. Unchecked

Wait! Java is unique because it has two types of exceptions:

| Type | Examples | Description |
| :--- | :--- | :--- |
| **Checked** | `IOException`, `SQLException` | MUST be handled (or declared) or the code won't compile! |
| **Unchecked**| `NullPointerException`, `IndexOutOfBounds` | Caused by logic bugs. You don't HAVE to handle them manually. |

## The "throws" Keyword

If a method knows it might fail with a **Checked Exception**, but doesn't want to handle it itself, it must "declare" that to anyone who calls it.

```java
// I might throw a checked exception!
public void readFile() throws IOException {
    // ... file logic ...
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **try** | Monitor for crashes |
| **catch** | Recover from errors |
| **finally** | Final cleanup logic |
| **throw** | Manually trigger an error |
| **throws** | Declare that a method could fail |
| **Checked** | Exceptions the compiler FORCES you to handle |
| **Unchecked**| Runtime exceptions (usually programming bugs) |
| **Best For** | Bug prevention, resilient code, input validation |
| **Safe** | Preventing crashes in production environments |
| **Log** | `e.printStackTrace()` (The original way to find bugs!) |
| **Modern** | `try-with-resources` (Java 7+) to auto-close files! |
| **Handle** | Don't catch an exception and do NOTHING! (Always log it!) |
| **Exception** | The base object for all handleable errors |
| **Error** | Critical system issues (e.g., `OutOfMemory`) — DO NOT catch these! |
| **Message** | The descriptive string of the error (e.g., "Divide by zero") |
| **Cause** | Higher-level exceptions can "wrap" lower-level ones |
| **Stack** | The chain of calls that led to the crash |
| **Search** | The JVM looks for the nearest `catch` block on the stack |
| **Multiple** | `catch (IOException | SQLException e)` (Handle two at once! - Java 7+) |
| **Security** | Never expose internal stack traces to the end-user! |
| **Testing** | Unit tests should "expect" specific exceptions to occur |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Runtime** | `RuntimeException` is the parent of all Unchecked exceptions |
| **Safety** | Compiler will NOT let you use a variable if its creation might fail! |
| **Hierarchy**| Parent-child links for catching groups of errors |
| **Resource** | Use `try (File f = ...) {}` to prevent leaks! |
| **Custom** | Use them for clear domain-specific business errors |
