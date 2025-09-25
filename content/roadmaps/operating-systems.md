---
id: "os"
slug: "operating-systems"
name: "Operating Systems"
category: "Core Computer Science"
description: "Software managing computer hardware and resources."
imageUrl: "https://picsum.photos/seed/operatingsystems/600/400"
dataAiHint: "computer hardware"
subtopics:
  - id: "process-management"
    slug: "process-management"
    name: "Process Management"
    description: "How the OS handles running programs and processes."
  - id: "memory-management"
    slug: "memory-management"
    name: "Memory Management"
    description: "Techniques for allocating and deallocating memory."
  - id: "file-systems"
    slug: "file-systems"
    name: "File Systems"
    description: "How data is stored and retrieved on a storage device."
codeSnippets:
  - id: "os-fork-example"
    title: "C++ Fork Example"
    language: "cplusplus"
    code: |
      #include <iostream>
      #include <unistd.h>

      int main() {
          pid_t pid = fork();

          if (pid == 0) {
              std::cout << "Child process" << std::endl;
          } else if (pid > 0) {
              std::cout << "Parent process" << std::endl;
          } else {
              std::cerr << "Fork failed" << std::endl;
              return 1;
          }

          return 0;
      }
    description: "A simple example of creating a new process using fork()."
references:
- id: "wiki-jvm"
  title: "Java Virtual Machine (JVM) Overview"
  slug: "jvm-overview"
---

Explore the intricate world of operating systems, the foundational software that bridges hardware and applications. Learn about process management, memory allocation, file systems, and concurrency.