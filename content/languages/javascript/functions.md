---
title: "Functions"
description: "Declaration, expression, arrow functions, default params, rest/spread"
---

## Functional JavaScript: First-Class Citizens

In JavaScript, functions are **first-class citizens**. This means you can treat functions like any other object: assign them to variables, pass them as arguments, and return them from other functions!

```javascript
// Function Declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function Expression
const sayHi = function(name) {
  return `Hi, ${name}!`;
};

console.log(greet("Alpha"));
console.log(sayHi("Beta"));
```

## Modern Functions: Arrow Functions (ES6)

**Arrow functions** are a concise way to write functions. Beyond being shorter, they have one major difference: **they do NOT have their own `this` keyword**.

```javascript
// Single-line (Implicit Return!)
const square = (x) => x * x;

// Multi-line
const calculateArea = (width, height) => {
  const area = width * height;
  return area;
};

console.log(square(5)); // 25
```

> **Wait!** Use arrow functions for almost everything, especially callbacks in objects or arrays. Only use traditional `function` declarations when you *need* the `this` context (like in certain class methods or event handlers).

## Advanced Parameters (ES6)

### 1. Default Parameters

Assign default values to arguments in case they are missing.

```javascript
const welcome = (name = "Guest") => {
  console.log(`Welcome, ${name}!`);
};

welcome();       // Welcome, Guest!
welcome("Alpha"); // Welcome, Alpha!
```

### 2. Rest Parameters (`...args`)

The **rest parameter** allows a function to collect an indefinite number of arguments as an array.

```javascript
const sumAll = (...numbers) => {
  // 'numbers' is an array [1, 2, 3, 4]!
  return numbers.reduce((total, n) => total + n, 0);
};

console.log(sumAll(1, 2, 3, 4)); // 10
```

## Closures: Functions that Remember

A **closure** is a function that "remembers" the variables from its outer (parent) function, even after the parent has finished running.

```javascript
const counterFactory = () => {
  let count = 0; // Private variable!
  
  return () => {
    count++;
    return count;
  };
};

const myCounter = counterFactory();
console.log(myCounter()); // 1
console.log(myCounter()); // 2
```

## Higher-Order Functions

A function that takes another function as an argument (a **callback**) is called a **higher-order function**. These are incredibly common for handling events and manipulating arrays.

```javascript
const process = (name, callback) => {
  console.log(`Processing: ${name}`);
  callback();
};

process("Order #123", () => {
  console.log("Order Saved!");
});
```

## Summary

| Type | Syntax | Purpose |
| :--- | :--- | :--- |
| **Declaration** | `function f() {}` | Standard global function |
| **Expression** | `const f = function() {}` | Function as a variable |
| **Arrow (ES6)** | `(x) => x * 2` | Concise, non-binding `this` |
| **Default** | `(x = 10) => {}` | Optional arguments |
| **Rest** | `(...args) => {}` | Indefinite arguments |
| **IIFE** | `(() => {})()` | Immediately-invoked function |
| **Callback** | `f(callback)` | Higher-order logic |
| **Closure** | `f() { return f(); }`| Functions with private state |
| **Best For** | Reusable logic, events, callbacks |
| **Parameter** | Pass variables to functions |
| **Argument** | The actual data passed! |
| **Pure Func** | Returns same output for same input |
| **Side Effect**| Function that modifies global state |
| **Recursion** | Function that calls itself |
| **Hoisting** | Function declarations are moved to the top of code! |
