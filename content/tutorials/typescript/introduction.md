---
title: "Introduction to TypeScript"
slug: "introduction-to-typescript"
order: 1
description: "An introduction to TypeScript and its relationship with JavaScript."
category: "Getting Started"
---

## What is TypeScript?

TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript. It is designed for the development of large applications and transpiles to JavaScript.

### Why use TypeScript?

JavaScript is a dynamically typed language. This means you don't have to specify the type of a variable, which offers flexibility but can lead to bugs in large-scale applications. TypeScript solves this problem by adding types to JavaScript.

- **Static Typing**: Catch errors during development, before the code is run. This leads to more robust code.
- **Better Tooling**: Types allow for better autocompletion, navigation, and refactoring in code editors like VS Code.
- **Readability**: Explicit types can make the code easier to read and understand.
- **Modern JavaScript Features**: TypeScript lets you use the latest features of JavaScript, even if they aren't supported by all browsers yet, by compiling them down to an older version.

### TypeScript Example

Here is a simple example in TypeScript:

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Brendan", new Date());
```

If you were to call `greet("Brendan", "2024-07-10")`, TypeScript would give you an error because you are passing a string instead of a `Date` object. Plain JavaScript would only fail at runtime.

Because TypeScript is a superset of JavaScript, any valid JavaScript code is also valid TypeScript code. This makes it easy to adopt TypeScript in existing JavaScript projects.