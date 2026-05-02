---
title: "Build Tools"
description: "Vite, esbuild, SWC, and the evolution of TS compilation"
---

## The Compilation Landscape

In the early days of **TypeScript**, the only way to build your code was using the official **`tsc`** (TypeScript Compiler). Today, there is a whole ecosystem of tools designed for speed and developer experience.

## 1. Vite (Recommended)

**Vite** is the current industry standard for modern web development. It uses **esbuild** for lightning-fast bundling during development and Rollup for production builds.

-   **Pros**: Instant server start, fast Hot Module Replacement (HMR).
-   **Note**: Vite does NOT perform type checking. You should run `tsc --noEmit` separately to check for errors.

## 2. esbuild & SWC

These are "Next-Gen" compilers written in systems languages (**Go** for esbuild, **Rust** for SWC). They are 10x–100x faster than `tsc`.

-   **esbuild**: Extremely fast but lacks some advanced TS features (like decorators).
-   **SWC**: A high-performance alternative to Babel and `tsc`, used by Next.js.

## 3. The Role of `tsc`

If these tools are so fast, why do we still need **`tsc`**? 

Wait! Tools like Vite and esbuild only perform **Transpilation** (removing types to get JS). They do **not** check if your types are correct. To catch type errors, you still need to run `tsc` in your CI/CD pipeline or as a background process in your editor.

```bash
# Check types without generating JS files
npx tsc --noEmit
```

## 4. Bundlers vs. Compilers

-   **Compiler** (`tsc`, `swc`): Turns TS into JS.
-   **Bundler** (`Webpack`, `Vite`, `Turbo`): Takes many JS files and combines them into a few optimized files for the browser.

## Summary

| Tool | Role | Built With | Why use it? |
| :--- | :--- | :--- | :--- |
| **tsc** | Compiler | TypeScript | **The only tool that checks types** |
| **Vite** | Bundler | JS/Go | Modern web dev experience |
| **esbuild** | Compiler | **Go** | Maximum speed for large builds |
| **SWC** | Compiler | **Rust** | Drop-in replacement for Babel |
| **Next.js** | Framework | React/Rust | Production-ready fullstack apps |
| **HMR** | Feature | | See changes instantly without refresh |
| **Transpile**| Logic | Removing type info for runtime |
| **CI/CD** | Pipeline | Run `tsc` here to prevent broken code |
| **Zero-Cfg** | Philosophy | Modern tools work with 0 config |
| **Standard** | `npm run build` is the universal build command |
