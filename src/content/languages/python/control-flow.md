---
title: "Control Flow"
description: "if/elif/else, for, while, match-case (3.10+), break, continue"
---

## Conditional Statements

Python uses `if`, `elif` (else if), and `else` for decision-making. Significant indentation defines the code blocks.

```python
score = 85

if score >= 90:
    print("Excellent!")
elif score >= 80:
    print("Good job!")
elif score >= 70:
    print("Fair.")
else:
    print("Needs improvement.")
```

**Single-line (Ternary) Expression**: For simple `if/else` logic in one line.

```python
msg = "Passed" if score >= 40 else "Failed"
print(msg)
```

## Loops: `for` and `while`

### 1. `for` Loop

Use it to iterate over any sequence (list, string, range, tuple).

```python
# Simple range (0 to 4)
for i in range(5):
    print(i)

# Over a list
names = ["Alpha", "Beta", "Gamma"]
for name in names:
    print(f"User: {name}")

# Enumerate (index and value)
for idx, name in enumerate(names):
    print(f"{idx}: {name}")
```

### 2. `while` Loop

Use it to repeat code as long as a condition is `True`.

```python
count = 5
while count > 0:
    print(f"Countdown: {count}")
    count -= 1
print("Launch! 🚀")
```

## Loop Control: `break`, `continue`, `else`

- **break**: Stops the loop completely.
- **continue**: Skips the current iteration and jumps to the next.
- **pass**: A null operation; used when syntax requires a statement but you don't want to do anything.
- **else**: (Wait!) In loops, the `else` block runs *only* if the loop finishes normally (not if it's broken).

```python
# Search for prime number
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            print(f"{n} is composite")
            break
    else:
        # Loop finished without finding a divisor
        print(f"{n} IS PRIME!")
```

## Structural Pattern Matching (`match-case`)

Introduced in **Python 3.10**, this is a powerful alternative to complex `if/elif` chains.

```python
status = 404

match status:
    case 200:
        print("Success")
    case 404:
        print("Not Found")
    case 500 | 501:  # Multiple values
        print("Server Error")
    case _:  # Default (underscore is a wildcard)
        print("Unknown Status")
```

> **Advanced Case**: Match against data structures and capture values.
> ```python
> match command.split():
>     case ["quit"]: quit()
>     case ["load", filename]: load_file(filename)
>     case ["move", x, y] if int(x) > 0: move_to(x, y)
> ```

## Summary

| Feature | Usage | Purpose |
| :--- | :--- | :--- |
| **if/elif/else** | `if x > 0:` | Branching |
| **for** | `for x in seq:` | Iteration |
| **while** | `while x > 0:` | Condition-based loop |
| **break** | `break` | Terminate loop |
| **continue** | `continue` | Skip iteration |
| **match-case** | `match x:` | Better branching (3.10+) |
