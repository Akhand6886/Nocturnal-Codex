---
title: "Web Components"
description: "Creating your own custom, reusable HTML tags"
---

## What are Web Components?

**Web Components** allow you to create your own custom HTML tags that are fully encapsulated and reusable. This is a "Native" alternative to framework-based components like those in React or Vue.

```html
<user-card name="Alpha" avatar="image.jpg"></user-card>
```

## The Three Pillars

1.  **Custom Elements**: A set of JavaScript APIs that allow you to define new HTML tags.
2.  **Shadow DOM**: A private, isolated version of the DOM. This ensures that the CSS inside your component doesn't "Leak" out and affect the rest of the page.
3.  **HTML Templates**: Using `<template>` and `<slot>` to define how the markup should look.

## Creating a Component

Wait! You define a component using a JavaScript class that extends `HTMLElement`.

```javascript
class UserCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h3>${this.getAttribute('name')}</h3>`;
  }
}

customElements.define('user-card', UserCard);
```

## Why use them?

-   **Reusable**: Use them in any project, whether it's plain HTML or a framework like React.
-   **Encapsulated**: No more "CSS Class Conflicts." Your styles stay inside your component.
-   **Future-Proof**: They are part of the web platform itself, so they will work forever.

## Summary

| Term | Description |
| :--- | :--- |
| **Shadow DOM** | Encapsulated DOM and Styles |
| **Custom Element**| Your new tag (e.g., `<my-button>`) |
| **Slot** | A placeholder inside your component template |
| **connectedCallb.**| Runs when the component is added to the page |
| **Best For** | Building reusable UI libraries and design systems |
| **Logic** | "Native component encapsulation" |
| **Safety** | Prevents "Style Bleed" across your application |
| **Modern** | Highly used by companies like Adobe, Salesforce, and Google |
| **Standard** | Part of the W3C Web Components specification |
| **Identity** | Bringing "Component Architecture" to native HTML |
