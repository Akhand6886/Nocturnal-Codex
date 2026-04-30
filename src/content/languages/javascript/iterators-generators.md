---
title: "Iterators & Generators"
description: "Symbol.iterator, function*, yield, and async generators"
---

## What are Iterators?

An **iterator** is an object that knows how to access items from a collection one at a time, while keeping track of its current position. This is the mechanism that powers **`for...of`** loops and the **spread operator**.

```javascript
const colors = ["red", "green"];

// Arrays are built-in iterables!
for (const color of colors) {
    console.log(color);
}
```

## Creating Custom Iterators

You can make any object "iterable" by implementing the **`Symbol.iterator`** method. This method must return an object with a **`.next()`** method.

```javascript
const myIterable = {
    [Symbol.iterator]() {
        let count = 0;
        return {
            next() {
                count++;
                return count <= 3 
                    ? { value: count, done: false } 
                    : { value: undefined, done: true };
            }
        };
    }
};

for (const val of myIterable) console.log(val); // 1, 2, 3
```

## Generators: A Cleaner Approach (`function*`)

Wait! Writing custom iterators is complex. **Generators** provide a much simpler way to define iteration logic using the **`function*`** syntax and the **`yield`** keyword.

1.  **Starts running** only when you call `.next()`.
2.  **Returns the value** and **pauses** execution at each `yield`.
3.  **Remembers its state**!

```javascript
function* countdown(start) {
    while (start > 0) {
        yield start;
        start--;
    }
}

const count = countdown(3);
console.log(count.next().value); // 3
console.log(count.next().value); // 2
```

## Why Use Generators?

1.  **Infinite Sequences**: You can represent data that never ends (like a sequence of IDs) without crashing your computer.
2.  **Lazy Evaluation**: Only calculates what you need, right when you need it.
3.  **Memory Efficient**: You don't need to store a million-item list in your RAM.

## Async Generators (ES2018+)

You can even combine generators with asynchronous logic to iterate through a data stream (like an API that returns results page-by-page).

```javascript
async function* fetchPages(url) {
    let page = 1;
    while (page <= 3) {
        const resp = await fetch(`${url}?page=${page}`);
        yield await resp.json();
        page++;
    }
}

for await (const data of fetchPages("/api/data")) {
    console.log(`Page Data: ${data.items.length}`);
}
```

## Summary

| Feature | Method / Syntax | Purpose |
| :--- | :--- | :--- |
| **Iterator** | `[Symbol.iterator]` | The protocol for loops |
| **Generator** | `function*` | Easy way to create iterators |
| **Yield** | `yield x` | Pause and return a value |
| **Async Gen** | `async function*` | Iterate over async streams |
| **Next** | `.next()` | Move to the next step |
| **Best For** | Streams, infinite data, custom collection types |
| **Memory** | O(1) space (High performance!) |
| **Lazy** | Only computes what's needed |
| **Return** | `return v` | Stop the generator and return v |
| **Throw** | `g.throw(err)` | Trigger an error INSIDE the generator |
| **Send** | `g.next(val)` | Send data BACK into the generator |
| **Delegate** | `yield* another()`| Yield items from another generator |
| **Native** | Arrays, Maps, Sets are all Iterables! |
| **Comprehension**| Generators are the building blocks for modern async code |
