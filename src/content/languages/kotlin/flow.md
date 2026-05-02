---
title: "Kotlin Flow"
description: "Reactive streams with Coroutines for handling asynchronous data sequences."
category: "Intermediate"
order: 11
---

## Reactive Programming with Flow

`Flow` is a cold asynchronous stream that emits values sequentially and completes normally or with an exception.

### Flow vs. List

| Type | Cold/Hot | Characteristics |
|------|----------|-----------------|
| **List** | Hot | All values computed upfront. |
| **Flow** | Cold | Computed on demand; only starts when collected. |

### Creating a Flow

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun simpleFlow(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100) // Pretend we are doing something useful
        emit(i) // Emit next value
    }
}

fun main() = runBlocking {
    simpleFlow().collect { value -> 
        println(value) 
    }
}
```

### Operators

Flow provides a rich set of operators similar to RxJava or collections.

- **Transform**: `map`, `filter`, `transform`.
- **Terminal**: `collect`, `toList`, `first`, `reduce`.
- **Flattening**: `flatMapConcat`, `flatMapMerge`.

### Summary Table

| Operator | Effect |
|----------|--------|
| `onEach` | Execute side effects on each emission. |
| `catch` | Handle exceptions in the stream. |
| `flowOn` | Change the dispatcher for emissions. |
| `combine` | Merge two flows into one. |
