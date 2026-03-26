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
---

## Overview

HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and semantics of web content. HTML5, the latest major version, added new semantic elements, multimedia support, canvas drawing, and APIs for offline storage, geolocation, and more. While not a programming language, it is the essential foundation of every web page.

## Key Features

- **Semantic elements** — `<article>`, `<nav>`, `<section>`, `<header>`, `<footer>` for meaningful structure
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
