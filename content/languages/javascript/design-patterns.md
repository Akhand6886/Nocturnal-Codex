---
title: "Design Patterns"
description: "Module, Observer, Factory, Singleton, and Proxy patterns"
---

## What are Design Patterns?

**Design patterns** are reusable solutions to common problems in software design. They aren't pieces of code you can just copy-paste; they are **templates** for how to structure your code for better scalability, maintainability, and testability.

## 1. The Module Pattern (ES6)

This is the most common pattern in modern JavaScript. It uses **Encapsulation** to keep certain functions and variables private, while only exposing a public API to the rest of the application.

```javascript
// A simple Module!
export const userModule = (() => {
  let userCount = 0; // Private!

  return {
    addUser: (name) => {
        userCount++;
        console.log(`Added user: ${name}`);
    },
    getCount: () => userCount
  };
})();
```

## 2. The Singleton Pattern

The **Singleton** ensures that only **one instance** of a class ever exists throughout your entire application. This is useful for global things like a configuration object or a database connection.

```javascript
class Database {
  constructor() {
    if (Database.instance) {
        return Database.instance;
    }
    Database.instance = this;
    this.connection = "Database connected!";
  }
}

// Both will point to the IDENTICAL object!
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true
```

## 3. The Observer Pattern (Pub/Sub)

The **Observer** is a pattern where an object (the **Subject**) maintains a list of its dependents (the **Observers**) and notifies them automatically of any status changes. This is the foundation of event-driven programming!

```javascript
class Subject {
  constructor() {
      this.observers = [];
  }
  
  subscribe(fn) { this.observers.push(fn); }
  
  notify(data) {
      this.observers.forEach(fn => fn(data));
  }
}

const news = new Subject();
news.subscribe(msg => console.log(`Monitor 1: ${msg}`));
news.subscribe(msg => console.log(`Monitor 2: ${msg}`));

news.notify("New Update Found!");
```

## 4. The Proxy Pattern

A **Proxy** acts as a middleman for another object. It allows you to intercept and control operations on that object (like getting/setting values).

```javascript
const user = { name: "Alpha", age: 25 };

// Intercept all requests for names!
const userProxy = new Proxy(user, {
  get: (target, prop) => {
    console.log(`Accessing: ${prop}`);
    return target[prop];
  }
});

console.log(userProxy.name); // Accessing: name -> "Alpha"
```

## Summary

| Pattern | Description | Best Use Case... |
| :--- | :--- | :--- |
| **Module** | Private/Public segregation | File organization, Libraries |
| **Singleton** | Limit instance count to ONE | Global Config, DB Connection |
| **Observer** | One-to-many notifications | Events, Real-time updates |
| **Factory** | Generic object creator | Complex object generation |
| **Proxy** | Object middleman | Validation, Logging, API wrapping |
| **Mixin** | Multi-class functionality | Reusable smaller behaviors |
| **Best For** | Architecture, scalability, clear communication |
| **Prototype** | Cloning existing objects | High-performance inheritance |
| **Decorator** | Dynamically extend object | Adding features to a base object |
| **Facade** | Simple API to complex logic | Wrapping a complicated library |
| **Strategy** | Swappable algorithms | Selecting logic at runtime |
| **Command** | Encapsulate request as object | Redo/Undo features |
| **MVVM / MVC** | Large-scale architecture | Organizing entire apps |
| **Hooks** | React's version of patterns | State/Lifecycle encapsulation |
