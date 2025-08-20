---
title: "Hello World Program in JavaScript"
slug: "hello-world-in-javascript"
order: 3
description: "Learn how to write your first 'Hello, World!' program in JavaScript using the browser console, alerts, and direct HTML manipulation."
category: "JavaScript Basics"
---

## "Hello, World!" in JavaScript

The "Hello, World!" program is a classic first step in learning any new programming language. It's a simple program that outputs the text `Hello, World!` to demonstrate the basic syntax. In JavaScript, there are several ways to do this, especially in the context of a web browser.

### 1. Using `console.log()`

The most common method for developers to see output from their code is by printing it to the web console. This is essential for debugging and understanding what your code is doing.

**To see the output:**
1.  Open an HTML file containing this script in a web browser.
2.  Right-click on the page and select "Inspect" or "Inspect Element".
3.  Click on the "Console" tab.

```javascript
// This line prints "Hello, World!" to the browser's developer console.
console.log("Hello, World!");
```

### 2. Displaying an Alert Box

The `alert()` function creates a pop-up dialog box in the browser window. While it's simple, it's not often used in modern applications because it can be disruptive to the user experience.

```javascript
// This will create a pop-up alert with the message.
alert("Hello, World!");
```

### 3. Writing Directly to the HTML Document

You can also write content directly into the HTML body using `document.write()`. This method is generally avoided in modern web development because it can overwrite the entire page if used after the page has finished loading.

```javascript
// This will write "Hello, World!" directly into the HTML body where the script is placed.
document.write("Hello, World!");
```

This is the foundational step to start your journey with JavaScript development.