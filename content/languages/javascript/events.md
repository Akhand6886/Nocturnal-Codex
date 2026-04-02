---
title: "Events"
description: "Event bubbling, capturing, preventDefault, and custom events"
---

## What are JavaScript Events?

An **event** is a signal that something has happened within the browser — a user clicked a button, a page finished loading, or a form was submitted. JavaScript allows you to **listen** for these signals and **respond** with a function.

```javascript
const button = document.querySelector("#my-button");

// The listener function receives an EVENT object!
button.addEventListener("click", (event) => {
  console.log(`Button clicked at: ${event.clientX}, ${event.clientY}`);
});
```

## The Event Object (`e`)

When an event occurs, the browser creates an **Event Object** containing metadata about the action:

-   **`event.target`**: The actual element that triggered the event.
-   **`event.type`**: The type of event (e.g., "click", "keydown").
-   **`event.key`**: The specific key pressed (for keyboard events).
-   **`event.preventDefault()`**: Stopping the default browser behavior (like a link opening or a form submitting).

```javascript
const form = document.querySelector("#my-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page refresh!
  console.log("Form data saved!");
});
```

## Propagation: Bubbling vs. Capturing

When an event happens on an element (like a button inside a div), how does it travel through the DOM?

1.  **Capturing Phase**: The event travels **down** from `window` to the target.
2.  **Bubbling Phase (Default)**: The event bubbles **up** from the target to the `window`.

```javascript
const div = document.querySelector("div");
const btn = document.querySelector("button");

// Event bubbling! Clicking button ALSO triggers the div's listener.
div.addEventListener("click", () => console.log("Div clicked!"));
btn.addEventListener("click", () => console.log("Button clicked!"));

// To stop the bubble!
btn.addEventListener("click", (e) => {
  e.stopPropagation(); // Only "Button clicked!" will show!
});
```

## Most Common Event Types

| Category | Events | Description |
| :--- | :--- | :--- |
| **Mouse** | `click`, `dblclick`, `mouseenter`, `mouseleave` | Mouse actions |
| **Keyboard** | `keydown`, `keyup`, `keypress` | Keyboard typing |
| **Form** | `submit`, `change`, `input`, `focus`, `blur` | User input |
| **Window** | `load`, `resize`, `scroll`, `unload` | Page/Browser actions |

## Custom Events

You can even create and trigger your own events for complex application logic!

```javascript
// Build a custom event!
const myEvent = new CustomEvent("userLogin", {
  detail: { username: "Alpha" }
});

// Dispatch it!
document.dispatchEvent(myEvent);

// Listen for it anywhere!
document.addEventListener("userLogin", (e) => {
  console.log(`User logged in: ${e.detail.username}`);
});
```

## Summary

| Feature | Method / Syntax |
| :--- | :--- |
| **Listen** | `el.addEventListener(type, callback)` |
| **Stop Default** | `event.preventDefault()` |
| **Stop Bubble** | `event.stopPropagation()` |
| **Target** | `event.target` (Real element) |
| **Bubbling**| Event travels UP the tree (default) |
| **Capturing**| Event travels DOWN the tree |
| **Best For** | User interactivity, form validation, page lifecycle |
| **Remove Listener**| `el.removeEventListener(type, callback)` |
| **Once** | `{ once: true }` (Run only the first time!) |
| **Passive** | `{ passive: true }` (Performance boost for scrolling!) |
| **Custom Data** | `detail` object inside CustomEvent |
| **Lifecycle** | Use `DOMContentLoaded` to run JS safely |
| **Key Codes** | `event.key` for modern; `event.code` for physical key |
| **Pointer** | Use `pointerdown` for both Mouse and Touch! |
| **UI Updates** | Events are the trigger for most UI changes |
| **Debugging** | `monitorEvents(el)` in Chrome console! |
| **Capture** | Use the 3rd argument `true` in addEventListener |
| **Current Target**| `event.currentTarget` (Element the listener is on!) |
