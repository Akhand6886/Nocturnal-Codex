---
title: "JavaScript Operators"
slug: "javascript-operators"
order: 5
description: "Understand the different operators in JavaScript for performing arithmetic, assignment, comparison, and logical operations."
category: "JS Fundamentals"
---

## JavaScript Operators

JavaScript uses operators to perform operations on values and variables.

### Arithmetic Operators
Used to perform arithmetic between numeric values.
- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `**` Exponentiation (ES2016)
- `%` Modulus (Division Remainder)
- `++` Increment
- `--` Decrement

```javascript
let x = 10;
let y = 4;
console.log(x + y); // 14
console.log(x % y); // 2
```

### Assignment Operators
Used to assign values to JavaScript variables.
- `=` Assign
- `+=` Add and assign
- `-=` Subtract and assign
- `*=` Multiply and assign
- `/=` Divide and assign

```javascript
let a = 10;
a += 5; // a is now 15
```

### Comparison Operators
Used in logical statements to determine equality or difference between variables or values.
- `==` Equal to (value)
- `===` Equal value and equal type (strict equality)
- `!=` Not equal to (value)
- `!==` Not equal value or not equal type
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal to
- `<=` Less than or equal to
- `?` Ternary operator

```javascript
let age = 18;
let canVote = (age < 18) ? "Too young" : "Old enough";
console.log(canVote); // "Old enough"
```

### Logical Operators
Used to determine the logic between variables or values.
- `&&` Logical AND
- `||` Logical OR
- `!` Logical NOT

```javascript
let isAdult = true;
let hasLicense = false;

if (isAdult && hasLicense) {
  console.log("Can drive.");
} else {
  console.log("Cannot drive.");
}
```

### Type Operators
- `typeof` Returns the type of a variable
- `instanceof` Returns `true` if an object is an instance of an object type

```javascript
console.log(typeof "John"); // "string"
console.log([1, 2] instanceof Array); // true
```
