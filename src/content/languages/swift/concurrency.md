---
title: "Concurrency"
description: "async/await, Tasks, and Thread safety in modern Swift"
---

## Modern Concurrency

In **Swift 5.5+**, Apple introduced a world-class concurrency system. It replaces old, messy "Callback" code with clean, linear **`async`** and **`await`** keywords.

```swift
func fetchData() async throws -> Data {
    let url = URL(string: "https://api.example.com")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return data
}
```

## `async` and `await`

-   **`async`**: Marks a function as asynchronous, meaning it can "pause" while waiting for work to finish.
-   **`await`**: Marks a "suspension point." The code pauses here until the async work completes, but it doesn't "freeze" the application.

## Tasks

A **Task** is a unit of work that can run in the background.

```swift
Task {
    do {
        let data = try await fetchData()
        print("Success!")
    } catch {
        print("Error: \(error)")
    }
}
```

## Structured Concurrency (`async let`)

Wait! If you want to perform multiple tasks at the same time and wait for all of them to finish, use **`async let`**.

```swift
async let user = fetchUser()
async let posts = fetchPosts()

let (userData, userPosts) = await (user, posts) // Both run in parallel!
```

## Actors

Wait! **Actors** are a unique Swift feature for **Thread Safety**. An actor is a reference type (like a class) that ensures only one piece of code can access its internal state at a time. This prevents "Data Races."

```swift
actor BankAccount {
    var balance = 0
    func deposit(amount: Int) { balance += amount }
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **async** | Marks a function that can pause |
| **await** | Marks the point where the function pauses |
| **Task** | A background execution context |
| **Actor** | A thread-safe class-like object |
| **MainActor** | Ensuring code runs on the UI thread |
| **Best For** | API calls, database operations, and background work |
| **Logic** | "Write async code that looks like sync code" |
| **Safety** | Prevents deadlocks and data races |
| **Modern** | Replaces old GCD (Grand Central Dispatch) patterns |
| **Standard** | The required way to handle background tasks in SwiftUI |
| **Identity** | Built into the Swift language and compiler |
| **Efficiency**| Extremely lightweight compared to manual threads |
