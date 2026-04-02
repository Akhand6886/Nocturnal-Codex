---
title: "Destructuring & Spread"
description: "Object/array destructuring, rest params, and spread syntax"
---

## Why Use Destructuring?

Prior to **ES6**, if you wanted to access nested data, your code was full of long, repetitive paths (`user.profile.details.name`). **Destructuring** solved this by allowing you to extract exactly what you need into a variable in a single, readable line.

## 1. Object Destructuring

Extract properties by **key name**. It doesn't matter what order you put them in!

```javascript
const user = { name: "Alpha", id: 1, role: "Admin" };

// Extract name and role!
const { name, role } = user;
console.log(name, role); // Alpha Admin
```

### Renaming Properties

If you already have a variable with the same name, you can rename the extracted property on-the-fly.

```javascript
const { name: userName } = user;
console.log(userName); // Alpha
```

## 2. Array Destructuring

Extract items by **position** instead of key name.

```javascript
const colors = ["red", "green", "blue", "yellow"];

// Extracting first two colors!
const [first, second] = colors;

// Skipping items!
const [primary, , tertiary] = colors; // "red", "blue"
```

## 3. The Spread Operator (`...`)

Use the **spread operator** to copy, expand, or merge existing objects and arrays. It's the standard way to clone data deeply enough for simple applications.

```javascript
// Copying an array!
const oldArr = [1, 2];
const newArr = [...oldArr, 3]; // [1, 2, 3]

// Merging objects!
const defaults = { temp: 20, theme: "light" };
const userConfig = { ...defaults, theme: "dark" };
// { temp: 20, theme: "dark" }
```

## 4. Rest Parameters (`...args`)

This looks identical to spread, but it's used in function **parameters** to collect all "the rest" of the arguments into an array.

```javascript
const sumAll = (message, ...nums) => {
    console.log(message);
    return nums.reduce((total, n) => total + n, 0);
};

console.log(sumAll("Calculating...", 10, 20, 30)); // 60
```

## Summary

| Feature | Syntax | Behavior |
| :--- | :--- | :--- |
| **Destructuring** | `{ x } = obj` | Extraction into variables |
| **Array Dest.** | `[ x ] = arr` | Position-based extraction |
| **Renaming** | `{ x: y } = obj`| Extract x as variable y |
| **Spread (...)** | `[ ...arr ]` | Copy or merge elements |
| **Rest (...)** | `(...args) =>` | Collect remaining elements |
| **Best For** | Clean code, immutable updates, APIs |
| **Default Value**| `{ x = 10 } = obj` | Value if x is missing! |
| **Nested** | `{ a: { b } }` | Deep extraction |
| **Immutable** | Standard React pattern! | `setState({ ...state, x: 1 })` |
| **Function** | Destructure in parameters! | `const f = ({ name }) => {}` |
| **Strings** | You can spread a string! | `[..."Hi"]` -> `["H", "i"]` |
| **Math** | Spread into Math methods! | `Math.max(...nums)` |
| **Swapping** | Swap two variables! | `[a, b] = [b, a]` |
| **NodeList** | `[...document.querySelectorAll()]` (Convert to Array!) |
