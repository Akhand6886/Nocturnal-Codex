---
title: "Custom Properties (Variables)"
description: "Mastering dynamic and scoped styling with CSS variables"
---

## What are Custom Properties?

**Custom Properties**, commonly known as **CSS Variables**, allow you to store specific values (colors, sizes, fonts) and reuse them throughout your stylesheet. Unlike SASS/LESS variables, CSS variables are **dynamic** and exist in the browser's DOM, meaning they can be changed via JavaScript.

## 1. Declaration and Usage

Variables are defined starting with `--` and accessed using the `var()` function. Usually, global variables are defined in the `:root` pseudo-class.

```css
:root {
  --primary-color: #4136d6;
  --secondary-color: #874efe;
  --spacing-unit: 8px;
  --base-font-size: 16px;
}

.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  font-size: var(--base-font-size);
}
```

## 2. Scoping and Inheritance

One of the most powerful features of CSS variables is **Scoping**. You can redefine a variable inside a specific selector, and it will only affect that element and its children.

```css
.card {
  --card-bg: white;
  background: var(--card-bg);
}

.card.dark {
  --card-bg: #1a1a1a;
}
```

## 3. Dynamic Changes with JavaScript

Since variables are part of the DOM, you can update them instantly with JS, which is perfect for **Dark Mode** toggles or interactive animations.

```javascript
// Toggle dark mode
document.documentElement.style.setProperty('--primary-color', '#ff5733');
```

## 4. Fallback Values

You can provide a second argument to `var()` as a fallback if the variable isn't defined.

```css
.text {
  color: var(--theme-color, black); /* Defaults to black */
}
```

## Comparison: CSS Variables vs. SASS Variables

| Feature | CSS Variables | SASS Variables (`$`) |
| :--- | :--- | :--- |
| **Runtime** | Dynamic (Browser) | Static (Compiled) |
| **DOM Access** | Yes (via JS) | No |
| **Scoping** | Cascading (Inherited) | Block-scoped |
| **Performance** | Native | Zero runtime cost |

## Summary Checklist
- [x] Use `--name` to define and `var(--name)` to use.
- [x] Define global variables in `:root`.
- [x] Use scoping for modular component themes.
- [x] Perfect for Dark Mode and dynamic theming.
- [x] Combine with `calc()` for powerful responsive layouts.
- [x] Supported in all modern browsers.
