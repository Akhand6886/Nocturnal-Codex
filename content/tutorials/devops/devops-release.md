---
title: "The Release Stage"
slug: "devops-release"
order: 5
description: "Understand the 'Release' stage, where the application is prepared for deployment."
category: "DevOps Lifecycle"
tags: ["DevOps", "Release", "CD", "Continuous Delivery"]
---

## 5. The Release Stage

Once an application has passed all the automated tests, it is ready for **Release**. This stage involves preparing the build artifact for deployment to a production environment.

### Key Activities:
- **Artifact Versioning:** Tagging the build artifact with a version number (e.g., v1.2.0).
- **Storing Artifacts:** Pushing the artifact to a repository, such as Docker Hub for container images or Nexus/Artifactory for libraries.
- **Approval Gates:** In some workflows, this stage includes a manual approval step before the code is deployed to production. This is a key part of **Continuous Delivery**.

A successful release means you have a production-ready artifact waiting to be deployed.
