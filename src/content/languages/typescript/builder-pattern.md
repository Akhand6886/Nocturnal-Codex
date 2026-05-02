---
title: "Builder Pattern"
description: "Type-safe object construction with fluent interfaces"
---

## What is the Builder Pattern?

The **Builder Pattern** is a design pattern used to construct complex objects step-by-step. In **TypeScript**, we can use the type system to ensure that an object is only built when all **required** steps have been completed.

## A Basic Fluent Builder

A common implementation uses a class where each method returns `this`, allowing you to "chain" calls together.

```typescript
class RequestBuilder {
    private url: string = "";
    private method: string = "GET";

    setURL(url: string) {
        this.url = url;
        return this; // Return 'this' for chaining!
    }

    setMethod(method: "GET" | "POST") {
        this.method = method;
        return this;
    }

    build() {
        return { url: this.url, method: this.method };
    }
}

const req = new RequestBuilder().setURL("/api").setMethod("POST").build();
```

## Advanced Type-Safe Builder

Wait! We can go further. We can use TypeScript to **prevent** the user from calling `.build()` until they have called `.setURL()`.

```typescript
type Request = { url: string; method: string };

class Builder<T extends Partial<Request>> {
    constructor(private data: T = {} as T) {}

    setURL(url: string): Builder<T & { url: string }> {
        return new Builder({ ...this.data, url });
    }

    // ... other methods ...

    build(this: Builder<Request>): Request {
        return this.data as Request;
    }
}
```

## Why use the Builder Pattern?

1.  **Readability**: Makes object construction with many parameters easy to follow.
2.  **Immutability**: You can create an immutable builder where every step returns a new instance.
3.  **Safety**: Enforce required fields at compile-time using advanced generics.

## Summary

| Term | Description |
| :--- | :--- |
| **Fluent** | Methods that return `this` for easy chaining |
| **Step-by-Step**| Breaking complex construction into small parts |
| **this: T** | Restricting methods to specific builder states |
| **Generic** | Tracking the "State" of the builder in the type |
| **Best For** | API Requests, Query Builders, Complex Configs |
| **Logic** | Separating the "Construction" from the "Representation" |
| **Safety** | Catch missing required fields during development |
| **Clean** | Avoids the "Telescoping Constructor" anti-pattern |
| **Modern** | Powering high-level APIs like `Prisma` and `Knex` |
| **Recursive** | Builders can return other builders for nested data |
| **Constraint**| Slightly more verbose to implement than simple objects |
| **Identity** | The builder is a "Service" that produces a "Value" |
