---
id: "html"
name: "HTML"
slug: "html"
description: "The foundational markup language for structuring content on the web."
iconName: "html5"
year: 1993
creator: "Tim Berners-Lee"
paradigm: ["Declarative"]
useCases: ["Web Development", "Email Templates", "Documentation"]
website: "https://html.spec.whatwg.org/"
category: "Web"
featured: false
difficulty: "Beginner"
topics:
  - section: "Basics"
    items:
      - title: "HTML Document Structure"
        description: "DOCTYPE, html, head, body, and the DOM tree"
      - title: "Text Elements"
        description: "Headings, paragraphs, lists, links, and inline elements"
      - title: "Images & Media"
        description: "img, video, audio, picture, and responsive images"
      - title: "Tables"
        description: "Table structure, colspan, rowspan, and accessible tables"
  - section: "Semantic HTML"
    items:
      - title: "Semantic Elements"
        description: "header, nav, main, article, section, aside, footer"
      - title: "Forms"
        description: "Input types, labels, validation, and form submission"
      - title: "Accessibility"
        description: "ARIA roles, landmarks, alt text, and screen reader support"
  - section: "Modern HTML"
    items:
      - title: "Canvas & SVG"
        description: "Drawing graphics, animations, and scalable vector graphics"
      - title: "Web Components"
        description: "Custom elements, shadow DOM, and HTML templates"
      - title: "SEO & Meta"
        description: "Open Graph, structured data, and meta tags"
---

## Overview

HTML (HyperText Markup Language) is the standard markup language for documents displayed in web browsers. HTML5 added semantic elements, multimedia support, canvas drawing, and APIs for offline storage, geolocation, and more.

## Key Features

- **Semantic elements** — `<article>`, `<nav>`, `<section>` for meaningful structure
- **Multimedia** — `<video>`, `<audio>`, `<canvas>` without plugins
- **Forms** — Rich input types (date, email, range, color)
- **Accessibility** — ARIA attributes for screen readers
- **SEO** — Structured metadata with Open Graph, schema.org

## Code Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic HTML5</title>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <article>
      <h1>Understanding Semantic HTML</h1>
      <p>Semantic elements convey meaning to both browsers and developers.</p>
    </article>
  </main>
</body>
</html>
```

## Learning Resources

- [MDN HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [web.dev Learn HTML](https://web.dev/learn/html/)
- [HTML Living Standard](https://html.spec.whatwg.org/)
