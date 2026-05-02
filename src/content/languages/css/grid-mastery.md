---
title: "CSS Grid Mastery"
description: "Building complex 2D layouts with ease"
---

## Why CSS Grid?

While Flexbox is great for 1-dimensional layouts (rows OR columns), **CSS Grid** is designed for 2-dimensional layouts (rows AND columns). It is the most powerful layout system available in CSS.

## 1. Defining the Grid

You start by setting `display: grid` and then defining your rows and columns.

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr; /* 3 columns */
  grid-template-rows: auto 1fr;         /* 2 rows */
  gap: 20px;
}
```

## 2. Grid Template Areas

This is the most intuitive way to build a layout. You name areas of your grid and then "draw" the layout.

```css
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "nav    main   sidebar"
    "footer footer footer";
  grid-template-rows: 80px 1fr 60px;
  grid-template-columns: 150px 1fr 200px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
/* ... and so on */
```

## 3. The `fr` Unit and `repeat()`

- `fr`: A fractional unit that represents a fraction of the free space in the grid container.
- `repeat(n, size)`: Shorthand for repeating the same column size multiple times.

```css
grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
```

## 4. Responsive Grids with `auto-fit` and `minmax()`

This is the "Holy Grail" of responsive design. It creates as many columns as will fit, with a minimum size, **without using any Media Queries!**

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

## 5. Subgrid (Newer Feature)

`subgrid` allows a child of a grid item to inherit the grid lines of its parent, making it easy to align elements across different cards or sections.

```css
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
```

## Summary Checklist
- [x] Use Grid for 2D layouts (Layouts + Galleries).
- [x] Use `grid-template-areas` for clean, readable code.
- [x] Use `auto-fit` and `minmax()` for magic responsiveness.
- [x] Use `gap` for consistent spacing (no more negative margins!).
- [x] Supported in 98%+ of browsers.
- [x] Combine with Flexbox for the ultimate layout toolkit.
