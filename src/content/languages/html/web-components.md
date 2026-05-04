---
title: "Web Components"
description: "Building reusable, encapsulated, and framework-agnostic elements"
---

## What are Web Components?

**Web Components** are a set of browser APIs that allow you to create new custom, reusable, encapsulated HTML tags. They work in any framework (React, Vue, Svelte) or even with no framework at all.

They consist of three main technologies:
1.  **Custom Elements**
2.  **Shadow DOM**
3.  **HTML Templates**

## 1. Custom Elements

You can define a new tag by extending the `HTMLElement` class and registering it with the browser.

```javascript
class MyButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button>Click Me!</button>`;
  }
}

customElements.define('my-button', MyButton);
```
*Usage:* `<my-button></my-button>`

## 2. Shadow DOM (Encapsulation)

Shadow DOM allows you to attach a separate, hidden DOM tree to an element. This ensures that the styles inside your component don't "leak out" and affect the rest of the page, and external styles don't "leak in."

```javascript
class ShadowCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .card { border: 1px solid black; padding: 10px; }
      </style>
      <div class="card">
        <slot></slot> <!-- Where content goes -->
      </div>
    `;
  }
}
```

## 3. HTML Templates and Slots

The `<template>` tag allows you to define HTML that is not rendered until you instantiate it. `<slot>` is used to create placeholders for dynamic content.

```html
<template id="user-template">
  <div class="user-profile">
    <h2><slot name="username">Default Name</slot></h2>
  </div>
</template>
```

## 4. Lifecycle Callbacks

- `connectedCallback`: Called when the element is added to the DOM.
- `disconnectedCallback`: Called when removed from the DOM.
- `attributeChangedCallback`: Called when an attribute (like `id` or `src`) changes.

## 5. Why use them?

1.  **Interoperability**: Build a UI library that works in any environment.
2.  **Encapsulation**: No more CSS naming collisions.
3.  **Future-proof**: Native browser support means no dependencies to update.

## Summary Checklist
- [x] Extend `HTMLElement` to create a Custom Element.
- [x] Use `customElements.define` to register the tag.
- [x] Use `attachShadow` for style and DOM isolation.
- [x] Use `<slot>` for content projection.
- [x] Native support in 100% of modern browsers.
---
