---
title: "Prototypes"
description: "Prototype chain, __proto__, Object.create, and inheritance"
---

## What are JavaScript Prototypes?

Unlike Java or C++, JavaScript is a **prototype-based language**. Every object in JavaScript has an internal property called its **Prototype**. When you try to access a property that doesn't exist on an object, JavaScript looks for it on that object's Prototype, and then on its Prototype's Prototype—this is called the **Prototype Chain**.

```javascript
const user = { name: "Alpha" };

// user has no toString method, so it looks up the chain!
console.log(user.toString()); 
// It finds it on Object.prototype!
```

## The Prototype Chain Explained

1.  **Object Instance**: The specific object you created.
2.  **`[[Prototype]]`**: The internal link to the parent object.
3.  **`Object.prototype`**: The root of the chain for almost all objects.
4.  **`null`**: The final end of every prototype chain!

```javascript
const animal = { eats: true };
const dog = Object.create(animal); // Link dog to animal!

console.log(dog.eats); // true (Inherited from animal!)
console.log(dog.hasOwnProperty('eats')); // false (It's not ON the dog!)
```

## Constructor Functions & `.prototype`

Before the `class` keyword was introduced in ES6, we used **constructor functions** to create multiple objects with the same prototype.

```javascript
function User(name) {
  this.name = name;
}

// Add methods to the Prototype (Efficiency!)
User.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}!`);
};

const bob = new User("Bob");
bob.greet();
```

> **Performance Note**: Adding a method to the `.prototype` is better than adding it inside the constructor. In the prototype, there is only **one copy** of the function shared by every instance!

## Modern Inheritance: `extends` vs `__proto__`

While ES6 `class` syntax is much cleaner, it's actually just "syntactic sugar" for prototypes under the hood.

```javascript
class Person {
  constructor(name) { this.name = name; }
}

class Admin extends Person {
  constructor(name) { super(name); }
}

const admin = new Admin("Alpha");
// admin -> Admin.prototype -> Person.prototype -> Object.prototype
```

## Summary

| Term | Description |
| :--- | :--- |
| **[[Prototype]]** | The internal link to the parent (not accessible!) |
| **__proto__** | The legacy way to access the internal prototype. |
| **Object.create(o)**| Create a new object with `o` as its prototype. |
| **.prototype** | Property on functions used to set inheritance. |
| **Object.prototype**| The end-level parent for all objects. |
| **Best For** | Reusable logic, efficient inheritance, memory saving |
| **Shallow Link** | Modifying a prototype method affects EVERY instance! |
| **hasOwnProperty()**| Check if property is on the object vs. the prototype |
| **getPrototypeOf()**| The modern, safe way to check an object's prototype |
| **setPrototypeOf()**| Change an object's parent in real-time (DANGER!) |
| **Shadowing** | Property on child "hides" the one on the prototype |
| **Functional** | No classes needed; just link objects together |
| **Legacy** | Understanding prototypes is key for debugging old code |
| **Constructor** | Functions used with a `new` keyword |
| **Instance** | An object created from a constructor |
| **Method** | A function stored on a prototype |
| **Lookup** | The process of searching through the chain |
| **Shared State** | Don't store mutable objects on a prototype! |
