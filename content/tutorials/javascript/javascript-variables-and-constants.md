---
title: "JavaScript Variables and Constants"
slug: "javascript-variables-and-constants"
order: 2
description: "Learn how to declare and use variables in JavaScript. Understand the key differences between var, let, and const and when to use each."
category: "JavaScript Fundamentals"
---

## What is a Variable?

A variable is a container for storing data values. Think of it as a named storage location for information that your program can manipulate. In JavaScript, we use variables to hold everything from numbers and text to more complex objects.

-----

## Declaring Variables

Before you use a variable, you must declare it. In modern JavaScript, there are two main keywords for declaring variables that can be changed: `let` and `var`. The modern standard is to use `let`.

### **Using `let`**

The `let` keyword was introduced in ES6 (2015) and is the recommended way to declare a variable whose value can change. `let` is **block-scoped**, meaning it's only available within the block (e.g., inside an `if` statement or `for` loop) where it's defined.

```javascript
// Declare a variable named 'message'
let message;

// Assign a value to the variable
message = "Hello, JavaScript!";

// You can also declare and assign in one line
let userAge = 25;

// The value can be changed
userAge = 26;

console.log(userAge); // Output: 26
```

### **Using `var` (The Old Way)**

Before 2015, `var` was the only way to declare variables. `var` is **function-scoped**, which can sometimes lead to unexpected behavior. While you will still see it in older codebases, it's generally recommended to use `let` and `const` in new projects.

```javascript
var greeting = "Hello from var!";
```

-----

## Declaring Constants

Sometimes, you'll want to define a variable whose value should not be changed throughout your program. For this, we use the `const` keyword.

### **Using `const`**

A constant is a variable that, once assigned a value, cannot be reassigned. Like `let`, `const` is also **block-scoped**. You must assign a value to a constant when you declare it.

```javascript
// Declare a constant named 'PI'
const PI = 3.14159;

console.log(PI); // Output: 3.14159

// This would cause an error!
// PI = 3.14;
// TypeError: Assignment to constant variable.
```

-----

## Which One Should You Use?

Here’s a simple rule of thumb for modern JavaScript development:

1.  **Use `const` by default**: This makes your code safer and easier to reason about, as you know the value won't change.
2.  **Use `let` only when you know you'll need to reassign the variable's value** (e.g., a counter in a loop).
3.  **Avoid using `var`** in modern code to prevent issues with scope.