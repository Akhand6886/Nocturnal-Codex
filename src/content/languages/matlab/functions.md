---
title: "Functions"
description: "Creating scripts, functions, and multiple output values in MATLAB"
---

## Defining Functions

In **MATLAB**, functions are usually saved in their own files with the same name as the function. They start with the `function` keyword.

```matlab
function result = addNumbers(a, b)
    result = a + b;
end
```

## Multiple Output Values

Wait! This is a powerful feature of MATLAB. A function can return more than one value at the same time.

```matlab
function [sum, product] = calculate(a, b)
    sum = a + b;
    product = a * b;
end

[s, p] = calculate(10, 5); % Calling the function
```

## Input and Output Arguments

-   **`nargin`**: A special variable inside a function that tells you how many arguments the user actually passed.
-   **`nargout`**: A special variable that tells you how many outputs the user is expecting.

## Anonymous Functions

For simple, one-line calculations, you can define a function on the fly using the **`@`** symbol.

```matlab
square = @(x) x.^2;
disp(square(5)); % 25
```

## Scripts vs. Functions

1.  **Script**: A list of commands that run in the global workspace. Best for quick tests and analysis.
2.  **Function**: Has its own local workspace. Best for reusable modules and large programs.

## Summary

| Term | Description |
| :--- | :--- |
| **function** | Keyword to declare a function |
| **[out1, out2]** | Syntax for multiple return values |
| **@** | Syntax for anonymous functions |
| **nargin** | Number of input arguments |
| **nargout** | Number of output arguments |
| **Best For** | Reusable algorithms and modular engineering code |
| **Logic** | "Functional blocks with clear inputs and outputs" |
| **Safety** | Local workspaces prevent variables from conflicting |
| **Modern** | Functions can now be defined at the end of scripts (since R2016b) |
| **Standard** | Function names should match their filename (`myFunc.m`) |
| **Identity** | The foundation of all MATLAB toolboxes |
