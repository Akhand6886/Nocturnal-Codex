---
title: "Introduction to CSS"
slug: "introduction-to-css"
order: 1
description: "An overview of Cascading Style Sheets (CSS) and its role in styling web pages."
category: "Web Development"
---

## What is CSS?

Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript. It allows web developers to control the look and feel of a website, including colors, fonts, layout, and responsive design.

### The "Cascading" in CSS

The "cascading" part refers to the specified priority scheme to determine which style rule applies if more than one rule conflicts for a particular element. This system is a fundamental aspect of CSS. The cascade order is generally:
1.  **Inline styles**: Styles applied directly to an HTML element (e.g., `<p style="color: red;">`).
2.  **ID selectors**: Rules that target an element with a specific ID (e.g., `#my-id`).
3.  **Class selectors, attribute selectors, and pseudo-classes**: Rules that target elements by class, attribute, or state (e.g., `.my-class`, `[type="text"]`, `:hover`).
4.  **Type selectors and pseudo-elements**: Rules that target element types (e.g., `p`, `div`, `::before`).

### Why use CSS?

- **Separation of Concerns**: It separates the document content (HTML) from its presentation, making the code cleaner and easier to maintain.
- **Consistency**: You can define a style once and apply it to multiple pages.
- **Accessibility**: Correctly used, CSS can improve the accessibility of a website.
- **Responsive Design**: With features like media queries, CSS allows you to create layouts that adapt to different screen sizes and devices.

Without CSS, all web pages would be plain text on a white background. It is an essential skill for any front-end web developer.