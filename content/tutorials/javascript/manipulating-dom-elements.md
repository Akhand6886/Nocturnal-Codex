---
title: "Manipulating DOM Elements"
slug: "manipulating-dom-elements"
order: 15
description: "Learn how to dynamically change the content, attributes, and CSS styles of HTML elements using JavaScript to create interactive web pages."
category: "JavaScript in the Browser (The DOM)"
---

## Making Pages Dynamic

Once you've selected an element from the DOM, you can manipulate it in various ways. This is the core of how JavaScript makes web pages interactive. You can change text, modify HTML, and alter CSS styles on the fly in response to user actions or other events.

For the examples below, we'll start with this HTML:

```html
<div id="container">
  <h1 id="title">Hello!</h1>
  <p class="info">This is some info.</p>
</div>
```

-----

## 1. Changing Text and HTML Content

There are two main properties for changing the content inside an element:

  * **`textContent`**: Gets or sets the text content of an element. It ignores any HTML tags and returns only the raw text. This is the safest and most efficient way to deal with text.

  * **`innerHTML`**: Gets or sets the HTML content within an element. This property should be used with caution, as setting it can expose you to security risks (like Cross-Site Scripting - XSS) if the content is sourced from a user.

<!-- end list -->

```javascript
// Select the h1 element
const title = document.getElementById("title");

// Change its text content
title.textContent = "Welcome to the DOM!";

// Select the paragraph
const info = document.querySelector(".info");

// Change its HTML content to include bold text
info.innerHTML = "This is some <strong>important</strong> info.";
```

-----

## 2. Changing Attributes

You can also change the attributes of an HTML element, such as the `src` of an image or the `href` of a link.

```javascript
// Let's add an image to our HTML
// <img id="my-image" src="image1.jpg" alt="An image">

const image = document.getElementById("my-image");

// Change the src attribute to a different image
image.src = "image2.jpg";
```

-----

## 3. Changing CSS Styles

You can directly manipulate the CSS styles of an element using its `style` property. The CSS property names are converted to camelCase (e.g., `background-color` becomes `backgroundColor`).

```javascript
// Select the main container
const container = document.getElementById("container");

// Change its background color and padding
container.style.backgroundColor = "lightblue";
container.style.padding = "20px";
container.style.border = "1px solid blue";

// Select the title
const title = document.getElementById("title");

// Change its color and font size
title.style.color = "purple";
title.style.fontSize = "32px";
```

By combining these manipulation techniques, you can create rich, interactive user experiences, like showing or hiding elements, updating data on the page, and providing visual feedback to the user.