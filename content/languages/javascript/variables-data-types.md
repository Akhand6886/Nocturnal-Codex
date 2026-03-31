---
title: "Variables & Data Types"
description: "var, let, const, primitive types, and object types"
---

## Modern Variables in JavaScript

Since ES6 (2015), we have three ways to declare a variable. Each handles **scope** differently.

```javascript
// Variable types
let age = 25;       // Use let for variables that will CHANGE.
const name = "Alpha"; // Use const for variables that will NOT change.
var status = "active"; // OBSOLETE: Don't use var in modern code!
```

## Comparisons: `let` vs `const` vs `var`

| Feature | `let` | `const` | `var` |
| :--- | :--- | :--- | :--- |
| **Scope** | Block Scope `{}` | Block Scope `{}` | Function Scope `function()` |
| **Reassignable**| Yes | No | Yes |
| **Redeclarable**| No | No | Yes |
| **Hoisting** | No | No | Yes (moved to top of code!) |

> **Best Practice**: Always use `const` by default. Only use `let` when you're 100% sure the variable's value needs to change later in your code. **Never use `var`!**

## Primitive Data Types

Primitive types are basic building blocks that represent a single value.

1.  **Number**: Handles both integers and decimals.
2.  **String**: Text content wrapped in `'`, `"`, or `` ` `` (backticks).
3.  **Boolean**: `true` or `false`.
4.  **Null**: A deliberate assignment to "nothingness."
5.  **Undefined**: The value automatically assigned to an uninitialized variable.
6.  **Symbol**: Unique identifier (mostly for advanced internal usage).
7.  **BigInt**: For numbers larger than the standard MAX_SAFE_INTEGER.

```javascript
let count = 100;
let price = 12.99;
let msg = "Hello, JavaScript!";
let status = true;
let empty = null;
let notSet; // undefined
```

## Object Data Types

Objects are used to store collections of data.

```javascript
// Object: Key-value pairs
const user = {
  id: 1,
  name: "Alpha",
  isAdmin: true
};

// Array: Ordered list
const colors = ["red", "green", "blue"];
```

## Wait! `null` is an Object?

This is a famous bug in JavaScript's history. `typeof null` returns `"object"`, but it's actually a primitive.

```javascript
console.log(typeof null); // "object" (Bug!)
console.log(typeof "hi");  // "string"
console.log(typeof 25);     // "number"
console.log(typeof undefined); // "undefined"
```

## Variable Naming (Case Sensitivity)

JavaScript variables are case-sensitive. Use **camelCase** for variable and function names.

```javascript
// Variable names!
let totalAmount = 100;
let TOTAL_AMOUNT = 100; // UPPER_CASE for constants.
```

## Summary

| Type | Examples | Description |
| :--- | :--- | :--- |
| **let** | `let x = 1` | Reassignable, block-scoped |
| **const** | `const x = 1` | Immutable reference, block-scoped |
| **Number** | `10`, `3.14` | Both integers and floats |
| **String** | `"Hi"`, `'Hi'`| Text |
| **Boolean** | `true`, `false` | Logic |
| **Null/Undefined** | — | Nothingness |
| **Object** | `{a: 1}` | Structured data |
| **Array** | `[1, 2]` | Lists of data |
| **Best For** | Data storage, variables, and constants |
| **Primitive**| Fixed-size values |
| **Reference**| Objects, Arrays, Functions (stored in memory heap) |
| **Template Literal**| `` `Value: ${val}` `` | Clean string merging |
| **Variable Mutation**| `const obj = {}; obj.a = 1;` (Allowed — reference is unchanged!) |
| **Dynamic Type** | `let x = 1; x = "hi";` (Allowed — flexibility!) |
| **Symbol()** | Uniqueness |
| **BigInt()** | `100n` | Large-scale integers |
| **typeof** | Identifier |
| **instanceof** | Context |
