---
id: zig
name: Zig
slug: zig
description: "A general-purpose programming language and toolchain for maintaining robust, optimal, and reusable software."
iconName: settings
category: "Systems"
difficulty: "Advanced"
featured: true
relatedLanguages: ["c", "cpp", "rust"]
---

# Zig: Simple Systems Programming

Zig is designed to replace C. It provides low-level control without the hidden complexities of C++ or the steep learning curve of Rust's borrow checker.

## Design Philosophy

- **No Hidden Control Flow**: No operator overloading, no hidden allocations, no exceptions.
- **Comptime**: Run Zig code at compile-time to generate code or perform checks.
- **Manual Memory Management**: Explicit allocators are passed everywhere.

## Core Features

### 1. Comptime
Compile-time execution is a first-class citizen.

```zig
const std = @import("std");

fn multiply(comptime T: type, a: T, b: T) T {
    return a * b;
}

pub fun main() void {
    const result = multiply(i32, 5, 10);
}
```

### 2. Error Handling
Zig uses error sets and the `!` prefix, forcing explicit handling without exceptions.

```zig
const MyError = error{ OutOfMemory, InvalidData };

fn doSomething() !void {
    return MyError.InvalidData;
}

// Handling
doSomething() catch |err| {
    // handle error
};
```

### 3. C Integration
Zig can compile C code and import C headers directly.

```zig
const c = @cImport({
    @cInclude("stdio.h");
});
```

## Summary Table

| Feature | Zig | C | Rust |
|---------|-----|---|------|
| **Memory** | Manual (Explicit) | Manual (Implicit) | Safe (Borrow Checker) |
| **Generics** | Comptime | Macros/Void* | Traits/Generics |
| **Safety** | Checked (Undefined Behavior) | None | Full Memory Safety |
| **Binary Size**| Tiny | Tiny | Small/Medium |
