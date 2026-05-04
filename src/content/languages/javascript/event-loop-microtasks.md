---
title: "Event Loop & Microtasks"
description: "Mastering JavaScript's asynchronous runtime and task prioritization"
---

## What is the Event Loop?

JavaScript is single-threaded, meaning it can only do one thing at a time. The **Event Loop** is the mechanism that coordinates the execution of your code, collecting and processing events, and executing queued sub-tasks.

Understanding how the loop prioritizes different types of tasks is essential for writing high-performance, non-blocking code.

## 1. The Task Queue (Macrotasks)

These are standard asynchronous tasks. The loop executes **one** macrotask from the queue, then moves on to check the Microtask Queue.
- `setTimeout` / `setInterval`
- `setImmediate` (Node.js)
- I/O operations
- UI rendering

## 2. The Microtask Queue

Microtasks have a higher priority. After every single macrotask, the loop will process **all** pending microtasks until the queue is empty before moving to the next macrotask.
- `Promise.then` / `catch` / `finally`
- `async / await` (after the await)
- `queueMicrotask()`
- `MutationObserver`

## 3. The Execution Order

1.  Execute current **Synchronous** script (Call Stack).
2.  The Call Stack is empty.
3.  Execute **ALL** tasks in the **Microtask Queue**.
4.  Optionally render UI (Browser).
5.  Execute **ONE** task from the **Macrotask Queue**.
6.  Repeat from step 2.

### The Interview Classic:
```javascript
console.log('1'); // Sync

setTimeout(() => console.log('2'), 0); // Macrotask

Promise.resolve().then(() => console.log('3')); // Microtask

console.log('4'); // Sync

// Output order: 1, 4, 3, 2
```

## 4. Why it Matters

If you have a microtask that adds another microtask (recursively), you will **starve the event loop**. The browser will never reach the UI rendering or macrotask stages, causing the page to freeze (the "Infinite Promise" bug).

## Summary Checklist
- [x] JS is single-threaded; the Event Loop handles concurrency.
- [x] Macrotasks (setTimeout) run one per loop.
- [x] Microtasks (Promises) run all at once after each macrotask.
- [x] Avoid blocking the stack with heavy sync work.
- [x] Use `queueMicrotask` for high-priority background work.
- [x] Rendering happens between loops, never during task execution.
---
