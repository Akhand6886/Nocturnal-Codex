---
id: "javascript"
name: "JavaScript"
slug: "javascript"
description: "The language of the web, enabling interactive and dynamic content for virtually all websites."
iconName: "javascript"
year: 1995
creator: "Brendan Eich"
paradigm: ["Object-Oriented", "Functional", "Event-Driven"]
useCases: ["Web Development", "Server-Side Development", "Mobile Apps", "Desktop Apps"]
website: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
category: "Web"
featured: true
difficulty: "Beginner"
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
