---
title: "Type Guards"
description: "Narrowing types with typeof, instanceof, and custom predicates"
---

## What is Type Narrowing?

**Type Guards** are expressions that perform runtime checks that allow the TypeScript compiler to **narrow** a variable to a more specific type within a block of code.

## 1. The `typeof` Guard

Use `typeof` to distinguish between primitive types like strings, numbers, and booleans.

```typescript
function printId(id: number | string) {
    if (typeof id === "string") {
        console.log(id.toUpperCase()); // id is NARROWED to string!
    } else {
        console.log(id); // id is NARROWED to number!
    }
}
```

## 2. The `instanceof` Guard

Use `instanceof` to check if an object is an instance of a specific class.

```typescript
class Bird { fly() {} }
class Fish { swim() {} }

function move(animal: Bird | Fish) {
    if (animal instanceof Bird) {
        animal.fly(); // animal is NARROWED to Bird!
    } else {
        animal.swim(); // animal is NARROWED to Fish!
    }
}
```

## 3. User-Defined Type Guards

Wait! Sometimes built-in guards aren't enough. you can create your own guard using a function with a **Type Predicate** (`x is T`) as the return type.

```typescript
function isBird(animal: Bird | Fish): animal is Bird {
    return (animal as Bird).fly !== undefined;
}

if (isBird(myAnimal)) {
    myAnimal.fly(); // TS is now 100% sure it's a Bird
}
```

## 4. The `in` Operator Guard

The `in` operator checks if a property exists on an object.

```typescript
type Admin = { role: string };
type User = { email: string };

function login(person: Admin | User) {
    if ("role" in person) {
        console.log("Admin logged in!");
    }
}
```

## Summary

| Guard | Usage | Best For... |
| :--- | :--- | :--- |
| **typeof** | `typeof x === "s"` | Primitives (string, number, etc.) |
| **instanceof** | `x instanceof C` | Classes and Objects |
| **is T** | `fn(x): x is T` | Custom complex logic |
| **in** | `"prop" in x` | Checking for property existence |
| **Equality** | `x === "value"` | Literal types |
| **Truthy** | `if (x) { ... }` | Filtering out `null` or `undefined` |
| **Logic** | Narrowing turns "General" types into "Specific" ones |
| **Safety** | Prevents "Property does not exist" errors at compile-time |
| **Modern** | Powering complex unions and intersection logic |
| **Discriminated**| `x.kind === "circle"` (The most powerful pattern!) |
| **Refactor** | Replacing `as Type` with Type Guards for better safety |
| **Consistency**| Ensuring code behaves as expected across all types |
