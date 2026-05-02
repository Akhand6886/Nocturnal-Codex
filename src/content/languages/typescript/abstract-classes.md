---
title: "Abstract Classes"
description: "Defining base classes, abstract methods, and inheritance"
---

## What are Abstract Classes?

An **Abstract Class** is a base class that cannot be instantiated directly. It serves as a "blueprint" for other classes to inherit from. It can contain both implemented methods and **Abstract Methods** (methods that have no body and MUST be implemented by subclasses).

```typescript
abstract class Shape {
    constructor(public color: string) {}

    abstract getArea(): number; // No implementation!

    printInfo() {
        console.log(`A ${this.color} shape with area ${this.getArea()}`);
    }
}
```

## Implementing Subclasses

Wait! You use the `extends` keyword to inherit from an abstract class. If you don't implement all the abstract methods, the compiler will error.

```typescript
class Circle extends Shape {
    constructor(color: string, private radius: number) {
        super(color);
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}
```

## Abstract vs. Interfaces

Wait! When should you use an abstract class instead of an interface?

-   **Interface**: Describes ONLY the shape (behavior) of an object. It cannot contain implementation code or logic.
-   **Abstract Class**: Can contain common logic (implementation) that all subclasses should share.

| Feature | Interface | Abstract Class |
| :--- | :--- | :--- |
| **Logic** | None (Definition only) | **Yes (Shared methods)** |
| **Instantiate**| No | No |
| **Multi** | Can implement many | **Can only inherit one** |
| **Access Mod.**| No (All public) | **Yes (`private`, `protected`)**|

## Summary

| Term | Description |
| :--- | :--- |
| **abstract** | Keyword to define the class or method |
| **extends** | Keyword to inherit from the base class |
| **super()** | Calling the base class constructor |
| **Blueprint** | Abstract classes provide structure for related types |
| **Shared** | Great for putting common logic in one place |
| **Enforced** | Subclasses MUST implement abstract methods |
| **Best For** | Complex class hierarchies (e.g., UI components, DB models) |
| **Logic** | Combines the power of interfaces and regular classes |
| **Safety** | Prevents creating "generic" objects that aren't fully formed |
| **Modern** | Powering large-scale OOP applications in TypeScript |
| **Identity** | An abstract class is a REAL class (it exists in JS output) |
| **Hierarchy** | Use inheritance for "Is-A" relationships |
