---
title: "Branded Types"
description: "Nominal typing in a structural system using brands"
---

## What is a Branded Type?

**TypeScript** is a **Structurally Typed** language. This means if two types have the same shape, they are treated as the same type.

```typescript
type USD = number;
type EUR = number;

let dollars: USD = 10;
let euros: EUR = dollars; // NO ERROR! Both are just 'number'.
```

**Branded Types** (also called **Nominal Types**) allow you to tell the compiler that these numbers are actually different, preventing accidental mix-ups.

## How to Create a Brand

We "brand" a type by intersecting it with a unique property that doesn't actually exist at runtime.

```typescript
type USD = number & { __brand: "USD" };
type EUR = number & { __brand: "EUR" };

let dollars = 10 as USD;
// let euros: EUR = dollars; // ERROR! "USD" is not assignable to "EUR"
```

## Validation with Brands

Wait! You can combine branded types with **Type Guards** to ensure that data has been validated before it is used.

```typescript
type Email = string & { __brand: "Email" };

function isEmail(s: string): s is Email {
    return s.includes("@");
}

function sendWelcome(email: Email) { ... }

const input = "test@test.com";
// sendWelcome(input); // ERROR: Not branded yet
if (isEmail(input)) {
    sendWelcome(input); // SUCCESS!
}
```

## Why use Branded Types?

1.  **Safety**: Prevent passing a `UserID` where a `PostID` is expected.
2.  **Validation**: Ensure strings are validated (URLs, Emails, SQL-safe) before processing.
3.  **Units**: Keep track of different units of measurement (meters, feet, pixels).

## Summary

| Term | Description |
| :--- | :--- |
| **Nominal** | Type system based on names (like Java/C#) |
| **Structural** | Type system based on shape (Default TS/JS) |
| **Brand** | A unique tag used to distinguish identical shapes |
| **__brand** | Convention for naming the hidden property |
| **as T** | Using type assertions to "apply" a brand |
| **Predicate** | `is T` - The primary way to safely brand a value |
| **Best For** | IDs, Currencies, Validated Strings, Physical Units |
| **Logic** | "Make impossible states unrepresentable" |
| **Zero-Cost** | Brands vanish at runtime; no performance overhead |
| **Safety** | Prevents the "Primitive Obsession" anti-pattern |
| **Modern** | Used in high-safety codebases and finance apps |
| **Constraint**| Requires manual casting or validation to initialize |
