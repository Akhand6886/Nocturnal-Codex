---
title: "DOM Manipulation"
description: "querySelector, createElement, event listeners, and delegation"
---

## What is the DOM?

The **DOM (Document Object Model)** is the tree-like representation of your HTML structure that the browser uses. JavaScript interacts with this tree to **read**, **modify**, and **delete** elements on the page in real-time, making websites interactive.

```javascript
// Each element is a NODE in the DOM tree!
// <html> -> <body> -> <div> -> <p> ...
```

## Selecting Elements

The modern approach uses **`querySelector`** and **`querySelectorAll`**. They are much more flexible than the older `getElementById`.

| Method | Target | Result |
| :--- | :--- | :--- |
| **querySelector("#id")** | One element (by ID) | Single element node |
| **querySelector(".class")**| One element (by Class) | First matching node |
| **querySelectorAll("p")** | Multiple elements | Static NodeList (array-like) |

```javascript
const title = document.querySelector("#page-title");
const items = document.querySelectorAll(".list-item");

// Modify content and color!
title.textContent = "Welcome to the Codex";
title.style.color = "blue";
```

## Creating & Modifying Elements

You can build entirely new HTML elements from scratch using JavaScript.

1.  **`createElement("tag")`**: Define the element.
2.  **`textContent`**: Add text/content inside.
3.  **`appendChild(el)`**: Put it into the page!

```javascript
const wrapper = document.querySelector("#wrapper");

// Create a new button!
const button = document.createElement("button");
button.textContent = "Click Me!";
button.className = "btn-primary";

// Put it into the div!
wrapper.appendChild(button);
```

## Event Listeners

Use **`addEventListener`** to listen for user actions like clicks, scrolls, or keyboard presses.

```javascript
button.addEventListener("click", () => {
  alert("Button clicked!");
});
```

## Modern Best Practice: Event Delegation

Wait! Instead of adding 100 listeners to 100 separate list items (which is slow!), add **ONE listener** to their parent. The event will "bubble up" to the parent, where you can identify which child was clicked.

```javascript
const list = document.querySelector("#my-list");

list.addEventListener("click", (event) => {
  // Check exactly what was clicked!
  if (event.target.tagName === "LI") {
      console.log(`Clicked Item: ${event.target.textContent}`);
  }
});
```

## Summary

| Feature | Method / Syntax |
| :--- | :--- |
| **Select** | `document.querySelector(".target")` |
| **Create** | `document.createElement("div")` |
| **Append** | `parent.appendChild(child)` |
| **Remove** | `el.remove()` |
| **Class** | `el.classList.add("active")` |
| **Attribute** | `el.setAttribute("id", "my-id")` |
| **Style** | `el.style.backgroundColor = "red"` |
| **Content** | `el.textContent = "New Text"` |
| **Best For** | Front-end interactivity, UI updates |
| **Inner HTML** | `el.innerHTML = "<b>Hi</b>"` (DANGER: XSS risk!) |
| **Dataset** | `el.dataset.id` (For custom `data-` attributes) |
| **Window** | The global object representing the browser window |
| **Document** | The entry point for the page DOM |
| **Traverse** | Use `el.parentElement` or `el.children` |
| **Lifecycle** | Listen for `DOMContentLoaded` for safe initialization |
| **Reflow** | Modifying many elements at once is expensive! (Use Fragment) |
| **Shadow DOM** | Encapsulated DOM for customized web components |
| **Virtual DOM** | Frameworks like React use this for better performance |
