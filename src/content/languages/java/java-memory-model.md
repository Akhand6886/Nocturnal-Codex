---
title: "Java Memory Model (JMM)"
description: "The rules for thread visibility and synchronization"
---

## What is the JMM?

In a multi-threaded environment, CPUs often have their own local caches. A thread might update a variable in its local cache, but other threads running on different CPU cores might not see that update immediately.

The **Java Memory Model (JMM)** is a set of rules that determines when a write to a variable by one thread is guaranteed to be visible to a read by another thread.

## The core concepts

### 1. Visibility
Visibility means that if Thread A changes a variable, Thread B can see that change. Without proper synchronization, visibility is **not guaranteed**.

```java
// Thread A
done = true; 

// Thread B
while (!done) { 
    // This loop might run forever if 'done' is cached in Thread B's CPU!
}
```

### 2. The `volatile` Keyword
The `volatile` keyword solves the visibility problem. It tells the JVM: "Don't cache this variable locally. Always read and write directly to the main memory."

```java
private volatile boolean done = false;
```

### 3. Atomicity
Even if a variable is `volatile`, operations on it might not be atomic. For example, `count++` is actually 3 operations: (Read -> Add -> Write). A thread switch can happen between these steps.

For atomicity, use `synchronized` blocks or `Atomic` classes from `java.util.concurrent.atomic`.

---

## Happens-Before Relationship

The JMM defines a **"Happens-Before"** relationship. If Action A happens-before Action B, then the results of Action A are guaranteed to be visible to Action B.

Key Happens-Before Rules:
- **Program Order**: Each action in a single thread happens-before every subsequent action in that same thread.
- **Volatile Write/Read**: A write to a `volatile` field happens-before every subsequent read of that same field.
- **Monitor Lock**: Releasing a lock (leaving a `synchronized` block) happens-before every subsequent acquisition of that same lock.
- **Thread Start**: Calling `Thread.start()` happens-before any actions in the started thread.

## Summary Checklist
- [x] JMM defines how threads interact via memory.
- [x] `volatile` ensures **Visibility** but NOT **Atomicity**.
- [x] `synchronized` ensures both **Visibility** and **Atomicity**.
- [x] Understand **Happens-Before** to avoid subtle concurrency bugs (Data Races).
- [x] Always prefer high-level concurrency utilities over manual `volatile`/`synchronized` where possible.
