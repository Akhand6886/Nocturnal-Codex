---
title: "Event Loop"
description: "Call stack, task queue, microtasks, and how JS is single-threaded"
---

## What is the Event Loop?

The **Event Loop** is the specialized mechanism that allows JavaScript to perform non-blocking asynchronous operations, despite being a **single-threaded language**. It determines how and when code should execute, providing order to your asynchronous tasks.

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout (Callback)");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise (Microtask)");
});

console.log("End");

// Result:
// 1. Start
// 2. End
// 3. Promise (Microtask)
// 4. Timeout (Callback)
```

## How It Works: The Components

1.  **The Call Stack**: Where your synchronous code is executed (in the order it appears).
2.  **Web APIs (Browser)**: Background tasks (like `setTimeout`, `fetch`, or event listeners) are handled by the browser context.
3.  **The Task Queue (Macro-Task Queue)**: Where callback results from `setTimeout`, `setInterval`, and I/O are put when they're finished.
4.  **The Micro-Task Queue**: Where `then` blocks from Promises are put. This queue has priority!

## The Execution Order

Wait! The event loop follows a specific order of operations:

1.  **Execute** everything in the **Call Stack** (Synchronous code).
2.  **Execute** everything in the **Micro-Task Queue** (Promises).
3.  **Execute** the FIRST item in the **Task Queue** (Macrotasks).
4.  **Repeat**.

> **Note**: Microtasks (Promises) always run before Macrotasks (like `setTimeout`), even if the timeout was set before the promise!

## Visualizing the Loop

```
[ Call Stack ]  <--- Execute synchronous code
      |
[ MicroTask Queue ] <--- Then execute all Promises!
      |
[ Task Queue ]  <--- Finally, execute ONE Macrotask.
      |
[ Re-render ]   <--- Browser updates the screen!
```

## Blocking the Event Loop (Avoid This!)

If you write a CPU-heavy synchronous loop (e.g., `while(true) {}`), it will block the Call Stack and take over the Event Loop. This makes your browser freeze and entirely unresponsive!

```javascript
// DANGER: Blocks everything!
while (true) {
  // Page is frozen; no clicks, no animations, no async!
}
```

## Summary

| Framework | Mechanism | Priority |
| :--- | :--- | :--- |
| **Stack** | Synchronous | 1st (The engine!) |
| **Microtask** | Promises, `queueMicrotask` | 2nd (Highest async priority!) |
| **Macrotask** | `setTimeout`, `setInterval`, I/O | 3rd (Lower async priority!) |
| **Best For** | Understanding async timing, performance |
| **V8** | The engine behind the Event Loop inside Chrome/Node |
| **Task** | A generic unit of asynchronous work |
| **Tick** | A single full rotation of the event loop! |
| **Node.js** | Uses the `libuv` library for its event loop (Multi-threaded I/O!) |
| **UI Rendering** | Only happens *after* the microtask queue is empty |
| **Blocking** | Never run heavy loops in the main thread! |
| **Worker** | Use **Web Workers** for heavy CPU-bound tasks! |
| **Performance** | Event loop ensures smooth animations and interactions |
| **Priority** | Always remember: Promises BEFORE Timeouts! |
