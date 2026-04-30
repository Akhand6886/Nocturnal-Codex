---
title: "Control Flow"
description: "if/else, switch, for, while, and the modern range-based loop"
---

## Conditional Statements

In **C++**, code flows downward, but you can change the path using logical branches. Indentation is optional, but it's essential for humans!

```cpp
int x = 10;

if (x > 0) {
  std::cout << "Positive Number!" << std::endl;
} else if (x == 0) {
  std::cout << "Zero." << std::endl;
} else {
  std::cout << "Negative Number." << std::endl;
}
```

## Comparisons: The `switch` Statement

For multiple specific values, a `switch` is cleaner and often faster than multiple `if/else` checks.

```cpp
int status = 404;

switch (status) {
  case 200:
    std::cout << "Success!" << std::endl;
    break; // DO NOT FORGET BREAK!
  case 404:
    std::cout << "Not Found." << std::endl;
    break;
  default:
    std::cout << "Unknown Status" << std::endl;
}
```

## Loops: `for` and `while`

### 1. Traditional `for` Loop

Classic counter-driven loop. Best for when you need to know exactly what index you're at.

```cpp
for (int i = 0; i < 5; i++) {
  std::cout << "Loop: " << i << std::endl;
}
```

### 2. `while` Loop

Better for when you don't know the exact end point, and you're waiting for a condition to change.

```cpp
int count = 10;
while (count > 0) {
  std::cout << "Countdown: " << count << std::endl;
  count--;
}
```

## Modern C++ Loop: Range-Based `for`

Since **C++11**, we have the "Range-Based" `for` loop. It's much safer and simpler for iterating over collections like a **`std::vector`** or **`std::string`**.

```cpp
#include <vector>
#include <string>

std::vector<int> nums = {1, 2, 3, 4, 5};

// Iterate over each item!
for (int n : nums) {
    if (n % 2 == 0) {
        std::cout << "Even: " << n << std::endl;
    }
}

// Iterate over characters in a string!
std::string st = "C++";
for (char c : st) {
    std::cout << c << " ";
}
```

> **Wait!** For performance, always use a **reference** (`const auto& item : items`) in the range-based `for` loop if the items are large objects, to avoid unnecessary memory copying.

## Summary

| Feature | Syntax | Best Use... |
| :--- | :--- | :--- |
| **if/else** | `if (x) {}` | Branching logic |
| **switch** | `switch (x) {}`| Discrete integer values |
| **for** | `for (i; i < n; i++)`| Counter-driven loops |
| **while** | `while (condition)` | Condition-driven loops |
| **range-for** | `for (x : collection)`| Collections (Modern C++11!) |
| **break** | `break` | Terminate loop |
| **continue** | `continue` | Skip to the next iteration |
| **Best For** | Logic, performance, and structure |
| **return** | Immediately exit the function! |
| **goto** | DON'T USE IT! (Produces "Spaghetti Code") |
| **Optimization** | Compilers can often "unroll" simple loops for speed |
| **Condition** | Any value that's NOT zero is `true` in C++! |
| **Scopes** | Variables created inside `{}` only exist there! |
| **init-if** | `if (int x = get(); x > 0) { ... }` (C++17!) |
| **constexpr-if**| `if constexpr (cond) { ... }` (C++17 compile-time!) |
| **Attribute** | `[[fallthrough]]` (Mark intentional switch fallthrough) |
| **Infinite** | `for (;;)` or `while (true)` |
| **Wait** | Use `std::this_thread::sleep_for()` in a while loop |
| **Nested** | Loops inside loops (O(n²) complexity!) |
