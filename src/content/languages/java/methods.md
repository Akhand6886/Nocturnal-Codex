---
title: "Methods"
description: "Declaration, parameters, return types, and overloading"
---

## What are Java Methods?

In **Java**, a **method** is a block of code which only runs when it is called. You can pass data, known as **parameters**, into a method. Methods are used to perform certain actions, and they are also known as **functions** in other programming languages.

```java
public class Calculator {
    // A simple method!
    public int add(int a, int b) {
        return a + b;
    }
}
```

## Method Components

A method has several parts that the compiler uses to understand how it should work:

1.  **Access Modifier**: Who can call the method? (`public`, `private`, `protected`).
2.  **Return Type**: What data does it send back? (`int`, `String`, `void` for nothing).
3.  **Name**: The name used to call it. (In **camelCase**!).
4.  **Parameters**: The data passed into the method inside `()`.
5.  **Body**: The actual code inside `{}`.

```java
// public access, returns nothing (void)!
public void greet(String name) {
    System.out.println("Hello, " + name);
}
```

## Method Overloading

In Java, multiple methods can have the **SAME name**, as long as they have **DIFFERENT parameters** (different types or different number of inputs). This is called **Method Overloading**.

```java
public int sum(int a, int b) { return a + b; }
public double sum(double a, double b) { return a + b; }
public int sum(int a, int b, int c) { return a + b + c; }
```

> **Wait!** Java uses the arguments you pass to automatically figure out which version of the method to run.

## Static Methods vs. Instance Methods

-   **Static Method**: Belongs to the **class** itself. You can call it WITHOUT creating an object! (`Math.sqrt()`).
-   **Instance Method**: Belongs to an **object**. You must create an object with `new` before you can call it!

```java
public class Helper {
    public static void log(String msg) {
        System.out.println("Log: " + msg);
    }
}

Helper.log("Application started!"); // No 'new' needed!
```

## Summary

| Term | Description |
| :--- | :--- |
| **Method** | A block of code to perform an action |
| **Parameter** | Variable defined in the method signature |
| **Argument** | The ACTUAL data passed into the method |
| **Return** | Keyword to send data back to caller |
| **void** | Return type for methods that send NOTHING back |
| **Overloading** | Multiple methods with same name; different inputs |
| **Static** | Belongs to class; no object needed |
| **Final** | Method cannot be "overridden" by a child class |
| **Best For** | Code reuse, abstraction, organizing logic |
| **camelCase** | Java convention for names (e.g., `calculateResult`) |
| **Signature** | The method name + its parameter types |
| **Varargs** | `(int... nums)` (Variable number of arguments!) |
| **Recursion** | A method that calls itself (Use carefully!) |
| **this** | Refers to the current object inside the method |
| **Throws** | `void f() throws Exception` (Declaring errors!) |
| **Scope** | Variables inside a method only exist there! |
| **Parameter** | Pass by value (Primitives) vs. Pass by reference (Objects) |
| **Interface** | Methods without a body (See Interfaces section!) |
| **Constructor** | A special method to create objects! |
| **Getter/Setter**| Methods used to access private data safely |
| **Functional**| Using "Lambda" to pass methods as data (Java 8+) |
| **Jit** | The JVM can "inline" small methods to make them faster |
| **Stack** | Each method call gets its own space on the call stack |
| **Nesting** | You cannot define a method INSIDE another method! |
