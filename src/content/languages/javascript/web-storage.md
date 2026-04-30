---
title: "Web Storage"
description: "localStorage, sessionStorage, cookies, and IndexedDB"
---

## Why Web Storage?

JavaScript allows you to store data directly in the browser. This is essential for remembering user settings, saving a login session, or storing a shopping cart without a database.

| Type | Persists... | Scope | Max Size |
| :--- | :--- | :--- | :--- |
| **localStorage** | Until Deleted | Same Origin | 5MB - 10MB |
| **sessionStorage**| Until Tab Closes | Same Origin | 5MB |
| **Cookies** | Set Expiry | Same Domain | 4KB |
| **IndexedDB** | Until Deleted | Same Origin | Unlimited! |

## 1. LocalStorage: Permanent Storage

Data in **localStorage** has no expiration date. It persists even when the browser is closed and reopened.

```javascript
// Saving data!
localStorage.setItem("theme", "dark");
localStorage.setItem("user", JSON.stringify({ name: "Alpha", id: 1 }));

// Retrieving data!
const theme = localStorage.getItem("theme");
const user = JSON.parse(localStorage.getItem("user"));

// Removing data!
localStorage.removeItem("theme");
localStorage.clear(); // Wipe EVERYTHING!
```

## 2. SessionStorage: Temporary Storage

**SessionStorage** works exactly like localStorage, but only lasts for the current browser session. When you close the tab, the data is gone!

```javascript
// Using is exactly the same as localStorage!
sessionStorage.setItem("tab_id", "12345");
```

## 3. Cookies: Server-Linked Storage

**Cookies** are the oldest way to store data. They are small pieces of information sent between the browser and the server with every HTTP request.

```javascript
// Setting a cookie!
document.cookie = "username=Alpha; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";

// Reading all cookies (comes as one long string!)
console.log(document.cookie); // "username=Alpha; theme=dark"
```

> **Wait!** Cookies are less secure and have much smaller capacity. Most modern developers use **localStorage** for settings and **HTTP-only cookies** (set by the server) for authentication tokens.

## 4. IndexedDB: Large-Scale Database

**IndexedDB** is a powerful, asynchronous browser database designed for large amounts of structured data (like offline web apps).

```javascript
// Using IndexedDB is complex and usually requires a library like 'idb'!
const request = indexedDB.open("MyDatabase", 1);
```

## Summary

| Feature | Method / Syntax |
| :--- | :--- |
| **Local Save** | `localStorage.setItem(key, val)` |
| **Local Get** | `localStorage.getItem(key)` |
| **Local Remove** | `localStorage.removeItem(key)` |
| **Session Save** | `sessionStorage.setItem(key, val)` |
| **Cookie Save** | `document.cookie = "..."` |
| **DB Save** | `indexedDB` (Advanced) |
| **Best For** | User settings, auth tokens, caching, offline apps |
| **Security** | Never store passwords in localStorage! |
| **Format** | Only strings! (Use `JSON.stringify` for objects) |
| **Cross-Tab** | LocalStorage is shared across all tabs/windows! |
| **Sync** | LocalStorage is synchronous; it can block the main thread if used heavily |
| **Events** | Listen for the `storage` event to sync data across windows |
| **Clearing** | `localStorage.clear()` |
| **Iterate** | Use `localStorage.length` and `localStorage.key(i)` |
| **Origin** | Storage is specific to a domain (`example.com`) |
| **Encrypted** | Browsers don't encrypt storage; it's readable in DevTools! |
| **Max Size** | Varies by browser, but usually around 5MB |
| **Privacy** | Use sessionStorage for private tab-specific data |
