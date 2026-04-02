---
title: "Maps & Sets"
description: "Map vs object, Set vs array, WeakMap, WeakRef"
---

## Why Maps and Sets?

Prior to **ES6**, we only had **Objects** and **Arrays** to store collections of data. **Maps** and **Sets** provide more specialized, high-performance data structures for specific use cases.

## 1. Maps (Key-Value)

A **Map** is like an Object, but with one major difference: **Keys can be any value**, including objects, functions, or numbers! In a regular Object, keys are converted into strings.

```javascript
const userMap = new Map();

// Any type can be a KEY!
const keyObj = { id: 1 };
userMap.set(keyObj, "Admin");
userMap.set(100, "User ID");

console.log(userMap.get(keyObj)); // "Admin"
console.log(userMap.size);      // 2 (Objects don't have .size!)
```

### Map vs. Object

| Feature | Map | Object |
| :--- | :--- | :--- |
| **Key Types** | Any (Object, Function, Number) | String or Symbol |
| **Order** | Preserves insertion order! | Usually preserves order! |
| **Length** | `.size` | Must use `Object.keys()`. |
| **Iterate** | Built-in (for...of) | Must use `Object.keys/entries()`. |

## 2. Sets (Unique Collections)

A **Set** is an ordered collection of **unique** values. Duplicates are automatically removed. It's much faster than an Array for verifying membership (`.has()`).

```javascript
const uniqueNums = new Set([1, 1, 2, 3]);
uniqueNums.add(4);
uniqueNums.add(1); // Ignored! (Already exists!)

console.log(uniqueNums.size); // 4
console.log(uniqueNums.has(2)); // true
```

### Use Case: Removing Duplicates from an Array

```javascript
const original = [1, 2, 2, 3, 3];
// The one-line trick!
const unique = [...new Set(original)]; // [1, 2, 3]
```

## 3. WeakMaps & WeakSets

These are specialized versions that **do not prevent garbage collection** of their keys. If a key is an object and no other reference to it exists, it will be automatically removed from the Map/Set.

```javascript
let user = { name: "Alpha" };

const metadata = new WeakMap();
metadata.set(user, "Extra Data");

// Remove the main reference!
user = null; 
// Now 'user' will be garbage collected FROM the WeakMap too!
```

> **Note**: WeakMaps only allow objects as keys, and you cannot iterate over them.

## 4. WeakRef (ES2021+)

A **WeakRef** is a weak reference to an object. It allows you to refer to an object without keeping it "alive" for the garbage collector.

## Summary

| Feature | Description |
| :--- | :--- |
| **Map** | Dictionary where keys can be anything |
| **Set** | Collection where all items are unique |
| **WeakMap** | Keys are objects; automatically garbage collected |
| **WeakSet** | Items are objects; automatically garbage collected |
| **Best For** | Metadata storage, unique lists, performance |
| **Set.has()** | Very fast (O(1) complexity!) |
| **Map.size** | Quick check for item count |
| **Clear()** | All Maps/Sets have a `.clear()` method |
| **Memory Leak** | WeakMap prevents leaks by allowing GC |
| **Key Identity**| `NaN === NaN` in Maps (unlike in Math!) |
| **For...Of** | Native iteration support |
| **Entry List**| Convert Map back to array with `[...map.entries()]` |
| **Prototype** | Maps don't have default keys (Objects have `toString`, etc.) |
| **Collision** | No risk of key collision with inherited properties |
| **Performance** | Better for frequent additions and removals |
| **Key Equality**| Uses `SameValueZero` algorithm |
| **WeakRef.deref**| Access the object inside the weak reference |
| **Iteration** | Only Map and Set are iterable |
