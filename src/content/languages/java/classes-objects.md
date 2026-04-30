---
title: "Classes & Objects"
description: "Encapsulation, constructors, the 'this' keyword, and instance members"
---

## What are Java Classes?

In **Java**, a **class** is a blueprint (a template) for an object. It defines two things:

1.  **Attributes** (Data/Fields): What the object "knows."
2.  **Methods** (Behavior/Actions): What the object "can do."

```java
public class User {
    // Attributes!
    String name;
    int age;

    // A simple method!
    public void greet() {
        System.out.println("Hi, I'm " + name + "!");
    }
}
```

## Creating an Object (`new`)

An **object** is a "real-world" instance of a class that actually exists in your computer's memory. You create an object using the **`new`** keyword.

```java
// Create an instance!
User u1 = new User();
u1.name = "Alpha"; // Set values!
u1.greet(); // Run methods!
```

## Constructors

A **constructor** is a special "method" that is called automatically when an object is created. It has the **SAME name** as the class and NO return type!

```java
public class User {
    String name;

    // Constructor!
    public User(String n) {
        // Set name during creation!
        name = n; 
    }
}

User u1 = new User("Alpha");
```

## The "this" Keyword

Wait! What if your parameter has the same name as your attribute? Use **`this`** to tell the computer you mean the attribute on the CURRENT object.

```java
public class User {
    String name;

    public void setName(String name) {
        // this.name = The class attribute!
        // name = The method parameter!
        this.name = name; 
    }
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **Class** | The blueprint for your data |
| **Object** | The actual instance you use |
| **Field** | Variable belonging to a class |
| **Method** | Function belonging to a class |
| **Constructor** | Used to initialize data members |
| **new** | The keyword used to create an object |
| **this** | Refers to the current object instance |
| **null** | Represents an uninitialized object |
| **Best For** | Modeling real-world entities, managing state |
| **OOP** | Encapsulation, Abstraction, Inheritance, Polymorphism |
| **Member** | General name for attributes and methods |
| **State** | The current values of an object's fields |
| **Behavior** | The logic inside an object's methods |
| **Identity** | Each object has a unique memory address |
| **Access** | `u1.name` (Accessing with the dot operator!) |
| **Encapsulate**| Keeping your data private (See Encapsulation section!) |
| **Static** | Shared across ALL instances of the class |
| **Inherit** | Deriving one class from another! |
| **Overload** | Define multiple constructors with different inputs |
| **Memory** | Objects live on the "Heap" memory |
| **Garbage C** | Objects are auto-deleted when no one refers to them! |
| **Reference** | `User u1` is a reference; `new User()` is the object! |
| **Anonymous** | Creating an object without saving it to a variable! |
| **Factory** | A method that creates and returns objects |
| **Singleton** | Limit instance count to ONLY one per app |
