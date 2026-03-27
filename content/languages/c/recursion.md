---
title: "Recursion"
description: "Self-referencing functions, base cases, and stack behavior"
---

## What Is Recursion?

Recursion is when a function calls itself to solve a problem by breaking it into smaller, identical sub-problems. Every recursive function needs two things:

1. **Base case** — the condition that stops the recursion
2. **Recursive case** — the function calling itself with a simpler input

```c
#include <stdio.h>

int factorial(int n) {
    // Base case
    if (n <= 1) return 1;
    
    // Recursive case
    return n * factorial(n - 1);
}

int main() {
    printf("5! = %d\n", factorial(5));  // 120
    return 0;
}
```

### How It Unfolds

```
factorial(5)
  = 5 * factorial(4)
  = 5 * 4 * factorial(3)
  = 5 * 4 * 3 * factorial(2)
  = 5 * 4 * 3 * 2 * factorial(1)
  = 5 * 4 * 3 * 2 * 1
  = 120
```

## The Call Stack

Each recursive call creates a new **stack frame** — a block of memory holding the function's local variables and return address. The frames stack up as calls deepen, then unwind as they return.

> **Warning:** Too many recursive calls without hitting the base case causes a **stack overflow** — the program crashes because it runs out of stack memory. Typical stack limits are 1–8 MB.

```c
// BAD: Missing base case — infinite recursion → stack overflow!
void infinite() {
    infinite();
}

// BAD: Base case never reached
int bad_countdown(int n) {
    if (n == 0) return 0;
    return bad_countdown(n + 1);  // Goes the wrong direction!
}
```

## Classic Examples

### Fibonacci Sequence

```c
// Simple but inefficient (exponential time complexity)
int fib(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fib(n - 1) + fib(n - 2);
}

// Much better: memoized version
int fib_memo(int n, int cache[]) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    if (cache[n] != -1) return cache[n];
    
    cache[n] = fib_memo(n - 1, cache) + fib_memo(n - 2, cache);
    return cache[n];
}
```

> **Performance Note:** Naive `fib(40)` makes over **200 million** calls. The memoized version makes only 39. Always consider whether recursion is the right tool.

### Power Function

```c
// O(n) recursive approach
int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

// O(log n) — fast exponentiation
int fast_power(int base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        int half = fast_power(base, exp / 2);
        return half * half;
    }
    return base * fast_power(base, exp - 1);
}
```

### Binary Search (Recursive)

```c
int binary_search(int arr[], int low, int high, int target) {
    if (low > high) return -1;  // Not found
    
    int mid = low + (high - low) / 2;
    
    if (arr[mid] == target) return mid;
    if (arr[mid] > target)
        return binary_search(arr, low, mid - 1, target);
    else
        return binary_search(arr, mid + 1, high, target);
}
```

## Tail Recursion

A recursive call is **tail recursive** if it's the very last operation in the function. Some compilers can optimize tail recursion into a loop, preventing stack overflow.

```c
// NOT tail recursive — multiplication happens AFTER the recursive call
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Tail recursive — the recursive call IS the last operation
int factorial_tail(int n, int acc) {
    if (n <= 1) return acc;
    return factorial_tail(n - 1, n * acc);
}

// Usage: factorial_tail(5, 1)
```

> **Note:** The C standard does not guarantee tail-call optimization. GCC does it with `-O2` or higher. For safety-critical code, use iterative loops instead.

## Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Readability | Often more elegant | Can be verbose |
| Memory | Uses stack frames | Constant memory |
| Speed | Function call overhead | Generally faster |
| Stack risk | Can overflow | No stack risk |
| Best for | Trees, graphs, divide-and-conquer | Simple counting, array processing |

## Practical Example: Tower of Hanoi

```c
#include <stdio.h>

void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\n", from, to);
        return;
    }
    hanoi(n - 1, from, aux, to);
    printf("Move disk %d from %c to %c\n", n, from, to);
    hanoi(n - 1, aux, to, from);
}

int main() {
    hanoi(3, 'A', 'C', 'B');
    return 0;
}
```

## Summary

- Every recursive function needs a **base case** and a **recursive case**
- Each call consumes stack memory — beware of deep recursion
- Memoization can dramatically improve performance
- Consider iteration for simple problems; use recursion for naturally recursive structures (trees, directories, mathematical sequences)
