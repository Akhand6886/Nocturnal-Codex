---
title: "JavaScript Data Types"
slug: "javascript-data-types"
order: 3
description: "Explore the fundamental data types in JavaScript, including primitive types like strings, numbers, and booleans, and understand JavaScript's dynamic typing."
category: "JavaScript Fundamentals"
---

## Dynamically Typed Language

JavaScript is a **dynamically typed** language. This means you don't have to specify the data type of a variable when you declare it. The data type is determined automatically at runtime.

```javascript
let myVar = "Hello"; // myVar is a string
console.log(typeof myVar); // Output: "string"

myVar = 50; // Now, myVar is a number
console.log(typeof myVar); // Output: "number"
```

JavaScript has several primitive data types and one complex data type.

-----

## Primitive Data Types

Primitive types are the most basic data types in the language.

### **1. String**

A **string** represents textual data. It must be enclosed in single (`'`) or double (`"`) quotes. Modern JavaScript also has template literals, enclosed in backticks (`` ` ``).

```javascript
let greeting = "Hello, Nocturnal Codex!";
let userName = 'Alice';
```

### **2. Number**

The **number** type represents both integer and floating-point numbers. Unlike some other languages, JavaScript does not have different types for integers and floats.

```javascript
let userAge = 25;       // An integer
let price = 19.99;      // A floating-point number
```

The number type also includes special values like `Infinity`, `-Infinity`, and `NaN` (Not-a-Number). `NaN` represents a computational error, such as the result of an invalid mathematical operation (e.g., `0 / 0`).

### **3. Boolean**

A **boolean** represents a logical entity and can have only two values: `true` or `false`. Booleans are essential for conditional logic and making decisions in your code.

```javascript
let isLoggedIn = true;
let isAdmin = false;
```

### **4. `undefined`**

A variable that has been declared but has not yet been assigned a value has the type `undefined`.

```javascript
let userEmail;
console.log(userEmail); // Output: undefined
```

### **5. `null`**

`null` is a special value that represents the intentional absence of any object value. It's an assignment value, meaning a variable must be explicitly assigned `null`.

```javascript
let selectedUser = null; // We explicitly state there is "no value"
```

-----

## The `typeof` Operator

To find the data type of a JavaScript variable, you can use the `typeof` operator.

```javascript
console.log(typeof "Hello");      // Output: "string"
console.log(typeof 123);          // Output: "number"
console.log(typeof true);         // Output: "boolean"
console.log(typeof undefined);    // Output: "undefined"
console.log(typeof null);         // Output: "object" (This is a well-known quirk in JavaScript)
```