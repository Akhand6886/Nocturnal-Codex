---
title: "I/O Streams"
description: "std::cout, std::cin, std::cerr, and standard libraries"
---

## What are C++ Streams?

In **C++**, we don't have built-in "print" or "input" keywords. Instead, we use **I/O Streams** from the Standard Library (`<iostream>`). Think of a stream as a physical flow of data from your program to the console (output) or from the user to your program (input).

```cpp
#include <iostream>

int main() {
    // std::cout = Standard Console Output!
    std::cout << "Streaming data to console..." << std::endl;
    return 0;
}
```

## Direction Operators (`<<` and `>>`)

-   **`<<` (Insertion Operator)**: Inserts data **into** the stream (e.g., `cout << "Hi"`).
-   **`>>` (Extraction Operator)**: Extracts data **from** the stream (e.g., `cin >> age`).

> **Wait!** The direction of the arrows shows where the data is going. `<<` points to `cout`; `>>` points to a variable.

## Basic Output: `std::cout`

You can chain multiple pieces of data together in one line.

```cpp
int age = 25;
std::cout << "User is " << age << " years old." << std::endl;
```

### `std::endl` vs. `\n`

-   **`std::endl`**: Ends the line AND "flushes" the stream (forces all data to be printed immediately). This is slightly slower.
-   **`\n`**: Just ends the line. This is much faster for high-volume text.

## Basic Input: `std::cin`

The **`std::cin`** stream pauses the program and waits for the user to type something.

```cpp
int x;
std::cout << "Enter a number: ";
std::cin >> x;

std::cout << "You entered: " << x << std::endl;
```

### Reading Full Lines: `std::getline()`

**`std::cin`** stops reading at the first space! To read a whole sentence, use **`std::getline()`**.

```cpp
#include <string>

std::string name;
std::getline(std::cin, name); // Reads spaces correctly!
```

## Other Standard Streams

| Stream | Name | Purpose |
| :--- | :--- | :--- |
| **std::cout** | Standard Output | For normal program messages. |
| **std::cin** | Standard Input | To receive data from the user. |
| **std::cerr** | Standard Error | **Unbuffered** error messages (prints immediately). |
| **std::clog** | Standard Log | **Buffered** error messages (for slow logging). |

## Formatting Streams (`<iomanip>`)

You can control how your output looks (e.g., how many decimal places) by using the **`<iomanip>`** library.

```cpp
#include <iomanip>

double price = 12.34567;
std::cout << std::fixed << std::setprecision(2) << price; // 12.35
```

## Summary

| Feature | Code | Purpose |
| :--- | :--- | :--- |
| **Output** | `std::cout << x` | Print data |
| **Input** | `std::cin >> x` | Get data (Single word/number) |
| **Full Line**| `std::getline(cin, s)`| Get data (Full sentence) |
| **Error** | `std::cerr << err` | Print errors immediately |
| **Precision** | `std::setprecision(n)`| Control decimal places |
| **Best For** | Console apps, simple I/O, debugging |
| **Flush** | `std::endl` | Ensure text is printed NOW |
| **Buffered** | Streams store data in a buffer before printing |
| **Library** | `#include <iostream>` | The required library! |
| **Redirect** | stdout/stderr can be redirected to files! |
| **Efficiency** | Use `\n` instead of `endl` in fast loops |
| **Chain** | `cout << a << b << c;` | Piece together messages |
| **Hex/Dec** | `std::hex`, `std::dec` (Format numbers!) |
| **Bool** | `std::boolalpha` (Print true/false instead of 1/0!) |
| **Width** | `std::setw(n)` (Align columns perfectly!) |
| **Namespace** | `using namespace std;` (Avoids typing `std::`) |
| **Caution** | `using namespace std` can cause name collisions! |
| **C Standard**| Include `<cstdio>` for C's `printf` (Old but very fast!) |
| **Format** | `std::format` (The modern, high-speed way in C++20!) |
