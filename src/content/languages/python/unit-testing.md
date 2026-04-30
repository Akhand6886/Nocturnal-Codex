---
title: "Unit Testing"
description: "unittest, pytest, fixtures, mocking, and test-driven development"
---

## What is Unit Testing?

**Unit testing** is the practice of writing small, automated scripts to verify that individual "units" of your code (like a single function or a specific class method) work exactly as intended. This is crucial for catching bugs in large projects and when refactoring your code.

```python
# Create a script we want to test: math_utils.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b
```

## Testing with `unittest` (Standard Library)

Python comes with a built-in testing framework called `unittest`. It uses a class-based structure based on the JUnit framework.

```python
# Create a test script: test_math.py
import unittest
from math_utils import add, multiply

class TestMath(unittest.TestCase):
    # Each test method MUST start with 'test_'
    def test_add(self):
        # Assertions to check results!
        self.assertEqual(add(10, 5), 15)
        self.assertEqual(add(-1, 1), 0)

    def test_multiply(self):
        self.assertEqual(multiply(2, 5), 10)

if __name__ == "__main__":
    # Standard way to run tests from CLI
    unittest.main()
```

## Modern Testing with `pytest` (The Standard!)

While `unittest` is built-in, most Python developers use **`pytest`**. It's much simpler to write and has far more powerful features like "fixtures" and "parameterization".

```python
# test_math_pytest.py
from math_utils import add

# No classes needed! Just functions!
def test_add_positive():
    assert add(10, 5) == 15

def test_add_negative():
    assert add(-5, -5) == -10
```

To run your tests:
```bash
pip install pytest
pytest test_math_pytest.py
```

## Fixtures: Setting up Test Data

What if your tests need a database connection, or a complex object, before they run? A **fixture** is a function that prepares state for a test.

```python
import pytest

@pytest.fixture
def sample_user():
    # Setup data!
    return {"id": 1, "name": "Alpha"}

def test_user_name(sample_user):
    # Inject the fixture!
    assert sample_user["name"] == "Alpha"
```

## Mocking: Simulating Real Services

Sometimes your tests shouldn't actually call an external API or write to a real database. **Mocking** allows you to replace a real function or object with a "mock" that returns whatever you want.

```python
from unittest.mock import patch
import requests

def get_status():
    # External network call!
    response = requests.get("https://api.example.com/status")
    return response.status_code

def test_get_status():
    with patch("requests.get") as mock_get:
        # Define what the mock returns!
        mock_get.return_value.status_code = 200
        
        # Test my function!
        assert get_status() == 200
        # Check if requested URL was correct!
        mock_get.assert_called_with("https://api.example.com/status")
```

## Test-Driven Development (TDD)

TDD is a development process where you write the **test first**, then the code to pass it.

1.  **Red**: Write a test for a feature that doesn't exist yet (it will fail).
2.  **Green**: Write the minimum code possible to make the test pass.
3.  **Refactor**: Clean up the code without breaking the test.

## Common Assertions

| Assertion | Purpose |
| :--- | :--- |
| **assert x == y** | Check equality |
| **assert x != y** | Check inequality |
| **assert x is True** | Check boolean |
| **assert x in y** | Check membership |
| **pytest.raises(Error)** | Verify code raises a specific error |

## Summary

| Term | Description |
| :--- | :--- |
| **unittest** | Built-in, class-based testing framework |
| **pytest** | Most popular, function-based framework |
| **Assertion** | A statement that checks if something is true |
| **Fixture** | Setup/teardown logic for test data |
| **Mocking** | Simulating external dependencies |
| **Coverage** | Measure how much of your code is tested |
| **Best For** | Bug prevention, code reliability, refactoring |
| **Integration Test** | Testing multiple units together |
| **Regression Test** | Testing old bugs to ensure they don't return |
| **Monkeypatch** | Dynamically modifying modules/classes during tests |
| **Assertion Message** | `assert condition, "Message if fail"` |
| **Skip Testing** | `@pytest.mark.skip(reason="...")` |
| **Execution** | Run with `pytest -v` for verbose output |
| **conftest.py** | Store global fixtures for pytest projects |
| **pytest-cov** | Package to generate code coverage reports |
