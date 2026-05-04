---
title: "Comptime"
description: "Mastering compile-time code execution and metaprogramming in Zig"
---

## What is Comptime?

**Comptime** is Zig's most powerful feature. It allows you to run Zig code at compile-time. This eliminates the need for a separate macro language (like in C/C++) or complex generics (like in Java/Rust). 

If a value is `comptime`, the compiler evaluates it and replaces the code with the result before generating the final binary.

## 1. Comptime Variables

You can perform calculations during compilation.

```zig
const std = @import("std");

fn fibonacci(comptime n: u32) u32 {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

pub fn main() void {
    const result = comptime fibonacci(10); // Computed at compile-time
    std.debug.print("Result: {}\n", .{result});
}
```

## 2. Generic Types with Comptime

In Zig, types are first-class values at comptime. This is how generics are implemented.

```zig
fn List(comptime T: type) type {
    return struct {
        items: []T,
        len: usize,
        
        pub fn init(allocator: *std.mem.Allocator) !List(T) {
            // ...
        }
    };
}

const IntList = List(i32); // Creates a new struct type for i32
```

## 3. Comptime Blocks and Loops

You can use `inline for` or `comptime` blocks to unroll loops or generate code dynamically based on types.

```zig
const Point = struct { x: i32, y: i32 };

fn printFields(comptime T: type) void {
    const info = @typeInfo(T);
    inline for (info.Struct.fields) |field| {
        std.debug.print("Field: {s}, Type: {}\n", .{field.name, field.type});
    }
}
```

## 4. Why use Comptime?

1.  **Performance**: Move heavy calculations from runtime to compile-time.
2.  **Zero Overhead Generics**: No vtables or runtime type checking.
3.  **Reflection**: Inspect types and generate code (e.g., JSON serializers) without external tools.
4.  **Static Validation**: Catch logic errors or invalid configurations during compilation.

## Summary Checklist
- [x] `comptime` keyword triggers compile-time evaluation.
- [x] Types are values at comptime.
- [x] Use `inline for` to unroll loops based on type info.
- [x] Use `@typeInfo` for compile-time reflection.
- [x] No separate macro language needed!
---
