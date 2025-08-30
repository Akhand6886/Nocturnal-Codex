---
title: "JavaScript Operators"
slug: "javascript-operators"
order: 4
description: "Learn about the different types of operators in JavaScript, including arithmetic, assignment, comparison, and logical operators, to perform various operations."
category: "JavaScript Fundamentals"
---

## What are Operators?

Operators are special symbols used to perform operations on operands (values and variables). For example, in `5 + 10`, `+` is an operator, and `5` and `10` are operands. JavaScript has a wide range of operators to help you manipulate data.

-----

### **1. Arithmetic Operators**

These are used to perform mathematical calculations.

| Operator | Description | Example |
| :--- | :--- | :--- |
| `+` | Addition | `x + y` |
| `-` | Subtraction | `x - y` |
| `*` | Multiplication | `x * y` |
| `/` | Division | `x / y` |
| `%` | Modulus (Remainder) | `x % y` |
| `++` | Increment | `x++` (increases by one) |
| `--` | Decrement | `x--` (decreases by one) |

```javascript
let x = 10;
let y = 4;

console.log(x + y); // Output: 14
console.log(x % y); // Output: 2
```

-----

### **2. Assignment Operators**

These operators are used to assign values to variables.

| Operator | Example | Same As |
| :--- | :--- | :--- |
| `=` | `x = y` | `x = y` |
| `+=` | `x += y` | `x = x + y` |
| `-=` | `x -= y` | `x = x - y` |
| `*=` | `x *= y` | `x = x * y` |
| `/=` | `x /= y` | `x = x / y` |

```javascript
let score = 100;
score += 50; // score is now 150
console.log(score);
```

-----

### **3. Comparison Operators**

These operators compare two values and return a boolean (`true` or `false`).

| Operator | Description |
| :--- | :--- |
| `==` | Equal to |
| `===` | Strict equal to (equal value and equal type) |
| `!=` | Not equal to |
| `!==` | Strict not equal to (not equal value or not equal type) |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |

**`==` vs `===` (A Key Difference)**

It is a best practice to always use **strict equality (`===`)** because it prevents unexpected behavior by checking both value and type.

```javascript
console.log(5 == "5");   // Output: true (values are the same)
console.log(5 === "5");  // Output: false (types are different: number vs string)
console.log(5 !== "5");  // Output: true
```

-----

### **4. Logical Operators**

These are used to combine or invert boolean values.

| Operator | Description |
| :--- | :--- |
| `&&` | **AND**: `true` if both operands are true. |
| `||` | **OR**: `true` if at least one operand is true. |
| `!` | **NOT**: Inverts the boolean value (`true` becomes `false`). |

```javascript
let age = 25;
let hasPhotoID = true;

if (age >= 18 && hasPhotoID) {
  console.log("Entry granted.");
}
```