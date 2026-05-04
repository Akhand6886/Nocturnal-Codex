---
title: "Generators & Iterators"
description: "Mastering custom iteration protocols and lazy-evaluated sequences"
---

## What is the Iteration Protocol?

JavaScript has a built-in "Iteration Protocol" that allows any object to be used in `for...of` loops and with the spread operator (`...`). To be iterable, an object must implement the `Symbol.iterator` method.

## 1. Generators (`function*`)

**Generators** are special functions that can be paused and resumed. They are the easiest way to create iterables. When called, they return a **Generator Object** that implements the iteration protocol.

```javascript
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const gen = fibonacci();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

## 2. The `yield` Keyword

- `yield`: Pauses the function and returns a value to the caller.
- `yield*`: Delegates to another iterable or generator.

```javascript
function* combined() {
    yield* [1, 2];
    yield* "AB";
}
// Results in: 1, 2, 'A', 'B'
```

## 3. Async Generators

Used for handling streams of asynchronous data (like web socket messages or paginated API responses).

```javascript
async function* fetchPages(url) {
    let page = 1;
    while (url) {
        const response = await fetch(`${url}?page=${page}`);
        const data = await response.json();
        yield data;
        url = data.next_url;
        page++;
    }
}

for await (const pageData of fetchPages('/api/posts')) {
    console.log(pageData);
}
```

## 4. Why use Generators?

1.  **Lazy Evaluation**: Only compute the next value when it's needed (infinite lists).
2.  **Memory Efficiency**: No need to store the entire collection in memory.
3.  **Clean Async Logic**: Handle complex streams without callback hell.
4.  **Custom Iterables**: Make your domain objects work with standard JS loops.

## Summary Checklist
- [x] Use `function*` to define a generator.
- [x] Use `yield` to return values lazily.
- [x] Use `next()` to resume execution.
- [x] Use `for await...of` for async generators.
- [x] Generators maintain their local state between yields.
---
