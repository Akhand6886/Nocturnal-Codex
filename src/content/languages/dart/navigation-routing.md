---
title: "Navigation & Routing"
description: "Moving between screens with Navigator 1.0 and 2.0"
---

## The Navigator

In **Flutter**, the **`Navigator`** widget manages a stack of "Routes" (pages). You "push" a new route to go forward and "pop" a route to go back.

```dart
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondPage()),
);
```

## Named Routes

For larger apps, it's better to give each page a name (like a URL). This makes your navigation much easier to manage.

```dart
// In your MaterialApp
routes: {
  '/': (context) => HomePage(),
  '/details': (context) => DetailsPage(),
}

// To navigate
Navigator.pushNamed(context, '/details');
```

## Passing Data

Wait! You can pass data between pages when you push a new route.

```dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailsPage(data: 'Hello!'),
  ),
);
```

## Navigator 2.0 (Router API)

Wait! For complex apps (especially on the Web), Flutter provides a more advanced, declarative way to handle navigation called **Navigator 2.0**. It allows the app's state to directly control the navigation stack, making deep-linking and browser "Back" buttons work perfectly.

> [!TIP]
> If Navigator 2.0 feels too complex, use a library like **`go_router`**. It's the official Google recommendation for modern, URL-based navigation.

## Summary

| Term | Description |
| :--- | :--- |
| **Route** | A screen or page in an app |
| **Push** | Moving to a new page (Adding to the stack) |
| **Pop** | Going back (Removing from the stack) |
| **Deep Link** | Opening the app to a specific page via a URL |
| **go_router** | The modern standard for Flutter navigation |
| **Best For** | Building multi-page applications |
| **Logic** | Stack-based navigation |
| **Safety** | Type-safe argument passing |
| **Modern** | Declarative routing is essential for Web and Desktop support |
| **Standard** | Use `go_router` for all new professional projects |
| **Identity** | Navigation in Flutter is fully customizable and animated |
