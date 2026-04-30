---
title: "Introduction to JavaScript"
description: "The history of JavaScript and its evolution for the modern web"
---

## What is JavaScript?

**JavaScript** is a lightweight, interpreted, and standard-compliant programming language that is designed to create more dynamic and interactive websites. Along with **HTML** and **CSS**, JavaScript is one of the three core technologies for building web content.

```javascript
// A simple function demonstrating Python's clean syntax
const greet = (name) => {
  console.log(`Hello, ${name}! Welcome to JavaScript!`);
};

greet("Developer");
```

## The Origin Story

JavaScript was created in **1995** by **Brendan Eich** at Netscape Communications. It was famously written in just **10 days**! Originally called **Mocha**, then **LiveScript**, it was eventually renamed **JavaScript** to ride the wave of Java's popularity at the time.

> **Wait!** JavaScript is **not** Java. They are completely different languages with different designs, though they share some basic C-like syntax.

## ECMA: Standardizing the Web

To prevent different browsers from creating their own conflicting versions of JavaScript, the language was standardized by **ECMA International**. The official name for the standard is **ECMAScript (ES)**.

-   **ES6 (2015)**: The most significant update in JavaScript's history, introducing `let`, `const`, arrow functions, classes, and modules ("Modern JavaScript").
-   **Annual Releases**: Since 2015, new features are added to ECMAScript every year.

## Why JavaScript is Unique?

1.  **Runs Everywhere**: It runs in every modern web browser (Client-side) and also on servers using **Node.js** (Server-side).
2.  **Event-Driven**: It's designed to react to user actions like clicks, scrolls, and typing in real-time.
3.  **The Event Loop**: JavaScript is single-threaded, meaning it can only do one thing at a time, but its "Non-blocking" design allows it to handle thousands of concurrent operations.

## The Modern Ecosystem

JavaScript isn't just for adding buttons to a page anymore; it's a massive ecosystem:

-   **Frameworks**: React, Vue, Angular, Svelte (Front-end).
-   **Server-Side**: Node.js, Deno, Bun.
-   **Mobile/Desktop**: React Native, Electron.
-   **Package Manager**: `npm` is the largest software registry in the world.

## Summary

| Feature | Description |
| :--- | :--- |
| **Creator** | Brendan Eich (1995) |
| **Standard** | ECMAScript (ES) |
| **Paradigm** | Multi-paradigm (Prototypes, Functional, Imperative) |
| **Strengths** | Ubiquity, huge ecosystem, high-speed performance (V8 engine) |
| **Best For** | Web apps, servers, mobile apps, real-time systems |
| **Official Site** | [ECMA-262](https://tc39.es/ecma262/) |
