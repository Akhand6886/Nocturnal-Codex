---
title: "Promises"
description: "then/catch/finally, Promise.all, Promise.race, Promise.allSettled"
---

## What is a Promise?

A **Promise** is a special object that represents the eventual result of an asynchronous operation. Think of it like a "placeholder" for data that hasn't arrived yet. It has three possible states:

1.  **Pending**: Initial state. The operation is still in progress.
2.  **Fulfilled (Resolved)**: The operation succeeded! We have the data!
3.  **Rejected**: Something went wrong. We have an error.

```javascript
// A simple Promise!
const promise = new Promise((resolve, reject) => {
    const success = true;
    if (success) {
        resolve("Success! Data received.");
    } else {
        reject("Error! Data failed.");
    }
});

promise
  .then(resp => console.log(resp))   // Handle success!
  .catch(err => console.error(err)) // Handle error!
```

## Chaining Promises

Unlike callbacks, Promises can be "chained" together. This allows you to perform multiple asynchronous tasks in sequence without nesting!

```javascript
// Chaining multiple steps!
fetchUser(1)
  .then(user => fetchProfile(user.id))
  .then(profile => fetchSettings(profile.id))
  .then(settings => console.log(settings))
  .catch(err => console.error(err));
```

## Handling Multiple Promises

The **`Promise`** object has several static methods for running multiple operations at once.

| Method | Behavior |
| :--- | :--- |
| **Promise.all([p1, p2])** | **All or Nothing**: Succeeds if ALL succeed; fails if ANY fail. |
| **Promise.race([p1, p2])**| **The Winner**: Returns the result of the first Promise to finish. |
| **Promise.allSettled()** | **Wait for Everyone**: Returns results of ALL promises, even if some failed. |
| **Promise.any()** | **First Success**: Succeeds if ANY succeed; fails if ALL fail. |

```javascript
// Wait for multiple resources!
const p1 = fetchUser();
const p2 = fetchPosts();

Promise.all([p1, p2])
  .then(([user, posts]) => {
      console.log(`User: ${user.name}, Posts: ${posts.length}`);
  });
```

## The `finally` Clause (ES2018)

Use **`.finally()`** for any code that should run whether the operation succeeded or failed — such as hiding a loading spinner.

```javascript
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => {
      // Always runs!
      hideLoadingSpinner();
  });
```

## Converting Callbacks to Promises

In modern development, most older callback-based APIs are wrapped in Promises for better readability.

```javascript
const wait = (ms) => new Promise(res => setTimeout(res, ms));

wait(2000).then(() => console.log("Waited 2 seconds!"));
```

## Summary

| Feature | Method / Code | Purpose |
| :--- | :--- | :--- |
| **Succeed** | `resolve(data)` | Operation complete |
| **Fail** | `reject(error)` | Operation failed |
| **Handle S** | `.then()` | Receive data |
| **Handle F** | `.catch()` | Receive error |
| **Cleanup** | `.finally()` | Final tasks |
| **All** | `Promise.all()` | Wait for all |
| **Best For** | API calls, database tasks, file I/O |
| **Chain** | `.then().then()` | Sequence logic |
| **Wrap** | `new Promise()` | Convert older logic |
| **Abort** | `AbortController` | Cancel a promise! |
| **Settled** | Returns status | `[{status: "fulfilled", ...}, ...]` |
| **Anti-Pattern**| Forgetting `.catch()`! | Unhandled rejection! |
| **Performance** | Use `Promise.all` for parallel tasks! |
| **ES6** | Native support in all modern browsers |
| **Debugging** | `await` makes debugging promises easier |
