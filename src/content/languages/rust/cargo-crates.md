---
title: "Cargo & Crates"
description: "Workspace management, features, build scripts, and publishing"
---

## What is Cargo?

**Cargo** is Rust’s build system and package manager. Most Rustaceans use this tool to manage their Rust projects because it handles many tasks for you, such as building your code, downloading the libraries your code depends on, and building those libraries.

## The `Cargo.toml` File

This file is the "Manifest" for your project. It contains all the metadata and dependencies.

```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = "1.0" # A library for serialization
```

## Release Profiles

Wait! Rust has two main ways to build your code:

1.  **Debug** (`cargo build`): Fast compilation, but the resulting code is slow (includes debug symbols).
2.  **Release** (`cargo build --release`): Slow compilation (optimizing everything), but the resulting code is **blazing fast**.

## Workspaces

For large projects with multiple libraries and executables, you can use **Workspaces** to manage them all in one repository.

```toml
[workspace]
members = [
    "core",
    "web_api",
    "cli_tool",
]
```

## Features

You can define "Features" to allow users of your library to only compile the parts they need. This keeps binary sizes small and compilation fast.

```toml
[features]
default = ["json"]
json = ["serde_json"]
sql = ["rusqlite"]
```

## Publishing to Crates.io

If you want to share your code with the world, you can publish it to **[crates.io](https://crates.io)** using `cargo publish`.

> [!TIP]
> Use `cargo doc --open` to automatically generate and open the documentation for your project and all of its dependencies in your browser!

## Summary

| Command | Purpose |
| :--- | :--- |
| **cargo new** | Create a new project |
| **cargo build** | Compile (Debug mode) |
| **cargo run** | Build and Run |
| **cargo check** | Check for errors (Fastest) |
| **cargo test** | Run unit and integration tests |
| **cargo doc** | Generate documentation |
| **cargo update**| Update dependencies in `Cargo.lock` |
| **Crate** | A package of Rust code (Library or Binary) |
| **Registry** | crates.io (Where crates live) |
| **Manifest** | Cargo.toml (The project settings) |
| **Lockfile** | Cargo.lock (Precise versions for reproducible builds) |
| **Safety** | Cargo ensures everyone builds with exactly the same library versions |
| **Standard** | Edition system ensures smooth updates over time |
