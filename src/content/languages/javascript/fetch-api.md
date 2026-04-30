---
title: "Fetch API"
description: "HTTP requests, headers, responses, AbortController"
---

## What is the Fetch API?

The **Fetch API** is the modern replacement for the old `XMLHttpRequest`. It provides an easy, Promise-based way to make network requests from the browser. It's built into all modern browsers and even **Node.js (v18+)**.

```javascript
// Simple GET request!
fetch("https://api.example.com/data")
  .then(resp => resp.json()) // Parsing to JSON!
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## Using `async` and `await` (Clean Way!)

Most developers use **Async/Await** for fetching data because it leads to much cleaner, more readable code.

```javascript
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    
    // Check if the request was successful! (200-299)
    if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
```

## Sending Data: POST Requests

To send data to a server (like a login form), you must provide a second argument to `fetch()` with the **method**, **headers**, and **body**.

```javascript
const userData = { name: "Alpha", role: "Admin" };

fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json" // Tell server we're sending JSON!
  },
  body: JSON.stringify(userData) // BODY MUST BE A STRING!
})
.then(resp => resp.json());
```

## Aborting a Request: `AbortController`

Sometimes you want to cancel a request if it takes too long or if the user leaves the page. The **`AbortController`** tool handles this.

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Start fetching with the signal!
fetch("https://api.example.com/very-slow-data", { signal })
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted!');
    }
  });

// Abort it immediately!
controller.abort();
```

## Summary

| Feature | Description |
| :--- | :--- |
| **GET** | Retrieve data (default method) |
| **POST** | Send/Create data |
| **headers** | Metadata (e.g., Auth, Content-Type) |
| **body** | Actual data being sent (JSON string!) |
| **response.ok** | Boolean check for success (200-299) |
| **Abort** | Use `AbortController` to cancel! |
| **Best For** | API calls, REST, GraphQL, File Uploads |
| **Security** | Supports CORS (Cross-Origin Resource Sharing) |
| **Streaming** | Responses can be read as a stream |
| **Caching** | Controlled via the `cache` option (e.g., `no-cache`) |
| **Proxy** | Use a server if the API doesn't support CORS |
| **Form Data** | Use `new FormData()` for easy form submission |
| **Network** | Handled in a separate background thread |
| **Priority** | Low, Auto, High (modern browsers) |
| **Debugging** | View requests in the "Network" tab of DevTools |
| **Polyfill** | Use `node-fetch` for older Node.js versions |
| **Credential** | Controlled by the `credentials` option (`include`, `omit`) |
