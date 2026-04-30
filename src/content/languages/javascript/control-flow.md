---
title: "Control Flow"
description: "if/else, switch, for, while, for...of, for...in"
---

## Conditional Statements

JavaScript uses `if`, `else if`, and `else` to control the execution path.

```javascript
const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C");
}
```

## Comparisons: The `switch` Statement

The `switch` is a cleaner alternative for multiple discrete values.

```javascript
const status = 404;

switch (status) {
  case 200:
    console.log("Success");
    break; // DO NOT FORGET BREAK!
  case 404:
    console.log("Not Found");
    break;
  default:
    console.log("Unknown Status");
}
```

## Loops: `for` and `while`

### 1. Traditional `for` Loop

Classic C-style Loop with a counter.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(`Iteration: ${i}`);
}
```

### 2. `while` Loop

Better for when you don't know the exact end point.

```javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
```

## Modern Loops: `for...of` and `for...in`

Avoid using traditional loops for arrays or objects. **ES6** introduced cleaner syntax.

### `for...of` (Iterating through ARRAYS)

Used for any iterable (array, string, set).

```javascript
const colors = ["red", "green", "blue"];

for (const color of colors) {
  console.log(color); // "red", "green", "blue"
}
```

### `for...in` (Iterating through OBJECT KEYS)

Used specifically for looping over object properties.

```javascript
const user = { name: "Alpha", age: 25 };

for (const key in user) {
  console.log(`${key}: ${user[key]}`); // name: "Alpha", age: 25
}
```

## Loop Control: `break` and `continue`

-   **`break`**: Immediately exits the entire loop.
-   **`continue`**: Skips the current iteration and jumps to the next one.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // Skip number 3!
  if (i === 7) break;    // Stop completely at 7!
  console.log(i);
}
```

## Summary

| Feature | Syntax | Best Use... |
| :--- | :--- | :--- |
| **if/else** | `if (x) {}` | General logic |
| **switch** | `switch (x) {}`| Multiple discrete values |
| **for** | `for (i; i < n; i++)`| Counter-driven loops |
| **while** | `while (condition)` | Condition-driven loops |
| **for...of** | `for (x of arr)` | Iterating array values |
| **for...in** | `for (key in obj)` | Iterating object keys |
| **break** | `break` | Terminate loop |
| **continue** | `continue` | Skip iteration |
| **Best For** | Logic, Iteration, Control |
| **Indentation** | Two spaces (Recommended) |
| **Ternary** | `x ? a : b` | Concise if/else |
| **Optional Chaining**| `obj?.prop` | Safe access (Prevents errors!) |
| **Short-Circuit**| `isAdmin && show()` | Simple logical triggers |
