---
title: "Animations"
description: "Transitions, Keyframes, and bringing your UI to life"
---

## 1. Transitions

A **Transition** allows you to change a property smoothly over a period of time. It is perfect for hover states.

```css
button {
  background-color: blue;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: darkblue;
}
```

Wait! Only certain properties are "Animatable." You can animate things like `opacity`, `transform`, and `color`. You should **avoid** animating `width`, `height`, or `top` because they cause the browser to "Reflow," which is bad for performance.

## 2. Keyframe Animations

For more complex animations that happen automatically, use **`@keyframes`**.

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.box {
  animation: slideIn 1s forwards;
}
```

## Performance: `transform` and `opacity`

Wait! For the smoothest animations (60 FPS), you should stick to **`transform`** (move, scale, rotate) and **`opacity`**. These are handled by the computer's GPU, not the CPU.

## `prefers-reduced-motion`

Always be respectful of your users. Some people find animations dizzying or distracting. You can detect their system preference and disable animations for them.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **transition** | Smooth change between two states |
| **@keyframes** | Defining a multi-step animation sequence |
| **transform** | Move, Rotate, Scale (GPU-accelerated) |
| **ease-in-out** | A timing function that starts and ends slowly |
| **iteration-count**| How many times the animation should run |
| **Best For** | Micro-interactions, loading states, and visual polish |
| **Logic** | "Motion and feedback" |
| **Safety** | Use `will-change` sparingly to hint at upcoming animations |
| **Modern** | The View Transitions API is the future of page-to-page motion |
| **Standard** | Use subtle animations; don't overdo it! |
| **Identity** | Animations make a site feel "Premium" and alive |
