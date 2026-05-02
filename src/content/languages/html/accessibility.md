---
title: "Accessibility (A11y)"
description: "Building a web that everyone can use"
---

## What is A11y?

**Accessibility** (often shortened to **A11y** because there are 11 letters between A and Y) is the practice of ensuring that your website can be used by everyone—including people with visual, auditory, motor, or cognitive disabilities.

## 1. Alt Text for Images

Always provide descriptive text for images so screen readers can explain the image to a blind user.

```html
<img src="graph.png" alt="Sales growth chart showing a 20% increase in Q3.">
```

## 2. Keyboard Navigation

Wait! Many users cannot use a mouse. They navigate your site using the **`Tab`** key. Ensure your buttons, links, and forms are "Focusable" and have a clear visual indicator.

## 3. Form Labels

Every input MUST have a label. This tells the screen reader what information the user needs to enter.

## 4. ARIA Attributes

Wait! If you are building complex custom components (like a modal or a custom dropdown) that HTML doesn't support natively, you use **ARIA** (Accessible Rich Internet Applications) attributes to explain the behavior to assistive technology.

```html
<button aria-expanded="false" aria-controls="menu">Open Menu</button>
```

## Why care?

1.  **Ethics**: It's the right thing to do.
2.  **SEO**: Google prioritizes accessible websites.
3.  **Legal**: In many countries, accessibility is a legal requirement for businesses.

## Summary

| Term | Description |
| :--- | :--- |
| **A11y** | Short for Accessibility |
| **Screen Reader**| Software that reads the screen out loud |
| **Contrast** | Difference between text and background colors |
| **Focus** | The "Selected" element during keyboard navigation |
| **Best For** | Building inclusive and professional web applications |
| **Logic** | "Inclusive design" |
| **Safety** | Good accessibility also makes your site easier for everyone else! |
| **Modern** | Modern browsers have an "Accessibility Tree" just for screen readers |
| **Standard** | Follow the **WCAG** (Web Content Accessibility Guidelines) |
| **Identity** | The sign of a truly senior developer |
