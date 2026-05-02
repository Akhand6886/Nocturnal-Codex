---
title: "CSS Units"
description: "Understanding px, rem, vh, and the math of sizing"
---

## Absolute vs. Relative

In **CSS**, you can size elements using **Absolute** units (which are the same size everywhere) or **Relative** units (which scale based on something else).

## 1. Absolute Units

| Unit | Description |
| :--- | :--- |
| **px** | **Pixels**: The standard fixed unit. Good for borders or fixed icons. |

## 2. Relative Units (The Pro Way)

Wait! Relative units are the secret to building "Responsive" websites that look good on both phones and 4K monitors.

| Unit | Based on... | Description |
| :--- | :--- | :--- |
| **rem** | **Root Font Size** | 1rem = the font size of the `<html>` element (usually 16px). |
| **em** | **Parent Font Size** | 1em = the font size of the immediate parent. |
| **%** | **Parent Size** | Scales based on the width/height of the parent container. |
| **vw / vh**| **Viewport** | 1vw = 1% of the screen width. 1vh = 1% of the screen height. |

## Why use `rem`?

Wait! You should use **`rem`** for almost all your font sizes and spacing. If a user increases their browser's default font size (for better readability), your entire site will scale up beautifully. If you use `px`, everything stays tiny and hard to read.

## The `calc()` Function

You can even do math directly in your CSS!

```css
width: calc(100% - 40px);
```

## Summary

| Term | Description |
| :--- | :--- |
| **px** | Fixed pixel size |
| **rem** | Relative to root (The standard for text) |
| **vw / vh** | Relative to the screen size (Viewport) |
| **vmin / vmax**| Relative to the smaller or larger screen dimension |
| **ch** | Based on the width of the "0" character in the current font |
| **Best For** | Building flexible and accessible layouts |
| **Logic** | "Scale based on context" |
| **Safety** | Use `max-width` to prevent content from becoming too wide |
| **Modern** | `dvh` (Dynamic Viewport Height) solves mobile browser bar issues |
| **Standard** | Use `rem` for accessibility; `px` for thin borders |
| **Identity** | Units are the foundation of "Fluid Design" |
