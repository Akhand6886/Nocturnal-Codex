---
title: "JavaScript Conditional Statements (if/else)"
slug: "javascript-conditional-statements"
order: 9
description: "Learn how to make decisions in your JavaScript code. This guide covers how to use if, else if, and else statements to control your program's flow."
category: "Program Flow and Functions"
---

## Making Decisions in Code

Conditional statements are a fundamental part of programming. They allow you to execute different blocks of code based on whether a certain condition is true or false. This is how you make your programs responsive and intelligent. In JavaScript, the primary tools for this are the `if`, `else if`, and `else` statements.

-----

### **The `if` Statement**

The `if` statement executes a block of code only if the specified condition evaluates to `true`.

```javascript
let temperature = 30;

if (temperature > 25) {
  console.log("It's a hot day!");
}
```

**Output:**

```text
It's a hot day!
```

If the `temperature` was 20, the condition would be false, and the message would not be printed.

-----

### **The `else` Statement**

The `else` statement provides an alternative block of code to run if the initial `if` condition is `false`.

```javascript
let userAge = 16;

if (userAge >= 18) {
  console.log("You are eligible to vote.");
} else {
  console.log("You are not eligible to vote yet.");
}
```

**Output:**

```text
You are not eligible to vote yet.
```

-----

### **The `else if` Statement**

When you need to check multiple conditions in sequence, you can use the `else if` statement.

```javascript
let score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: D");
}
```

**Output:**

```text
Grade: C
```

JavaScript will check each condition in order. The first one that evaluates to `true` will have its code block executed, and all other `else if` and `else` blocks will be skipped.

-----

### **The Ternary Operator**

The ternary operator is a compact, one-line shorthand for an `if...else` statement.

**Syntax:** `condition ? expressionIfTrue : expressionIfFalse`

```javascript
let age = 20;

let message = (age >= 18) ? "Adult" : "Minor";

console.log(message); // Output: "Adult"
```

This is a clean and concise way to assign a value to a variable based on a condition.

Conditional logic is what gives your programs the ability to react differently to various inputs and situations, making it a critical skill to master.