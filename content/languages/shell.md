---
id: "shell"
name: "Shell (Bash)"
slug: "shell"
description: "The command-line scripting language for Unix/Linux system administration and automation."
iconName: "gnubash"
year: 1989
creator: "Brian Fox"
paradigm: ["Procedural", "Scripting"]
useCases: ["System Administration", "Automation", "DevOps", "CI/CD Pipelines"]
website: "https://www.gnu.org/software/bash/"
category: "General Purpose"
featured: false
difficulty: "Intermediate"
---

## Overview

Bash (Bourne Again SHell) is a Unix shell and command language. It is the default shell on most Linux distributions and macOS (prior to Catalina). Shell scripting is essential for system administration, automating repetitive tasks, managing deployments, and creating CI/CD pipelines. Understanding shell scripting is a fundamental skill for any developer working in Unix-like environments.

## Key Features

- **Pipes & redirection** — Chain commands to build powerful data pipelines
- **Process control** — Background jobs, signals, subshells
- **Text processing** — Integration with grep, sed, awk, cut, sort
- **Variables & arrays** — Basic data structures for automation
- **Universally available** — Pre-installed on virtually every Unix system

## Code Example

```bash
#!/bin/bash
# Find the top 5 largest files in a directory
find "${1:-.}" -type f -exec du -h {} + 2>/dev/null |
    sort -rh |
    head -5 |
    while read -r size file; do
        echo "📁 $size  $file"
    done
```

## Learning Resources

- [GNU Bash Manual](https://www.gnu.org/software/bash/manual/)
- [Shell Scripting Tutorial](https://www.shellscript.sh/)
- [explainshell.com](https://explainshell.com/)
