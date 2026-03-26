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
topics:
  - section: "Basics"
    description: "Getting started with TypeScript's type system."
    items:
      - title: "Introduction to TypeScript"
        description: "Why TypeScript, relationship to JavaScript, and the compiler"
      - title: "Type Annotations"
        description: "Primitive types, arrays, tuples, enums, and any/unknown/never"
      - title: "Type Inference"
        description: "How TS automatically determines types and when to annotate"
      - title: "Functions"
        description: "Parameter types, return types, optional/default params, overloads"
      - title: "Objects & Interfaces"
        description: "Object types, interfaces, optional properties, readonly"
  - section: "Advanced Types"
    description: "TypeScript's powerful type-level programming."
    items:
      - title: "Union & Intersection Types"
        description: "Combining types with | and &, discriminated unions"
      - title: "Generics"
        description: "Generic functions, classes, constraints, and default types"
      - title: "Utility Types"
        description: "Partial, Required, Pick, Omit, Record, ReturnType"
      - title: "Conditional Types"
        description: "extends, infer, and type-level branching"
      - title: "Mapped Types"
        description: "Transforming types with mapped type syntax and key remapping"
      - title: "Template Literal Types"
        description: "String manipulation at the type level"
  - section: "Classes & OOP"
    description: "Object-oriented TypeScript patterns."
    items:
      - title: "Classes"
        description: "Properties, methods, access modifiers (public/private/protected)"
      - title: "Abstract Classes"
        description: "Abstract methods, base classes, and implementation contracts"
      - title: "Decorators"
        description: "Class, method, and property decorators (stage 3)"
      - title: "Mixins"
        description: "Composable class patterns for code reuse"
  - section: "Modules & Configuration"
    description: "Project organization and compiler options."
    items:
      - title: "Modules"
        description: "ES modules, namespace, declaration merging"
      - title: "tsconfig.json"
        description: "Compiler options, strict mode, paths, and project references"
      - title: "Declaration Files"
        description: ".d.ts files, DefinitelyTyped, and writing type definitions"
      - title: "Build Tools"
        description: "tsc, ts-node, tsx, and integration with bundlers"
  - section: "Advanced Patterns"
    description: "Real-world TypeScript patterns for production code."
    items:
      - title: "Type Guards"
        description: "typeof, instanceof, in, and custom type predicates"
      - title: "Branded Types"
        description: "Nominal typing patterns for type-safe IDs and units"
      - title: "Builder Pattern"
        description: "Fluent APIs with full type inference"
      - title: "Error Handling"
        description: "Result types, discriminated unions for errors, and exhaustive checks"
---

## Overview

TypeScript is a free and open-source programming language developed by Microsoft. It is a strict syntactical superset of JavaScript that adds optional static typing. TypeScript is designed for the development of large applications and transpiles to JavaScript. It offers classes, interfaces, generics, and modules — enabling teams to build robust, maintainable codebases with compile-time safety checks.

## Key Features

- **Static typing** — Catch bugs at compile time with a powerful type system
- **Type inference** — Smart defaults mean you don't have to annotate everything
- **Generics** — Write reusable, type-safe code for collections and utilities
- **Interfaces & enums** — Define contracts and constant sets
- **Full JS compatibility** — Any valid JavaScript is valid TypeScript

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
```

## Learning Resources

- [Official TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Total TypeScript](https://www.totaltypescript.com/)
