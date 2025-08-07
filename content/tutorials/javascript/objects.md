---
title: "JavaScript Objects"
slug: "javascript-objects"
order: 9
description: "Learn how to use objects to store collections of key-value data in JavaScript."
category: "JS Fundamentals"
---

## Understanding JavaScript Objects

In JavaScript, an object is a standalone entity, with properties and type. Think of an object as a collection of key-value pairs. This is a very common way to group related data and functionality.

### Creating an Object

The most common way to create an object is with an object literal `{}`.

```javascript
const person = {
  firstName: "Ada",
  lastName: "Lovelace",
  age: 36,
  isProgrammer: true,
  greet: function() {
    console.log("Hello, my name is " + this.firstName);
  }
};
```

This `person` object has properties (`firstName`, `age`) and a method (`greet`).

### Accessing Properties

You can access object properties in two ways:

1.  **Dot Notation**: `objectName.propertyName`
    ```javascript
    console.log(person.firstName); // Output: "Ada"
    ```

2.  **Bracket Notation**: `objectName["propertyName"]`
    ```javascript
    console.log(person["lastName"]); // Output: "Lovelace"
    ```

Bracket notation is useful when the property name is stored in a variable.

### Modifying Objects

You can add, change, or delete object properties.

```javascript
// Adding a new property
person.nationality = "British";

// Changing an existing property
person.age = 37;

// Deleting a property
delete person.isProgrammer;
```

### Methods

A method is a function stored as a property.

```javascript
person.greet(); // Calls the greet method, output: "Hello, my name is Ada"
```
The `this` keyword refers to the object the method is part of.

Objects are fundamental to understanding almost every aspect of JavaScript, from simple data storage to complex application architecture.