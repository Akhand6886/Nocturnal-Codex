---
title: "Memory & Garbage Collection"
description: "Understanding V8's memory model and preventing memory leaks"
---

## Automatic Memory Management

JavaScript uses **Garbage Collection (GC)** to automatically free memory that is no longer being used. In modern engines (like V8), this is primarily done using the **Mark-and-Sweep** algorithm. 

The collector starts from "Roots" (like the `window` object or active variables) and marks everything reachable. Anything not marked is considered garbage and is cleared.

## 1. Memory Structure: Stack vs. Heap

- **Stack**: Stores static data (primitive values, function frames, pointers). Fast and small.
- **Heap**: Stores objects, arrays, and functions. Large and dynamic.

## 2. Common Causes of Memory Leaks

Even with GC, memory leaks happen when you unintentionally keep references to objects that are no longer needed.

### Global Variables
Accidentally creating variables on the `window` object keeps them in memory forever.
```javascript
function leak() {
    this.data = new Array(1000000); // 'this' is window if not in strict mode
}
```

### Forgotten Timers/Callbacks
Intervals that are never cleared keep their closure variables alive.
```javascript
const hugeData = [...];
setInterval(() => {
    // This closure keeps hugeData alive forever!
    console.log("Still running");
}, 1000);
```

### Detached DOM Nodes
Storing a reference to a DOM element in JS prevents it from being collected, even if it's removed from the page.
```javascript
const elements = {
    button: document.getElementById('my-btn')
};
document.body.removeChild(elements.button); 
// 'button' is still in memory because of the 'elements' object!
```

## 3. WeakMaps and WeakSets

`WeakMap` and `WeakSet` allow you to store objects without preventing them from being garbage collected. They do not prevent the "Mark" phase. This is perfect for metadata or caching.

```javascript
const cache = new WeakMap();
let obj = { name: "Alice" };

cache.set(obj, "Metadata");
obj = null; // The object and its metadata in 'cache' can now be collected!
```

## 4. Manual GC Triggers?
You cannot manually trigger Garbage Collection in a browser environment. The engine decides when to run it based on memory pressure. In Node.js, you can use the `--expose-gc` flag for debugging.

## Summary Checklist
- [x] V8 uses the Mark-and-Sweep algorithm.
- [x] Primitives go on the Stack; Objects go on the Heap.
- [x] Clear your intervals and timeouts.
- [x] Avoid accidental global variables.
- [x] Use `WeakMap` for non-owning object caches.
- [x] Detached DOM nodes are a common "silent" leak.
---
