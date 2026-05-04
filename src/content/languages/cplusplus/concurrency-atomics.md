---
title: "Concurrency & Atomics"
description: "Mastering multi-threading, synchronization, and low-level lock-free programming"
---

## Multithreading in Modern C++

Since C++11, the language has a built-in memory model and a standard threading library. This allows you to write portable concurrent code without relying on platform-specific APIs like pthreads or WinAPI.

## 1. Starting Threads

You can run any function in a separate OS thread using `std::thread`.

```cpp
#include <thread>

void worker(int id) {
    std::cout << "Thread " << id << " working..." << std::endl;
}

int main() {
    std::thread t1(worker, 1);
    t1.join(); // Wait for it to finish
}
```

## 2. Synchronization with Mutexes

To prevent **Data Races** (multiple threads modifying the same data simultaneously), use a `std::mutex` and a **Lock Guard** (RAII).

```cpp
#include <mutex>

std::mutex mtx;
int counter = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mtx); // Locks here, unlocks at end of scope
    counter++;
}
```

## 3. Asynchronous Tasks with `std::async`

If you want to run a task and get a result back without managing threads manually, use `std::async` and `std::future`.

```cpp
#include <future>

int calculate() { return 42; }

auto fut = std::async(std::launch::async, calculate);
int result = fut.get(); // Blocks until result is ready
```

## 4. Atomic Operations

For simple types (like counters or flags), using a Mutex is often overkill and slow. **Atomics** provide hardware-level synchronization that is much faster and "lock-free."

```cpp
#include <atomic>

std::atomic<int> safe_counter(0);

void increment() {
    safe_counter++; // Thread-safe without a Mutex!
}
```

## 5. Condition Variables

Used for thread signaling. One thread waits for a condition to be met, and another thread notifies it when the condition changes.

```cpp
std::condition_variable cv;
std::mutex mtx;
bool ready = false;

// Thread 1
{
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; }); // Wait until ready is true
}

// Thread 2
{
    std::lock_guard<std::mutex> lock(mtx);
    ready = true;
    cv.notify_one();
}
```

## Summary Checklist
- [x] Use `std::thread` or `std::jthread` (C++20) for manual thread management.
- [x] Use `std::lock_guard` for simple locking.
- [x] Use `std::async` for high-level asynchronous results.
- [x] Use `std::atomic<T>` for high-performance shared variables.
- [x] Use `std::condition_variable` for complex coordination between threads.
- [x] Avoid "Global Locks" to prevent performance bottlenecks.
---
