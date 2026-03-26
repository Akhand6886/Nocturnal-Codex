---
id: "typescript"
name: "TypeScript"
slug: "typescript"
description: "A strongly-typed superset of JavaScript that compiles to plain JS, adding safety to large-scale applications."
iconName: "typescript"
year: 2012
creator: "Anders Hejlsberg (Microsoft)"
paradigm: ["Object-Oriented", "Functional", "Imperative"]
useCases: ["Web Development", "Server-Side Development", "Large-Scale Applications"]
website: "https://www.typescriptlang.org/"
category: "Web"
featured: true
difficulty: "Intermediate"
---

## Overview

TypeScript is a free and open-source programming language developed by Microsoft. It is a strict syntactical superset of JavaScript that adds optional static typing. TypeScript is designed for the development of large applications and transpiles to JavaScript. It offers classes, interfaces, generics, and modules — enabling teams to build robust, maintainable codebases with compile-time safety checks.

## Key Features

- **Static typing** — Catch bugs at compile time with a powerful type system
- **Type inference** — Smart defaults mean you don't have to annotate everything
- **Generics** — Write reusable, type-safe code for collections and utilities
- **Interfaces & enums** — Define contracts and constant sets
- **Full JS compatibility** — Any valid JavaScript is valid TypeScript

## Common Use Cases

- **Frontend Frameworks** — React, Angular (built with TS), Vue 3
- **Backend** — Node.js + Express/Fastify/NestJS
- **Full-Stack** — Next.js, Nuxt, SvelteKit
- **Library Development** — npm packages with type definitions
- **Enterprise Applications** — Large-team codebases needing safety

## Code Example

```typescript
// TypeScript generics and interfaces
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  const res = await fetch(endpoint);
  const data: T = await res.json();
  return { data, status: res.status, message: 'OK' };
}

// Usage — fully typed
const users = await fetchApi<User[]>('/api/users');
```

## Learning Resources

- [Official TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Total TypeScript](https://www.totaltypescript.com/)
