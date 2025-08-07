---
title: "JavaScript Events"
slug: "javascript-events"
order: 10
description: "Understand how to handle user actions and other events on a web page with JavaScript."
category: "JS DOM & Events"
---

## JavaScript Events

Events are actions or occurrences that happen in the system you are programming — the system will fire a signal of some kind when an event takes place, and you can write code that listens for and reacts to those events.

### Common HTML Events

-   **`onclick`**: The user clicks an HTML element.
-   **`onmouseover`**: The user moves the mouse over an HTML element.
-   **`onkeydown`**: The user presses a keyboard key.
-   **`onload`**: The browser has finished loading the page.
-   **`onsubmit`**: A form is submitted.

### Event Handlers

You can add event handlers directly in your HTML, but the modern and recommended approach is to use JavaScript to add "event listeners".

#### 1. Inline Event Handlers (Older, not recommended)

```html
<button onclick="alert('You clicked me!')">Click Me</button>
```

#### 2. Using `addEventListener()` (Modern, recommended)

This is the preferred way to handle events. It allows you to add multiple event listeners for the same event to a single element.

First, you need to select the element in your JavaScript:

```javascript
const myButton = document.getElementById("my-button");
```

Then, you add the event listener:

```javascript
myButton.addEventListener("click", function() {
  console.log("Button was clicked!");
  // You can run any code here
});

myButton.addEventListener("mouseover", function() {
  myButton.style.backgroundColor = "lightgray";
});

myButton.addEventListener("mouseout", function() {
    myButton.style.backgroundColor = ""; // Revert to original style
});
```

This separates your HTML structure from your JavaScript logic, making your code cleaner and easier to maintain. Event handling is the key to creating interactive and dynamic web pages.