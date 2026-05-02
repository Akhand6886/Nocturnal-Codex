---
title: "Packages & Imports"
description: "Package system, visibility (capitalization), and go mod"
---

## What is a Package?

Every **Go** program is made up of packages. A package is just a directory containing one or more `.go` files. Programs start running in the **`main`** package.

```go
package main

import "fmt"
```

## Visibility (The Capitalization Rule)

Wait! Go has no `public` or `private` keywords. Instead, visibility is determined by the **first letter** of the name:

-   **Uppercase (A-Z)**: The name is **Exported** (Public). Other packages can use it.
-   **Lowercase (a-z)**: The name is **Internal** (Private). Only code inside the same package can see it.

```go
func SayHi() {} // Exported
func sayHi() {} // Internal
```

## Importing Packages

You use the `import` keyword to bring code from other packages into your current file. You can import one package or a block of packages.

```go
import (
    "fmt"
    "math/rand"
)
```

## Go Modules (`go mod`)

Since Go 1.11, **Modules** are the standard way to manage dependencies. A module is a collection of related Go packages that are versioned together.

-   **`go mod init <name>`**: Creates a new `go.mod` file.
-   **`go mod tidy`**: Automatically adds missing dependencies and removes unused ones.

## The `init` Function

Any package can have one or more `init` functions. They are called automatically when the package is initialized, before the `main` function starts.

## Summary

| Term | Description |
| :--- | :--- |
| **package** | The first line of every Go file |
| **import** | Bringing in external code |
| **Exported** | Names starting with Uppercase (Public) |
| **Internal** | Names starting with Lowercase (Private) |
| **go.mod** | The manifest of your module's dependencies |
| **go.sum** | Checksums for reproducible builds |
| **Standard L.**| Packages like `fmt`, `os`, `net/http`, `json` |
| **Third Party**| Imported via URL (e.g., `github.com/gin-gonic/gin`) |
| **Alias** | `import f "fmt"` (Importing with a custom name) |
| **Blank** | `import _ "driver"` (Importing ONLY for side effects) |
| **Logic** | Packages should be small, focused, and well-named |
| **Best For** | Organizing large-scale codebases efficiently |
| **Tooling** | `go mod tidy` keeps your dependencies clean |
| **Stability** | Semantic versioning is built into the module system |
