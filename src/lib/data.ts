
import type { NavItem as NavItemType } from '@/components/layout/navbar';
import type { CodeLanguage } from '@/components/content/code-snippet';
// The BlogPost type will now be imported from 'contentlayer/generated' in files that need it.

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
  tutorials?: Tutorial[];
  references?: WikiArticleStub[];
  thinkTankArticles?: ThinkTankArticleStub[];
  codeSnippets?: CodeSnippetItem[];
}

export interface SubTopic {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  url: string;
  sourceName: string;
}

export interface CodeSnippetItem {
  id: string;
  title: string;
  language: CodeLanguage;
  code: string;
  description?: string;
}

export interface BlogSeries {
  id: string;
  slug: string;
  title: string;
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
export interface ThinkTankArticle extends ThinkTankArticleStub {
  date: string;
  authors: string[];
  abstract: string;
  content: string; // Markdown content
  tags?: string[];
  imageUrl?: string;
  dataAiHint?: string;
}

export interface LanguageSection {
  id: string;
  title: string;
  content: string; // Markdown
  codeSnippets?: CodeSnippetItem[];
  tutorials?: Tutorial[];
}

export interface ProgrammingLanguage {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconUrl: string;
  dataAiHint: string;
  category?: string;
  longDescription?: string;
  mainContent?: string; // Markdown for Introduction/Overview
  sections?: LanguageSection[];
  tutorials?: Tutorial[]; // General tutorials
  codeSnippets?: CodeSnippetItem[]; // General examples
  relatedWikiArticles?: WikiArticleStub[];
  officialDocumentationUrl?: string;
}

export const MOCK_PROGRAMMING_LANGUAGES: ProgrammingLanguage[] = [
  {
    id: "python",
    slug: "python",
    name: "Python",
    description: "Versatile for web, data science, AI, and scripting.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "python logo",
    category: "General Purpose",
    longDescription: "Python is an interpreted, high-level and general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant indentation. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.",
    officialDocumentationUrl: "https://docs.python.org/3/",
    mainContent: `
# Introduction to Python

Python is a versatile and widely-used programming language known for its simplicity and readability. 
It was created by Guido van Rossum and first released in 1991.

## Key Features:
- **Easy to Learn:** Python has a simple syntax similar to the English language.
- **Interpreted:** Python is processed at runtime by the interpreter. You do not need to compile your program before executing it.
- **Cross-platform:** Python can run on various platforms like Windows, Mac, Linux, Raspberry Pi, etc.
- **Extensive Libraries:** Python has a rich set of standard libraries and a vast ecosystem of third-party packages (e.g., NumPy, Pandas, Django, Flask).
- **Object-Oriented:** Python supports object-oriented programming principles.
- **Dynamically Typed:** You don't need to declare variable types.
    `,
    sections: [
      {
        id: "basic-syntax",
        title: "Basic Syntax",
        content: `
### Variables and Data Types
\`\`\`python
name = "Alice"  # String
age = 30       # Integer
height = 5.5   # Float
is_student = False # Boolean
\`\`\`
### Comments
Comments start with a \`#\`, and Python will ignore them:
\`\`\`python
# This is a single-line comment
print("Hello, World!") 
\`\`\`
### Print Output
Use the \`print()\` function to output data to the standard output device.
\`\`\`python
print("Hello, Python!")
x = 10
print(f"The value of x is {x}") # Using f-strings (formatted string literals)
\`\`\`
        `,
        codeSnippets: [
            { id: "py-var", title: "Variable Declaration", language: "python", code: 'name = "Bob"\nage = 25\npi = 3.14159', description: "Basic variable assignments."}
        ]
      },
      {
        id: "control-flow",
        title: "Control Flow",
        content: `
### If-Else Statements
\`\`\`python
x = 10
if x > 5:
    print("x is greater than 5")
elif x == 5:
    print("x is 5")
else:
    print("x is less than 5")
\`\`\`
### For Loops
\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

for i in range(5):  # 0 to 4
    print(i)
\`\`\`
### While Loops
\`\`\`python
count = 0
while count < 3:
    print(f"Count is {count}")
    count += 1
\`\`\`
        `,
        codeSnippets: [
             { id: "py-loop", title: "For Loop Example", language: "python", code: 'for i in range(3):\n    print(f"Iteration {i+1}")', description: "Iterating with a for loop."}
        ]
      },
      {
        id: "functions",
        title: "Functions",
        content: `
Functions are defined using the \`def\` keyword.
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

message = greet("Pythonista")
print(message)

def add(a, b=5): # b has a default value
    return a + b

print(add(3))      # Output: 8
print(add(3, 7))   # Output: 10
\`\`\`
        `
      },
      {
        id: "python-decorators-deep-dive",
        title: "Python Decorators Deep Dive",
        content: `
### Understanding Decorators
Decorators are a powerful and expressive feature in Python that allow you to modify or enhance functions and methods in a clean and readable way. They are a form of metaprogramming.

### Use Cases
- Logging function calls
- Access control and authentication
- Caching results
- Adding instrumentation

### Example: A Simple Logging Decorator
\`\`\`python
import functools

def log_calls(func):
    @functools.wraps(func) # Preserves original function metadata
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args: {args}, kwargs: {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

add(5, 3)
\`\`\`
This provides a more in-depth look at decorators, complementing the new tutorial.
        `
      }
    ],
    codeSnippets: [
        { id: "py-hello", title: "Hello World in Python", language: "python", code: 'print("Hello, World!")', description: "The quintessential first program."}
    ],
    tutorials: [
        { id: "py-tut-1", title: "Official Python Tutorial", url: "https://docs.python.org/3/tutorial/", sourceName: "Python Software Foundation"},
        { id: "py-tut-2", title: "Python for Beginners", url: "#", sourceName: "Real Python (example)"}
    ],
    relatedWikiArticles: [
        {id: "wiki-pep8", slug: "pep-8-style-guide", title: "PEP 8 Style Guide"},
    ]
  },
  {
    id: "javascript",
    slug: "javascript",
    name: "JavaScript",
    description: "Essential for web development, front-end and back-end.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "javascript logo",
    category: "Web Development"
  },
  {
    id: "java",
    slug: "java",
    name: "Java",
    description: "Enterprise-level applications, Android development.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "java logo",
    category: "Enterprise"
  },
  {
    id: "cplusplus",
    slug: "cplusplus",
    name: "C++",
    description: "High-performance systems, game development, OS.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "cplusplus logo",
    category: "Systems Programming"
  },
  {
    id: "csharp",
    slug: "csharp",
    name: "C#",
    description: "Windows apps, game dev (Unity), web with .NET.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "csharp logo",
    category: "Microsoft Ecosystem"
  },
   {
    id: "typescript",
    slug: "typescript",
    name: "TypeScript",
    description: "JavaScript superset adding static types for large apps.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "typescript logo",
    category: "Web Development"
  },
  {
    id: "c",
    slug: "c",
    name: "C",
    description: "Foundation for many languages, OS, embedded systems.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "c logo",
    category: "Systems Programming"
  },
  {
    id: "sql",
    slug: "sql",
    name: "SQL",
    description: "Standard language for managing relational databases.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "sql logo",
    category: "Databases"
  },
  {
    id: "php",
    slug: "php",
    name: "PHP",
    description: "Server-side scripting language for web development.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "php logo",
    category: "Web Development"
  },
  {
    id: "html",
    slug: "html",
    name: "HTML",
    description: "Standard markup language for creating web pages.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "html logo",
    category: "Web Development"
  },
  {
    id: "css",
    slug: "css",
    name: "CSS",
    description: "Style sheet language for describing web page presentation.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "css logo",
    category: "Web Development"
  }
];


export const MOCK_BLOG_SERIES: BlogSeries[] = [
  {
    id: "quantum-intro",
    slug: "introduction-to-quantum-concepts",
    title: "Introduction to Quantum Concepts",
    description: "A beginner-friendly series exploring the fundamental ideas of quantum mechanics and computing."
  },
  {
    id: "getting-started",
    slug: "getting-started-series",
    title: "Getting Started Series",
    description: "General posts to help you get started on your journey with Nocturnal Codex."
  }
];

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
    tutorials: [
      {id: "tut-algo-1", title: "Introduction to Big O Notation", url: "#", sourceName: "CS Dojo"},
      {id: "tut-algo-2", title: "Understanding Recursion", url: "#", sourceName: "freeCodeCamp"},
    ],
    references: [
      {id: "wiki-clrs", slug: "clrs-summary", title: "CLRS Summary Notes"},
    ],
    codeSnippets: [
      {id: "cs-algo-1", title: "Python Merge Sort", language: "python", code: "def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        # ... (merge logic)\n        i = j = k = 0\n        while i < len(L) and j < len(R):\n            if L[i] < R[j]:\n                arr[k] = L[i]\n                i += 1\n            else:\n                arr[k] = R[j]\n                j += 1\n            k += 1\n        while i < len(L):\n            arr[k] = L[i]\n            i += 1\n            k += 1\n        while j < len(R):\n            arr[k] = R[j]\n            j += 1\n            k += 1\n", description: "A classic divide-and-conquer sorting algorithm."},
      {
        id: "cs-algo-bigo-example",
        title: "Big O Notation Example (Linear Time)",
        language: "python",
        code:
      `def find_element(arr, target):
    # O(n) - Linear time complexity
    for element in arr:
        if element == target:
            return True
    return False

my_list = [1, 2, 3, 4, 5]
print(find_element(my_list, 3)) # True
print(find_element(my_list, 6)) # False`,
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
    content: "# Big O Notation\n\nBig O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it is used to classify algorithms according to how their run time or space requirements grow as the input size grows.\n\n## Common Complexities\n- O(1): Constant time\n- O(log n): Logarithmic time\n- O(n): Linear time\n- O(n log n): Linearithmic time\n- O(n^2): Quadratic time\n- O(2^n): Exponential time"
  },
  {
    id: "2",
    slug: "turing-machines",
    title: "Turing Machines",
    category: "Theory of Computation",
    lastUpdated: "2024-05-20T09:00:00Z",
    content: "# Turing Machines\n\nA Turing machine is a mathematical model of computation that defines an abstract machine which manipulates symbols on a strip of tape according to a table of rules. Despite its simplicity, a Turing machine can be adapted to simulate the logic of any computer algorithm, and is particularly useful in explaining the functions of a CPU inside a computer.\n\n## Components\n1. A tape divided into cells.\n2. A head that can read and write symbols on the tape and move left or right.\n3. A state register that stores the state of the Turing machine.\n4. A finite table of instructions."
  },
  {
    id: "wiki-pep8", // Added for Python page linking
    slug: "pep-8-style-guide",
    title: "PEP 8 Style Guide for Python Code",
    category: "Programming Practices",
    lastUpdated: "2024-02-15T10:00:00Z",
    content: "# PEP 8 - Style Guide for Python Code\n\nPEP 8, sometimes spelled PEP8 or PEP-8, is a document that provides guidelines and best practices on how to write Python code. It was written in 2001 by Guido van Rossum, Barry Warsaw, and Nick Coghlan. The primary focus of PEP 8 is to improve the readability and consistency of Python code.\n\nKey areas covered:\n- Code lay-out (indentation, tabs vs. spaces, line length)\n- Naming conventions (variables, functions, classes)\n- Comments and docstrings\n- Programming recommendations"
  }
];

export const MOCK_THINK_TANK_ARTICLES: ThinkTankArticle[] = [
  {
    id: "1",
    slug: "on-the-nature-of-p-vs-np",
    title: "On the Nature of P vs NP",
    date: "2024-05-10T00:00:00Z",
    authors: ["Dr. E. Coddsworth"],
    tags: ["Complexity Theory", "Unsolved Problems"],
    abstract: "A speculative exploration into the P versus NP problem, considering novel approaches from information theory and thermodynamics.",
    content: "# On the Nature of P vs NP\n\nThe P versus NP problem is a major unsolved problem in computer science. It asks whether every problem whose solution can be quickly verified can also be quickly solved.\n\nThis paper explores...\n\n## Mathematical Formalism\nLet $P$ be the set of decision problems solvable in polynomial time by a deterministic Turing machine. \nLet $NP$ be the set of decision problems solvable in polynomial time by a non-deterministic Turing machine.\n\nThe question is whether $P = NP$.\n\n$$ \\sum_{i=1}^n i = \\frac{n(n+1)}{2} $$ \n\nWe hypothesize that...",
    imageUrl: "https://placehold.co/800x450.png",
    dataAiHint: "complex graph"
  },
  {
    id: "2",
    slug: "entropy-in-information-systems",
    title: "Entropy in Information Systems: A Unified Theory",
    date: "2024-03-22T00:00:00Z",
    authors: ["Ada Bitwise", "Claude Shannonesque"],
    tags: ["Information Theory", "Systems Theory"],
    abstract: "This article proposes a unified framework for understanding entropy across various information systems, from communication channels to software architecture.",
    content: "# Entropy in Information Systems: A Unified Theory\n\nEntropy, a concept originating from thermodynamics, has found profound applications in information theory, largely due to Claude Shannon's work. This paper extends the notion of entropy to broader information systems, including software architecture and data structures.\n\n## Shannon Entropy\nFor a discrete random variable $X$ with possible values \\{x_1, ..., x_n\\} and probability mass function $P(X)$, the entropy $H(X)$ is defined as:\n\n$$ H(X) = - \\sum_{i=1}^n P(x_i) \\log_b P(x_i) $$ \n\nWhere $b$ is the base of the logarithm used. Common values for $b$ are 2, Euler's number $e$, or 10.\n\nThis framework can be used to analyze system complexity, information flow, and potential for degradation or 'code rot'.",
    imageUrl: "https://placehold.co/800x450.png",
    dataAiHint: "data flow"
  },
];

export const NAV_ITEMS: NavItemType[] = [
  { label: "Home", href: "/" },
  {
    label: "Topics",
    href: "/topics",
    // children are dynamically populated in Navbar component
  },
  // Consider adding "Languages" here if it becomes a major section
  // { label: "Languages", href: "/languages" }, 
  { label: "Blog", href: "/blog" },
  { label: "Wiki", href: "/wiki" },
  { label: "Think Tank", href: "/think-tank" },
  { label: "About", href: "/about" },
];


    