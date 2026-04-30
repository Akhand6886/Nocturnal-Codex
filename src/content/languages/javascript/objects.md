---
title: "Objects"
description: "Literals, property access, destructuring, computed keys, Object methods"
---

## What are JavaScript Objects?

In **JavaScript**, almost everything is an object. An object is a collection of related data (properties) and functional logic (methods) that represent a single entity in your application.

```javascript
// Simple Object Literal
const user = {
    id: 1,
    name: "Alpha",
    greet() {
        console.log(`Hi, I'm ${this.name}!`);
    }
};

user.greet(); // Hi, I'm Alpha!
```

## Accessing Properties: Dot vs. Bracket

1.  **Dot Notation (`obj.prop`)**: The most common way to access properties.
2.  **Bracket Notation (`obj["prop"]`)**: Essential when the property name is stored in a variable or contains special characters.

```javascript
const key = "name";
console.log(user.name);  // Dot access
console.log(user[key]);   // Bracket access (uses the variable!)
```

## ES6 Features: Destructuring & Shorthand

### 1. Object Destructuring

Extract multiple properties into individual variables in one line. It makes your code cleaner and easier to read!

```javascript
const config = {
    host: "localhost",
    port: 8080,
    timeout: 5000
};

// Extracts host and port!
const { host, port } = config;
console.log(host, port); // localhost 8080
```

### 2. Property Shorthand

If your variable name matches the property name, you don't need to specify both.

```javascript
const name = "Beta";
const age = 30;

// Shorthand syntax!
const profile = { name, age }; 
// Equivalent to { name: name, age: age }
```

## Computed Property Keys (ES6)

You can use an expression inside brackets directly within the object literal.

```javascript
const suffix = "_count";
const stats = {
    [`user${suffix}`]: 100,
    [`order${suffix}`]: 50
};

console.log(stats.user_count); // 100
```

## Essential Object Methods

Built-in static methods for working with objects.

| Method | Purpose | Example |
| :--- | :--- | :--- |
| **Object.keys(obj)** | Get all keys as an array | `["id", "name"]` |
| **Object.values(obj)** | Get all values as an array | `[1, "Alpha"]` |
| **Object.entries(obj)** | Get key-value pairs as an array | `[["id", 1], ...]` |
| **Object.assign(t, s)** | Copy properties from source to target | `Object.assign({}, old)` |
| **Object.freeze(obj)** | Make object immutable (read-only) | `Object.freeze(user)` |

```javascript
const data = { x: 10, y: 20 };

// Create a copy!
const copy = { ...data }; // Spread operator (Modern way!)
```

## Summary

| Feature | Description |
| :--- | :--- |
| **Literal** | Hand-writing `{ key: value }` |
| **Dot Notation** | Quick access (`obj.prop`) |
| **Bracket Access**| Access with variables (`obj[key]`) |
| **Destructuring** | Extract values into variables |
| **Spread (...)** | Copy or merge objects |
| **Freeze** | Make object read-only |
| **Best For** | Modeling entities, passing data, associative maps |
| **Method** | Function belonging to an object |
| **this** | Refers to the current object (in methods) |
| **Object.entries** | Best for looping over key-value pairs |
| **keys()** | Best for finding all available properties |
| **Shallow Copy** | Nested objects are not copied, only the reference |
| **Seal** | Prevents adding/removing, but allows modifying |
| **DefineProperty** | Control property accessibility (readonly, enumerable) |
