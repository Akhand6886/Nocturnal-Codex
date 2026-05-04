---
title: "Proxies & Reflection"
description: "Mastering metaprogramming and intercepting object operations"
---

## What is a Proxy?

The **Proxy** object allows you to create a wrapper around another object (the "target") and intercept fundamental operations like property lookup, assignment, enumeration, and function invocation. 

This is the foundation of modern reactive frameworks (like Vue 3) and data validation libraries.

## 1. Basic Syntax

A Proxy takes two arguments:
1.  **Target**: The original object you want to wrap.
2.  **Handler**: An object containing "traps" (interceptors).

```javascript
const user = { name: "Alice", age: 25 };

const handler = {
    get: (target, prop) => {
        console.log(`Reading property: ${prop}`);
        return prop in target ? target[prop] : "Not Found";
    }
};

const proxy = new Proxy(user, handler);
console.log(proxy.name); // Reading property: name -> "Alice"
console.log(proxy.job);  // Reading property: job -> "Not Found"
```

## 2. Common Traps

- `get(target, prop, receiver)`: Intercepts property access.
- `set(target, prop, value, receiver)`: Intercepts property assignment.
- `has(target, prop)`: Intercepts the `in` operator.
- `deleteProperty(target, prop)`: Intercepts `delete`.
- `apply(target, thisArg, args)`: Intercepts function calls (if target is a function).

## 3. The Reflect API

**Reflect** is a built-in object that provides methods for interceptable JavaScript operations. It is almost always used inside Proxy traps to perform the default behavior safely.

```javascript
const handler = {
    set(target, prop, value) {
        if (prop === 'age' && value < 0) {
            throw new Error("Age cannot be negative");
        }
        return Reflect.set(target, prop, value); // Perform default action
    }
};
```

## 4. Real-World Use Cases

1.  **Validation**: Enforcing schemas on objects.
2.  **Reactivity**: Automatically triggering UI updates when data changes.
3.  **Logging/Profiling**: Tracking how an object is being used.
4.  **Security**: Creating "Read-only" views of sensitive objects.

## Summary Checklist
- [x] Proxies wrap objects to intercept operations.
- [x] Handlers contain "traps" (get, set, has, etc.).
- [x] Use `Reflect` to perform default actions inside traps.
- [x] Proxies are much more powerful than `Object.defineProperty`.
- [x] Perfect for building frameworks, mocks, and validation logic.
---
