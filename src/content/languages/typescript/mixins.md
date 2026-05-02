---
title: "Mixins"
description: "Combining multiple classes into one using the mixin pattern"
---

## What are Mixins?

In **TypeScript**, **Mixins** are a way of building up classes from reusable components by combining multiple simpler classes. Because TypeScript (and JavaScript) only supports single inheritance, Mixins allow you to achieve "Multiple Inheritance" by wrapping constructors.

## How to Create a Mixin

A mixin is a function that takes a constructor and returns a new class that extends that constructor with new properties or methods.

```typescript
type Constructor = new (...args: any[]) => {};

function Timestampable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = Date.now();
    };
}
```

## Using Mixins

Wait! You can chain multiple mixins together to build a complex class from small, independent pieces.

```typescript
class User {
    name = "Alpha";
}

const TimestampedUser = Timestampable(User);
const u = new TimestampedUser();

console.log(u.name);      // "Alpha"
console.log(u.timestamp); // 1625...
```

## Why use Mixins?

1.  **Reusability**: Define features (like `Selectable`, `Deletable`, `Timestampable`) once and apply them to any class.
2.  **Decoupling**: Avoid deep, rigid inheritance hierarchies.
3.  **Flexibility**: Combine only the specific features a class needs.

> [!NOTE]
> Mixins are less common in modern React development (which favors Composition/Hooks), but they are extremely powerful in large-scale OOP systems or game engines.

## Summary

| Term | Description |
| :--- | :--- |
| **Mixin** | A function that extends a class with new features |
| **Constructor** | The type representing a class that can be `new`-ed |
| **TBase** | The generic constraint for the base class |
| **Composition** | Building complex objects from small, simple ones |
| **Hierarchy** | Avoids the "God Object" or "Deep Tree" problems |
| **Best For** | Plugin systems, game entities, complex UI components |
| **Logic** | "Functional Inheritance" |
| **Safety** | TypeScript correctly tracks the combined types! |
| **Constraint**| Can be harder to read than simple inheritance |
| **Identity** | The resulting object is an instance of all mixed classes |
| **Modern** | Powering flexible architectures in libraries like MobX |
| **Refactor** | Convert deep inheritance to flat mixin composition |
