---
title: "S-expressions & Lists"
description: "Understanding the fundamental structure of Lisp"
---

## What is an S-expression?

In **Lisp**, all code and data are written as **S-expressions** (Symbolic Expressions). An S-expression is either an **Atom** (a number, string, or symbol) or a **List**.

```lisp
(+ 1 2) ; A list containing the symbol + and numbers 1, 2
```

## Lists as the Foundation

Wait! A list in Lisp is actually a chain of "Cons Cells." Each cell has two parts:
1.  **CAR**: The current item.
2.  **CDR**: The rest of the list.

```lisp
(first '(a b c)) ; Returns 'a'
(rest  '(a b c)) ; Returns '(b c)'
```

## Prefix Notation

Lisp uses **Prefix Notation**, where the function (or operator) always comes first. This might look strange at first, but it makes the syntax perfectly consistent.

```lisp
(* (+ 1 2) (- 10 5)) ; (1 + 2) * (10 - 5)
```

## Quoting

Wait! Because Lisp treats lists as code by default, you must use a **Quote (`'`)** to tell Lisp: "This is a list of data, don't try to run it as a function."

```lisp
'(1 2 3) ; This is just a list of three numbers.
```

## Summary

| Term | Description |
| :--- | :--- |
| **Atom** | A single value (number, symbol, string) |
| **List** | A sequence of atoms or lists |
| **CAR** | The first element of a list |
| **CDR** | The remaining elements of a list |
| **Quote** | Prevent evaluation of an expression |
| **Best For** | Representing hierarchical data and complex logic |
| **Logic** | "Uniformity of code and data" |
| **Safety** | High; lists are dynamic but type-safe |
| **Modern** | JSON is essentially a limited version of S-expressions |
| **Standard** | `first` and `rest` are modern aliases for `car` and `cdr` |
| **Identity** | "Lots of Irritating Superfluous Parentheses" (Just kidding!) |
