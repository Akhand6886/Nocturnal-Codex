---
title: "Cut, Sort & Uniq"
description: "The essential tools for text processing and reporting"
---

## 1. `cut` (Extracting Columns)

**`cut`** is used to extract specific columns (fields) from each line of a file. It is perfect for CSV or log files.

```bash
# Get the 1st and 3rd columns, separated by a colon
cut -d':' -f1,3 /etc/passwd
```

## 2. `sort` (Ordering Data)

**`sort`** organizes lines alphabetically or numerically.

```bash
# Sort a list of names
sort names.txt

# Sort numerically (-n) and reverse (-r)
sort -nr scores.txt
```

## 3. `uniq` (Removing Duplicates)

**`uniq`** filters out adjacent duplicate lines. **Wait!** Because it only checks *adjacent* lines, you almost always want to `sort` your data before using `uniq`.

```bash
# Count how many times each line appears
sort names.txt | uniq -c
```

## Putting it all together

Wait! You can combine these three tools into a powerful data analysis pipeline.

```bash
# Find the top 5 most common IP addresses in an access log
cat access.log | cut -d' ' -f1 | sort | uniq -c | sort -nr | head -n 5
```

## Summary

| Tool | Action | Description |
| :--- | :--- | :--- |
| **cut** | Extract | Picking specific columns |
| **sort** | Order | Organizing data numerically or alphabetically |
| **uniq** | Filter | Removing or counting duplicates |
| **head** | Truncate | Show only the first N lines |
| **tail** | Truncate | Show only the last N lines |
| **Best For** | Fast data summaries and reporting |
| **Logic** | "Data extraction and aggregation" |
| **Safety** | Memory efficient for large files |
| **Modern** | Still the fastest way to get a quick count of anything in a log |
| **Standard** | Part of the POSIX core utils |
| **Identity** | The "One-liner" power tools of the shell |
