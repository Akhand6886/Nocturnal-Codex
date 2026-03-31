---
title: "Logging"
description: "logging module, log levels, handlers, and formatters"
---

## What is Python Logging?

In development, we use `print()` to see what's happening. But in real-world applications, you need something more robust. The **`logging`** module allows you to track events, errors, and system status in a standard way, often directing output to files or remote services.

```python
import logging

# Basic logging setup
logging.basicConfig(level=logging.INFO)

# Log messages at different levels
logging.debug("This is a debug message (won't show!)")
logging.info("Information: System started.")
logging.warning("Warning: Logic might fail soon.")
logging.error("Error: Could not connect to DB.")
logging.critical("Critical error! System crashed.")
```

## Log Levels: When to Use Each

| Level | Value | Used For... |
| :--- | :--- | :--- |
| **DEBUG** | 10 | Detailed info, usually only for developers. |
| **INFO** | 20 | Normal system events (startup, user login).|
| **WARNING** | 30 | Something unexpected happened, but system still works. |
| **ERROR** | 40 | Serious problem; some functionality failed. |
| **CRITICAL** | 50 | Fatal error; the program cannot continue. |

## Configuring the Logger: `basicConfig`

You can easily configure logging to write to a file with customized formatting.

```python
import logging

logging.basicConfig(
    filename="app.log",
    filemode="a", # 'w' to overwrite, 'a' to append
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.DEBUG
)

logging.info("Recording to file now!")
```

## Advanced Logging: Components

For larger projects, you should use the component-based approach with `Loggers`, `Handlers`, and `Formatters`.

1.  **Loggers**: The application interface for logging.
2.  **Handlers**: Determine where logs go (Console, File, Email, etc.).
3.  **Formatters**: Define the text format of your logs.

```python
import logging

# 1. Create a custom logger
logger = logging.getLogger("auth_system")
logger.setLevel(logging.DEBUG)

# 2. Create handlers
console_handler = logging.StreamHandler() # Output to console
file_handler = logging.FileHandler("error.log") # Output to file
file_handler.setLevel(logging.ERROR) # ONLY log ERRORs and above to file!

# 3. Create a formatter
formatter = logging.Formatter("%(name)s [%(levelname)s]: %(message)s")
console_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

# 4. Add handlers to the logger
logger.addHandler(console_handler)
logger.addHandler(file_handler)

# Use it!
logger.info("Service is starting up...")
logger.error("Failed to authenticate user 'Admin'")
```

## Capturing Exception Details

Logging is especially useful for recording the full "stack trace" of an error when an exception occurs. Use `exc_info=True`.

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    # Log the full traceback!
    logging.error("Math error occurred", exc_info=True)
```

## Why Not Use `print()`?

1.  **Metadata**: Logging includes timestamps, log level, and the file/line where the event occurred.
2.  **Granularity**: You can easily turn off `DEBUG` messages when your app goes into production.
3.  **Multiple Outputs**: Send logs to a file, database, and your terminal simultaneously!
4.  **Standardization**: Every Python third-party library uses the `logging` module, meaning you can capture logs from your dependencies too.

## Summary

| Term | Description |
| :--- | :--- |
| **basicConfig** | Simple setup for logging to console/file |
| **Log Levels** | DEBUG, INFO, WARNING, ERROR, CRITICAL |
| **Logger** | The main interface to record logic |
| **Handler** | Directs logs to specific locations |
| **Formatter** | Controls the layout of the log text |
| **exc_info** | Include stack trace (traceback) in logs |
| **Best For** | Error tracking, audits, system monitoring |
| **Rotation** | Use `RotatingFileHandler` to prevent logs from getting too large |
