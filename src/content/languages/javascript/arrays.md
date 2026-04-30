---
title: "Arrays"
description: "Methods (map, filter, reduce, find, some, every), spread, destructuring"
---

## Modern JavaScript Arrays

In **JavaScript**, an **array** is a dynamic, ordered list of items. Unlike other languages, JavaScript arrays can store different data types at once and can grow in size automatically.

```javascript
// Simple Array Literal
const fruits = ["apple", "banana", "cherry"];
// Mixed type (Avoid if possible!)
const mixed = [10, "hi", { a: 1 }];
```

## Creating Arrays

-   **`[]` (Literal)**: The most universal way.
-   **`new Array(n)`**: Used to pre-allocate space for `n` items.
-   **`Array.from(seq)`**: Convert a list-like object (e.g., a String) into an array.

```javascript
// From string!
const list = Array.from("abc"); // ["a", "b", "c"]
```

## Accessing and Destructuring (ES6+)

### 1. Simple Indexing

Arrays are **zero-based**. Item 1 is at index 0.

```javascript
const colors = ["red", "green", "blue"];
console.log(colors[0]); // red
```

### 2. Array Destructuring

Extract values from an array into multiple variables in one line.

```javascript
const user = ["Alpha", 25, "Delhi"];

// Extracting name and age!
const [name, age] = user;
console.log(name, age); // Alpha 25
```

## Powerful Array Methods (Higher-Order)

Functional array methods are the hallmark of modern JavaScript development. They don't modify the original array (they are "pure" functions).

| Method | Purpose | Result |
| :--- | :--- | :--- |
| **.map(f)** | Transform mapping | New array with transformed values. |
| **.filter(f)** | Logic filtering | New array with items that passed the test. |
| **.reduce(f)** | Summarize | A single value (e.g., a total sum). |
| **.find(f)** | Search | First item that matches the test. |
| **.some(f)** | Any? | Boolean: True if at least one matches. |
| **.every(f)** | All? | Boolean: True if all match. |

```javascript
const nums = [1, 2, 3, 4, 5];

// Map: Square all numbers!
const squares = nums.map(x => x * x); // [1, 4, 9, 16, 25]

// Filter: Only evens!
const evens = nums.filter(x => x % 2 === 0); // [2, 4]

// Reduce: Sum everything!
const total = nums.reduce((acc, curr) => acc + curr, 0); // 15
```

## The Spread Operator (`...`)

Use the **spread operator** to copy or merge arrays safely without modifying the original.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

// Merge into new array!
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]
```

## Summary

| Feature | Method / Syntax |
| :--- | :--- |
| **Add** | `.push()`, `.unshift()` |
| **Remove** | `.pop()`, `.shift()`, `.splice()` |
| **Search** | `.indexOf()`, `.includes()`, `.find()` |
| **Transform** | `.map()`, `.filter()`, `.reduce()` |
| **Copy** | `[...arr]` or `.slice()` |
| **Sort** | `.sort()` (Modifies original!) |
| **Best For** | Lists, collections, iteration |
| **Length** | `arr.length` |
| **Join** | `arr.join("-")` |
| **Reverse** | `.reverse()` (Modifies original!) |
| **Concatenation**| `arr.concat(other)` |
| **Flat** | `arr.flat()` (Flatten nested arrays) |
| **Fill** | `arr.fill(val)` |
| **at()** | `arr.at(-1)` (Last item!) |
