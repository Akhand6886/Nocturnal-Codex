---
id: "css"
name: "CSS"
slug: "css"
description: "The styling language of the web, controlling layout, colors, typography, and animations."
iconName: "css3"
year: 1996
creator: "Håkon Wium Lie, Bert Bos"
paradigm: ["Declarative"]
useCases: ["Web Development", "Responsive Design", "Animations", "UI Frameworks"]
website: "https://www.w3.org/Style/CSS/"
category: "Web"
featured: false
difficulty: "Beginner"
---

## Overview

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of HTML documents. Modern CSS has evolved far beyond simple color and font changes — it now supports grid and flexbox layouts, custom properties (variables), container queries, nesting, and complex animations. CSS is no longer "just styling"; it's a powerful layout and design engine.

## Key Features

- **Flexbox & Grid** — Powerful two-dimensional layout systems
- **Custom Properties** — CSS variables for dynamic theming
- **Container Queries** — Component-level responsive design
- **Animations & Transitions** — Smooth, hardware-accelerated motion
- **Nesting** — Native CSS nesting (no preprocessor needed)

## Code Example

```css
/* Modern CSS with custom properties and grid */
:root {
  --primary: hsl(180, 100%, 30%);
  --bg: hsl(220, 20%, 4%);
  --radius: 0.75rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  .card {
    background: var(--bg);
    border-radius: var(--radius);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }
}
```

## Learning Resources

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- [web.dev Learn CSS](https://web.dev/learn/css/)
