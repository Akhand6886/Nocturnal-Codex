---
title: "JavaScript Variables"
slug: "javascript-variables"
order: 3
description: "Understand how to declare and use variables in JavaScript using var, let, and const, including scope and hoisting."
category: "JS Variables and Data Types"
---

## Understanding JavaScript Variables

In JavaScript, variables are containers for storing data values. They are fundamental to any program, allowing you to store, retrieve, and manipulate data throughout your code. JavaScript provides three keywords to declare variables: `var`, `let`, and `const`.

### `var`: The Original Variable Keyword

The `var` statement declares a function-scoped or globally-scoped variable, optionally initializing it to a value.

- **Scope**: A variable declared with `var` is scoped to the nearest function block. If declared outside of any function, it is scoped globally.
- **Hoisting**: `var` declarations are "hoisted" to the top of their scope. This means you can use a variable before it is declared, but its value will be `undefined`.

```javascript
console.log(myVar); // Output: undefined
var myVar = "Hello";
console.log(myVar); // Output: "Hello"

function myFunction() {
  var functionScoped = "I am inside the function";
  console.log(functionScoped);
}
myFunction();
// console.log(functionScoped); // This would cause a ReferenceError
```

Because of its sometimes confusing behavior with hoisting and scope, `var` is generally not recommended in modern JavaScript.

### `let`: Block-Scoped Variables

Introduced in ES6 (ECMAScript 2015), `let` provides block-scoping. A block is any code enclosed in curly braces `{}`, like in an `if` statement or a `for` loop.

- **Scope**: A variable declared with `let` is only available within the block, statement, or expression in which it was declared.
- **Hoisting**: `let` declarations are also hoisted, but they are not initialized. Accessing them before the declaration results in a `ReferenceError`. This is known as the "Temporal Dead Zone" (TDZ).

```javascript
let count = 10;
if (true) {
  let count = 20; // This is a different 'count' variable, scoped to this block
  console.log(count); // Output: 20
}
console.log(count); // Output: 10

// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = "This is a let variable";
```

### `const`: Block-Scoped Constants

Also introduced in ES6, `const` is used to declare constants. Like `let`, it is block-scoped.

- **Scope**: `const` variables are block-scoped, just like `let`.
- **Hoisting**: `const` variables are also hoisted and are in the TDZ until declaration.
- **Immutability**: A `const` variable **cannot be reassigned** a new value. It must be initialized at the time of declaration.

```javascript
const PI = 3.14159;
// PI = 3.14; // This would throw a TypeError.

// For objects and arrays, the variable reference is constant, but the contents can be changed.
const person = { name: "Bob" };
person.name = "Charlie"; // This is allowed.
// person = { name: "David" }; // This would throw a TypeError.
```

## Comparison: `var` vs. `let` vs. `const`

| Feature           | `var`                         | `let`                         | `const`                              |
| ----------------- | ----------------------------- | ----------------------------- | ------------------------------------ |
| **Scope**         | Function / Global             | Block                         | Block                                |
| **Reassignable**  | Yes                           | Yes                           | No                                   |
| **Redeclarable**  | Yes (in the same scope)       | No (in the same scope)        | No (in the same scope)               |
| **Hoisting**      | Hoisted & initialized to `undefined` | Hoisted, but not initialized (TDZ) | Hoisted, but not initialized (TDZ) |
| **Must Initialize**| No                           | No                            | Yes                                  |

## Best Practices

- Prefer `const` by default for all variables. This makes your code more predictable and prevents accidental reassignments.
- Use `let` only when you know a variable's value needs to change.
- Avoid using `var` in modern JavaScript to prevent issues with scope and hoisting.
