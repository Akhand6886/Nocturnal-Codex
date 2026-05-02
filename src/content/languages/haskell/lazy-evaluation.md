---
title: "Lazy Evaluation"
description: "Understanding Haskell's 'wait-and-see' approach to computation."
category: "Basics"
order: 5
---

## What is Laziness?

In most languages, when you call a function, all arguments are evaluated before the function runs. In Haskell, arguments are only evaluated when they are **forced**.

### Infinite Data Structures

Because of laziness, you can define infinite lists without crashing your program.

```haskell
-- An infinite list of numbers starting from 1
allNumbers = [1..]

-- Take the first 5 elements
firstFive = take 5 allNumbers -- [1,2,3,4,5]
```

### Performance Benefits

Laziness allows for powerful abstractions like "short-circuiting" functions and efficient data processing pipelines.

```haskell
-- Only the necessary elements are computed
result = filter (> 10) [1..100] !! 0 -- Returns 11 immediately
```

### Caveats

Lazy evaluation can sometimes lead to **space leaks** if not understood properly, as the compiler builds up a chain of unevaluated computations (thunks).
