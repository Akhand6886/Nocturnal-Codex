---
title: "The Box Model"
description: "Margin, Border, Padding, and Content: The geometry of CSS"
---

## Everything is a Box

In **CSS**, every single element on the page is treated as a rectangular box. Understanding how these boxes are measured is the most important skill in CSS layout.

The Box Model consists of four layers:
1.  **Content**: The text or image itself.
2.  **Padding**: Clear space **inside** the border (background color shows here).
3.  **Border**: A line around the padding and content.
4.  **Margin**: Clear space **outside** the border (separates the box from others).

## Box Sizing (The "Gotcha")

Wait! By default, if you set `width: 100px;` and `padding: 10px;`, the box actually becomes **120px** wide. This is very confusing and breaks layouts.

To fix this, we use **`box-sizing: border-box;`**. This tells the browser: "The width I set includes the padding and the border."

```css
* {
  box-sizing: border-box; /* The Industry Standard */
}
```

## Margin vs. Padding

| Feature | Padding | Margin |
| :--- | :--- | :--- |
| **Location** | Inside the box | Outside the box |
| **Background** | Shows the background | Always transparent |
| **Clickable** | Yes (if the element is a link) | No |
| **Collapsing** | No | Yes (Vertical margins can merge) |

## Summary

| Term | Description |
| :--- | :--- |
| **content** | The core data |
| **padding** | Internal breathing room |
| **border** | The container edge |
| **margin** | External separation |
| **box-sizing** | How width/height are calculated |
| **Best For** | Controlling spacing and sizing of elements |
| **Logic** | "Layered geometry" |
| **Safety** | Always use `border-box` to avoid layout math headaches |
| **Modern** | The foundation of every grid and flexbox layout |
| **Standard** | Use `margin: auto` to center a block element horizontally |
| **Identity** | The "Skeleton" of the web |
