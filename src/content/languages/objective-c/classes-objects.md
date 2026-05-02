---
title: "Classes & Objects"
description: "Understanding Interface, Implementation, and Messaging"
---

## The Two-Part Class

In **Objective-C**, classes are usually split into two separate files:
1.  **`.h` (Interface)**: Declares the methods and properties.
2.  **`.m` (Implementation)**: Contains the actual code.

```objectivec
// Person.h
@interface Person : NSObject
@property NSString *name;
- (void)sayHello;
@end

// Person.m
@implementation Person
- (void)sayHello {
    NSLog(@"Hello, I am %@", self.name);
}
@end
```

## Messaging (`[ ]`)

Wait! You don't "call" a function in Objective-C; you **send a message** to an object.

```objectivec
Person *alpha = [[Person alloc] init];
[alpha setName:@"Alpha"];
[alpha sayHello];
```

## Memory Management (ARC)

Wait! Modern Objective-C uses **ARC** (Automatic Reference Counting). It automatically inserts `retain` and `release` calls at compile time so you don't have to manage memory manually.

-   **Strong**: Keep the object alive as long as I have a reference to it.
-   **Weak**: Don't keep the object alive; set the reference to `nil` if the object is deleted elsewhere.

## Summary

| Term | Description |
| :--- | :--- |
| **@interface** | Start of the declaration |
| **@implementation**| Start of the code |
| **NSObject** | The root class for almost everything |
| **self** | Reference to the current object |
| **alloc / init** | Creating a new instance |
| **Best For** | Building structured Apple-ecosystem apps |
| **Logic** | "Messaging between objects" |
| **Safety** | Dynamic typing (`id`) provides flexibility but can cause runtime crashes |
| **Modern** | Combine with Nullability annotations for Swift interop |
| **Standard** | Use the `NS` prefix (NextStep) for core objects |
| **Identity** | The "Header/Implementation" split is iconic |
