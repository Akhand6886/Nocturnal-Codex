---
title: "Positioning"
description: "Static, Relative, Absolute, Fixed, and Sticky"
---

## Controlling the Flow

By default, HTML elements follow the "Normal Flow" (appearing one after the other). The **`position`** property allows you to take an element out of that flow and place it exactly where you want.

## 1. `relative`

The element stays in its normal spot, but you can move it slightly using `top`, `bottom`, `left`, or `right` without affecting the elements around it.

```css
.box {
  position: relative;
  top: 10px;
}
```

## 2. `absolute`

The element is removed from the normal flow. It is positioned relative to its **nearest positioned ancestor** (the closest parent that has a position other than `static`).

Wait! If you want to place a badge inside a card, you give the card `position: relative;` and the badge `position: absolute;`.

## 3. `fixed`

The element is positioned relative to the **viewport** (the screen). It stays in the exact same spot even when you scroll. This is perfect for navigation bars.

## 4. `sticky`

Wait! This is a modern favorite. The element behaves like `relative` until the user scrolls past it, at which point it "sticks" to the top of the screen like `fixed`.

```css
header {
  position: sticky;
  top: 0;
}
```

## Z-Index (Layers)

When elements overlap, the **`z-index`** property determines which one is on top. A higher number means the element is "closer" to the user.

## Summary

| Type | Relative to... | Description |
| :--- | :--- | :--- |
| **static** | Normal Flow | The default |
| **relative**| Itself | Moves without affecting others |
| **absolute**| Parent | Targeted placement |
| **fixed** | Screen | Stays while scrolling |
| **sticky** | Parent/Screen | "Relative" then "Fixed" |
| **Best For** | Overlays, Navbars, Sidebars, and specialized UI components |
| **Logic** | "Coordinate-based placement" |
| **Safety** | Absolute positioning can break responsive layouts if used too much |
| **Modern** | `sticky` is now supported in all major browsers |
| **Standard** | Always check `z-index` if an element is "disappearing" |
| **Identity** | The "Third Dimension" of web design (Depth) |
