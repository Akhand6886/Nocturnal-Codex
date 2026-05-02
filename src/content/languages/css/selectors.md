---
title: "CSS Selectors"
description: "Targeting elements with precision and style"
---

## What are Selectors?

**CSS Selectors** are used to "find" (or select) the HTML elements you want to style. Without selectors, CSS would have no way of knowing which part of the page you want to change.

```css
/* The Selector targets all <p> elements */
p {
  color: blue;
}
```

## Basic Selectors

| Type | Syntax | Description |
| :--- | :--- | :--- |
| **Element** | `h1` | Targets all `<h1>` tags |
| **Class** | `.btn` | Targets all elements with `class="btn"` |
| **ID** | `#header`| Targets the single element with `id="header"` |
| **Universal**| `*` | Targets every single element on the page |

## Combinators

Combinators allow you to select elements based on their relationship to other elements.

-   **`div p` (Descendant)**: All `<p>` inside a `<div>`.
-   **`div > p` (Child)**: All `<p>` that are direct children of a `<div>`.
-   **`div + p` (Adjacent Sibling)**: The `<p>` placed immediately after a `<div>`.

## Pseudo-classes

Wait! Pseudo-classes allow you to style an element based on its **state** (like when a user hovers over it).

```css
button:hover {
  background-color: darkblue;
}

li:nth-child(even) {
  background-color: #f2f2f2;
}
```

## Specificity

Wait! If two selectors target the same element, the browser uses a scoring system called **Specificity** to decide which one "wins."
1.  **ID** (Score: 100)
2.  **Class** (Score: 10)
3.  **Element** (Score: 1)

> [!TIP]
> Always try to use classes (`.btn`) for styling. Avoid using IDs (`#btn`) because their high specificity makes them very hard to override later.

## Summary

| Term | Description |
| :--- | :--- |
| **Selector** | The pattern used to target elements |
| **Declaration**| The property and value (e.g., `color: red;`) |
| **Specificity**| The weight assigned to a selector |
| **Pseudo-class**| Style based on state (hover, active, focus) |
| **Pseudo-element**| Style a specific part of an element (`::before`, `::after`) |
| **Best For** | Controlling exactly which elements get styled |
| **Logic** | "Targeting and styling" |
| **Safety** | Keep specificity low to avoid "CSS Wars" |
| **Modern** | The `:has()` selector is the new "Parent Selector" |
| **Standard** | Use `kebab-case` for class names |
| **Identity** | The "C" in CSS (Cascading) is driven by selectors |
