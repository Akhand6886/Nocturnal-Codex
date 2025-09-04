---
title: "Working with Strings in JavaScript"
slug: "javascript-working-with-strings"
order: 5
description: "Learn how to manipulate strings in JavaScript. This guide covers concatenation, modern template literals, and a variety of essential string methods."
category: "JavaScript Fundamentals"
---

## What is a String?

A string is a sequence of characters used to represent text. In JavaScript, you can create strings by enclosing characters in single quotes (`'`), double quotes (`"`), or backticks (`` ` ``).

```javascript
let singleQuoted = 'Hello';
let doubleQuoted = "World";
```

-----

## String Concatenation

Concatenation is the process of joining strings together. You can do this with the `+` operator.

```javascript
let firstName = "John";
let lastName = "Doe";

let fullName = firstName + " " + lastName;
console.log(fullName); // Output: "John Doe"
```

-----

## Template Literals (Template Strings)

Introduced in ES6, template literals are a more powerful and readable way to work with strings. They are enclosed by backticks (`` ` ``) instead of quotes.

The key features are:

  * **Multi-line Strings**: You can create strings that span multiple lines.
  * **Expression Interpolation**: You can easily embed variables and expressions directly into the string using the `${expression}` syntax.

<!-- end list -->

```javascript
let userName = "Alice";
let itemCount = 5;

// Using a template literal
let message = `Hello, ${userName}!
You have ${itemCount * 2} items in your cart.`;

console.log(message);
```

**Output:**

```text
Hello, Alice!
You have 10 items in your cart.
```

Template literals are the recommended way to format strings in modern JavaScript.

-----

## Common String Properties and Methods

Strings in JavaScript come with built-in properties and methods to help you manipulate them.

| Property/Method | Description | Example |
| :--- | :--- | :--- |
| `length` | (Property) Returns the length of the string. | `"hello".length` -> `5` |
| `toUpperCase()` | Converts the string to uppercase. | `"hello".toUpperCase()` -> `"HELLO"` |
| `toLowerCase()` | Converts the string to lowercase. | `"HELLO".toLowerCase()` -> `"hello"` |
| `trim()` | Removes whitespace from both ends of a string. | `"  hello  ".trim()` -> `"hello"` |
| `slice(start, end)` | Extracts a part of a string and returns it as a new string. | `"hello".slice(1, 4)` -> `"ell"` |
| `replace(old, new)` | Replaces a specified value with another value in a string. | `"hello".replace("h", "j")` -> `"jello"` |
| `split(separator)` | Splits a string into an array of substrings. | `"a,b,c".split(",")` -> `['a', 'b', 'c']` |

```javascript
let rawData = "   user-data, part-one   ";

// Chaining methods together
let cleanData = rawData.trim().toUpperCase().replace(",", "-");

console.log(cleanData); // Output: "USER-DATA- PART-ONE"
```