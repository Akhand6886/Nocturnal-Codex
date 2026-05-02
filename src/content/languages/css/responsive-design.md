---
title: "Responsive Design"
description: "Media Queries and the Mobile-First philosophy"
---

## One Web, Many Devices

**Responsive Design** is the practice of building websites that look great on any screen size—from a tiny smartwatch to a massive 8K television.

## Media Queries

A **Media Query** is a block of CSS that only runs if a certain condition is met (usually the width of the screen).

```css
/* Normal Styles (Mobile) */
.sidebar {
  display: none;
}

/* Tablet and Desktop Styles */
@media (min-width: 768px) {
  .sidebar {
    display: block;
  }
}
```

## Mobile-First Philosophy

Wait! Most developers now use a **Mobile-First** approach.
1.  Write your default styles for small screens (Mobile).
2.  Use Media Queries with **`min-width`** to add features as the screen gets larger.

This is better for performance because mobile phones don't have to download or process "Desktop" styles that they won't use.

## The Viewport Meta Tag

Wait! For responsive design to work, you MUST include this tag in your HTML `<head>`. It tells the mobile browser to use the device's actual width instead of "pretending" to be a desktop screen.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Fluid Everything

-   **Fluid Layouts**: Use `%` or `fr` instead of `px`.
-   **Flexible Images**: Use `max-width: 100%` so images never overflow their container.
-   **Adaptive Text**: Use `clamp()` for font sizes that scale smoothly.

## Summary

| Term | Description |
| :--- | :--- |
| **@media** | The rule to start a media query |
| **Breakpoint** | The screen width where the layout changes (e.g., 768px) |
| **min-width** | Mobile-first queries |
| **max-width** | Desktop-first queries |
| **clamp()** | Function for fluid sizing without breakpoints |
| **Best For** | Ensuring a perfect user experience on every device |
| **Logic** | "Adaptability and flexibility" |
| **Safety** | Always test your site by resizing your browser window |
| **Modern** | Container queries are the next step (see the modern section) |
| **Standard** | 320px (Phone), 768px (Tablet), 1024px (Desktop) |
| **Identity** | The "Responsive" tag is mandatory for any modern website |
