---
title: "Redis"
repoUrl: "https://github.com/redis/redis"
goodFirstIssuesUrl: "https://github.com/redis/redis/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22"
description: "An open source, in-memory data structure store, used as a database, cache, and message broker. One of the cleanest C codebases in the world."
difficulty: "Advanced"
tags: ["Database", "Cache", "C", "Performance"]
---

### Why contribute to Redis?
Redis is famous for its clean, simple, and highly efficient C code. It avoids complex dependencies and focuses on pure performance. Contributing to Redis is a masterclass in memory management, data structures, and network programming.

### Contribution Tips
- **Performance First**: Every microsecond counts. Avoid unnecessary allocations.
- **Data Structures**: If you want to add a new command, study how `ziplist` and `dict` are implemented.
- **Protocol**: Learn the RESP (Redis Serialization Protocol) to understand how clients talk to the server.
- **Testing**: Redis has a robust TCL-based test suite. Always verify your changes there.
