---
title: "Nesting"
description: "Native CSS nesting: writing cleaner and more organized code"
---

## What is Nesting?

For years, developers had to use tools like SASS to "Nest" their CSS rules. Now, **Native Nesting** is supported by all modern browsers. It allows you to group related styles inside each other, matching the structure of your HTML.

```css
/* Old way */
.card { background: white; }
.card .title { font-weight: bold; }
.card:hover { border: 1px solid blue; }

/* New Nesting way */
.card {
  background: white;

  .title {
    font-weight: bold;
  }

  &:hover {
    border: 1px solid blue;
  }
}
```

Wait! The **`&`** symbol refers back to the parent selector. It is essential for nesting pseudo-classes (like `:hover`) or pseudo-elements (like `::before`).

## Why use Nesting?

1.  **Organization**: All styles for a component are in one place.
2.  **Concise**: Stop typing the same parent class name over and over.
3.  **Readability**: The CSS visually matches the structure of your DOM.

## The Rules of Nesting

Wait! While nesting is powerful, don't overdo it. If you nest more than 3 levels deep, your CSS becomes very difficult to read and maintain.

> [!TIP]
> Use nesting for related sub-elements and states. If you find yourself nesting 5 levels deep, you probably need a new top-level class.

## Summary

| Term | Description |
| :--- | :--- |
| **&** | The parent selector reference |
| **Nesting** | Putting rules inside other rules |
| **SASS** | The preprocessor that popularized nesting |
| **Conciseness** | Writing less code to achieve the same result |
| **Best For** | Component-based styling and large projects |
| **Logic** | "Scoped and structured styling" |
| **Safety** | High browser support (all modern versions) |
| **Modern** | Native nesting is one of the most requested features in CSS history |
| **Standard** | Part of the official CSS nesting specification |
| **Identity** | Makes vanilla CSS feel as powerful as modern preprocessors |
