---
title: "Flexbox"
description: "Mastering the Flexible Box layout for 1D designs"
---

## What is Flexbox?

**Flexbox** (Flexible Box Layout) is a 1-dimensional layout method for arranging items in rows or columns. It is the go-to tool for building navigation bars, centering items, and creating flexible grids.

```css
.container {
  display: flex;
}
```

## The Main Axis vs. Cross Axis

-   **Main Axis**: The primary direction items are laid out (defined by `flex-direction`).
-   **Cross Axis**: The perpendicular direction.

## Alignment Verbs

1.  **`justify-content`**: Aligns items along the **Main Axis** (start, end, center, space-between).
2.  **`align-items`**: Aligns items along the **Cross Axis** (start, end, center, stretch).

Wait! Want to perfectly center something both horizontally and vertically? It used to be impossible. With Flexbox, it's just 3 lines:

```css
.center-me {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Flex Growth and Shrinking

-   **`flex-grow`**: How much an item should grow relative to others if there is extra space.
-   **`flex-shrink`**: How much it should shrink if space is tight.
-   **`flex-basis`**: The starting size before growing or shrinking.

## Summary

| Property | Description |
| :--- | :--- |
| **display: flex** | Enable flexbox on a parent |
| **flex-direction**| Row or Column |
| **justify-cont.** | Horizonal alignment (usually) |
| **align-items** | Vertical alignment (usually) |
| **gap** | The space between flex items |
| **flex-wrap** | Allow items to wrap to a new line |
| **Best For** | Components, Navbars, and 1D layouts |
| **Logic** | "Fluid and flexible distribution of space" |
| **Safety** | Extremely well supported in all browsers |
| **Modern** | The industry standard for UI components |
| **Standard** | Use `gap` instead of `margin` for spacing flex items |
| **Identity** | The most popular layout tool in modern web development |
