---
title: "Handling Events in JavaScript"
slug: "javascript-handling-events"
order: 16
description: "Learn how to make your web pages respond to user actions by handling events. This guide covers adding event listeners for clicks, mouse movements, and more."
category: "JavaScript in the Browser (The DOM)"
---

## What is an Event?

An event is an action that occurs in the web browser, which the browser can tell you about so you can respond to it. Events are the core of browser interactivity. JavaScript "listens" for these events and executes code when they happen.

Here are some examples of common events:

  * A user clicks the mouse (`click`).
  * A user presses a key on the keyboard (`keydown`).
  * The mouse moves over an element (`mouseover`).
  * An HTML form is submitted (`submit`).
  * The web page has finished loading (`load`).

-----

## Event Listeners

To make your code react to an event, you attach an **event listener** to an HTML element. An event listener is a function that waits for a specific event to occur on a specific element and then executes a block of code.

The modern and most common way to do this is with the `addEventListener()` method.

### **Syntax**

```javascript
element.addEventListener('eventType', functionToRun);
```

  * **`element`**: The HTML element you want to listen to.
  * **`eventType`**: A string with the name of the event (e.g., `'click'`).
  * **`functionToRun`**: The function that will be called when the event occurs.

-----

## Example: Handling a Button Click

Let's create a simple example where we change a paragraph's text when a button is clicked.

**HTML:**

```html
<p id="message">Click the button!</p>
<button id="action-btn">Click Me</button>
```

**JavaScript:**

```javascript
// 1. Select the elements
const messageParagraph = document.getElementById("message");
const actionButton = document.getElementById("action-btn");

// 2. Define the function that will run when the event occurs
function changeMessage() {
  messageParagraph.textContent = "The button was clicked!";
}

// 3. Add the event listener to the button
//    It listens for a 'click' and runs the changeMessage function.
actionButton.addEventListener('click', changeMessage);
```

Now, whenever the user clicks the "Click Me" button, the text in the paragraph will change.

-----

## The `event` Object

When an event occurs, the browser automatically passes a special object, known as the **event object**, as an argument to your event listener function. This object contains useful information about the event that just happened.

```javascript
const button = document.getElementById("action-btn");

// The 'event' parameter is the event object
button.addEventListener('click', function(event) {
  // event.target refers to the element that was clicked
  console.log(event.target);

  // You can also find out coordinates of the click, which key was pressed, etc.
  console.log(event);
});
```

By selecting elements, manipulating them, and listening for events, you have all the core tools you need to build fully interactive and dynamic web applications with JavaScript.