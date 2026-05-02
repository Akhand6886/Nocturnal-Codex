---
title: "Forms"
description: "Input fields, buttons, and collecting user data"
---

## What is a Form?

**Forms** are used to collect user input. The collected data is most often sent to a server for processing (like a Login or a Contact form).

```html
<form action="/submit-data" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="user_name">
  <button type="submit">Send</button>
</form>
```

## Input Types

The **`<input>`** tag is extremely versatile. The **`type`** attribute changes how it looks and behaves.

| Type | Description |
| :--- | :--- |
| **`text`** | Standard single-line text |
| **`password`**| Hides characters as you type |
| **`email`** | Validates that the input is a real email |
| **`number`** | Only allows numeric digits |
| **`checkbox`**| Multiple choice selections |
| **`radio`** | Single choice from a group |
| **`date`** | A native date picker |

## Textareas and Selects

1.  **`<textarea>`**: For multi-line text (like a comment box).
2.  **`<select>`**: For a dropdown list of options.

## Labels

Wait! Always connect your `<label>` to your `<input>` using the **`for`** and **`id`** attributes. This is critical for accessibility and makes it easier for users to click on small checkboxes or radio buttons.

## Summary

| Term | Description |
| :--- | :--- |
| **form** | The wrapper for all inputs |
| **action** | The URL where the data is sent |
| **method** | GET (visible in URL) or POST (hidden/secure) |
| **required** | Prevents the form from being sent if empty |
| **placeholder**| Grey text that disappears when the user types |
| **Best For** | User interaction and data collection |
| **Logic** | "User-to-Server communication" |
| **Safety** | Use `POST` for sensitive data like passwords |
| **Modern** | Client-side validation is built directly into HTML5 |
| **Standard** | Every input should have a corresponding label |
| **Identity** | Forms are the "Engine" of the interactive web |
