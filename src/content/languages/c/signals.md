---
title: "Signals"
description: "Signal handling with signal() and sigaction()"
---

## What Are Signals?

Signals are software interrupts sent to a process by the operating system or another process. They notify your program of events like `Ctrl+C`, segmentation faults, or timer expirations.

## Common Signals

| Signal | Number | Default Action | Cause |
|--------|--------|---------------|-------|
| `SIGINT` | 2 | Terminate | `Ctrl+C` |
| `SIGTERM` | 15 | Terminate | `kill` command |
| `SIGSEGV` | 11 | Core dump | Segmentation fault |
| `SIGALRM` | 14 | Terminate | Timer expired |
| `SIGKILL` | 9 | Terminate | Forced kill (uncatchable) |

## Handling Signals with `signal()`

```c
#include <stdio.h>
#include <signal.h>
#include <unistd.h>

volatile sig_atomic_t running = 1;

void handle_sigint(int sig) {
    printf("\nCaught SIGINT! Cleaning up...\n");
    running = 0;
}

int main() {
    signal(SIGINT, handle_sigint);
    
    printf("Running... Press Ctrl+C to stop.\n");
    while (running) {
        sleep(1);
        printf("Working...\n");
    }
    
    printf("Exited gracefully.\n");
    return 0;
}
```

## The Modern Way: `sigaction()`

`sigaction` is more reliable and portable than `signal`:

```c
#include <stdio.h>
#include <signal.h>

void handler(int sig) {
    printf("Received signal %d\n", sig);
}

int main() {
    struct sigaction sa;
    sa.sa_handler = handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    
    sigaction(SIGINT, &sa, NULL);
    sigaction(SIGTERM, &sa, NULL);
    
    printf("Waiting for signals... (PID: %d)\n", getpid());
    pause();  // Wait for a signal
    return 0;
}
```

> **Best Practice:** Use `sigaction` over `signal` for reliable behavior across platforms. Signal handlers should be minimal — set a flag, nothing more.

## Summary

| Function | Purpose |
|----------|---------|
| `signal(sig, handler)` | Register a signal handler (simple) |
| `sigaction(sig, &sa, NULL)` | Register a handler (robust) |
| `raise(sig)` | Send signal to yourself |
| `kill(pid, sig)` | Send signal to another process |
| `pause()` | Wait for any signal |
