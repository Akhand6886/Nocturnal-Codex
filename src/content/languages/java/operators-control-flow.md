---
title: "Operators & Control Flow"
description: "if/else, switch (Modern), for, while, and the ternary operator"
---

## Conditional Statements

In **Java**, code flows downward, but you can change the path using logical branches. Java's `if` statements are similar to other languages, but they **must** use a boolean expression!

```java
int score = 85;

if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else {
    System.out.println("Grade: F");
}
```

## Comparisons: The `switch` Statement

For multiple specific values, a `switch` is cleaner and often faster than multiple `if/else` checks.

```java
int day = 3;

switch (day) {
  case 1:
    System.out.println("Monday!");
    break; // DO NOT FORGET BREAK!
  case 3:
    System.out.println("Wednesday!");
    break;
  default:
    System.out.println("Weekend!");
}
```

## Modern Feature: Switch Expressions (JAVA 14+)

Wait! In modern Java, you can use the **Switch Expression** with arrows (`->`). It's much cleaner, doesn't need `break`, and can even return a value directly.

```java
String status = switch (day) {
    case 1, 2, 3, 4, 5 -> "Working Day";
    case 6, 7 -> "Weekend!";
    default -> "Unknown";
};

System.out.println(status);
```

## Loops: `for` and `while`

### 1. Traditional `for` Loop

Classic counter-driven loop. Best for when you need to know exactly what index you're at.

```java
for (int i = 0; i < 5; i++) {
    System.out.println("Loop: " + i);
}
```

### 2. Enhanced `for` Loop (for-each)

Better for iterating over an array or a collection.

```java
String[] names = {"Alpha", "Beta", "Gamma"};

for (String name : names) {
    System.out.println("Hello, " + name);
}
```

### 3. `while` and `do...while`

Used when you don't know exactly how many times to repeat something.

```java
int count = 10;
while (count > 0) {
    System.out.println("Count: " + count);
    count--;
}
```

## Summary

| Feature | Syntax | Best Use... |
| :--- | :--- | :--- |
| **if/else** | `if (x) {}` | Branching logic |
| **switch** | `switch (x) {}`| Discrete values (integers, strings, enums) |
| **for** | `for (i; i < n; i++)`| Counter-driven loops |
| **for-each** | `for (x : list)` | Arrays/Collections (Modern!) |
| **while** | `while (condition)` | Condition-driven loops |
| **break** | `break` | Terminate loop Early |
| **continue** | `continue` | Skip the current iteration |
| **Best For** | Logic, performance, and structure |
| **return** | Immediately exit the function! |
| **yield** | `yield x` (Used inside modern switch!) |
| **Logic** | `&&` (AND), `||` (OR), `!` (NOT) |
| **Ternary** | `x ? a : b` (Concise if/else) |
| **Bitwise** | `&, |, ^, <<, >>` (Low-level math!) |
| **Assignment** | `+=, -=, *=, /=` (Shortcut math!) |
| **Compare** | `==, !=, <, >, <=, >=` |
| **Short-Circle**| `if (x != null && x.length > 0)` (Safe checking!) |
| **Final** | `final int X = 10;` (Value cannot change!) |
| **Instance** | `obj instanceof String` (Type checking!) |
| **Condition** | Must be a `boolean` in Java! (No 0/1 integers!) |
| **Scopes** | Variables created inside `{}` only exist there! |
| **Equality** | Never use `==` for strings! (Use `.equals()`) |
| **Optimize**| Modern JVMs can "unroll" simple loops for speed |
| **Safety** | Compiler prevents "Infinite loops" with static values |
| **Patterns** | C++ Style syntax for loops and logic |
| **Breakout** | Labeling a loop to break from nested ones (`outer: for...`) |
| **Increment**| `i++` (Postfix) vs `++i` (Prefix) |
| **Order** | Classic precedence rules apply (Math * BEFORE +) |
| **Recursion** | A method calling itself (The ultimate loop!) |
| **Modulus** | `%` (Find the remainder of a division!) |
| **Coalescing**| `a != null ? a : b` (Null-safety checks!) |
| **Format** | Keep your code indented for readability! |
| **Exceptions**| `try/catch` is also a form of control flow! |
