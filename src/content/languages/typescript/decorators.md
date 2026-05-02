---
title: "Decorators"
description: "Class, method, and property decorators (Standard & Experimental)"
---

## What are Decorators?

**Decorators** are a way to "annotate" and modify classes and their members at design time. They are a feature of ECMAScript (JavaScript) that **TypeScript** supported early on.

```typescript
function Log(target: any, key: string) {
    console.log(`${key} was called`);
}

class User {
    @Log
    save() {
        // ... logic ...
    }
}
```

## Two Versions of Decorators

Wait! This is a common source of confusion. There are two versions:

1.  **Experimental Decorators**: The original TypeScript version (requires `"experimentalDecorators": true` in `tsconfig.json`). Most older libraries (like Angular and TypeORM) use this.
2.  **Standard Decorators**: The new official ECMAScript standard version (TS 5.0+).

## Types of Decorators

-   **Class Decorators**: Modify the entire class definition.
-   **Method Decorators**: Modify or replace a method definition.
-   **Property Decorators**: Observe when a property is declared.
-   **Accessor Decorators**: Modify getters or setters.

## Decorator Factories

A Decorator Factory is a function that returns a decorator. This allows you to pass custom arguments to the decorator.

```typescript
function Color(value: string) {
    return function (target: any) {
        target.prototype.color = value;
    };
}

@Color("red")
class Car {}
```

## Summary

| Term | Usage | Description |
| :--- | :--- | :--- |
| **@** | Syntax | How you apply a decorator |
| **experimental** | Config | Old TS version (still widely used) |
| **Standard** | TS 5.0+ | Official JS version of decorators |
| **Factory** | `f(x) { return @d }`| Decorators with parameters |
| **Reflect** | Library | Used with decorators for metadata reflection |
| **Best For** | Logging, Dependency Injection, Validation, Routing |
| **Logic** | "Wrapping" existing code with extra behavior |
| **OOP** | Highly popular in Object-Oriented patterns |
| **Safety** | Decorators run at RUNTIME; types only check them at COMPILE TIME |
| **Frameworks** | Angular, NestJS, TypeORM, MobX |
| **Metadata** | `Reflect.getMetadata` (Extracting info from decorators) |
| **Chain** | Multiple decorators can be applied to one item (Top to Bottom) |
