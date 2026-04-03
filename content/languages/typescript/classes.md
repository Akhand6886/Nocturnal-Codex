---
title: "Classes"
description: "class syntax, member visibility, and 'implements' interface"
---

## What is the TypeScript `class`?

In **TypeScript**, a **class** is a blueprint (a template) for an object. It defines two things:

1.  **Attributes** (Data/Fields): What the object "knows."
2.  **Methods** (Behavior/Actions): What the object "can do."

```typescript
class User {
  // Attributes!
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // A simple method!
  greet() {
    console.log("Hi, I'm " + this.name + "!");
  }
}

const u1 = new User("Alpha", 25);
u1.greet(); // Run methods!
```

## Comparisons: JavaScript vs. TypeScript Classes

Wait! TypeScript adds several features that don't exist in standard JavaScript:

-   **Type Safety**: Catching errors if you use the wrong type for an attribute.
-   **Visibility**: Using `public`, `private`, and `protected` to hide internal data.
-   **Interfaces**: Forcing a class to follow a specific "contract."

## Member Visibility: Who Can See What?

| Modifier | Access From Anywhere | Access From Subclass | Access From World |
| :--- | :--- | :--- | :--- |
| **public** | Yes | Yes | **Yes** |
| **protected**| Yes | **Yes** | No |
| **private** | **Yes** | No | No |

## "Implements" (Joining an Interface)

A class can **`implement`** an interface to ensure that it has specific methods and properties.

```typescript
interface Drawable {
  draw(): void;
}

// Circle MUST have a draw() method!
class Circle implements Drawable {
  draw() { console.log("Drawing!"); }
}
```

## Static Members

A **static** member belongs to the **class itself**, not to individual objects created from it.

```typescript
class Utils {
    static APP_VERSION = "1.0.0";
    
    static isValidEmail(email: string) {
        return email.includes("@");
    }
}

console.log(Utils.APP_VERSION); 
console.log(Utils.isValidEmail("hi@example.com"));
```

## Summary

| Term | Examples | Description |
| :--- | :--- | :--- |
| **class** | `class x {}` | The blueprint for an object |
| **constructor**| `constructor()` | Special method to initialize data |
| **implements** | `implements i` | Joining a formal "interface" |
| **extends** | `extends p` | Inheriting from a parent class |
| **public** | Default | Visible to everyone |
| **private** | `private x` | Visible only inside the class |
| **protected** | `protected x` | Visible only to class and children |
| **Best For** | Structuring logic, complex business objects, state management |
| **this** | Refers to the current object instance |
| **new** | The keyword used to create an object |
| **readonly** | Property that cannot be changed after creation |
| **abstraction** | Use `abstract` for classes that cannot be instances |
| **OOP** | Encapsulation, Abstraction, Inheritance, Polymorphism |
| **Super** | `super()` (Call the parent class constructor!) |
| **Modern** | TS provides true-private-fields with `#` (ESNext) |
| **Clean** | Your class becomes a "Black Box" (Logic stays hidden!) |
| **Safety** | TypeScript ensures you don't miss a required method! |
| **Override** | Use `override` keyword to mark overridden methods |
| **Refactor** | Rename a property, and it updates across all instances! |
| **Identity** | An object never "forgets" its real type internally |
| **Decorators**| Modern meta-programming for classes and methods |
| **Getter/Setter**| Methods used to access private data safely |
| **Memory** | Objects live on the "Heap" memory |
| **Garbage C** | Objects are auto-deleted when no one refers to them! |
| **Standard** | Established and trusted worldwide for 10+ years |
| **Safe** | TS forces you to initialize ALL non-optional fields! |
| **Logic** | One interface, many implementations |
| **Design** | Allows for "Liskov Substitution Principle" (SOLID) |
