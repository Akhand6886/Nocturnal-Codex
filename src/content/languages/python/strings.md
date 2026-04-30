---
title: "Strings"
description: "String methods, slicing, regex, and Unicode handling"
---

## Python Strings: Immutable Text

A **string (`str`)** is an immutable sequence of Unicode characters. This means you cannot change a string once it's created — you must create a new one.

```python
# Create string
msg = "Welcome to Python"

# Accessing
print(msg[0])  # 'W'
# msg[0] = 'H'  # ERROR: TypeError! (Immutable)
```

## Creating Strings

```python
# Literal formats
single = 'Single quote'
double = "Double quote"
# Multi-line
long_msg = """This is a
multi-line
string."""
```

## Slicing Strings (Same as Lists!)

```python
text = "AlphaBeta"

print(text[0:5])   # "Alpha" (first 5 chars)
print(text[5:])    # "Beta" (from 5th to end)
print(text[::-1])  # "ateBehplA" (REVERSE!)
```

## Essential String Methods

Python provides dozens of built-in methods for text manipulation.

| Method | Action | Example |
| :--- | :--- | :--- |
| **.upper()** | All caps | `text.upper()` |
| **.lower()** | All lowercase | `text.lower()` |
| **.strip()** | Remove whitespace | `text.strip()` |
| **.split(sep)** | Split into list | `text.split(",")` |
| **.join(seq)** | Join list into string | `"-".join(["A", "B"])` |
| **.replace(old, new)**| Swap substrings | `text.replace("A", "X")` |
| **.startswith(s)** | Check beginning | `text.startswith("A")` |
| **.endswith(s)** | Check ending | `text.endswith("a")` |
| **.find(s)** | Get index of s | `idx = text.find("B")` |

```python
csv = "apple,banana,cherry"
items = csv.split(",")
print("-".join(items))  # apple-banana-cherry
```

## Escape Sequences and Raw Strings

| Sequence | Character |
| :--- | :--- |
| **\\n** | Newline |
| **\\t** | Tab |
| **\\\\** | Backslash |
| **\\'** | Single quote |
| **\\"** | Double quote |

**Raw Strings (`r""`)**: Useful for Windows paths and Regular Expressions where you don't want backslashes to be interpreted as escape sequences.

```python
# Standard path (may fail!)
path = "C:\new_folder"
# Raw path (safe!)
path = r"C:\new_folder"
```

## Unicode and Encoding

Python 3 strings are **Unicode by default**. This means they handle non-ASCII characters (like emojis or foreign languages) seamlessly.

```python
# Emojis!
emoji = "🚀 Python!"
print(len(emoji))  # 9 (each Unicode character is 1)

# Encode to bytes (for network/file storage)
data = emoji.encode("utf-8")
print(data)  # b'\xf0\x9f\x9a\x80 Python!'

# Decode back to string
original = data.decode("utf-8")
```

## Regular Expressions (re)

For complex pattern matching, use the built-in `re` module.

```python
import re

text = "My email is user@example.com"
# Extract email pattern
match = re.search(r"[\w.-]+@[\w.-]+", text)
if match:
    print(f"Found: {match.group()}")  # user@example.com
```

## Summary

| Feature | Method / Syntax |
| :--- | :--- |
| **Immutability** | Cannot be changed in-place |
| **Transform** | `.strip()`, `.upper()`, `.lower()` |
| **Split/Join** | `.split()`, `.join()` |
| **Search** | `.find()`, `.startswith()`, `in msg` |
| **Regex** | `import re` module |
| **Unicode** | Handled natively (UTF-8 default) |
| **Best For** | Human-readable text, parsing logs |
