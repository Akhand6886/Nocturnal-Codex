---
title: "Introduction to Objective-C"
description: "The language that built the Apple ecosystem"
---

## What is Objective-C?

**Objective-C** is a general-purpose, object-oriented programming language that adds Smalltalk-style messaging to the C programming language. It was the primary language used by Apple for the OS X and iOS operating systems, and their respective APIs (Cocoa and Cocoa Touch) before the introduction of Swift.

```objectivec
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"Hello, Nocturnal Codex!");
    }
    return 0;
}
```

## Why Objective-C?

1.  **Dynamic Dispatch**: Method calls are resolved at runtime via "Messaging."
2.  **C Superset**: Any valid C code is also valid Objective-C code.
3.  **The Foundation**: Most of Apple's core frameworks are still written in Objective-C.
4.  **Messaging Syntax**: Uses square brackets `[object method]` instead of dot notation.

## The Toolchain

-   **Xcode**: The standard IDE.
-   **Clang**: The modern compiler part of the LLVM project.
-   **Cocoa / Cocoa Touch**: The primary frameworks.

## 3. Summary

| Feature | Description |
| :--- | :--- |
| **Paradigm** | Object-Oriented, Imperative |
| **Typing** | Static and Dynamic (id type) |
| **Messaging** | Smalltalk-style `[receiver message]` |
| **Best For** | Legacy iOS/macOS apps and Apple system frameworks |
| **Logic** | C-based with dynamic OO features |
| **Safety** | High (with ARC), but lower than Swift |
| **Modern** | Still maintained, but effectively replaced by Swift |
| **Standard** | Objective-C 2.0 is the modern version |
| **Identity** | The "Square Bracket" language |
