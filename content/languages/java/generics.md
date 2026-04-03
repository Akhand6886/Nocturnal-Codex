---
title: "Generics"
description: "Type-safe collections with <T>, wildcards, and type erasure"
---

## What are Java Generics?

Introduced in **JAVA 5**, **Generics** are a way to write generic, reusable code that works correctly with any data type, while still maintaining high-level **Type Safety**. This prevents "ClassCastException" and makes your code much cleaner by removing the need for manual casting.

```java
import java.util.ArrayList;

// Simple Generic List! 
// <String> is the generic type!
List<String> names = new ArrayList<>();
names.add("Alpha");
// names.add(10); // ERROR: Compiler won't let you add an integer!
```

## How It Works: Type Parameters (`<T>`)

You can create your own "generic" classes and methods using a placeholder type, usually called **`T`** (for Type).

```java
public class Box<T> {
    private T content;

    public void set(T content) { this.content = content; }
    public T get() { return content; }
}

// Use it with any type!
Box<Integer> intBox = new Box<>();
intBox.set(10);

Box<String> strBox = new Box<>();
strBox.set("Alpha");
```

## Comparisons: The Two Essential Rules

Wait! Generics only work with **Reference Types** (Objects), not primitives.

-   **`List<int>`**: ❌ ERROR.
-   **`List<Integer>`**: ✅ CORRECT (Uses Wrapper Class).

## Using Wildcards (`?`)

What if you have a method that should work with a list of ANY animal (Dogs, Cats, etc.)? Use the **Wildcard** (`?`).

-   **`List<?>`**: A list of anything.
-   **`List<? extends Animal>`**: A list of Animal or any and ALL of its children!
-   **`List<? super Dog>`**: A list of Dog or any and ALL of its parents!

```java
// Logic that works for any Animal collection!
public void process(List<? extends Animal> animals) {
    for (Animal a : animals) a.eat();
}
```

## Summary

| Feature | Syntax | Purpose |
| :--- | :--- | :--- |
| **Generic** | `Box<T>` | Class that works with any type |
| **Methods** | `<T> void f(T x)` | Run logic on any type |
| **Wildcard** | `List<?>` | Unknown generic type |
| **Upper Bound**| `? extends T` | Limit to children of T |
| **Lower Bound**| `? super T` | Limit to parents of T |
| **Best For** | Collections, reusable logic, type-safe APIs |
| **Safe** | Impossible to add the wrong type! |
| **Clean** | No more manual `(String) obj` casting! |
| **Modern** | The foundation of the Java Collections Framework |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Bounded** | `T extends Animal` (Only allow certain types!) |
| **Erasure** | Logic: Compiler REMOVES the `<T>` after checking! |
| **JVM** | The JVM doesn't actually know about Generics (Type Erasure!) |
| **Raw Type** | `List` without `<>` (DANGER: Avoid this in modern code!) |
| **Inference** | `new ArrayList<>()` (The Diamond operator! - Java 7+) |
| **Static** | `static` methods MUST have their own `<T>` definition! |
| **Array** | You CANNOT create an array of a generic type! |
| **Exception** | Generic classes cannot extend `Throwable`! |
| **Logic** | Code once; use for many different types! |
| **Identity** | An object never "forgets" its real type internally |
| **Cast** | Compiler does the casting for you automatically |
| **Efficiency** | Zero runtime cost (Exactly same as manual code!) |
| **Safety** | Errors are caught at compile-time, not in production |
| **Framework** | Spring, Hibernate, etc. rely entirely on Generics |
