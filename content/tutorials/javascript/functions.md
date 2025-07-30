---
title: "JS Functions"
slug: "javascript-functions"
order: 6
description: "Learn how to define and use functions to create reusable blocks of code in JavaScript."
category: "JS Functions"
---

## JavaScript Functions

A JavaScript function is a block of code designed to perform a particular task. A function is executed when "something" invokes it (calls it).

### Function Declarations
This is the most common way to define a function.

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World")); // Output: Hello, World!
```

### Function Expressions
A function can also be defined as an expression, which can be stored in a variable.

```javascript
const farewell = function(name) {
  return "Goodbye, " + name + "!";
};

console.log(farewell("World")); // Output: Goodbye, World!
```

### Arrow Functions (ES6)
Arrow functions provide a more concise syntax for writing function expressions.

```javascript
const add = (a, b) => {
  return a + b;
};

// For single-expression functions, you can omit the braces and return keyword
const subtract = (a, b) => a - b;

console.log(add(5, 3));       // Output: 8
console.log(subtract(10, 4)); // Output: 6
```

### Parameters and Arguments
- **Parameters** are the names listed in the function definition.
- **Arguments** are the real values passed to the function when it is invoked.

### Return Value
The `return` statement stops the execution of a function and returns a value. If `return` is omitted, the function returns `undefined`.