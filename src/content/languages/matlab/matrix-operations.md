---
title: "Matrix Operations"
description: "Linear Algebra, Element-wise operations, and Vectorization"
---

## The Core of MATLAB

**MATLAB** stands for **Matrix Laboratory**. The language is optimized for linear algebra. Most operations work on entire matrices without needing a loop.

## 1. Standard Matrix Operations

These follow the rules of Linear Algebra.

```matlab
A = [1 2; 3 4];
B = [5 6; 7 8];

C = A + B;  % Addition
D = A * B;  % Matrix Multiplication (Inner product)
E = A';     % Transpose
F = inv(A); % Inverse
```

## 2. Element-wise Operations (The Dot Operator)

Wait! If you want to multiply every element of A by the corresponding element of B (instead of doing a matrix product), you use the **Dot Operator (`.`)**.

```matlab
G = A .* B; % Element-wise multiplication
H = A .^ 2; % Square every element individually
```

## 3. Concatenation

You can build larger matrices from smaller ones.

```matlab
row = [1 2];
new_row = [row 3 4]; % [1 2 3 4]
```

## Vectorization

Wait! This is the most important concept for high-performance MATLAB. Instead of using a `for` loop to calculate the sine of every number in a list, you just pass the list to the `sin()` function.

```matlab
# DO THIS:
x = 0:0.01:10;
y = sin(x);

# NOT THIS (100x slower):
for i = 1:length(x)
    y(i) = sin(x(i));
end
```

## Summary

| Operator | Description |
| :--- | :--- |
| **\*** | Matrix Multiplication |
| **.\*** | Element-wise Multiplication |
| **^** | Matrix Power |
| **.^** | Element-wise Power |
| **'** | Complex Conjugate Transpose |
| **.**' | Array Transpose |
| **\** | Matrix Left Division (Solves `Ax = B` as `x = A\B`) |
| **Logic** | "Operations apply to the whole structure" |
| **Safety** | Dimension checking ensures math is valid |
| **Modern** | Highly optimized using the BLAS and LAPACK libraries |
| **Standard** | Vectorization is the "Gold Standard" of MATLAB programming |
| **Identity** | The reason why MATLAB is preferred for engineering over general-purpose languages |
