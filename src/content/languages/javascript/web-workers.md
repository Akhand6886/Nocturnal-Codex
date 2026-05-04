---
title: "Web Workers"
description: "High-performance JavaScript with multi-threading and off-main-thread execution"
---

## The Single-Threaded Bottleneck

Normally, JavaScript runs on a single thread (the Main Thread). If you perform a heavy computation (like image processing or complex math), the UI becomes unresponsive, and animations freeze.

## 1. What are Web Workers?

**Web Workers** allow you to run JavaScript in a background thread. This thread has its own event loop and memory space. It communicates with the main thread using **Message Passing**.

**LIMITATIONS**: Workers cannot access the DOM, the `window` object, or the `document` object.

## 2. Basic Usage

### Main Script (`main.js`)
```javascript
const worker = new Worker('worker.js');

worker.postMessage({ number: 42 }); // Send data to worker

worker.onmessage = (event) => {
    console.log(`Result from worker: ${event.data.result}`);
};
```

### Worker Script (`worker.js`)
```javascript
self.onmessage = (event) => {
    const number = event.data.number;
    // Perform heavy work...
    const result = number * number;
    self.postMessage({ result }); // Send back to main thread
};
```

## 3. Structured Cloning vs. Transferables

When you send data via `postMessage`, it is usually **Copied** using the "Structured Clone Algorithm." For large datasets (like 100MB arrays), this copy is slow.

**Transferables** allow you to "transfer ownership" of memory (e.g., an `ArrayBuffer`) from one thread to another with zero copy overhead. Once transferred, the data is no longer accessible on the original thread.

```javascript
const buffer = new ArrayBuffer(1024 * 1024); // 1MB
worker.postMessage(buffer, [buffer]); // Transfer ownership!
```

## 4. SharedArrayBuffer & Atomics

For advanced use cases, you can use `SharedArrayBuffer` to share memory between threads. To prevent data races, you must use the `Atomics` object to synchronize access.

## 5. Why use Web Workers?

1.  **60FPS UI**: Keep the main thread free for rendering and animations.
2.  **Complex Math**: Encryption, data compression, or pathfinding.
3.  **Data Processing**: Parsing large JSON files or manipulating images.
4.  **Background Sync**: Periodically fetching or saving data.

## Summary Checklist
- [x] Workers run in background threads.
- [x] Communicate via `postMessage`.
- [x] No DOM access in workers.
- [x] Use Transferables for zero-copy data transfer.
- [x] Perfect for computationally expensive tasks.
- [x] Native support in 100% of modern browsers.
---
