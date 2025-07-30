---
title: "JS Loops"
slug: "javascript-loops"
order: 5
description: "Learn how to repeat actions using different types of loops in JavaScript."
category: "JS Control Flow"
---

## JavaScript Loops

Loops are handy if you want to run the same code over and over again, each time with a different value.

### The `for` Loop
The `for` loop is often the tool you'll use when you want to iterate over a block of code a certain number of times.

```javascript
for (let i = 0; i < 5; i++) {
  console.log("The number is " + i);
}
// This will print numbers 0 through 4.
```

### The `for...in` Loop
The `for...in` statement iterates over the properties of an object.

```javascript
const person = {fname:"John", lname:"Doe", age:25};

for (let key in person) {
  console.log(key + ": " + person[key]);
}
// Prints:
// fname: John
// lname: Doe
// age: 25
```

### The `for...of` Loop
The `for...of` statement iterates over the values of an iterable object (like an Array, String, Map, etc.).

```javascript
const colors = ["red", "green", "blue"];

for (let color of colors) {
  console.log(color);
}
// Prints:
// red
// green
// blue
```

### The `while` Loop
The `while` loop loops through a block of code as long as a specified condition is true.

```javascript
let i = 0;
while (i < 5) {
  console.log("The number is " + i);
  i++;
}
```

### The `do...while` Loop
The `do...while` loop is a variant of the while loop. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.

```javascript
let i = 0;
do {
  console.log("The number is " + i);
  i++;
}
while (i < 5);
```
