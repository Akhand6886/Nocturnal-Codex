---
title: "Container Queries"
description: "Designing components that respond to their container size, not the viewport"
---

## The Problem: Viewport Dependency

For over a decade, Responsive Web Design has relied on **Media Queries** (`@media`). However, media queries only check the **Viewport** (the browser window size). This becomes a problem when a component (like a Card) needs to look different depending on whether it's in a narrow sidebar or a wide main content area.

## The Solution: Container Queries

**Container Queries** (`@container`) allow an element to query its parent's size. This enables "Intrinsically Responsive" components that are truly modular and reusable anywhere in your layout.

## 1. Setting up the Container

To use container queries, you must first define a "containment context" on a parent element using the `container-type` property.

```css
.card-wrapper {
  container-type: inline-size; /* Queries based on width */
  container-name: sidebar-card; /* Optional: specific name */
}
```

## 2. Writing the Query

Once the container is defined, child elements can query it.

```css
/* If the container is wider than 400px, change the layout */
@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
}
```

## 3. Container Query Units

You can also use special units that are relative to the container size:
- `cqw`: 1% of the container's width.
- `cqh`: 1% of the container's height.
- `cqi`: 1% of the container's inline size.
- `cqb`: 1% of the container's block size.

```css
.card-title {
  font-size: clamp(1rem, 5cqw, 2rem);
}
```

## 4. Why use Container Queries?

1.  **True Modularity**: Drop a component anywhere, and it adjusts itself.
2.  **Cleaner Code**: No more complex media query overrides for different sections of the page.
3.  **Better UX**: Components always have the optimal layout for the space they occupy.

## Summary Checklist
- [x] Use `container-type: inline-size` on the parent.
- [x] Use `@container` to style children based on that parent.
- [x] Use `cqw` and `cqi` units for responsive typography.
- [x] Supported in all modern browsers (Chrome 105+, Safari 16+, Firefox 110+).
- [x] Combine with CSS Grid and Flexbox for maximum layout power.
---
