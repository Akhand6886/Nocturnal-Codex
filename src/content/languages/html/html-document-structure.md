---
title: "HTML Document Structure"
description: "Understanding the skeleton of every web page"
---

## What is HTML?

**HTML** (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It provides the **Structure** of the page, while CSS provides the Style and JavaScript provides the Logic.

## The Basic Boilerplate

Every HTML file must follow a specific structure for the browser to understand it correctly.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
</head>
<body>
    <h1>Hello, Nocturnal Codex!</h1>
</body>
</html>
```

## Key Components

1.  **`<!DOCTYPE html>`**: Tells the browser "This is a modern HTML5 document."
2.  **`<html>`**: The root element that wraps everything.
3.  **`<head>`**: Contains metadata (info about the page) that isn't shown to the user.
4.  **`<body>`**: Contains everything the user actually sees on the screen.

## Tags and Elements

Wait! Most HTML elements consist of an **Opening Tag**, some **Content**, and a **Closing Tag**.

```html
<p>This is a paragraph.</p>
```

Some tags are **Self-Closing** (they don't have a separate closing tag), like `<img />`, `<br />`, or `<hr />`.

## Summary

| Term | Description |
| :--- | :--- |
| **Document** | The entire HTML file |
| **Tag** | The `< >` keywords |
| **Element** | The tag + the content |
| **Attribute** | Extra info inside a tag (e.g., `class="btn"`) |
| **Nesting** | Putting elements inside other elements |
| **Best For** | Building the foundation of any website |
| **Logic** | "Hierarchy and structure" |
| **Safety** | Always close your tags to avoid layout bugs! |
| **Modern** | HTML5 is the current living standard |
| **Standard** | Use lowercase for all tag names |
| **Identity** | The "Native Language" of the web |
