---
title: "Interfaces & Abstract Classes"
description: "Defining contracts with interface, default methods, and 'abstract' (Pure OOP)"
---

## What is an Abstract Class?

In **Java**, an **Abstract Class** is a "half-finished" class. It can have some normal methods, but it also has **Abstract Methods** (methods with no code) that its children **must** finish. You cannot create an object from an abstract class itself.

```java
public abstract class Shape {
    String color; // Attributes!

    // MUST be finished by children!
    public abstract double area(); 

    // Regular logic!
    public void show() { System.out.println("Displaying..."); }
}
```

## What is an Interface?

An **Interface** is a "contract" or a blueprint of **what** a class must do, but not **how** it should do it. It contains only empty methods (until Java 8). A class doesn't `extend` an interface; it **`implements`** it.

```java
public interface Drawable {
    void draw(); // All interface methods are public/abstract!
}

class Circle implements Drawable {
    @Override
    public void draw() { System.out.println("Drawing!"); }
}
```

## Comparisons: Abstract Class vs. Interface

| Feature | Abstract Class | Interface |
| :--- | :--- | :--- |
| **Methods** | Both abstract and concrete methods. | Only abstract methods (until Java 8). |
| **Variables**| Can have normal instance variables. | Can only have constants (`static final`). |
| **Inherit** | A class can extend only ONE parent. | A class can implement **MANY** interfaces! |
| **Relationship**| "Is a" (Part of a hierarchy) | "Can do" (A capability) |

## Modern Feature: Default Methods (JAVA 8+)

Wait! Interfaces were too "strict." Since **Java 8**, you can add code to an interface using the **`default`** keyword. This allows you to add new features to existing interfaces without breaking all the classes that implement them.

```java
public interface Drawable {
    void draw();

    default void log() {
        System.out.println("Logging the DRAW action!");
    }
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **Abstract** | Half-finished class; used as a base for children |
| **Interface** | A formal "contract" of what a class MUST do |
| **Implements**| Keyword used when a class joins an interface |
| **Default** | Implementation logic inside an interface (Java 8+) |
| **Contract** | A guarantee that specific methods will exist |
| **Multiple** | Implement 2, 3, or more interfaces at once! |
| **Best For** | Code decoupling, plugin architectures, generic APIs |
| **Override** | MUST finish all abstract/interface methods! |
| **Static** | Interfaces can also have static helper methods |
| **Private** | Interfaces can have private helper methods (Java 9+) |
| **Functional**| Interface with only ONE method (See Streams section!) |
| **Constant** | All interface variables are `public static final` |
| **Marker** | Interface with NO methods (e.g., `Serializable`) |
| **Hierarchy**| Abstract classes lead to deep parent-child links |
| **Flexible** | Interfaces lead to flat, flexible capability links |
| **Decouple** | Programming to an interface, not an implementation |
| **Standard** | `List`, `Set`, `Map` are all Interfaces in Java! |
| **API** | `List<String> list = new ArrayList<>();` (The standard pattern!) |
| **Lambda** | Interfaces power modern Java closures! |
| **Safety** | Compiler will NOT let you forget a required method! |
| **Refactor** | Use interfaces to make your code much easier to test! |
| **Pure** | Interfaces provide pure Abstraction |
| **Evolution** | Use `default` to update production APIs safely |
| **Constraint**| Limits how a class behaves, but not how it works internally |
