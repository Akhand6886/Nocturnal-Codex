---
title: "Synchronization"
description: "Thread safety with synchronized, volatile, and locks"
---

## What is Synchronization in Java?

In **Java**, when multiple **Threads** access the same data (like a shared variable or an object) at the same time, they can interfere with each other. This is called a **Race Condition**, and it leads to unpredictable bugs.

**Synchronization** is a mechanism that allows you to ensure that only **ONE** thread can access a specific piece of code at a time.

```java
public class Counter {
    private int count = 0;

    // ONLY one thread can use this method at once!
    public synchronized void increment() {
        count++;
    }
}
```

## Comparisons: Methods vs. Blocks

Wait! Should you synchronize a whole method or just a part of it?

| Type | Syntax | Behavior |
| :--- | :--- | :--- |
| **Method** | `public synchronized void f()` | Locks the entire object. |
| **Block** | `synchronized(obj) { ... }` | Locks only a few lines. **(FASTER!)** |

```java
public void update(String data) {
    // Only lock the part that changes the shared data!
    synchronized(this) {
        this.data = data;
    }
}
```

## Special Tools: `volatile` and `atomic`

Sometimes using a full lock is too slow. Java provides "lighter" ways to ensure thread safety:

-   **`volatile`**: Tells the JVM to NEVER cache a variable. All threads will read the latest value directly from your computer's RAM.
-   **`AtomicInteger`**: Uses advanced CPU instructions (CAS) to update numbers without needing any locks at all! (High performance).

```java
import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet(); // Thread-safe! No 'synchronized' needed!
```

## Why use Synchronization?

1.  **Data Integrity**: Prevent data from being corrupted when multiple users (threads) are modifying it at the same time.
2.  **Consistency**: Ensure that every thread sees the latest version of the data.
3.  **Sequential Access**: Force threads to "wait in line" for critical resources like a printer or a database.

## Summary

| Term | Description |
| :--- | :--- |
| **Synchronized**| Keyword to lock an object |
| **Race C.** | Bug caused by two threads fighting for data |
| **Monitor** | The "Internal Lock" every Java object has |
| **Atomic** | Classes that perform lock-free math |
| **Volatile** | Ensure a variable is always read from main memory |
| **Best For** | Multi-threaded apps, shared data, server-side logic |
| **Locking** | Only lock the bare minimum code to keep it fast! |
| **Deadlock** | When two threads wait for each other FOREVER (AVOID!) |
| **Concurrent** | Advanced high-speed collections in `java.util.concurrent` |
| **Visibility** | Making sure change in one thread is seen by others |
| **Mutual Excl** | One thread at a time (The fundamental rule!) |
| **Intrinsic L.** | Another name for the object-level lock |
| **Static Lock** | `static synchronized` (Locks the WHOLE class!) |
| **Reentrant** | A thread can enter a lock it already owns! |
| **Fairness** | `ReentrantLock(true)` (Wait in order!) |
| **Performance** | Synchronization adds a tiny speed penalty |
| **Modern** | Virtual Threads (Java 21+) make locking much safer |
| **Thread Loc** | `ThreadLocal` (Give each thread its own copy of data!) |
| **Join/Wait** | Basic coordination tools (`wait`, `notify`) |
| **Completable**| Functional asynchronous logic (Java 8+) |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Resource** | Locking too many things leads to a slow program |
| **Strategy** | Immutability is the ultimate thread-safety! |
