---
title: "JavaScript Arrays"
slug: "javascript-arrays"
order: 7
description: "Learn how to store and manage collections of data using arrays in JavaScript. Discover how to create arrays, access elements, and use essential array methods."
category: "Core Data Structures"
---

## What is an Array?

An array is a special variable that can hold more than one value at a time. It's a fundamental data structure in JavaScript for storing an ordered list of items. These items can be of any data type, including strings, numbers, booleans, and even other arrays.

You can create an array by placing items inside square brackets `[]`, separated by commas.

```javascript
// An array of strings
const fruits = ["Apple", "Banana", "Cherry"];

// An array of numbers
const numbers = [10, 20, 30, 40, 50];

// An array with mixed data types
const mixedData = ["Hello", 100, true];
```

## Accessing Array Elements

You can access an element in an array by referring to its **index number**. In JavaScript, arrays are zero-indexed, meaning the first element is at index `0`, the second is at index `1`, and so on.

```javascript
const fruits = ["Apple", "Banana", "Cherry"];

// Access the first element
console.log(fruits[0]); // Output: "Apple"

// Access the third element
console.log(fruits[2]); // Output: "Cherry"
```

You can also change the value of an element using its index:

```javascript
fruits[1] = "Blueberry"; // Change the second element
console.log(fruits); // Output: ["Apple", "Blueberry", "Cherry"]
```

## Common Array Properties and Methods

Arrays come with a variety of built-in properties and methods to make working with them easier.

| Property/Method | Description |
| :--- | :--- |
| `length` | (Property) Returns the number of elements in the array. |
| `push(item)` | Adds one or more elements to the **end** of an array. |
| `pop()` | Removes the **last** element from an array. |
| `shift()` | Removes the **first** element from an array. |
| `unshift(item)` | Adds one or more elements to the **beginning** of an array. |
| `slice(start, end)` | Returns a new array containing a portion of the original array. |
| `join(separator)` | Joins all elements of an array into a string. |

### **Examples in Action**

```javascript
const animals = ["Dog", "Cat", "Bird"];

// Get the number of elements
console.log(animals.length); // Output: 3

// Add an element to the end
animals.push("Fish");
console.log(animals); // Output: ["Dog", "Cat", "Bird", "Fish"]

// Remove the last element
animals.pop();
console.log(animals); // Output: ["Dog", "Cat", "Bird"]
```

## Looping Through an Array

To execute a piece of code for each item in an array, you can use a `for` loop.

```javascript
const colors = ["Red", "Green", "Blue"];

for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
```

**Output:**

```text
Red
Green
Blue
```

Arrays are one of the most commonly used data structures in JavaScript and are essential for any kind of list or collection-based programming.
