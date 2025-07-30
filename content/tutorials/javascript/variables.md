---
title: "JavaScript Variables"
slug: "javascript-variables"
order: 3
description: "Understand how to declare and use variables in JavaScript using var, let, and const."
category: "JS Variables and Data Types"
---

## JavaScript Variables

In JavaScript, variables are containers for storing data values. You can declare variables using the keywords `var`, `let`, or `const`.

### `var`
The `var` keyword was the original way to declare variables in JavaScript. Variables declared with `var` are function-scoped or globally-scoped.

```javascript
var name = "Alice";
var age = 30;

function sayHello() {
  var message = "Hello from the function";
  console.log(message); // "Hello from the function"
}

// console.log(message); // This would cause an error because message is function-scoped.
```

### `let`
Introduced in ES6 (ECMAScript 2015), `let` provides block-scoping. A block is any code enclosed in curly braces `{}`, like in an `if` statement or a `for` loop. It's generally recommended to use `let` over `var`.

```javascript
let count = 10;
if (true) {
  let count = 20; // This is a different 'count' variable
  console.log(count); // 20
}
console.log(count); // 10
```

### `const`
Also introduced in ES6, `const` is used to declare constants. Like `let`, it is block-scoped. A `const` variable cannot be reassigned.

```javascript
const PI = 3.14159;
// PI = 3.14; // This would throw an error.

// For objects and arrays, the reference is constant, but the contents can be changed.
const person = { name: "Bob" };
person.name = "Charlie"; // This is allowed.
// person = { name: "David" }; // This would throw an error.
```

### Naming Variables
- Variable names can contain letters, digits, underscores, and dollar signs.
- Names must begin with a letter, `$`, or `_`.
- Names are case-sensitive (`y` and `Y` are different variables).
- Reserved words (like JavaScript keywords) cannot be used as names.
