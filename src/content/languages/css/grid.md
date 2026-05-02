---
title: "CSS Grid"
description: "Mastering the 2D layout system for complete pages"
---

## What is CSS Grid?

While Flexbox is 1-dimensional (row OR column), **CSS Grid** is 2-dimensional (row AND column). It allows you to build complex page layouts that were previously impossible without "Hacks" or complex math.

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr; /* Sidebar and flexible content */
  grid-template-rows: auto 1fr auto; /* Header, Body, Footer */
}
```

## The `fr` Unit

Wait! Grid introduced a new unit: the **Fractional Unit (`fr`)**. It represents a fraction of the *free space* in the grid container.

```css
grid-template-columns: 1fr 2fr 1fr; /* The middle column is twice as wide */
```

## Naming Areas

One of the coolest features of Grid is being able to "Draw" your layout using names.

```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
}

.main-content {
  grid-area: content;
}
```

## `gap`

Just like Flexbox, Grid has a `gap` property that defines the space between the tracks (gutters).

## Flexbox vs. Grid

-   **Use Flexbox** for small components and items in a single line (like a Navbar or a Button group).
-   **Use Grid** for the overall page layout and complex 2D designs.

## Summary

| Term | Description |
| :--- | :--- |
| **display: grid** | Enable grid on a parent |
| **grid-temp.-col.**| Defining the column structure |
| **grid-temp.-row.**| Defining the row structure |
| **fr** | Fractional unit (Flexible space) |
| **repeat()** | Function to avoid writing `1fr` ten times |
| **Best For** | Overall page structure and complex galleries |
| **Logic** | "True 2D layout control" |
| **Safety** | Much more robust than old "Float" based layouts |
| **Modern** | The most powerful layout tool ever added to CSS |
| **Standard** | Use `grid-template-areas` for the most readable layouts |
| **Identity** | The "Final Boss" of CSS layout |
| **minmax()** | Set a range for a track (e.g., `minmax(100px, 1fr)`) |
