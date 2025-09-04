---
title: "JavaScript Functions"
slug: "javascript-functions"
order: 11
description: "Learn how to create and use functions in JavaScript to write reusable, modular, and organized code. Understand parameters, arguments, and return values."
category: "Program Flow and Functions"
---

## What is a Function?

A function is a reusable block of code designed to perform a particular task. Functions are one of the fundamental building blocks in JavaScript. They help you avoid repeating code (a principle known as DRY - Don't Repeat Yourself) and make your programs more organized and manageable.

-----

## Defining a Function

There are several ways to define a function in JavaScript, but the two most common are function declarations and function expressions.

### **1. Function Declaration**

A function declaration defines a named function. It starts with the `function` keyword, followed by the name of the function, a list of parameters in parentheses `()`, and a block of code in curly braces `{}`.

```javascript
// A simple function declaration
function greetUser() {
  console.log("Hello, welcome to the Nocturnal Codex!");
}

// Calling the function to execute its code
greetUser();
```

**Output:**

```text
Hello, welcome to the Nocturnal Codex!
```

### **2. Function Expression**

A function expression allows you to create a function and assign it to a variable. The function can be anonymous (it doesn't have a name).

```javascript
const greetUser = function() {
  console.log("Hello from a function expression!");
};

greetUser();
```

-----

## Parameters and Arguments

Functions become truly powerful when you can pass data into them.

  * A **parameter** is a variable listed in the function's definition.
  * An **argument** is the actual value that is passed to the function when it is called.

<!-- end list -->

```javascript
// 'name' and 'age' are parameters
function displayUserInfo(name, age) {
  console.log(`User: ${name}, Age: ${age}`);
}

// "Alice" and 30 are arguments
displayUserInfo("Alice", 30);
```

**Output:**

```text
User: Alice, Age: 30
```

-----

## The `return` Statement

While `console.log()` is useful for displaying information, functions often need to send a value back to the code that called them. The `return` statement stops the execution of a function and returns a specified value.

```javascript
function add(a, b) {
  return a + b;
}

// Call the function and store the returned value in a variable
let sum = add(5, 10);

console.log(sum); // Output: 15
```

This allows you to use the result of a function's calculation in other parts of your program. A function can return any data type, including strings, numbers, arrays, and objects.