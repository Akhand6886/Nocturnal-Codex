---
title: "Memory Management"
description: "Understanding manual allocation, ownership, and safety in Zig"
---

## No Hidden Allocations

One of Zig's core philosophies is: **No Hidden Allocations.** 

Unlike C++ (where `std::vector` allocates behind the scenes) or Java (where `new` always allocates), Zig functions that need memory must explicitly take an **Allocator** as an argument. This gives the programmer complete control over where and how memory is used.

## 1. Using an Allocator

The standard library provides several allocators:
- `std.heap.page_allocator`: System-level allocator.
- `std.heap.GeneralPurposeAllocator (GPA)`: Best for general use (detects leaks).
- `std.heap.ArenaAllocator`: Allocates in blocks; everything is freed at once.

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const bytes = try allocator.alloc(u8, 100);
    defer allocator.free(bytes); // Manual cleanup
    
    bytes[0] = 42;
}
```

## 2. The `defer` and `errdefer` Keywords

To ensure memory is freed even if a function returns early or errors, Zig uses `defer`.

- `defer`: Runs when the current scope exits.
- `errdefer`: Runs only if the function returns an **error**.

```zig
fn processData(allocator: std.mem.Allocator) !void {
    const data = try allocator.alloc(u8, 1024);
    errdefer allocator.free(data); // Free if something fails below

    try loadFileInto(data);
    
    // If we reach here, we might want to keep the data or free it normally
    defer allocator.free(data); 
}
```

## 3. Arena Allocation

Arenas are perfect for tasks that need a lot of temporary allocations. You allocate everything into the Arena and free the entire Arena at the end. This is extremely fast.

```zig
var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
defer arena.deinit(); // Frees everything at once!
const allocator = arena.allocator();

const p1 = try allocator.create(Point);
const p2 = try allocator.create(Point);
```

## 4. Pointers and Slices

- `*T`: Single item pointer.
- `[*]T`: Many-item pointer (C-style, no length).
- `[]T`: Slice (Pointer + Length). This is the preferred way to handle arrays.

## Summary Checklist
- [x] No hidden allocations; pass allocators explicitly.
- [x] Use `defer` for standard cleanup.
- [x] Use `errdefer` for transactional safety.
- [x] GPA detects memory leaks during development.
- [x] Arenas simplify complex allocation lifetimes.
- [x] Slices (`[]T`) are safer than raw pointers.
---
