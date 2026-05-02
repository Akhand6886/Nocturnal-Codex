---
title: "Control Flow"
description: "if, case, while, and the importance of test brackets"
---

## Conditional Logic (`if`)

In **Bash**, the `if` statement uses a specific syntax ending with `fi` (if backwards).

```bash
if [[ $score -ge 90 ]]; then
    echo "Excellent"
elif [[ $score -ge 80 ]]; then
    echo "Good"
else
    echo "Try again"
fi
```

Wait! Notice the **`[[ ]]`** brackets. This is the modern Bash "Test" syntax. Inside these brackets, you use specific operators for comparisons:

-   **`-eq`**, **`-ne`**, **`-gt`**, **`-ge`**: Numeric comparisons.
-   **`==`**, **`!=`**: String comparisons.
-   **`-f`**, **`-d`**: File and Directory checks.

## The `case` Statement

`case` is useful for matching a variable against multiple patterns. It ends with `esac`.

```bash
case $filename in
    *.jpg|*.png)
        echo "It's an image"
        ;;
    *.txt)
        echo "It's a text file"
        ;;
    *)
        echo "Unknown format"
        ;;
esac
```

## Loops in Shell

1.  **`for`**: Iterating through a list or a range.
2.  **`while`**: Running as long as a command succeeds.

```bash
# Iterating through files
for file in *.txt; do
    echo "Processing $file"
done

# Iterating through a range
for i in {1..5}; do
    echo "Step $i"
done
```

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / elif / else** | Basic branching |
| **[[ ]]** | The "Test" operator (Modern) |
| **case** | Pattern matching branch |
| **for** | Iteration |
| **while** | Conditional loop |
| **&& / ||** | Boolean logic and "Short-circuit" execution |
| **Logic** | "Decision making based on command results" |
| **Safety** | Always use `[[ ]]` instead of `[ ]` for better safety and features |
| **Modern** | Concise syntax for complex file checks |
| **Standard** | Use `(( ))` for purely mathematical logic |
| **Identity** | Control flow in shell is based on the "Exit Code" of commands |
