---
title: "SwiftUI Basics"
description: "Declarative UI, State, and Views in Swift"
---

## What is SwiftUI?

**SwiftUI** is a modern, declarative framework for building user interfaces across all Apple platforms. Instead of telling the system *how* to draw a button (Imperative), you describe *what* the button looks like and what it does (Declarative).

```swift
struct ContentView: View {
    @State private var count = 0

    var body: some View {
        VStack {
            Text("Count: \(count)")
            Button("Increment") {
                count += 1
            }
        }
    }
}
```

## Declarative Syntax

Wait! In SwiftUI, the **UI is a function of the State**. When the `@State` variable changes, SwiftUI automatically figures out what parts of the UI need to be updated and redraws them for you.

## View Composition

UI in SwiftUI is built by composing small, reusable Views together using containers like **VStack** (Vertical), **HStack** (Horizontal), and **ZStack** (Overlapping).

## View Modifiers

You customize your views using **Modifiers**. Each modifier returns a new view with the requested change.

```swift
Text("Hello")
    .font(.largeTitle)
    .padding()
    .background(Color.blue)
    .cornerRadius(10)
```

## Summary

| Term | Description |
| :--- | :--- |
| **View** | The basic building block of a SwiftUI UI |
| **body** | The computed property that returns the UI content |
| **@State** | A property wrapper that triggers UI updates |
| **VStack** | Laying out views vertically |
| **HStack** | Laying out views horizontally |
| **Modifier** | `.modifier()` - Customizing a view |
| **Best For** | Building cross-platform Apple apps (iOS, macOS, etc.) |
| **Logic** | "Data drives the UI" |
| **Safety** | Prevents "Out of Sync" UI bugs |
| **Modern** | The future of Apple development |
| **Standard** | Officially released in 2019; standard for all new apps |
| **Identity** | Uses "Opaque Types" (`some View`) for performance |
| **Binding** | `@Binding` - Connecting two views to the same state |
