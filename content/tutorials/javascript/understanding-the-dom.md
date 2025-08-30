---
title: "Understanding the DOM"
slug: "understanding-the-dom"
order: 13
description: "Learn what the Document Object Model (DOM) is and how it represents an HTML document as a tree of objects that JavaScript can manipulate."
category: "JavaScript in the Browser (The DOM)"
---

## What is the DOM?

When a web browser loads an HTML document, it creates a model of that page in memory. This model is called the **Document Object Model**, or **DOM**. The DOM represents the entire HTML document as a tree-like structure of objects.

Think of it as a family tree for your HTML elements. The `<html>` element is the root, the `<head>` and `<body>` are its children, and all other elements are nested within them.

-----

JavaScript can interact with this tree of objects. It can:

  * Read the content of elements.
  * Change the content and styling of elements.
  * Add new elements to the page.
  * Remove existing elements.
  * React to user events (like clicks or key presses).

Essentially, the DOM is the bridge that connects JavaScript to the content of a web page, allowing you to create dynamic and interactive websites.

-----

## The `document` Object

In JavaScript, the DOM is accessible through a global object called `document`. This `document` object represents the entire web page and is the main entry point to all of its content.

You can explore this object by typing `document` into your browser's developer console. You'll see a representation of the entire HTML structure of the current page.

-----

## Example: Accessing an Element's Content

Let's say you have the following HTML:

```html
<!DOCTYPE html>
<html>
<body>

  <h1 id="main-heading">Welcome to the DOM!</h1>

</body>
</html>
```

Using JavaScript, you can access the `document` object to find the `<h1>` element and read its text content.

```javascript
// This is a preview of what we'll learn next.
// It finds the element with the id 'main-heading'.
const headingElement = document.getElementById("main-heading");

// It then reads the text inside that element.
const headingText = headingElement.textContent;

console.log(headingText); // Output: "Welcome to the DOM!"
```

This ability to programmatically read and change the structure, style, and content of a document is the most powerful aspect of client-side JavaScript. In the next tutorials, you will learn exactly how to select and manipulate these elements.