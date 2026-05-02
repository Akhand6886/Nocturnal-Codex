---
title: "Template Literal Types"
description: "Building dynamic and strongly-typed string patterns"
---

## What are Template Literal Types?

Introduced in TypeScript 4.1, **Template Literal Types** allow you to create new string literal types by concatenating other types together using the same syntax as JavaScript template strings (`${}`).

This enables you to model string patterns like CSS properties, event names, or URL routes directly in the type system.

## 1. Basic Usage

```typescript
type World = "world";
type Greeting = `hello ${World}`; 
// Result: "hello world"
```

## 2. Union Distribution

When you use a union in a template literal, TypeScript generates every possible combination.

```typescript
type Vertical = "top" | "bottom";
type Horizontal = "left" | "right";

type Alignment = `${Vertical}-${Horizontal}`;
// Result: "top-left" | "top-right" | "bottom-left" | "bottom-right"
```

## 3. String Manipulation Utilities

TypeScript provides several built-in types to help with template literals:
- `Uppercase<S>`
- `Lowercase<S>`
- `Capitalize<S>`
- `Uncapitalize<S>`

```typescript
type Getter<T extends string> = `get${Capitalize<T>}`;

type GetName = Getter<"name">; // "getName"
```

## 4. Real-World Use Case: Event Listeners

You can create a type that enforces a specific naming convention for events.

```typescript
type Entity = "User" | "Post";
type EventType = "Created" | "Updated" | "Deleted";

type EntityEvent = `${Lowercase<Entity>}${EventType}`;
// Result: "userCreated" | "userUpdated" | "userDeleted" | "postCreated" ...

function on(event: EntityEvent, callback: () => void) {
    // ...
}

on("userCreated", () => {}); // OK
on("user_joined", () => {}); // Error!
```

## 5. Key Remapping in Mapped Types

Template literals are often used to rename keys when creating a new object type.

```typescript
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
    name: string;
    age: number;
}

type PersonGetters = Getters<Person>;
// Result: { getName: () => string; getAge: () => number; }
```

## Summary Checklist
- [x] Use `${}` to combine string literal types.
- [x] Unions inside literals create all possible combinations.
- [x] Use `Capitalize` and `Uppercase` for string formatting.
- [x] Perfect for typed CSS, event emitters, and API endpoints.
- [x] Essential for advanced "Key Remapping" patterns.
---
