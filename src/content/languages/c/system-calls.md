---
title: "System Calls"
description: "open, read, write, close — POSIX I/O at the kernel boundary"
---

## What Are System Calls?

System calls are the interface between your program and the operating system kernel. While `stdio.h` functions like `printf` and `fopen` are buffered wrappers, system calls interact directly with the kernel.

## Low-Level File I/O

```c
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main() {
    // Open a file (returns a file descriptor, not FILE*)
    int fd = open("data.txt", O_RDONLY);
    if (fd == -1) {
        perror("open");
        return 1;
    }
    
    // Read from file
    char buffer[1024];
    ssize_t bytes_read = read(fd, buffer, sizeof(buffer) - 1);
    if (bytes_read > 0) {
        buffer[bytes_read] = '\0';
        printf("Read %zd bytes:\n%s\n", bytes_read, buffer);
    }
    
    // Close the file descriptor
    close(fd);
    return 0;
}
```

## `stdio` vs System Calls

| Feature | `stdio` (fopen) | System calls (open) |
|---------|---------|------|
| Returns | `FILE*` | int (file descriptor) |
| Buffering | Yes (automatic) | No (raw) |
| Portability | C standard | POSIX |
| Performance | Higher-level | Lower-level, less overhead |

## Writing with System Calls

```c
#include <fcntl.h>
#include <unistd.h>

int main() {
    int fd = open("output.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd == -1) { perror("open"); return 1; }
    
    const char *message = "Hello from system calls!\n";
    write(fd, message, strlen(message));
    
    close(fd);
    return 0;
}
```

## Standard File Descriptors

| fd | Name | C equivalent |
|----|------|-------------|
| 0 | `STDIN_FILENO` | `stdin` |
| 1 | `STDOUT_FILENO` | `stdout` |
| 2 | `STDERR_FILENO` | `stderr` |

```c
// Write directly to stdout
write(STDOUT_FILENO, "Hello!\n", 7);

// Write to stderr
write(STDERR_FILENO, "Error!\n", 7);
```

## Summary

System calls give you direct kernel access at the cost of portability and convenience. Use them when you need fine-grained control over I/O, or when building systems software.
