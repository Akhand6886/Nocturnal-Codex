---
title: "Installation & Setup"
description: "Python versions, virtual environments, pip, and IDE setup"
---

## Setting Up Your Python Environment

Before you start writing code, you need a robust environment. Proper setup saves you from future package conflicts and versioning headaches.

## Step 1: Install Python

Download the latest stable version (currently **Python 3.12+**) from [python.org](https://www.python.org/downloads/). On macOS and Linux, Python is usually pre-installed, but you should check the version.

```bash
python3 --version
```

**Avoid using system Python** (the version your OS uses for its own tasks). Instead, manage your versions with tools like:
- **Pyenv**: Allows you to switch between multiple Python versions easily.
- **Conda/Miniconda**: Popular in data science for managing packages and environments.

## Step 2: Virtual Environments (Venv)

**Crucial Advice**: Never install packages globally. Each project should have its own isolated environment.

1.  **Create an environment**:
    ```bash
    python3 -m venv myenv
    ```

2.  **Activate it**:
    - **macOS/Linux**: `source myenv/bin/activate`
    - **Windows**: `myenv\Scripts\activate`

3.  **Deactivate it**: Simply type `deactivate`.

## Step 3: Managing Packages with Pip

`pip` is Python's package manager. Use it to install libraries from the [Python Package Index (PyPI)](https://pypi.org/).

-   **Install a package**: `pip install requests`
-   **List installed packages**: `pip list`
-   **Freeze requirements**: `pip freeze > requirements.txt`
-   **Install from file**: `pip install -r requirements.txt`

## Step 4: Choose Your IDE

While you can write Python in a text editor, a full Integrated Development Environment (IDE) provides powerful debugging and linting tools.

1.  **Visual Studio Code (VS Code)**: The most popular choice. Install the **Python extension** (by Microsoft) for the best experience.
2.  **PyCharm**: A specialized, heavy-duty IDE for large Python projects.
3.  **Jupyter Notebooks**: Essential for data science and exploratory programming.

## Step 5: Code Linting and Formatting

Use these tools to ensure your code follows the **PEP 8** style guide:
-   **Black**: An uncompromising code formatter ("Any color you like, as long as it's Black").
-   **Flake8**: A tool to check for style errors and bugs.
-   **MyPy**: For checking static type hints.

> **Tip**: Configure VS Code to "Format on Save" using Black for consistently clean code across your team.

## Summary

| Tool | Purpose |
| :--- | :--- |
| **Python 3.x** | The core runtime |
| **Venv** | Environment isolation |
| **Pip** | Package management |
| **VS Code / PyCharm** | Writing and debugging code |
| **Black / Flake8** | Maintaining code quality |
