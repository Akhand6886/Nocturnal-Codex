---
title: "Colors & Typography"
description: "Choosing palettes and mastering web fonts"
---

## 1. Working with Colors

In **CSS**, there are many ways to define a color.

| Method | Syntax | Description |
| :--- | :--- | :--- |
| **Named** | `color: red;` | Basic browser-defined colors |
| **Hex** | `color: #ff0000;`| 6-digit hex code (RRGGBB) |
| **RGB** | `rgb(255, 0, 0)` | Red, Green, Blue (0-255) |
| **HSL** | `hsl(0, 100%, 50%)`| Hue, Saturation, Lightness |

Wait! **HSL** is the preferred method for modern web design because it's much easier to understand. You can change the "Lightness" to create hover states without needing a whole new color.

## 2. Typography

The way you display text is critical for readability and "feel."

```css
body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}
```

## Google Fonts

Wait! You aren't limited to the basic "System Fonts" (Arial, Times New Roman). You can import thousands of high-quality fonts from **Google Fonts** using the `@import` rule or a `<link>` tag in your HTML.

## Line Height and Spacing

-   **`line-height`**: The space between lines of text. 1.5 is standard for body text.
-   **`letter-spacing`**: The space between characters.
-   **`text-align`**: Left, Center, Right, or Justify.

## Summary

| Term | Description |
| :--- | :--- |
| **font-family** | The name of the font typeface |
| **font-weight** | The thickness of the letters (100 to 900) |
| **line-height** | The vertical spacing of text |
| **opacity** | How transparent an element is (0 to 1) |
| **RGBA / HSLA** | Colors with an "Alpha" channel for transparency |
| **Best For** | Setting the mood and readability of your site |
| **Logic** | "Visual aesthetics and hierarchy" |
| **Safety** | Ensure high contrast between text and background for accessibility |
| **Modern** | Variable fonts allow for infinite weights and styles in one file |
| **Standard** | Use `rem` for font sizes to support user accessibility settings |
| **Identity** | Typography is 90% of web design |
