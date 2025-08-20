---
title: "JavaScript - Syntax"
slug: "javascript-syntax"
order: 7
description: "Understand the basic syntax rules of JavaScript programming."
category: "JavaScript Basics"
---

## JavaScript Syntax

JavaScript syntax is the set of rules that define a correctly structured JavaScript program.

### Basic Rules

- **Case-Sensitive**: JavaScript is case-sensitive. `myVariable` and `myvariable` are two different variables.
- **Semicolons**: Semicolons (`;`) are used to separate statements. They are often optional due to Automatic Semicolon Insertion (ASI), but it's a good practice to use them to avoid ambiguity.
- **Whitespace**: JavaScript ignores extra spaces. You can add white space to your script to make it more readable.

### Literals
Literals are fixed values in a program's source code.

- **Numbers**: Can be integers or floating-point numbers. `100`, `3.14`.
- **Strings**: Can be enclosed in single (`'`) or double (`"`) quotes. `'Hello'`, `"World"`.
- **Booleans**: `true` or `false`.
- **Objects**: `{ key: 'value' }`.
- **Arrays**: `[1, 2, 3]`.

### Variables
Variables are containers for storing data values. In JavaScript, you can use `var`, `let`, or `const`.

```javascript
let x;       // Declare a variable
x = 5;       // Assign a value
let y = 10;  // Declare and assign
const PI = 3.14; // Declare a constant
```

### Operators
JavaScript uses arithmetic operators (`+`, `-`, `*`, `/`), assignment operators (`=`), and comparison operators (`==`, `>`).

```javascript
let sum = 5 + 10; // 15
```

### Comments
Comments are used to explain code and are ignored by the interpreter.

```javascript
// This is a single-line comment

/*
This is a
multi-line comment.
*/
```

Understanding these basic syntax rules is the first step to writing JavaScript code.
