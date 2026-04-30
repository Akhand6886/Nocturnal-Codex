---
title: "Operators"
description: "Arithmetic, comparison (== vs ===), logical, nullish coalescing (??)"
---

## Arithmetic Operators

JavaScript supports the standard mathematical operations.

| Operator | Action | Example | Result |
| :--- | :--- | :--- | :--- |
| **+** | Addition / Concat | `10 + 5` | `15` |
| **-** | Subtraction | `10 - 5` | `5` |
| **\*** | Multiplication | `10 * 5` | `50` |
| **/** | Division | `10 / 4` | `2.5` |
| **%** | Remainder | `10 % 3` | `1` |
| **\*\*** | Exponentiation | `2 ** 3` | `8` |

```javascript
// Addition or Concatenation?
console.log(1 + 2);     // 3
console.log("1" + 2);   // "12" (Wait! JS converted 2 to a string!)
```

## Comparison Operators: `==` vs `===`

This is one of the most important concepts in JavaScript.

-   **`==` (Loose Equality)**: Checks value only. It tries to convert types to match (**type coercion**).
-   **`===` (Strict Equality)**: Checks both **value** and **type**.

```javascript
console.log(5 == "5");  // true (Value is 5)
console.log(5 === "5"); // false (Number vs String)
```

> **Best Practice**: Always use `===` and `!==`. Loose equality leads to unpredictable bugs.

## Logical Operators

| Operator | Name | Logic |
| :--- | :--- | :--- |
| **&&** | AND | Both must be true |
| **\|\|** | OR | At least one must be true |
| **!** | NOT | Invert the boolean |

```javascript
const isAdmin = true;
const hasSecretKey = false;

if (isAdmin && hasSecretKey) {
  // Only runs if BOTH are true
}
```

## Nullish Coalescing (`??`)

Introduced in **ES2020**, this operator returns the right-hand value only if the left-hand value is `null` or `undefined`. This is safer than using `||`, which also triggers for `0` or `""`.

```javascript
const userScore = 0;

// Old Way (Potential Bug!)
const finalScore_bad = userScore || 50; 
// 0 is falsy, so it returns 50! (But 0 is a valid score!)

// New Way (Safe!)
const finalScore_good = userScore ?? 50; 
// Returns 0 because it's not null/undefined.
```

## The Ternary Operator (`?:`)

A concise one-line `if/else` statement.

```javascript
const age = 20;
const status = age >= 18 ? "Adult" : "Minor";
```

## Summary

| Operator | Usage | Purpose |
| :--- | :--- | :--- |
| **===** | `a === b` | Strict equality (Recommended!) |
| **==** | `a == b` | Loose equality (Avoid!) |
| **&& / \|\|**| `a && b` | Logical operations |
| **??** | `a ?? b` | Handle null/undefined safely |
| **!** | `!status` | Boolean inversion |
| **typeof** | `typeof x` | Get data type |
| **delete** | `delete obj.x`| Remove object property |
