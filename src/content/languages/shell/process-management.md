---
title: "Process Management"
description: "Monitoring, backgrounding, and killing processes in the shell"
---

## What is a Process?

Every time you run a command, the operating system creates a **Process**. Each process has a unique **PID** (Process ID).

## Viewing Processes

-   **`ps aux`**: See every process running on the system.
-   **`top`** / **`htop`**: Real-time view of CPU and memory usage.

## Foreground vs. Background

1.  **Foreground**: The command is running and you can't use the terminal until it finishes.
2.  **Background (`&`)**: Adding an ampersand to the end of a command runs it in the background, giving you back control of your terminal immediately.

```bash
long_running_task &
```

## Suspending and Resuming

Wait! If a process is running in the foreground, you can press **`Ctrl + Z`** to "Suspend" (pause) it.
-   **`bg`**: Resume the suspended process in the **Background**.
-   **`fg`**: Resume the suspended process in the **Foreground**.

## Killing Processes

If a program is frozen or you need to stop it, use the **`kill`** command with its PID.

```bash
kill 1234      # Graceful stop
kill -9 1234   # Forceful stop (DANGEROUS!)
```

## Summary

| Term | Description |
| :--- | :--- |
| **PID** | Process ID (Unique number) |
| **&** | Run in background |
| **jobs** | List background tasks in the current shell |
| **kill** | Send a signal to a process |
| **SIGTERM (15)**| Graceful exit signal (Default) |
| **SIGKILL (9)** | Immediate exit (No cleanup!) |
| **Best For** | Monitoring system health and managing server tasks |
| **Logic** | "Operational control over your computer" |
| **Safety** | Be careful with `kill -9`; it can leave files corrupted |
| **Modern** | Tools like `htop` or `btop` provide beautiful visual monitoring |
| **Standard** | Part of every Unix-like operating system |
| **Identity** | Knowing how to manage processes is the mark of a "Power User" |
