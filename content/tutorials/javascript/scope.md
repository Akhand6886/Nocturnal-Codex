---
title: "JavaScript Scope"
slug: "javascript-scope"
order: 12
description: "Understand the concept of scope in JavaScript. Learn the difference between global, function, and block scope and how it affects your variables."
category: "Program Flow and Functions"
---

## What is Scope?

Scope in JavaScript refers to the accessibility or visibility of variables. It determines where your variables can be accessed in your code. Understanding scope is crucial for writing clean, predictable, and bug-free code.

There are three main types of scope in JavaScript:

1.  **Global Scope**
2.  **Function Scope**
3.  **Block Scope**

-----

### **1. Global Scope**

A variable declared outside of any function or block has **global scope**. This means it can be accessed and modified from anywhere in your entire program.

```javascript
// This is a global variable
let globalMessage = "Hello from the global scope!";

function showMessage() {
  console.log(globalMessage); // Can be accessed inside a function
}

showMessage();
console.log(globalMessage); // Can also be accessed outside the function
```

While global variables are easy to use, it's a best practice to minimize their use. Having too many global variables can lead to naming conflicts and make your code hard to debug.

-----

### **2. Function Scope**

A variable declared inside a function has **function scope**. It is only accessible within that function and cannot be accessed from outside. Variables declared with `var` are function-scoped.

```javascript
function greet() {
  // This variable is local to the greet function
  var functionScopedVar = "Hello from inside the function!";
  console.log(functionScopedVar);
}

greet();

// This will cause an error!
// console.log(functionScopedVar);
// ReferenceError: functionScopedVar is not defined
```

-----

### **3. Block Scope**

Variables declared with `let` and `const` have **block scope**. This is a more modern and predictable type of scope. A block is any section of code within curly braces `{}`, such as in an `if` statement, a `for` loop, or a `while` loop.

A block-scoped variable is only accessible within the block where it was defined.

```javascript
if (true) {
  // this variable only exists inside this 'if' block
  let blockScopedVar = "Hello from block scope!";
  const blockScopedConst = "I am also block-scoped.";
  console.log(blockScopedVar);
}

// This will cause an error!
// console.log(blockScopedVar);
// ReferenceError: blockScopedVar is not defined
```

This is a key advantage of using `let` and `const` over `var`. It helps you avoid accidentally using or modifying a variable outside of its intended context, which makes your code more robust and less prone to bugs.
