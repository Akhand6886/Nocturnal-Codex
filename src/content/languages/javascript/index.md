---
id: javascript
name: JavaScript
slug: javascript
description: >-
  The language of the web, enabling interactive and dynamic content for
  virtually all websites.
iconName: javascript
year: 1995
creator: Brendan Eich
paradigm:
  - Object-Oriented
  - Functional
  - Event-Driven
useCases:
  - Web Development
  - Server-Side Development
  - Mobile Apps
  - Desktop Apps
website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
category: Web
featured: true
difficulty: Beginner
topics:
  - section: Basics
    description: JavaScript fundamentals for the browser and beyond.
    items:
      - title: Introduction to JavaScript
        description: 'History, ECMAScript standards, and where JS runs'
        slug: introduction-to-javascript
      - title: Variables & Data Types
        description: 'let, const, var, primitives, typeof, and type coercion'
        slug: variables-data-types
      - title: Operators
        description: 'Arithmetic, comparison (== vs ===), logical, nullish coalescing (??)'
        slug: operators
      - title: Control Flow
        description: 'if/else, switch, for, while, for...of, for...in'
        slug: control-flow
      - title: Functions
        description: 'Declaration, expression, arrow functions, default params, rest/spread'
        slug: functions
  - section: Objects & Arrays
    description: Working with JavaScript's core data structures.
    items:
      - title: Objects
        description: >-
          Literals, property access, destructuring, computed keys, Object
          methods
        slug: objects
      - title: Arrays
        description: >-
          Methods (map, filter, reduce, find, some, every), spread,
          destructuring
        slug: arrays
      - title: JSON
        description: 'Parsing, stringifying, and working with API responses'
        slug: json
      - title: Maps & Sets
        description: 'Map vs object, Set vs array, WeakMap, WeakRef'
        slug: maps-sets
  - section: Async Programming
    description: Handling asynchronous operations in JavaScript.
    items:
      - title: Callbacks
        description: 'Callback pattern, callback hell, and error-first convention'
        slug: callbacks
      - title: Promises
        description: 'then/catch/finally, Promise.all, Promise.race, Promise.allSettled'
        slug: promises
      - title: Async/Await
        description: 'Syntactic sugar for promises, error handling, and parallel execution'
        slug: async-await
      - title: Event Loop
        description: 'Call stack, task queue, microtasks, and how JS is single-threaded'
        slug: event-loop
      - title: Fetch API
        description: 'HTTP requests, headers, responses, AbortController'
        slug: fetch-api
  - section: DOM & Browser APIs
    description: Interacting with web pages and browser features.
    items:
      - title: DOM Manipulation
        description: 'querySelector, createElement, event listeners, and delegation'
        slug: dom-manipulation
      - title: Events
        description: 'Event bubbling, capturing, preventDefault, and custom events'
        slug: events
      - title: Web Storage
        description: 'localStorage, sessionStorage, cookies, and IndexedDB'
        slug: web-storage
      - title: Canvas & Web APIs
        description: 'Canvas 2D, Geolocation, Intersection Observer, Web Workers'
        slug: canvas-web-apis
  - section: OOP & Patterns
    description: Object-oriented programming and design patterns in JS.
    items:
      - title: Prototypes
        description: 'Prototype chain, __proto__, Object.create, and inheritance'
        slug: prototypes
      - title: Classes
        description: 'class syntax, constructor, extends, super, private fields (#)'
        slug: classes
      - title: Modules
        description: 'ES modules (import/export), dynamic import(), and CommonJS'
        slug: modules
      - title: Design Patterns
        description: 'Module, Observer, Factory, Singleton, and Proxy patterns'
        slug: design-patterns
  - section: Modern JavaScript
    description: ES6+ features and advanced techniques.
    items:
      - title: Destructuring & Spread
        description: 'Object/array destructuring, rest params, and spread syntax'
        slug: destructuring-spread
      - title: Iterators & Generators
        description: 'Symbol.iterator, function*, yield, and async generators'
        slug: iterators-generators
      - title: Proxy & Reflect
        description: Metaprogramming with Proxy traps and Reflect API
        slug: proxy-reflect
      - title: Error Handling
        description: 'try/catch, custom errors, Error types, and global error handlers'
        slug: error-handling
      - title: Performance
        description: 'Memory leaks, debouncing, throttling, and requestAnimationFrame'
        slug: performance
---

## Overview

JavaScript is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2024, 98.7% of websites use JavaScript on the client side for webpage behavior. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices. With Node.js, JavaScript has also become a dominant force in server-side development.

## Key Features

- **Ubiquitous** — Runs in every browser, on servers (Node.js), mobile (React Native), and desktop (Electron)
- **Event-driven & asynchronous** — Non-blocking I/O with promises and async/await
- **First-class functions** — Functions are objects; enables powerful functional programming patterns
- **Prototype-based inheritance** — Flexible object model without traditional classes (though class syntax exists)
- **Massive ecosystem** — npm hosts over 2 million packages

## Common Use Cases

- **Frontend Development** — React, Vue, Angular, Svelte
- **Backend Development** — Node.js, Express, Fastify, Hono
- **Mobile Apps** — React Native, Ionic
- **Desktop Apps** — Electron, Tauri (with JS frontend)
- **Tooling & Build Systems** — Webpack, Vite, esbuild

## Code Example

```javascript
// Async data fetching with modern JavaScript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    return { ...user, fullName: `${user.first} ${user.last}` };
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}
```

## Learning Resources

- [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [javascript.info](https://javascript.info/)
- [Eloquent JavaScript](https://eloquentjavascript.net/)
