---
title: "JavaScript Loops (for and while)"
slug: "javascript-loops"
order: 10
description: "Learn how to automate repetitive tasks in JavaScript using for and while loops. This guide covers iterating over arrays and repeating code based on conditions."
category: "Program Flow and Functions"
---

## Repeating Code with Loops

Loops are a core concept in programming that allow you to run a block of code over and over again. They are essential for working with collections of data, like arrays, or for performing any task that needs to be repeated. JavaScript has several kinds of loops, but the most common are the `for` loop and the `while` loop.

-----

### **The `for` Loop**

The `for` loop is ideal when you know in advance how many times you want the loop to run. It repeats a block of code a specific number of times.

The syntax of a `for` loop consists of three parts:

1.  **Initialization**: Executed once before the loop starts (e.g., `let i = 0`).
2.  **Condition**: Checked before each iteration. If it's `true`, the loop continues.
3.  **Final Expression**: Executed at the end of each iteration (e.g., `i++`).

#### **Example: Looping Through an Array**

This is the most common use case for a `for` loop.

```javascript
const fruits = ["Apple", "Banana", "Cherry"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

**Output:**

```text
Apple
Banana
Cherry
```

-----

### **The `while` Loop**

The `while` loop is used when you don't know exactly how many times the code needs to run. It continues to execute a block of code as long as a specified condition is `true`.

```javascript
let count = 1;

while (count <= 5) {
  console.log("The count is: " + count);
  count++; // Important: You must increment the counter, or you'll create an infinite loop!
}
```

**Output:**

```text
The count is: 1
The count is: 2
The count is: 3
The count is: 4
The count is: 5
```

-----

### **Loop Control Statements**

You can control the execution of a loop with special statements.

  * **`break`**: Immediately terminates the loop entirely.

    ```javascript
    for (let i = 0; i < 10; i++) {
      if (i === 5) {
        break; // Stop the loop when i is 5
      }
      console.log(i);
    }
    // Output: 0, 1, 2, 3, 4
    ```

  * **`continue`**: Skips the current iteration and proceeds to the next one.

    ```javascript
    for (let i = 0; i < 5; i++) {
      if (i === 2) {
        continue; // Skip the rest of the code for this iteration when i is 2
      }
      console.log(i);
    }
    // Output: 0, 1, 3, 4
    ```

Loops are fundamental for processing data and automating tasks, making them an indispensable tool in your JavaScript skill set.
