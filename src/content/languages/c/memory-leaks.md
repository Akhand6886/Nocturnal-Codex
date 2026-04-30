---
title: "Memory Leaks"
description: "Detection, prevention, and tools like Valgrind"
---

## What Is a Memory Leak?

A memory leak occurs when dynamically allocated memory is never freed. Over time, leaked memory accumulates, consuming more and more RAM until the program — or the entire system — slows to a crawl.

```c
void leaky_function() {
    int *data = malloc(1000 * sizeof(int));
    // ... use data ...
    // BUG: forgot to call free(data)!
}   // data pointer is gone, but the 4000 bytes are still allocated
```

## Common Leak Patterns

### Lost Pointer

```c
int *p = malloc(100);
p = malloc(200);   // The first 100 bytes are now leaked!
// Fix: free(p) before reassigning
```

### Early Return Without Cleanup

```c
int process() {
    char *buf = malloc(1024);
    if (some_error) return -1;  // LEAK! buf is not freed
    free(buf);
    return 0;
}

// Fix: goto-based cleanup
int process_fixed() {
    char *buf = malloc(1024);
    int result = 0;
    if (some_error) { result = -1; goto cleanup; }
    // ... work ...
cleanup:
    free(buf);
    return result;
}
```

## Detection with Valgrind

Valgrind is the gold standard for detecting memory leaks on Linux:

```bash
gcc -g program.c -o program
valgrind --leak-check=full ./program
```

Sample output:

```
==12345== 400 bytes in 1 blocks are definitely lost
==12345==    at malloc (vg_replace_malloc.c:...)
==12345==    by main (program.c:10)
==12345==
==12345== LEAK SUMMARY:
==12345==    definitely lost: 400 bytes in 1 blocks
```

## Prevention Strategies

1. **Pair every `malloc` with a `free`** — treat them like parentheses
2. **Use a consistent cleanup pattern** (goto or wrapper functions)
3. **Set freed pointers to NULL** — makes double-free crashes easier to catch
4. **Use AddressSanitizer** — compile with `-fsanitize=address` for runtime checks

```bash
gcc -fsanitize=address -g program.c -o program
./program  # Prints detailed error on any memory bug
```

## Summary

| Tool | Platform | Usage |
|------|----------|-------|
| Valgrind | Linux | `valgrind --leak-check=full ./prog` |
| AddressSanitizer | All | `gcc -fsanitize=address` |
| LeakSanitizer | Linux/macOS | Built into ASan |
