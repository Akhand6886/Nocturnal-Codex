---
title: "Inheritance"
description: "extends, overridden methods, and 'super' (is-a relationship)"
---

## What is Inheritance in Java?

**Inheritance** allows one class (the **subclass** or **child class**) to derive its attributes and methods from another class (the **superclass** or **parent class**). This is fundamental for promoting code reuse and establishing hierarchies between related objects.

In Java, we use the keyword **`extends`** to indicate that one class is a child of another.

```java
public class Animal {
    public void eat() {
        System.out.println("Eating...");
    }
}

// Child class!
class Dog extends Animal {
    public void bark() {
        System.out.println("Barking!");
    }
}

Dog d = new Dog();
d.eat(); // Inherited!
d.bark();
```

## Comparisons: The "is-a" Relationship

Wait! Only use inheritance if a child **is a** version of the parent. For example:
-   A Dog **is a** animal. (✅ Good use of inheritance!)
-   A Car is NOT a wheel. (❌ Use "Composition" — A Car *has a* wheel!)

## Overriding Methods

A child class can provide its own "specialized" version of a method that already exists in its parent. This is called **Method Overriding**. Use the **`@Override`** tag to tell the compiler exactly what you're doing.

```java
class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("Cat is eating fish!");
    }
}
```

## The "super" Keyword

The **`super`** keyword is used to refer to the **parent class**. You can use it to:

1.  **Run the parent constructor**: `super()` MUST be the first line of your constructor!
2.  **Run a parent method**: `super.eat()` runs the original version of the method.

```java
public Dog() {
    super(); // Call the parent constructor!
    System.out.println("Dog created!");
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **extends** | Keyword used to link a child to a parent |
| **Superclass** | The parent providing the features |
| **Subclass** | The child receiving the features |
| **Override** | Creating a specialized version of a method |
| **super** | Link to the original parent methods/constructor |
| **Object** | The "Grand-Parent" of ALL classes in Java! |
| **Final** | A `final` class CANNOT have children! |
| **Best For** | Code reuse, building object hierarchies |
| **Tree** | Inheritance builds a logical "Tree" of related code |
| **Constructor** | Parent constructor runs BEFORE the child one! |
| **Access** | Children cannot see `private` members of the parent! |
| **Protected** | Accessible to the class AND its children |
| **Multiple** | Java DOES NOT allow inheriting from more than ONE class! |
| **Polymorphism**| The ability to treat children as parents (See below!) |
| **Safe** | Inheritance prevents duplication of common code |
| **Chain** | Calling `u.toString()` triggers the Object.toString() |
| **Relationship**| A hierarchical "is-a" link |
| **Inherited** | Children inherit ALL non-private methods and fields |
| **Shadowing** | Creating a same-named field in a child (AVOID THIS!) |
| **Refactor** | Move common code to the Parent to clean up many children |
| **Abstraction** | Use inheritance to define generic behavior (See Abstract) |
| **Limit** | Too many layers of inheritance makes code hard to read! |
