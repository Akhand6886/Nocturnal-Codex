---
title: "The Build Stage"
slug: "devops-build"
order: 3
description: "Understand the 'Build' stage, where source code is compiled and packaged in an automated fashion."
category: "DevOps Lifecycle"
tags: ["DevOps", "Build", "CI", "Continuous Integration"]
---

## 3. The Build Stage

The **Build** stage is the first step in automation. This is where **Continuous Integration (CI)** begins. In this stage, the source code from version control is compiled into a runnable artifact.

### Key Activities:
- **Automated Compilation:** Using tools like Maven (for Java), Webpack (for JavaScript), or `go build` to compile the source code.
- **Artifact Generation:** Creating the package that will be tested and deployed, such as a `.jar` file, a Docker image, or a simple `.zip` archive.
- **CI Servers:** Using tools like **Jenkins**, GitLab CI, or GitHub Actions to automate the build process whenever new code is pushed to the repository.

A successful build is a prerequisite for the testing and release stages.
