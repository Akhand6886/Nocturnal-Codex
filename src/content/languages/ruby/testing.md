---
title: "Testing"
description: "RSpec, Behavior-Driven Development (BDD), and expectations"
---

## Why Test?

In **Ruby**, testing is a fundamental part of the culture. Because Ruby is a dynamic language without a compiler to catch type errors, a strong test suite is essential for ensuring your code works as expected and preventing regressions.

## RSpec: The Standard

**RSpec** is the most popular testing framework for Ruby. It is a "Behavior-Driven Development" (BDD) tool, meaning you write tests that describe the behavior of your code in plain English.

```ruby
RSpec.describe User do
  it "is valid with a name" do
    user = User.new(name: "Alpha")
    expect(user).to be_valid
  end

  it "is invalid without a name" do
    user = User.new(name: nil)
    expect(user).to_not be_valid
  end
end
```

Wait! Notice the syntax: **`expect(actual).to eq(expected)`**. It's designed to read like a sentence.

## Common Matchers

| Matcher | Description |
| :--- | :--- |
| **eq** | Equality (`==`) |
| **be_valid** | Checks if `valid?` is true |
| **include** | Checks if a collection includes a value |
| **change** | Checks if an action changes a value |
| **raise_error**| Checks if code throws an exception |

## TDD Lifecycle

1.  **Red**: Write a test that fails.
2.  **Green**: Write the minimum code to make it pass.
3.  **Refactor**: Clean up the code while keeping the tests passing.

## Summary

| Term | Description |
| :--- | :--- |
| **RSpec** | The primary BDD framework for Ruby |
| **describe** | Grouping related tests together |
| **it** | A single test case |
| **expect** | The starting point of an assertion |
| **matcher** | The logic that checks the result (`eq`, `be_nil`, etc.) |
| **FactoryBot** | A library for creating test data (Better than fixtures) |
| **Best For** | Reliability, Documentation, and Confidence |
| **Logic** | "Describe the behavior, not just the implementation" |
| **Safety** | Catch bugs BEFORE they reach production |
| **Modern** | Parallel testing and optimized CI/CD pipelines |
| **Standard** | High test coverage is expected in Ruby projects |
| **Identity** | Part of the "Developer Happiness" philosophy |
