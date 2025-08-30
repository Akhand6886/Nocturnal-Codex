---
title: "Selecting DOM Elements"
slug: "selecting-dom-elements"
order: 14
description: "Learn the essential methods for selecting HTML elements from the DOM using JavaScript, including getElementById, querySelector, and querySelectorAll."
category: "JavaScript in the Browser (The DOM)"
---

## Why Select Elements?

Before you can change, style, or add content to a web page with JavaScript, you first need to select the specific HTML element(s) you want to work with. The DOM provides several methods to find and grab these elements from the page.

For the examples below, we will use the following simple HTML document:

```html
<!DOCTYPE html>
<html>
<body>
  <h1 id="main-heading">Welcome!</h1>
  <p class="content">This is a paragraph.</p>
  <ul>
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
  </ul>
</body>
</html>
```

-----

## 1. `getElementById()`

This is the fastest and most reliable way to select a **single, unique element**. It uses the element's `id` attribute.

```javascript
// Select the h1 element with the id 'main-heading'
const heading = document.getElementById("main-heading");

console.log(heading);
```

**Result:** It returns the `<h1>` element object.

-----

## 2. `querySelector()`

This is a more modern and versatile method that selects the **first element** that matches a specified CSS selector. You can use any CSS selector you're familiar with (tag, class, id, attribute, etc.).

```javascript
// Select the first element with the class 'content'
const paragraph = document.querySelector(".content");

// Select the element with the id 'main-heading' (using a CSS id selector)
const heading = document.querySelector("#main-heading");

// Select the first list item with the class 'item'
const firstItem = document.querySelector(".item");

console.log(paragraph);
console.log(firstItem);
```

**Result:** It returns the first matching element object it finds.

-----

## 3. `querySelectorAll()`

This method is similar to `querySelector`, but it selects **all elements** that match a specified CSS selector and returns them as a **NodeList** (which is like an array).

```javascript
// Select all elements with the class 'item'
const listItems = document.querySelectorAll(".item");

console.log(listItems); // Returns a NodeList containing both <li> elements
console.log(listItems[0]); // You can access elements by their index
console.log(listItems[1]);
```

You can then loop through this NodeList to perform an action on each element.

```javascript
listItems.forEach(item => {
  console.log(item.textContent);
});
```

**Output:**

```text
Item 1
Item 2
```

These three methods (`getElementById`, `querySelector`, and `querySelectorAll`) are the most common and powerful tools you'll use to begin manipulating your web pages with JavaScript.