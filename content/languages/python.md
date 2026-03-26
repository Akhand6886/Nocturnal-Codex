---
id: "python"
name: "Python"
slug: "python"
description: "A versatile and beginner-friendly language for web development, data science, automation, and more."
iconName: "python"
year: 1991
creator: "Guido van Rossum"
paradigm: ["Object-Oriented", "Functional", "Procedural"]
useCases: ["Web Development", "Data Science", "Machine Learning", "Automation", "Scripting"]
website: "https://python.org"
category: "General Purpose"
featured: true
difficulty: "Beginner"
---

## Overview

Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming. It is often described as a "batteries included" language due to its comprehensive standard library.

## Key Features

- **Readable syntax** — Clean, English-like code that's easy to learn and maintain
- **Extensive standard library** — Rich built-in modules for I/O, networking, text processing, and more
- **Dynamic typing** — No need to declare variable types; flexibility at the cost of runtime checks
- **Cross-platform** — Runs on Windows, macOS, Linux, and many other platforms
- **Massive ecosystem** — PyPI hosts over 400,000 packages covering every domain imaginable

## Common Use Cases

- **Web Development** — Django, Flask, FastAPI
- **Data Science & Analytics** — Pandas, NumPy, Matplotlib
- **Machine Learning** — TensorFlow, PyTorch, scikit-learn
- **DevOps & Automation** — Ansible, scripting, CI/CD tooling
- **Scientific Computing** — SciPy, Jupyter Notebooks

## Code Example

```python
# A simple function demonstrating Python's clean syntax
def fibonacci(n):
    """Generate first n Fibonacci numbers."""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(fibonacci(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Learning Resources

- [Official Python Tutorial](https://docs.python.org/3/tutorial/)
- [Real Python](https://realpython.com/)
- [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/)
