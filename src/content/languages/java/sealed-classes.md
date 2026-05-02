---
title: "Sealed Classes (JAVA 17+)"
description: "Restricting class hierarchies for better domain modeling"
---

## Why Sealed Classes?

In traditional Java, you could either make a class `final` (no subclasses allowed) or `public` (anyone can subclass it). There was no middle ground.

**Sealed Classes** allow you to specify exactly which other classes or interfaces are allowed to extend or implement them. This is incredibly useful for modeling closed domain hierarchies.

## Basic Syntax

Use the `sealed` modifier combined with the `permits` clause.

```java
public sealed interface Shape 
    permits Circle, Rectangle, Square {
    double area();
}

public final class Circle implements Shape { ... }
public final class Rectangle implements Shape { ... }
public final class Square implements Shape { ... }
```

### Constraints:
1.  **Direct Subclasses**: All permitted subclasses must be in the same module (or same package if in an unnamed module).
2.  **Explicit Modifiers**: Every permitted subclass MUST have exactly one of the following modifiers:
    -   `final`: Cannot be extended further.
    -   `sealed`: Can be extended by its own set of permitted classes.
    -   `non-sealed`: Re-opens the hierarchy for anyone to extend.

---

## Exhaustive Pattern Matching

The biggest benefit of sealed classes is when used with `switch` expressions. Since the JVM knows all possible subclasses, it can ensure your code is exhaustive.

```java
public double getArea(Shape shape) {
    return switch (shape) {
        case Circle c    -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.length() * r.width();
        case Square s    -> s.side() * s.side();
        // NO 'default' block needed! 
        // If you add a new Shape, the compiler will error here!
    };
}
```

## Summary Checklist
- [x] Use `sealed` to control your inheritance tree.
- [x] Use `permits` to list allowed subclasses.
- [x] Permitted classes must be `final`, `sealed`, or `non-sealed`.
- [x] Enables **exhaustive pattern matching** in switch expressions.
- [x] Perfect for modeling fixed states, payment methods, or UI component types.
- [x] Standard feature as of **JAVA 17**.
---
