---
title: "Canvas & Web APIs"
description: "Canvas 2D, Geolocation, Intersection Observer, Web Workers"
---

## What are Web APIs?

Beyond the standard JavaScript language, modern browsers provide a rich suite of built-in **Web APIs** that allow your code to interact with the device's hardware, graphics engine, and location services. These APIs are the foundation for building high-performance, native-like web applications.

## 1. Canvas API (Graphics)

The **Canvas API** provides a means for drawing graphics via JavaScript and the HTML `<canvas>` element. It's used for everything from simple graphs and diagrams to complex, 2D/3D games.

```javascript
const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

// Create a blue rectangle!
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 150, 100);

// Draw text!
ctx.font = "30px Arial";
ctx.fillText("Canvas Rocks!", 10, 150);
```

## 2. Geolocation API (Location)

This API allows you to ask for the user's current geographic location (with their permission!).

```javascript
navigator.geolocation.getCurrentPosition((pos) => {
  const { latitude, longitude } = pos.coords;
  console.log(`Location: ${latitude}, ${longitude}`);
}, (err) => {
  console.error("Location Denied!", err);
});
```

## 3. Intersection Observer API (Performance)

This is a modern, high-performance way to detect when an element enters or leaves the browser's "viewport" (the visible area). It's the standard way to implement **Lazy Loading** images or **Infinite Scrolling.**

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("Element is visible!");
      // Stop observing after it's found!
      observer.unobserve(entry.target);
    }
  });
});

observer.observe(document.querySelector("#myElement"));
```

## 4. Web Workers (Parallel Logic)

JavaScript is single-threaded, but **Web Workers** allow you to run a script in a background thread, entirely separate from the main execution thread of your web application. Useful for heavy math!

```javascript
// main.js
const worker = new Worker("worker.js");

// Send data to background!
worker.postMessage("Start heavy task!");

// Receive result!
worker.onmessage = (e) => {
    console.log(`Result from background: ${e.data}`);
};
```

## Summary

| Feature | Description |
| :--- | :--- |
| **Canvas** | High-performance 2D/3D graphics |
| **Geolocation** | Detect user's physical coordinates |
| **Observer** | Detect visibility for lazy loading |
| **Worker** | Background thread for parallel logic |
| **Best For** | Games, visualization, heavy processing, UX |
| **Storage** | Use `localStorage` or `IndexedDB` for persistence |
| **History** | `history.pushState()` for modern single-page routing |
| **Clipboard** | `navigator.clipboard.writeText()` to copy to CLIPBOARD! |
| **Notification**| `new Notification("Hi!")` (Needs permission!) |
| **Device** | `navigator` object provides device properties |
| **Bluetooth** | `navigator.bluetooth` to interact with hardware |
| **Sensors** | `Accelerometer` and `Gyroscope` APIs |
| **Screen** | `window.screen` for display properties |
| **Encoding** | `TextEncoder` and `TextDecoder` for text processing |
| **Crypto** | `crypto` for high-quality random numbers and hashing |
| **Media** | `navigator.mediaDevices.getUserMedia` (Access Webcam/Mic!) |
| **Wake Lock** | `navigator.wakeLock` to prevent screen sleep |
| **IndexedDB** | Transactional, structured database in browser |
| **WebGL** | Use Canvas context `"webgl"` for 3D graphics |
| **File** | `input.files` for reading user files safely |
| **Payment** | `PaymentRequest` for modern checkout integration |
