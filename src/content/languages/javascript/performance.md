---
title: "Performance"
description: "Memory leaks, debouncing, throttling, and requestAnimationFrame"
---

## Why Performance Matters?

A slow web application leads to high bounce rates and poor user experience. In **JavaScript**, performance is not just about raw execution speed, but also about how efficiently you use the **Event Loop**, **Call Stack**, and **System Memory**.

## 1. Debouncing vs. Throttling

These are two essential techniques for handling "chatty" events like window resizing, scrolling, or real-time search inputs.

-   **Debouncing**: Wait until the user **stops** doing an action before running the code. (Best for a search input!)
-   **Throttling**: Limit how often the code can run, regardless of how fast the user is doing the action. (Best for scrolling!)

```javascript
// A simple Debounce!
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

const sendSearch = debounce((q) => fetch(`/search?q=${q}`), 500);
```

## 2. Preventing Memory Leaks

A **Memory Leak** occurs when you create an object or a listener that is no longer needed but was never cleared, preventing it from being garbage collected.

Common causes:
1.  **Global Variables**: `window.leak = "Everything";`
2.  **Dangling Listeners**: Forgetting to use `removeEventListener`.
3.  **Closures**: Accidentally capturing a massive object in a function scope.

```javascript
// CLEANUP: Always remove intervals/listeners!
const id = setInterval(updateUI, 1000);
// Later...
clearInterval(id);
```

## 3. High-Performance Animations: `requestAnimationFrame`

If you use `setTimeout` for animations, it won't be synced with the browser's refresh rate (60fps), leading to "jitter" or "tearing." **`requestAnimationFrame`** tells the browser exactly when to run your code for the smoothest possible animation.

```javascript
function animate() {
    // Perform update logic!
    updatePosition();
    // Schedule the next frame!
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

## 4. Web Workers (Parallel Processing)

The browser's main thread is the same thread that handles UI rendering and clicks. If you run a heavy math calculation there, the whole page will freeze. Use **Web Workers** to run that calculation in a separate background thread!

```javascript
const worker = new Worker("worker.js");
worker.postMessage({ data: millionsOfNumbers });
```

## Summary

| Technique | Purpose | Best Use Case... |
| :--- | :--- | :--- |
| **Debounce** | Wait for quiet period | Search inputs, form validation |
| **Throttle** | Limit execution rate | Scroll, Window resize |
| **RAF** | Smooth animations | Games, CSS transitions |
| **Worker** | Parallel processing | Heavy math, cryptography |
| **Best For** | Smooth UX, memory safety, speed |
| **Lighthouse**| Standard tool for measuring web performance |
| **Memory** | Use the "Performance" tab in DevTools to find leaks! |
| **Optimized** | `v8` optimization can speed up common paths |
| **Blocking** | Never block the main thread for >50ms |
| **Fragments** | Use `DocumentFragment` for batch DOM updates |
| **Caching** | Cache expensive function results (Memoization!) |
| **Lazy Load** | Only load what's visible (Intersection Observer!) |
| **Bundle Size**| Use Tree Shaking to remove dead code! |
| **DevTools** | Profile your code to find bottle-necks |
| **Interaction**| Target the "First Input Delay" (FID) metric |
| **Core Web V** | Google's metrics for a high-quality site |
| **Priority** | Use `fetch` priorities for critical assets |
| **Minimize** | Re-renders in frameworks like React |
| **Hardware** | Use WebGL for GPU-accelerated graphics |
| **Network** | Use compressed formats (Gzip/Brotli) |
| **Offline** | Service Workers can cache assets for instant loads |
