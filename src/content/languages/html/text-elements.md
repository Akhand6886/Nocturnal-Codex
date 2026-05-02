---
title: "Text Elements"
description: "Headings, paragraphs, and list structures"
---

## Headings

**HTML** provides six levels of headings, from `<h1>` (the most important) to `<h6>` (the least important).

```html
<h1>Main Title</h1>
<h2>Sub-section</h2>
<h3>Topic</h3>
```

Wait! You should only have **one `<h1>` per page**. Search engines use headings to understand the hierarchy of your content. Don't use headings just to make text bigger (use CSS for that!).

## Paragraphs and Links

-   **`<p>`**: Defines a paragraph of text.
-   **`<a>`**: The "Anchor" tag used to create links. The **`href`** attribute tells the browser where to go.

```html
<p>Visit the <a href="https://google.com">Google website</a>.</p>
```

## Formatting Text

| Tag | Meaning | Description |
| :--- | :--- | :--- |
| **`<strong>`** | Bold | Important text (strong importance) |
| **`<em>`** | Italic | Emphasized text (stress emphasis) |
| **`<code>`** | Code | Displaying computer code |
| **`<blockquote>`**| Quote | Large block of quoted text |

## Lists

1.  **`<ul>` (Unordered List)**: Bullet points.
2.  **`<ol>` (Ordered List)**: Numbered points.
3.  **`<li>` (List Item)**: Individual items inside the list.

## Summary

| Term | Description |
| :--- | :--- |
| **h1 - h6** | Header hierarchy |
| **p** | Paragraph |
| **a** | Link (Anchor) |
| **ul / ol** | Unordered vs. Ordered lists |
| **li** | List item |
| **br** | Forced line break (Use sparingly!) |
| **hr** | Horizontal rule (Visual separator) |
| **Best For** | Organizing and displaying written content |
| **Logic** | "Textual hierarchy and navigation" |
| **Safety** | Use `target="_blank"` on links to open in a new tab |
| **Modern** | Combine with Google Fonts for beautiful typography |
| **Standard** | Use semantic tags instead of just `<div>` for text |
| **Identity** | Text is the primary reason the web exists |
