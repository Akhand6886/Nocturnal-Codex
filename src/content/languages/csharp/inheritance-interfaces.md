---
title: "Inheritance & Interfaces"
description: "Abstract classes, polymorphism, and contract-based programming"
---

## Inheritance (`:`)

In **C#**, inheritance allows you to create a new class that reuses, extends, and modifies the behavior defined in another class. C# supports **Single Inheritance** (a class can only inherit from one base class).

```csharp
public class Animal {
    public virtual void MakeSound() => Console.WriteLine("Some sound");
}

public class Dog : Animal {
    public override void MakeSound() => Console.WriteLine("Bark!");
}
```

Wait! Use the **`virtual`** keyword in the base class and **`override`** in the derived class to enable polymorphism.

## Abstract Classes

An **Abstract Class** cannot be instantiated. It serves as a base for other classes and can contain **Abstract Methods** that MUST be implemented by derived classes.

```csharp
public abstract class Shape {
    public abstract double GetArea();
}
```

## Interfaces (`I...`)

An **Interface** defines a contract. Any class or struct that implements that interface MUST provide implementations for the members defined in the interface.

```csharp
public interface IDrawable {
    void Draw();
}
```

Wait! Unlike inheritance, a class can implement **multiple interfaces**. By convention, all interface names in C# start with a capital **`I`**.

## Polymorphism

Polymorphism allows you to treat a group of different objects as if they were of a single base type or interface.

```csharp
List<Animal> animals = new() { new Dog(), new Cat() };
foreach (var a in animals) a.MakeSound(); // Each makes its own specific sound!
```

## Summary

| Term | Description |
| :--- | :--- |
| **base** | Access members of the parent class |
| **sealed** | Prevents other classes from inheriting from this class |
| **interface** | A pure contract with no implementation (mostly) |
| **abstract** | A partial implementation that requires more detail |
| **virtual** | Method that CAN be overridden |
| **override** | Method that IS overriding a virtual method |
| **new** | Hiding a base class member (Use with caution!) |
| **Best For** | Code reuse, abstraction, and flexible architectures |
| **Logic** | "Is-A" (Inheritance) vs "Can-Do" (Interfaces) |
| **Safety** | Strong typing ensures objects follow the defined contract |
| **Modern** | Default Interface Methods (C# 8+) allow adding logic to interfaces |
| **Standard** | Prefer Composition and Interfaces over deep inheritance |
