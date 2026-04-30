---
id: shell
name: Shell (Bash)
slug: shell
description: >-
  The command-line scripting language for Unix/Linux system administration and
  automation.
iconName: gnubash
year: 1989
creator: Brian Fox
paradigm:
  - Procedural
  - Scripting
useCases:
  - System Administration
  - Automation
  - DevOps
  - CI/CD Pipelines
website: 'https://www.gnu.org/software/bash/'
category: General Purpose
featured: false
difficulty: Intermediate
topics:
  - section: Basics
    items:
      - title: Shell Fundamentals
        description: 'Commands, arguments, shell types, and shebang lines'
        slug: shell-fundamentals
      - title: Variables
        description: 'Assignment, expansion, environment variables, and quoting'
        slug: variables
      - title: Control Flow
        description: 'if/then/else, case, for, while, until, and test conditions'
        slug: control-flow
      - title: I/O Redirection
        description: 'stdin, stdout, stderr, pipes (|), and here documents'
        slug: i-o-redirection
  - section: Text Processing
    items:
      - title: grep & Regular Expressions
        description: 'Pattern matching, egrep, and POSIX regex'
        slug: grep-regular-expressions
      - title: sed & awk
        description: 'Stream editing, field processing, and one-liners'
        slug: sed-awk
      - title: 'cut, sort, uniq'
        description: 'Column extraction, sorting, and deduplication'
        slug: cut-sort-uniq
  - section: Scripting
    items:
      - title: Functions
        description: 'Function definition, local variables, and return values'
        slug: functions
      - title: Arrays
        description: 'Indexed and associative arrays, iteration'
        slug: arrays
      - title: Process Management
        description: 'Background jobs, signals, trap, and exit codes'
        slug: process-management
      - title: Best Practices
        description: 'set -euo pipefail, shellcheck, and defensive scripting'
        slug: best-practices
---

## Overview

Bash (Bourne Again SHell) is a Unix shell and command language. Shell scripting is essential for system administration, automating repetitive tasks, managing deployments, and creating CI/CD pipelines.

## Key Features

- **Pipes & redirection** — Chain commands into data pipelines
- **Process control** — Background jobs, signals, subshells
- **Text processing** — Integration with grep, sed, awk, cut, sort
- **Variables & arrays** — Basic data structures for automation
- **Universally available** — Pre-installed on virtually every Unix system

## Code Example

```bash
#!/bin/bash
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
