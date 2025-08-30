---
title: "Introduction to JavaScript"
slug: "introduction-to-javascript"
order: 1
description: "Discover what JavaScript is, its crucial role in making websites interactive, and how to run your very first line of JavaScript code."
category: "JavaScript Fundamentals"
---

## What is JavaScript?

JavaScript (often shortened to JS) is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. While HTML provides the structure of a web page and CSS provides the styling, **JavaScript provides the interactivity**.

Originally created to "make web pages alive," JavaScript enables you to implement complex features on web pages, such as:

  * Interactive forms that provide immediate feedback to users.
  * Animated graphics, slideshows, and interactive maps.
  * Dynamically updating content without needing to reload the entire page.

Today, JavaScript is not just limited to the browser. Thanks to environments like Node.js, it can also be used to build server-side applications, making it a versatile language for full-stack development.

-----

## How to Run JavaScript

There are two primary ways to run JavaScript code:

### **1. The Browser Console**

The quickest way to run a piece of JavaScript is directly in your web browser's developer console.

1.  Open your web browser (like Chrome, Firefox, or Edge).
2.  Right-click anywhere on a webpage and select **"Inspect"** or **"Inspect Element"**.
3.  Click on the **"Console"** tab.
4.  Type the following code and press Enter:

```javascript
console.log("Hello, World!");
```

You will see the message "Hello, World\!" printed directly in the console. The `console.log()` function is the most common way to display output for debugging purposes in JavaScript.

### **2. In an HTML File**

To make JavaScript interact with a web page, you include it within your HTML file using the `<script>` tag.

You can place the JavaScript code directly inside the `<script>` tag:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My First JS Page</title>
</head>
<body>

  <h1>Welcome!</h1>

  <script>
    // JavaScript code goes here
    alert("This is an alert from JavaScript!");
  </script>

</body>
</html>
```

When you open this HTML file in a browser, you will see an alert box pop up with the message "This is an alert from JavaScript\!".

It's also a common practice to put your JavaScript code in a separate file (e.g., `script.js`) and link to it from your HTML:

**`index.html`:**

```html
<script src="script.js"></script>
```

This keeps your code organized and is the standard approach for larger projects.