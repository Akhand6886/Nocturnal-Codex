---
title: "JavaScript Arrays"
slug: "javascript-arrays"
order: 8
description: "Learn how to work with arrays in JavaScript to store and manipulate collections of data."
category: "JS Fundamentals"
---

## Understanding JavaScript Arrays

An array is a special variable that can hold more than one value at a time. It's a fundamental data structure for storing ordered collections of items.

### Creating an Array

You can create an array using an array literal, which is the most common way:

```javascript
// An array of strings
const fruits = ["Apple", "Banana", "Cherry"];

// An array of numbers
const numbers = [1, 1, 2, 3, 5, 8];

// An array with mixed data types
const mixed = [42, "hello", true, null];
```

### Accessing Elements

Array elements are accessed using zero-based indexes.

```javascript
const fruits = ["Apple", "Banana", "Cherry"];

console.log(fruits[0]); // Output: "Apple"
console.log(fruits[1]); // Output: "Banana"

// You can also change an element
fruits[1] = "Blueberry";
console.log(fruits); // Output: ["Apple", "Blueberry", "Cherry"]
```

### Common Array Properties and Methods

-   **`.length`**: Returns the number of elements in the array.
    ```javascript
    console.log(fruits.length); // 3
    ```

-   **`.push()`**: Adds a new element to the end of an array.
    ```javascript
    fruits.push("Date");
    console.log(fruits); // ["Apple", "Blueberry", "Cherry", "Date"]
    ```

-   **`.pop()`**: Removes the last element from an array.
    ```javascript
    fruits.pop();
    console.log(fruits); // ["Apple", "Blueberry", "Cherry"]
    ```

-   **`.forEach()`**: Executes a provided function once for each array element.
    ```javascript
    fruits.forEach(function(fruit) {
      console.log("I love " + fruit);
    });
    ```

-   **`.map()`**: Creates a new array populated with the results of calling a provided function on every element.
    ```javascript
    const numbers = [1, 4, 9, 16];
    const roots = numbers.map(Math.sqrt);
    console.log(roots); // [1, 2, 3, 4]
    ```

Arrays are one of the most useful and versatile parts of JavaScript.