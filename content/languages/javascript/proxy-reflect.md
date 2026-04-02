---
title: "Proxy & Reflect"
description: "Metaprogramming with Proxy traps and Reflect API"
---

## What is Metaprogramming?

**Metaprogramming** is a technique where a program has knowledge of or can manipulate itself. JavaScript provides two powerful built-in tools for this: **`Proxy`** and **`Reflect`**.

## 1. The Proxy Object

A **Proxy** allows you to wrap another object (the **target**) and intercept core operations like reading, writing, and deleting properties. These interceptions are called **traps**.

```javascript
const user = { name: "Alpha", age: 25 };

// The middleman!
const handler = {
  get: (target, prop) => {
    console.log(`Reading property: ${prop}`);
    return prop in target ? target[prop] : "Not Found";
  },
  set: (target, prop, value) => {
    if (prop === "age" && value < 0) {
        throw new Error("Age cannot be negative!");
    }
    target[prop] = value;
    return true; // Return true to indicate success!
  }
};

const proxy = new Proxy(user, handler);
console.log(proxy.name); // Reading property: name!
// proxy.age = -5; // ERROR: Age cannot be negative!
```

## 2. The Reflect API (Companion to Proxy)

**Reflect** is a built-in object that provides static methods for the same tasks as Proxy traps. Instead of using the old Object methods (`Object.defineProperty`), **Reflect** provides a cleaner, functional way to perform object operations.

```javascript
const obj = { x: 10 };

// The old way (May throw errors)
// delete obj.x;

// The modern way (Returns true/false)
if (Reflect.deleteProperty(obj, "x")) {
    console.log("Deleted!");
}
```

### Why Use Reflect with Proxy?

Most Proxy traps *must* return a Boolean or a specific result. **Reflect** methods are designed to return exactly what the Proxy trap expects, making them the perfect companions!

```javascript
const handler = {
  get: (target, prop, receiver) => {
    // Forward the request to target using Reflect!
    console.log("Reading...");
    return Reflect.get(target, prop, receiver);
  }
};
```

## Practical Use Cases

1.  **Validation**: Intercepting and validating data before it's saved.
2.  **Logging**: Auditing every time a system-sensitive object is accessed.
3.  **Data Binding**: Automatically updating the UI when an object's properties change (Vue.js 3 uses this for reactivity!).
4.  **Security**: Revoking access to an object.

## Summary

| Term | Description |
| :--- | :--- |
| **Proxy** | Wrap an object to intercept its behavior |
| **Target** | The original object being wrapped |
| **Trap** | A specific operation to intercept (e.g., `get`, `set`, `delete`) |
| **Reflect** | Global object with methods for object operations |
| **Best For** | Validation, reactivity, logging, security |
| **Receiver** | The object that the call was originally made to |
| **Performance** | Proxies have a small overhead; use them wisely! |
| **Revocable** | `Proxy.revocable()` for temporary access to an object |
| **Invariant** | Rules that a proxy MUST follow (like not hiding non-configurable keys) |
| **Compatibility**| Proxies cannot be polyfilled for older browsers (IE11) |
| **This Binding**| Proxy maintains the `this` context correctly |
| **Native API** | Reflect is the functional standard for object manipulation |
| **Metaprogramming**| Changing how the language behaves from WITHIN the language |
| **Debugging** | Trace exactly what is modifying your data structures |
| **Abstraction** | Create a unified API for different data sources |
| **Mocking** | Use Proxies to simulate real objects in tests |
| **Middleware** | Intercepting data flow in a system |
