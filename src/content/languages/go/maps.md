---
title: "Maps"
description: "Hash maps, iteration, delete, and comma-ok idiom"
---

## What is a Map?

In **Go**, a **Map** is a built-in data type that associates keys with values. It is a Hash Map (or Dictionary) that provides fast O(1) lookups.

```go
// Creating a map using 'make'
m := make(map[string]int)

m["Alice"] = 25
m["Bob"] = 30
```

## Map Literals

You can also initialize a map with data directly.

```go
m := map[string]int{
    "Alice": 25,
    "Bob":   30,
}
```

## Deleting Elements

Use the built-in **`delete`** function to remove an entry from a map.

```go
delete(m, "Alice")
```

## The Comma-OK Idiom

Wait! What happens if you look up a key that doesn't exist? Go will return the **Zero Value** for that type. To know if the key actually existed, use the "Comma-OK" pattern.

```go
age, ok := m["Charlie"]
if ok {
    fmt.Println("Charlie's age is", age)
} else {
    fmt.Println("Charlie not found!")
}
```

## Iterating Through a Map

You can use the `for range` loop to iterate through all keys and values in a map.

```go
for name, age := range m {
    fmt.Printf("%s is %d years old\n", name, age)
}
```

> [!WARNING]
> Iteration order in a Go map is **Random**. Do not write code that depends on the order of keys in a map!

## Summary

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **make** | `make(map[K]V)` | Initializing an empty map |
| **delete** | `delete(m, k)` | Removing an entry |
| **Comma-OK** | `val, ok := m[k]` | Checking if a key exists |
| **len** | `len(m)` | Getting the number of entries |
| **Zero Val** | `nil` | An uninitialized map is `nil` |
| **Best For** | Fast lookups, frequency counting, caches |
| **Logic** | Keys must be "comparable" (No slices or maps as keys!) |
| **Safety** | Maps are NOT thread-safe! Use `sync.Map` for concurrency. |
| **Modern** | Maps power most dynamic data logic in Go applications |
| **Random** | Order is deliberately randomized to prevent bugs |
| **Memory** | Maps grow dynamically as you add more items |
| **Identity** | Pointers can be keys! |
