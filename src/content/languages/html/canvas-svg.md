---
title: "Canvas & SVG"
description: "Creating high-performance graphics and icons in HTML"
---

## 1. SVG (Scalable Vector Graphics)

**SVG** is an XML-based format for vector graphics. Because it is made of math (points and lines), it can be scaled up to any size without losing quality.

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" fill="red" />
</svg>
```

Wait! SVGs are actually part of the **DOM**. This means you can target them with CSS and JavaScript to change their color or animate them!

## 2. Canvas

**Canvas** is a resolution-dependent bitmap area that can be used for rendering graphs, game graphics, or other visual images on the fly. You control it entirely with **JavaScript**.

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

## SVG vs. Canvas

| Feature | SVG | Canvas |
| :--- | :--- | :--- |
| **Type** | Vector (Math) | Bitmap (Pixels) |
| **DOM** | Yes (Each shape is a tag) | No (Just a single tag) |
| **Scaling** | Infinite | Becomes "pixelated" if scaled |
| **Speed** | Good for few complex shapes | Fast for many moving objects |
| **Interaction** | Easy (via CSS/JS) | Hard (must handle manually) |

## Why use them?

-   **SVG**: Best for icons, logos, and simple diagrams.
-   **Canvas**: Best for web games, heavy data visualizations, and complex animations.

## Summary

| Term | Description |
| :--- | :--- |
| **Vector** | Math-based (Infinite quality) |
| **Bitmap** | Pixel-based (Fixed quality) |
| **XML** | The format used by SVG |
| **2D Context** | The JavaScript object used to draw on Canvas |
| **Best For** | Graphics, Games, and Visual identity |
| **Logic** | "Procedural and vector graphics" |
| **Safety** | SVGs are safe and searchable; Canvas is a "Black box" |
| **Modern** | Powering modern web-based design tools like Figma |
| **Standard** | Both are core parts of the HTML5 graphics stack |
| **Identity** | The difference between a "Static" site and a "Visual" one |
