---
title: "Container Queries"
description: "The modern alternative to Media Queries"
---

## The Problem with Media Queries

**Media Queries** look at the width of the whole screen. But what if you have a "Card" component that is in a narrow sidebar on some pages and a wide main column on others? A Media Query won't know the difference.

## What are Container Queries?

**Container Queries** allow you to style an element based on the size of its **parent container**, not the whole screen. This is the "Holy Grail" of component-based design.

## 1. Defining the Container

First, you must tell CSS which element is the "Container" you want to watch.

```css
.card-container {
  container-type: inline-size;
}
```

## 2. Querying the Container

Now, you can use **`@container`** (instead of `@media`) to change the card's layout based on its own width!

```css
@container (min-width: 400px) {
  .card {
    display: flex; /* Turn into a horizontal layout if there is space */
  }
}
```

## Why use them?

Wait! Container queries allow you to build "Self-Responsive" components. You can design a card once, and it will automatically adjust its layout wherever you drop it on the page.

1.  **Truly Modular**: Components become independent of their surroundings.
2.  **Reusable**: Drop a component into a sidebar, a grid, or a full-width section—it just works.
3.  **Modern Layouts**: Perfect for complex dashboard designs.

## Summary

| Term | Description |
| :--- | :--- |
| **@container** | The rule to query a parent container |
| **container-type**| Defines which element is the container |
| **inline-size** | Watching the width of the container |
| **cqw / cqh** | Container Query Width/Height units |
| **Best For** | Component libraries and complex, reusable UI |
| **Logic** | "Component-aware responsiveness" |
| **Safety** | Check browser support (all modern evergreen browsers) |
| **Modern** | The single biggest improvement to CSS in the last decade |
| **Standard** | Part of the new "CSS Container Queries" specification |
| **Identity** | Makes the "Mobile-First" vs "Desktop-First" debate less important |
