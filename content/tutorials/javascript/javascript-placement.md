---
title: "JavaScript - Placement"
slug: "javascript-placement"
order: 6
description: "Learn where to place your JavaScript code within an HTML document for optimal performance and behavior."
category: "JavaScript Basics"
---

## Where to Place JavaScript Code

You can place JavaScript code within an HTML document using the `<script>` tag. There are three main ways to include JavaScript, and the placement can affect your page's performance and behavior.

### 1. Internal JavaScript (in the `<head>`)

You can place your JavaScript code directly inside the `<head>` section of your HTML file.

```html
<!DOCTYPE html>
<html>
<head>
    <title>JS in Head</title>
    <script>
        function sayHello() {
            alert('Hello, World!');
        }
    </script>
</head>
<body>
    <button onclick="sayHello()">Click Me</button>
</body>
</html>
```
**Behavior**: The browser will parse and execute the JavaScript code before it starts rendering the body of the page. This can be problematic if your script is large, as it will block the page from displaying until the script is fully loaded and executed. This placement is generally discouraged for scripts that are not critical to the initial page paint.

### 2. Internal JavaScript (in the `<body>`)

Placing scripts at the end of the `<body>` section is a common practice.

```html
<!DOCTYPE html>
<html>
<head>
    <title>JS in Body</title>
</head>
<body>

    <h1>My Web Page</h1>
    <p id="demo"></p>

    <script>
        document.getElementById("demo").innerHTML = "Hello from JavaScript!";
    </script>

</body>
</html>
```
**Behavior**: The browser renders the HTML content first and then executes the JavaScript. This improves the perceived page load speed because users can see the page content before the scripts have finished running. It also ensures that all HTML elements are available in the DOM when the script tries to access them.

### 3. External JavaScript (Recommended)

The best practice is to place your JavaScript in a separate `.js` file and link to it. This keeps your HTML clean and allows the browser to cache the script file.

**`my_script.js`**:
```javascript
function changeText() {
    document.getElementById("header").innerHTML = "Welcome to External JS!";
}
```

**`index.html`**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>External JS</title>
</head>
<body>

    <h1 id="header">Hello!</h1>
    <button onclick="changeText()">Change Text</button>

    <!-- Linking the external script at the end of the body -->
    <script src="my_script.js"></script>

</body>
</html>
```
**Placement**: Like internal scripts, external scripts can be linked in the `<head>` or `<body>`. For best performance, it is almost always recommended to link them just before the closing `</body>` tag.

#### Using `async` and `defer`
When linking external scripts in the `<head>`, you can use the `async` and `defer` attributes to control how they are loaded and executed, preventing them from blocking page rendering.
-   `<script defer src="script.js">`: The script is downloaded in parallel with page parsing and executed after the parser has completed. Scripts with `defer` execute in the order they appear in the HTML.
-   `<script async src="script.js">`: The script is downloaded in parallel and executed as soon as it's available, which can be before the HTML parsing is complete. This can block rendering and the order of execution is not guaranteed.
