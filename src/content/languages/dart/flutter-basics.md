---
title: "Flutter Basics"
description: "Widgets, BuildContext, and the Declarative UI pattern"
---

## What is Flutter?

**Flutter** is a UI toolkit from **Google** that uses the **Dart** language. In Flutter, **"Everything is a Widget."** A widget is a declaration of what a piece of the UI should look like.

```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Hello, Flutter!'),
    );
  }
}
```

## The Widget Tree

Wait! Your entire app is a "Tree" of widgets. Flutter is incredibly fast because it only redraws the parts of the tree that actually change.

## Stateless vs. Stateful

1.  **`StatelessWidget`**: A widget that never changes once it is built. It's like a constant.
2.  **`StatefulWidget`**: A widget that can change its appearance over time (e.g., a counter, a form, or a timer).

## `BuildContext`

Wait! `BuildContext` is a handle to the location of a widget in the widget tree. You use it to look up information about the "Theme," the "Media Query" (screen size), or to navigate between pages.

## Layout Widgets

-   **`Container`**: A versatile box with padding, margins, and borders.
-   **`Row` / `Column`**: Aligning widgets horizontally or vertically.
-   **`Stack`**: Layering widgets on top of each other.
-   **`ListView`**: Creating scrollable lists.

## Summary

| Term | Description |
| :--- | :--- |
| **Widget** | The fundamental building block of a Flutter app |
| **build()** | The method where you describe your UI |
| **Material** | Google's design system (built into Flutter) |
| **Cupertino** | Apple's design system (built into Flutter) |
| **Hot Reload** | Applying code changes in < 1 second |
| **Best For** | Building high-quality, cross-platform mobile apps |
| **Logic** | Declarative UI: "UI is a function of State" |
| **Safety** | Strong typing in the UI layer |
| **Modern** | The most popular cross-platform framework globally |
| **Standard** | Officially supported by Google and used by giants like eBay and Alibaba |
| **Identity** | Flutter paints every pixel itself, ensuring perfect performance |
| **Scaffold** | The basic layout structure for a Material page |
