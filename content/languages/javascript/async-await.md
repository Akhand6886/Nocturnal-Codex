---
title: "Async/Await"
description: "Syntactic sugar for promises, error handling, and parallel execution"
---

## What is Async/Await?

Introduced in **ES2017**, **`async` and `await`** are a "syntactic sugar" that makes your asynchronous code look and behave like synchronous code. They are built on top of **Promises**, making them much easier to read and maintain.

```javascript
// A simple Async function!
async function fetchUser() {
    // Await pauses execution until promise resolves!
    const response = await fetch("https://api.example.com/user/1");
    const data = await response.json();
    console.log(data.name);
}

// Call it! (Returns a promise!)
fetchUser();
```

## How to use `async` and `await`

1.  **`async`**: Declare a function as an asynchronous function. It *always* returns a Promise!
2.  **`await`**: Can only be used inside an `async` function. It pauses the function until the Promise is resolved.

```javascript
// Arrow function syntax!
const getProfile = async () => {
  const profile = await fetchProfile();
  return profile;
};
```

## Error Handling with `try/catch`

Unlike Promises, which use `.catch()`, **Async/Await** uses the standard `try/catch` block for handling errors. It's much more intuitive!

```javascript
// Error handling!
async function loadConfig() {
  try {
    const config = await fetchConfig();
    return config;
  } catch (err) {
    console.error("Failed to load config:", err);
    // Handle error!
  } finally {
    console.log("Process complete.");
  }
}
```

## Running Parallel Ops: `Promise.all()`

It's common to accidentally write sequential code when you actually want parallel code. **Do not await each line!**

```javascript
// DANGER: This is slow! (Sequential)
const user = await fetchUser();
const posts = await fetchPosts();

// BETTER: Both start at the SAME time! (Parallel)
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
```

## Top-Level `await` (Modern Environment)

In modern browsers and **Node.js (v14.8+)**, you can use `await` at the top level of a module without a wrapper function!

```javascript
// In modern modules, this just works!
const response = await fetch("https://api.example.com/status");
console.log(response.status);
```

## Summary

| Feature | Syntax | Behavior |
| :--- | :--- | :--- |
| **Async** | `async fn()` | Function returns a Promise |
| **Await** | `await p` | Pause function until resolved |
| **Error** | `try/catch` | Standard error handling |
| **Parallel**| `Promise.all()` | Run multiple tasks concurrently |
| **Best For** | API calls, database tasks, file I/O |
| **Clean** | No more Pyramid of Doom! |
| **Debugging**| Works naturally with breakpoints! |
| **Refactor** | Use `async` to convert promise chains |
| **Memory** | Call stack is preserved during `await` |
| **Loops** | Be careful with `await` in loops (use `for of`)! |
| **Performance**| Don't wait for serial tasks; use parallel! |
| **Browser** | Supported in all modern environments |
| **Node.js** | Supported since version 7.6+ |
| **Syntactic** | It's just a nicer way to write Promises! |
