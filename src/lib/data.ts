
import type { NavItem as NavItemType } from '@/components/layout/navbar';
import type { CodeLanguage } from '@/components/content/code-snippet';

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  dataAiHint?: string;
  category?: string;
  subtopics?: SubTopic[];
  codeSnippets?: CodeSnippetItem[];
}

export interface SubTopic {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

export interface CodeSnippetItem {
  id: string;
  title: string;
  language: CodeLanguage;
  code: string;
  description?: string;
}

export interface WikiArticleStub {
  id: string;
  title: string;
  slug: string;
}
export interface WikiArticle extends WikiArticleStub {
  category?: string;
  content: string; // Markdown content
  lastUpdated: string;
}

export interface ThinkTankArticleStub {
  id: string;
  title: string;
  slug: string;
}

export const MOCK_TOPICS: Topic[] = [
  {
    id: "algorithms",
    slug: "algorithms",
    name: "Algorithms",
    category: "Core Computer Science",
    description: "Core concepts of computation and problem-solving strategies.",
    longDescription: "Delve into the fundamental building blocks of computation. This section explores various algorithmic paradigms, data structures, and complexity analysis essential for efficient problem-solving in computer science.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "abstract algorithm",
    subtopics: [
      {id: "sorting", slug: "sorting", name: "Sorting Algorithms", description: "Techniques for arranging data in a specific order."},
      {id: "graphs", slug: "graphs", name: "Graph Theory", description: "Study of networks and relationships between objects."},
      {id: "dp", slug: "dynamic-programming", name: "Dynamic Programming", description: "Optimization technique by breaking down problems."},
      {id: "complexity-analysis", slug: "complexity-analysis", name: "Complexity Analysis", description: "Understanding how algorithms scale with input size, using notations like Big O."}
    ],
    references: [
      {id: "wiki-clrs", slug: "clrs-summary", title: "CLRS Summary Notes"},
      {id: "wiki-big-o", slug: "big-o-notation", title: "Big O Notation"}
    ],
    codeSnippets: [
      {id: "cs-algo-1", title: "Python Merge Sort", language: "python", code: `
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        # ... (merge logic)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
`, description: "A classic divide-and-conquer sorting algorithm."},
      {
        id: "cs-algo-bigo-example",
        title: "Big O Notation Example (Linear Time)",
        language: "python",
        code:
      `
def find_element(arr, target):
    # O(n) - Linear time complexity
    for element in arr:
        if element == target:
            return True
    return False

my_list = [1, 2, 3, 4, 5]
print(find_element(my_list, 3)) # True
print(find_element(my_list, 6)) # False
`,
        description: "Illustrates an algorithm with O(n) time complexity."
      }
    ]
  },
  {
    id: "os",
    slug: "operating-systems",
    name: "Operating Systems",
    category: "Core Computer Science",
    description: "Software managing computer hardware and resources.",
    longDescription: "Explore the intricate world of operating systems, the foundational software that bridges hardware and applications. Learn about process management, memory allocation, file systems, and concurrency.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "computer hardware"
  },
  {
    id: "ml",
    slug: "machine-learning",
    name: "Machine Learning",
    category: "Artificial Intelligence",
    description: "Algorithms that learn from and make decisions based on data.",
    longDescription: "Dive into the field of Machine Learning, where algorithms enable systems to learn from data. Topics include supervised, unsupervised learning, neural networks, and model evaluation.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "artificial intelligence"
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    name: "Cybersecurity",
    category: "Security",
    description: "Protecting systems from threats.",
    longDescription: "Understand the principles and practices of cybersecurity. This section covers cryptography, network security, ethical hacking, and threat modeling to protect digital assets.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "hacker code"
  },
  {
    id: "compiler-theory",
    slug: "compiler-theory",
    name: "Compiler Theory",
    category: "Theoretical Computer Science",
    description: "The art of translating high-level code to machine instructions.",
    longDescription: "Uncover the magic behind compilers. Learn about lexical analysis, parsing, semantic analysis, code generation, and optimization techniques that transform source code into executable programs.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "code compilation"
  },
  {
    id: "language-theory",
    slug: "language-theory",
    name: "Language Theory",
    category: "Theoretical Computer Science",
    description: "Formal languages, automata, and computability.",
    longDescription: "Explore the theoretical foundations of computation and formal languages. This section delves into automata theory, grammars, Turing machines, and the limits of what can be computed.",
    imageUrl: "https://placehold.co/400x300.png",
    dataAiHint: "abstract symbols"
  },
];

export const MOCK_WIKI_ARTICLES: WikiArticle[] = [
  {
    id: "1",
    slug: "big-o-notation",
    title: "Big O Notation",
    category: "Algorithms",
    lastUpdated: "2024-07-01T12:00:00Z",
    content: `
# Big O Notation

Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it is used to classify algorithms according to how their run time or space requirements grow as the input size grows.

## Common Complexities
- **O(1)**: Constant time - The algorithm takes the same amount of time regardless of the input size.
- **O(log n)**: Logarithmic time - Time increases logarithmically with input size (e.g., binary search).
- **O(n)**: Linear time - Time increases linearly with input size (e.g., iterating through a list).
- **O(n log n)**: Linearithmic time - Common in efficient sorting algorithms (e.g., merge sort, quicksort).
- **O(n^2)**: Quadratic time - Time increases with the square of the input size (e.g., nested loops over the same collection).
- **O(2^n)**: Exponential time - Time doubles with each addition to the input size (e.g., some recursive algorithms without memoization).
- **O(n!)**: Factorial time - Time increases factorially, often seen in permutations.

Understanding Big O is crucial for writing efficient and scalable code.
    `
  },
  {
    id: "2",
    slug: "turing-machines",
    title: "Turing Machines",
    category: "Theory of Computation",
    lastUpdated: "2024-05-20T09:00:00Z",
    content: `
# Turing Machines

A Turing machine is a mathematical model of computation that defines an abstract machine which manipulates symbols on a strip of tape according to a table of rules. Despite its simplicity, a Turing machine can be adapted to simulate the logic of any computer algorithm, and is particularly useful in explaining the functions of a CPU inside a computer.

## Components
1.  **Tape**: An infinitely long strip divided into cells. Each cell can hold one symbol from a finite alphabet.
2.  **Head**: Can read the symbol in the current cell, write a new symbol, and move one cell to the left or right.
3.  **State Register**: Stores the current state of the machine, chosen from a finite set of states.
4.  **Transition Function (Finite Table of Instructions)**: Given the current state and the symbol under the head, it dictates:
    *   The symbol to write on the tape.
    *   How to move the head (left, right, or stay).
    *   The next state of the machine.

Turing machines are fundamental to the study of computability and complexity theory.
    `
  },
  {
    id: "wiki-pep8", 
    slug: "pep-8-style-guide",
    title: "PEP 8 Style Guide for Python Code",
    category: "Programming Practices",
    lastUpdated: "2024-02-15T10:00:00Z",
    content: `
# PEP 8 - Style Guide for Python Code

PEP 8, sometimes spelled PEP8 or PEP-8, is a document that provides guidelines and best practices on how to write Python code. It was written in 2001 by Guido van Rossum, Barry Warsaw, and Nick Coghlan. The primary focus of PEP 8 is to improve the readability and consistency of Python code.

## Key areas covered by PEP 8:

- **Code Lay-out**: Indentation (4 spaces per level), tabs vs. spaces (spaces are preferred), maximum line length (79 characters for code, 72 for docstrings/comments), blank lines, source file encoding (UTF-8).
- **String Quotes**: Consistency in using single or double quotes.
- **Whitespace in Expressions and Statements**: Proper use of spaces around operators and after commas.
- **Comments**: Block comments, inline comments, and documentation strings (docstrings).
- **Naming Conventions**: \`lowercase\` for functions and variables, \`CapWords\` for classes, \`UPPERCASE_WITH_UNDERSCORES\` for constants.
- **Programming Recommendations**: Comparisons to singletons like \`None\` should always be done with \`is\` or \`is not\`, never with equality operators. Use \`isinstance()\` for type checking.

Adhering to PEP 8 makes Python code more readable and maintainable across different projects and teams.
    `
  },
  {
    id: "wiki-python-history",
    slug: "python-history",
    title: "History of Python",
    category: "Programming Languages",
    lastUpdated: "2024-01-10T14:00:00Z",
    content: `
# History of Python

Python was conceived in the late 1980s by Guido van Rossum at Centrum Wiskunde & Informatica (CWI) in the Netherlands as a successor to the ABC language (itself inspired by SETL), capable of exception handling and interfacing with the Amoeba operating system. Its implementation began in December 1989.

- **Python 0.9.0** was released in February 1991.
- **Python 1.0** was released in January 1994, with major new features including lambda, map, filter, and reduce.
- **Python 2.0**, released in October 2000, introduced list comprehensions, garbage collection system capable of collecting reference cycles, and support for Unicode.
- **Python 3.0** (also known as Python 3000 or Py3k), a major, backward-incompatible release, was released in December 2008 after a long period of testing. Many of its major features were backported to Python 2.6.x and 2.7.x version series.

Python's philosophy emphasizes code readability and a syntax that allows programmers to express concepts in fewer lines of code than might be used in languages such as C++ or Java.
    `
  },
  {
    id: "wiki-jvm",
    slug: "jvm-overview",
    title: "Java Virtual Machine (JVM)",
    category: "Programming Languages",
    lastUpdated: "2024-03-10T11:00:00Z",
    content: `
# Java Virtual Machine (JVM)

The Java Virtual Machine (JVM) is an abstract computing machine that enables a computer to run a Java program. When a Java program is compiled, it is compiled into an intermediate language called bytecode. The JVM translates this bytecode into machine code that can be executed by the computer's processor.

## Key Functions:
- **Loads code**
- **Verifies code**
- **Executes code**
- **Provides runtime environment**

Key components include the Classloader, Execution Engine, and Runtime Data Areas (Heap, Stack, Method Area, etc.). The JVM is a crucial part of the "Write Once, Run Anywhere" (WORA) capability of Java.
    `
  },
  {
    id: "wiki-garbage-collection",
    slug: "java-garbage-collection",
    title: "Garbage Collection in Java",
    category: "Programming Languages",
    lastUpdated: "2024-04-05T16:30:00Z",
    content: `
# Garbage Collection in Java

Garbage Collection (GC) in Java is the process of automatically managing memory. It identifies and discards objects that are no longer needed by a program so that their resources can be reclaimed and reused.

## How it Works (Simplified):
1.  **Marking**: The garbage collector identifies which pieces of memory are in use and which are not.
2.  **Sweeping/Deleting**: The garbage collector removes objects identified during the "marking" phase.
3.  **Compacting** (Optional): After deleting unused objects, the memory can be compacted to reduce fragmentation.

Java provides different garbage collection algorithms (e.g., Serial GC, Parallel GC, CMS GC, G1 GC, ZGC, Shenandoah) that offer different trade-offs in terms of pause times and throughput.
    `
  }
];

export const NAV_ITEMS: NavItemType[] = [
  { label: "Home", href: "/" },
  {
    label: "Topics",
    href: "/topics",
  },
  { label: "Blog", href: "/blog" },
  { label: "Wiki", href: "/wiki" },
  { label: "Think Tank", href: "/think-tank" },
  { label: "About", href: "/about" },
];
    

    

