---
title: "Error Handling"
description: "try/catch, custom errors, Error types, and global error handlers"
---

## What are JavaScript Errors?

In **JavaScript**, an **error** is a special object that indicates that something went wrong during the execution of your program. If not "caught" or "handled", it will cause the program to crash. Errors are not your enemy—they are a guide to identifying and fixing bugs!

```javascript
// A simple error (ReferenceError!)
// console.log(x);

// Handle it!
try {
  console.log(x);
} catch (err) {
  console.log("Error caught: x is not defined!");
}
// 1. "Error caught: x is not defined!" (Program continues!)
```

## Handling Errors with `try/catch/finally`

-   **`try`**: Block of code you want to "monitor" for errors.
-   **`catch(err)`**: Block that runs ONLY if an error occurs.
-   **`finally`**: Block that runs **no matter what**, whether an error occurred or not. Use this for cleanup logic (like hiding a loading spinner).

```javascript
try {
  // Logic that might fail
  const user = await fetchUser();
} catch (error) {
  // Handle the error!
  console.error("Fetch failed:", error.message);
} finally {
  console.log("Process complete.");
}
```

## Throwing Errors: `throw`

You can explicitly trigger an error because a certain business condition isn't met.

```javascript
const setAge = (age) => {
  if (age < 0) {
      // Trigger an error manually!
      throw new Error("Age cannot be negative!");
  }
  return age;
};

try {
  setAge(-5);
} catch (e) {
  console.error(e.message);
}
```

## Creating Custom Errors

For large-scale projects, it's often more descriptive to create your own Error types.

```javascript
// Customize by inheriting from the base 'Error' class
class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

throw new DatabaseError("Could not connect to localhost:3306");
```

## Built-in Error Types (Most Common)

| Error Type | Meaning |
| :--- | :--- |
| **TypeError** | Variable is of the wrong type (e.g., `null.prop`) |
| **ReferenceError** | You used a variable that doesn't exist |
| **SyntaxError** | Typos in your code that JS can't parse |
| **RangeError** | Value is outside the allowed range (e.g., `new Array(-1)`) |
| **URIError** | Error during URL encoding/decoding |

## Summary

| Term | Description |
| :--- | :--- |
| **try** | Monitor for crashes |
| **catch** | Recover from errors |
| **finally** | Final cleanup logic |
| **throw** | Manually trigger an error |
| **Custom** | Create custom error classes |
| **Error** | The base object for all built-in errors |
| **Best For** | Bug prevention, resilient code, input validation |
| **Async** | Always use `try/catch` with `async/await`! |
| **Stack Trace** | The chain of calls that led to the crash |
| **message** | The descriptive string of the error |
| **name** | The specific type (e.g., "TypeError") |
| **Silent Fail** | Don't catch an error and do NOTHING! (Always log it!) |
| **Network** | Handling failed API responses |
| **Browser** | Use `window.onerror` for global error catching |
| **Node.js** | Use `process.on('uncaughtException')` |
| **Polyfill** | Native support in all environments |
| **Debugging** | Pause on exceptions in browser DevTools |
| **Logging** | Send error data to a service (like Sentry) |
| **Re-throw** | You can catch and then `throw` again to bubble it up |
| **Top-Level** | Error handling should wrap your entire "main" logic |
| **Security** | Never expose internal stack traces to the end-user! |
