---
title: "Multithreading"
description: "POSIX threads (pthreads), mutexes, and condition variables"
---

## What Are Threads?

A thread is a lightweight unit of execution within a process. Multiple threads share the same memory space, allowing concurrent execution and efficient data sharing.

## Creating Threads with pthreads

```c
#include <stdio.h>
#include <pthread.h>

void *worker(void *arg) {
    int id = *(int*)arg;
    printf("Thread %d is running\n", id);
    return NULL;
}

int main() {
    pthread_t threads[4];
    int ids[4];
    
    for (int i = 0; i < 4; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, worker, &ids[i]);
    }
    
    for (int i = 0; i < 4; i++) {
        pthread_join(threads[i], NULL);  // Wait for completion
    }
    
    printf("All threads finished\n");
    return 0;
}
```

Compile with: `gcc -pthread program.c -o program`

## The Data Race Problem

When threads access shared data without synchronization:

```c
int counter = 0;  // Shared between threads

void *increment(void *arg) {
    for (int i = 0; i < 1000000; i++) {
        counter++;  // NOT thread-safe! Read-modify-write race
    }
    return NULL;
}
// With 2 threads, counter should be 2,000,000 but often isn't!
```

## Mutexes — Mutual Exclusion

```c
#include <pthread.h>

int counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void *safe_increment(void *arg) {
    for (int i = 0; i < 1000000; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}
```

> **Rule:** Keep the critical section (code between lock/unlock) as small as possible. Lock contention kills performance.

## Condition Variables

Condition variables let threads wait for a specific condition:

```c
pthread_mutex_t mtx = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int ready = 0;

void *producer(void *arg) {
    pthread_mutex_lock(&mtx);
    ready = 1;
    pthread_cond_signal(&cond);  // Wake one waiting thread
    pthread_mutex_unlock(&mtx);
    return NULL;
}

void *consumer(void *arg) {
    pthread_mutex_lock(&mtx);
    while (!ready) {
        pthread_cond_wait(&cond, &mtx);  // Atomically unlock and wait
    }
    printf("Data is ready!\n");
    pthread_mutex_unlock(&mtx);
    return NULL;
}
```

## Common Threading Pitfalls

| Bug | Cause | Fix |
|-----|-------|-----|
| Data race | Unsynchronized shared access | Use mutexes |
| Deadlock | Two threads waiting on each other's locks | Lock ordering |
| Race condition | Outcome depends on timing | Proper synchronization |

## Summary

| Function | Purpose |
|----------|---------|
| `pthread_create` | Start a new thread |
| `pthread_join` | Wait for thread to finish |
| `pthread_mutex_lock/unlock` | Protect critical sections |
| `pthread_cond_wait/signal` | Thread synchronization |
