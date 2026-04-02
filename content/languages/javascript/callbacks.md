---
title: "Callbacks"
description: "Callback pattern, callback hell, and error-first convention"
---

## What is a Callback?

A **callback** is simply a function that is passed as an argument to another function, to be called (executed) at a later time. Callbacks are the most fundamental way to handle asynchronous operations like fetching data or responding to user clicks.

```javascript
// Simple Callback!
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

greet("Alpha", () => {
    console.log("Welcome back!");
});
// 1. "Hello, Alpha!"
// 2. "Welcome back!"
```

## Why Do We Need Callbacks?

JavaScript is **single-threaded**, meaning it can only do one thing at a time. If we have a task that takes time (like loading a file), we don't want to block the entire program. Callbacks let us say, "Go do this, and call this function when you're done!"

```javascript
// Simulating an API call!
function fetchUser(id, callback) {
    setTimeout(() => {
        const user = { id, name: "Alpha" };
        callback(user);
    }, 2000); // 2-second delay!
}

fetchUser(1, (user) => {
    console.log(`Fetched: ${user.name}`);
});
```

## The Callback Hell (Pyramid of Doom)

When you nest multiple callbacks inside each other, your code becomes incredibly difficult to read and maintain. This is famously known as **Callback Hell**.

```javascript
// DANGER: Pyramid of Doom!
fetchUser(1, (user) => {
    fetchProfile(user.id, (profile) => {
        fetchSettings(profile.id, (settings) => {
            console.log(settings);
            // ... it keeps going!
        });
    });
});
```

> **Wait!** This is why **Promises** and **Async/Await** were invented. If you find yourself nesting 3+ callbacks, it's time to refactor!

## Error-First Callback Pattern (Node.js)

In the Node.js ecosystem, it's a standard convention to pass an **error** as the first argument to the callback. If the first argument is `null`, the operation was successful.

```javascript
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
      console.error("Error reading file:", err);
      return;
  }
  console.log("Data found:", data);
});
```

## Summary

| Term | Description |
| :--- | :--- |
| **Callback** | A function passed to another function. |
| **Blocking** | Code that stops execution until a task is done. |
| **Async** | Code that runs in the background. |
| **Callback Hell** | Deeply nested functions (hard to read). |
| **Error-First** | Convention: `(err, data) => {}` |
| **Best For** | Event listeners, Timers, Simple logic |
| **Refactor** | Convert callbacks to Promises for cleaner code |
| **Higher-Order** | A function that accepts/returns another function |
| **Memory** | Callbacks create a closure that captures the scope |
| **Synchronous** | Callback executed immediately (e.g., `[].map()`) |
| **Asynchronous**| Callback executed later (e.g., `setTimeout()`) |
| **Naming** | Use descriptive names for your callbacks! |
| **Inversion of Control**| You're trusting another function with your logic! |
| **Debugging** | Stack traces are disconnected in async callbacks |
| **Throttling** | Limit how often a callback is executed |
| **Binding** | Use arrow functions or `.bind()` to maintain `this`! |
