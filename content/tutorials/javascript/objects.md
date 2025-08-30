---
title: "JavaScript Objects"
slug: "javascript-objects"
order: 8
description: "Understand JavaScript objects, a core concept for storing collections of data in a key-value pair format. Learn to create, access, and modify object properties."
category: "Core Data Structures"
---

## What is an Object?

In JavaScript, an object is a standalone entity, with properties and type. It's a collection of key-value pairs, where the keys are strings (or Symbols) and the values can be anything—strings, numbers, booleans, arrays, and even other objects or functions.

Objects are incredibly versatile and are used to represent real-world things, like a user, a car, or a product. You can create an object using curly braces `{}`, also known as an **object literal**.

```javascript
// An object representing a user
const user = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  isLoggedIn: true
};

console.log(user);
```

**Output:**

```text
{firstName: "John", lastName: "Doe", age: 30, isLoggedIn: true}
```

-----

## Accessing Object Properties

You can access the properties of an object in two ways:

### **1. Dot Notation**

This is the most common and straightforward way to access a property.

```javascript
// Access the firstName property
console.log(user.firstName); // Output: "John"
```

### **2. Bracket Notation**

Bracket notation is useful when the property key is stored in a variable or if the key has spaces or special characters.

```javascript
// Access the lastName property using bracket notation
console.log(user["lastName"]); // Output: "Doe"

// Using a variable to access a property
let propertyToAccess = "age";
console.log(user[propertyToAccess]); // Output: 30
```

-----

## Modifying Objects

Objects are mutable, which means you can change their content after they are created, even if they are declared with `const`. The `const` declaration prevents you from reassigning the `user` variable to a completely new object, but it doesn't stop you from changing the properties inside it.

### **Changing a Property**

You can change a property's value by assigning a new value to it.

```javascript
user.age = 31;
console.log(user.age); // Output: 31
```

### **Adding a New Property**

You can add a new property simply by assigning a value to a new key.

```javascript
user.email = "john.doe@example.com";
console.log(user.email); // Output: "john.doe@example.com"
```

### **Deleting a Property**

You can remove a property from an object using the `delete` operator.

```javascript
delete user.isLoggedIn;
console.log(user); // The isLoggedIn property will be gone
```

-----

## Objects Can Have Methods

When a function is a property of an object, it's called a **method**. Methods define the actions that an object can perform.

```javascript
const person = {
  firstName: "Jane",
  lastName: "Doe",
  // This is a method
  greet: function() {
    console.log("Hello, my name is " + this.firstName);
  }
};

// Call the greet method
person.greet(); // Output: "Hello, my name is Jane"
```

The `this` keyword refers to the object the method belongs to (in this case, `person`).

Objects are the foundation of more complex programming in JavaScript, and you will use them in almost every application you build.