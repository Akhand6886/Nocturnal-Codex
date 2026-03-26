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
topics:
  - section: "Basics"
    items:
      - title: "Selectors"
        description: "Element, class, ID, attribute, pseudo-class, and combinators"
      - title: "Box Model"
        description: "Content, padding, border, margin, and box-sizing"
      - title: "Colors & Typography"
        description: "Color formats, fonts, line-height, letter-spacing"
      - title: "Units"
        description: "px, em, rem, %, vh/vw, and when to use each"
  - section: "Layout"
    items:
      - title: "Flexbox"
        description: "Flex container, items, alignment, wrapping, and ordering"
      - title: "Grid"
        description: "Grid template, areas, auto-fill, minmax, and subgrid"
      - title: "Positioning"
        description: "static, relative, absolute, fixed, sticky"
      - title: "Responsive Design"
        description: "Media queries, container queries, and mobile-first approach"
  - section: "Modern CSS"
    items:
      - title: "Custom Properties"
        description: "CSS variables, theming, and dynamic values"
      - title: "Animations"
        description: "@keyframes, transitions, and performance optimization"
      - title: "Nesting"
        description: "Native CSS nesting without preprocessors"
      - title: "Container Queries"
        description: "Component-level responsive design"
---

## Overview

CSS (Cascading Style Sheets) describes the presentation of HTML documents. Modern CSS supports grid and flexbox layouts, custom properties, container queries, nesting, and complex animations.

## Key Features

- **Flexbox & Grid** — Powerful layout systems
- **Custom Properties** — CSS variables for dynamic theming
- **Container Queries** — Component-level responsive design
- **Animations & Transitions** — Hardware-accelerated motion
- **Nesting** — Native CSS nesting

## Code Example

```css
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
