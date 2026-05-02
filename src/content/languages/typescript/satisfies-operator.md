---
title: "The satisfies Operator"
description: "Validation without losing type specificity (TS 4.9+)"
---

## The Problem: Type Narrowing vs. Validation

Before the `satisfies` operator, you often had to choose between **strict validation** and **type specificity**.

```typescript
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette: Record<string, Colors | RGB> = {
  primary: "red",
  secondary: [0, 255, 0],
  background: "blue"
};

// Error: Property 'toUpperCase' does not exist on type 'Colors | RGB'
palette.primary.toUpperCase(); 
```

Even though we *know* `primary` is a string, the `Record` type forced TypeScript to treat it as the union `Colors | RGB`, losing the specific knowledge that it's a string.

## The Solution: `satisfies`

The `satisfies` operator allows you to **validate** that a value matches a type **without** changing the inferred type of that value.

```typescript
const palette = {
  primary: "red",
  secondary: [0, 255, 0],
  background: "blue"
} satisfies Record<string, Colors | RGB>;

// Works! TS knows 'primary' is specifically a string "red"
palette.primary.toUpperCase(); 

// Works! TS knows 'secondary' is specifically an array
palette.secondary.map(c => c.toFixed(2));
```

### How it Works:
1.  **Validation**: TypeScript checks if `palette` matches the `Record<string, Colors | RGB>` type. If you added `error: "yellow"`, it would catch the mistake.
2.  **Inference**: After validation, it "forgets" the broad type and keeps the most specific inferred type (e.g., `primary` is `"red"`).

## Use Case: Configuration Objects

This is extremely useful for tailwind configs, theme objects, or route maps where you want to ensure the structure is correct but still use the specific keys/values throughout your app.

```typescript
type Config = {
  host: string;
  port: number;
  protocol: 'http' | 'https';
};

const myConfig = {
  host: "localhost",
  port: 3000,
  protocol: "https"
} satisfies Config;

// myConfig.protocol is inferred as "https" (literal), not just "http" | "https"
```

## Difference from Type Annotations (`:`)

| Feature | Annotation (`: Type`) | `satisfies` Operator |
| :--- | :--- | :--- |
| **Validation** | Yes | Yes |
| **Inference** | Loses specificity (widens) | **Retains specific types** |
| **Usage** | Variable declaration | After the value expression |

### Summary
- [x] Use `satisfies` when you want to catch errors but keep specific type information.
- [x] Perfect for complex objects like Palettes, Configs, and Theme tokens.
- [x] Available in TypeScript 4.9 and later.
