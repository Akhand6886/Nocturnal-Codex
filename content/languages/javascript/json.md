---
title: "JSON"
description: "Parsing, stringifying, and working with API responses"
---

## What is JSON?

**JSON (JavaScript Object Notation)** is a lightweight data-interchange format. Although it's based on JavaScript's object syntax, it's completely text-based and language-independent. This makes it the universal language for communication between the front-end (browser) and the back-end (server).

```json
{
  "id": 1,
  "name": "Alpha",
  "roles": ["Admin", "User"]
}
```

## JSON Rules

JSON is stricter than regular JavaScript objects:
1.  **Keys** must be in double quotes (`"name"`).
2.  **Strings** must be in double quotes (`"Alpha"`).
3.  **Forbidden**: No trailing commas, comments, or functions!
4.  **Allowed Values**: String, Number, Object, Array, Boolean, Null.

## The Two Most Important Methods

The built-in **`JSON`** object handles everything you need.

### 1. `JSON.stringify()`

Convert a JavaScript object into a JSON-formatted **string**. Use this before sending data to a server or saving it to local storage.

```javascript
const user = { name: "Alpha", id: 1 };
const jsonString = JSON.stringify(user);

console.log(jsonString); // '{"name":"Alpha","id":1}'
```

### 2. `JSON.parse()`

Convert a JSON string back into a JavaScript **object**. Use this when you receive data from a server.

```javascript
const response = '{"id":2, "active":true}';
const result = JSON.parse(response);

console.log(result.id); // 2
```

## JSON with API Responses (Fetch)

When fetching data from an API, the response comes as a data stream. You must parse it into JSON before you can use it.

```javascript
async function getData() {
  const response = await fetch("https://api.example.com/data");
  // Parsing into JSON!
  const data = await response.json(); 
  console.log(data);
}
```

## The Redact Trick: Using `replacer`

`JSON.stringify` can take a second argument called a **replacer** to selectively hide or transform certain properties (like a password or an ID).

```javascript
const user = { name: "Alpha", password: "123" };

// Hide the password!
const safeJSON = JSON.stringify(user, (key, value) => {
  return key === "password" ? undefined : value;
});

console.log(safeJSON); // '{"name":"Alpha"}'
```

## Summary

| Method | Purpose | Input | Output |
| :--- | :--- | :--- | :--- |
| **JSON.parse(s)** | Convert to JS object | JSON String | Object / Array |
| **JSON.stringify(o)**| Convert to string | Object / Array | JSON String |
| **fetch().json()** | Modern API parsing | API stream | Object / Array |
| **Best For** | API communication, local storage, config files |
| **Rules** | Double quotes, no trailing commas, no functions |
| **Error** | Fails with `SyntaxError` if JSON is invalid |
| **Pretty Print** | `JSON.stringify(obj, null, 2)` (Indent by 2 spaces!) |
| **Circular Ref** | Fails if an object refers to itself! |
| **Date Fix** | JSON doesn't support Dates; converts them to strings |
| **Casting** | `JSON.parse` is faster than manually building objects |
