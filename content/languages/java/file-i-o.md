---
title: "File I/O"
description: "Reading and writing files with legacy java.io and modern java.nio (NIO.2)"
---

## What is Java File I/O?

In **Java**, if you want to read from or write data to a file, you use the standard library's **Input/Output (I/O)** features. There are two "generations" of I/O in Java:

1.  **Legacy I/O** (`java.io`): Older, simpler, but can be slow.
2.  **Modern I/O** (`java.nio`): Introduced in **Java 7**, this is much faster and uses non-blocking logic.

```java
import java.nio.file.*;
import java.io.IOException;

// Modern logic!
Path path = Paths.get("data.txt");
Files.writeString(path, "Hello, Java!");

String content = Files.readString(path);
```

## Comparisons: Readers vs Streams

Wait! Before you read a file, you must pick the right "lane" based on what data is inside:

-   **Readers/Writers**: For **Text** files. (Handles character encoding like UTF-8 automatically).
-   **InputStream/OutputStream**: For **Binary** files (images, PDFs, or compiled code).

| Stream Type | Examples | Best Use... |
| :--- | :--- | :--- |
| **Reader** | `BufferedReader` | Reading large text files line-by-line. |
| **Writer** | `BufferedWriter` | Writing long text files efficiently. |
| **InputS.** | `FileInputStream`| Loading an image or a ZIP file. |
| **OutputS.**| `FileOutputStream`| Saving binary data back to disk. |

## The Modern Way: `Files` and `Path` (NIO.2)

Since **Java 7**, we use the **`Files`** utility class. It provides static methods that handle all the complex logic for you in one single line.

```java
Path source = Paths.get("old.txt");
Path dest = Paths.get("new.txt");

// One line to copy a whole file!
Files.copy(source, dest, StandardCopyOption.REPLACE_EXISTING);
```

## Safety: The `try-with-resources` Statement

Wait! Every time you open a file, your Operating System creates a "handle." If you don't close it, your application will "leak" memory. **Always** use `try-with-resources` to ensure the file is closed automatically.

```java
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
  String line;
  while ((line = br.readLine()) != null) {
      System.out.println(line);
  }
} catch (IOException e) {
  System.err.println("Task failed: " + e.getMessage());
}
// File is CLOSED automatically after '}'!
```

## Summary

| Term | Description |
| :--- | :--- |
| **Path** | Modern way to represent a file location |
| **Files** | Static utility class with high-level methods |
| **Stream** | Moving 8-bit bytes (Binary data) |
| **Reader** | Moving 16-bit characters (Text data) |
| **Buffer** | Intermediate storage that speeds up disk access |
| **NIO.2** | The modern, fast, and secure I/O API (Java 7+) |
| **Try-Resources**| The safest way to open and auto-close files |
| **Best For** | Data logging, loading configs, saving assets |
| **Modern** | Always use `java.nio.file` for new projects! |
| **Encoding** | `Files.readString(path, StandardCharsets.UTF_8)` |
| **Check** | `Files.exists(path)` (Check before you read!) |
| **Temp** | `Files.createTempFile("prefix", ".suffix")` |
| **Walk** | `Files.walk(dir)` (Find files inside subfolders!) |
| **Delete** | `Files.deleteIfExists(path)` |
| **Metadata** | `Files.getAttribute(path, "size")` (File size, etc.) |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Channel** | Even FASTER than Streams for large-scale data moves |
| **Safety** | Prevents "Resource Leaks" with auto-closing logic |
| **Efficiency**| Small buffers mean less pressure on your RAM |
| **Permissions**| Check if a file is readable or writable! |
| **Atomic** | `StandardCopyOption.ATOMIC_MOVE` (Safe moving!) |
| **Recursion** | Deleting a folder requires deleting all children first |
| **Memory** | Java NIO can map files directly into RAM for speed |
| **Pointer** | RandomAccessFile (Jump anywhere in the file!) |
| **Serializable**| Saving whole objects to files (See Serialization section!) |
| **Legacy** | `File.exists()` (Avoid this; use `Path` instead!) |
