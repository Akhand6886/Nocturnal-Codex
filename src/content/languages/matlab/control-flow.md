---
title: "Control Flow"
description: "if/else, switch, for, and while in MATLAB"
---

## Conditional Logic (`if`)

In **MATLAB**, `if` statements are terminated with the **`end`** keyword. Braces are not used.

```matlab
if score >= 90
    disp('Grade A')
elseif score >= 80
    disp('Grade B')
else
    disp('Try again')
end
```

## The `switch` Statement

The `switch` statement in MATLAB is clean and does not require a `break` keyword.

```matlab
switch day
    case 'Monday'
        disp('Start of week')
    case {'Saturday', 'Sunday'} % You can group cases in a cell array!
        disp('Weekend')
    otherwise
        disp('Work day')
end
```

## Loops in MATLAB

1.  **`for`**: Usually used to iterate over a range or a vector.
2.  **`while`**: Runs as long as a condition is true.

```matlab
for i = 1:5
    disp(i)
end
```

Wait! While loops are available, you should always try to **Vectorize** your code first. Vectorized code runs hundreds of times faster than manual loops in MATLAB.

## The `break` and `continue` Keywords

-   **`break`**: Exits the loop immediately.
-   **`continue`**: Skips the rest of the current iteration and moves to the next one.

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / elseif / else** | Standard branching |
| **switch / case** | Multi-way branch |
| **otherwise** | The "default" case for switch |
| **for** | Iteration loop |
| **while** | Conditional loop |
| **end** | Required to close every block |
| **Logic** | Essential for implementing algorithms and logic |
| **Safety** | Clear, keyword-based structure |
| **Modern** | Highly optimized for numeric and logical indexing |
| **Standard** | Indent with 4 spaces for readability |
| **Identity** | MATLAB's control flow is designed to be simple and mathematical |
