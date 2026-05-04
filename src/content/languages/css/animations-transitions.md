---
title: "Animations & Transitions"
description: "Mastering high-performance web animations and interactive motion"
---

## Why Animate?

Motion in web design isn't just for flair; it provides **visual feedback**, guides the user's attention, and makes the interface feel "alive." However, poorly implemented animations can cause "jank" (stuttering) and drain battery life.

## 1. CSS Transitions

Transitions are the simplest way to animate properties when they change (e.g., on `:hover`).

```css
.button {
  background-color: #4136d6;
  transition: background-color 0.3s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  background-color: #874efe;
  transform: translateY(-2px);
}
```

## 2. CSS Keyframe Animations

For complex, multi-stage animations, use `@keyframes`.

```css
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-section {
  animation: slideIn 0.8s forwards ease-out;
}
```

## 3. Performance: The "Composite" Rule

To ensure 60FPS (smooth) animations, only animate properties that don't trigger **Reflow** (layout) or **Repaint**. 

**Best Properties to Animate:**
- `transform` (scale, translate, rotate)
- `opacity`

**Avoid Animating:**
- `width` / `height`
- `top` / `left` / `margin`
- `box-shadow` (heavy repaint)

## 4. Easing Functions

Easing defines the "speed curve" of the animation. 
- `linear`: Constant speed.
- `ease-in`: Starts slow, ends fast.
- `ease-out`: Starts fast, ends slow (feels more natural for UI).
- `cubic-bezier()`: Custom curves for premium "bouncy" or "snappy" effects.

## 5. Animation Playback Control

- `animation-delay`: Wait before starting.
- `animation-iteration-count`: `infinite` for loops.
- `animation-fill-mode: forwards`: Keeps the element at the final state after the animation ends.

## Summary Checklist
- [x] Use `transition` for simple state changes.
- [x] Use `@keyframes` for multi-step motion.
- [x] Stick to `transform` and `opacity` for performance.
- [x] Use `cubic-bezier` for a premium feel.
- [x] Respect user preferences with `@media (prefers-reduced-motion)`.
---
