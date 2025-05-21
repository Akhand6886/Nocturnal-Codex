import type { NavItem as NavItemType } from '@/components/layout/navbar'; // Adjusted import path
import type { CodeLanguage } from '@/components/content/code-snippet';

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  dataAiHint?: string;
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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string; 
  author: string;
  tags: string[];
  excerpt: string;
  content: string; 
  imageUrl?: string;
  dataAiHint?: string;
}

export interface WikiArticleStub {
  id: string;
  title: string;
  slug: string;
}
export interface WikiArticle extends WikiArticleStub {
  category?: string;
  content: string; 
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
  content: string; 
  tags?: string[];
  imageUrl?: string;
  dataAiHint?: string;
}

export const MOCK_TOPICS: Topic[] = [
  { 
    id: "algorithms", 
    slug: "algorithms",
    name: "Algorithms", 
    description: "Core concepts of computation and problem-solving strategies.", 
    longDescription: "Delve into the fundamental building blocks of computation. This section explores various algorithmic paradigms, data structures, and complexity analysis essential for efficient problem-solving in computer science.",
    imageUrl: "https://placehold.co/400x300.png", 
    dataAiHint: "abstract algorithm",
    subtopics: [
      {id: "sorting", slug: "sorting", name: "Sorting Algorithms", description: "Techniques for arranging data in a specific order."},
      {id: "graphs", slug: "graphs", name: "Graph Theory", description: "Study of networks and relationships between objects."},
      {id: "dp", slug: "dynamic-programming", name: "Dynamic Programming", description: "Optimization technique by breaking down problems."},
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
    ]
  },
  { 
    id: "os", 
    slug: "operating-systems",
    name: "Operating Systems", 
    description: "Software managing computer hardware and resources.", 
    longDescription: "Explore the intricate world of operating systems, the foundational software that bridges hardware and applications. Learn about process management, memory allocation, file systems, and concurrency.",
    imageUrl: "https://placehold.co/400x300.png", 
    dataAiHint: "computer hardware" 
  },
  { 
    id: "ml", 
    slug: "machine-learning",
    name: "Machine Learning", 
    description: "Algorithms that learn from and make decisions based on data.", 
    longDescription: "Dive into the field of Machine Learning, where algorithms enable systems to learn from data. Topics include supervised, unsupervised learning, neural networks, and model evaluation.",
    imageUrl: "https://placehold.co/400x300.png", 
    dataAiHint: "artificial intelligence" 
  },
  { 
    id: "cybersecurity", 
    slug: "cybersecurity",
    name: "Cybersecurity", 
    description: "Protecting systems from threats.", 
    longDescription: "Understand the principles and practices of cybersecurity. This section covers cryptography, network security, ethical hacking, and threat modeling to protect digital assets.",
    imageUrl: "https://placehold.co/400x300.png", 
    dataAiHint: "hacker code" 
  },
  { 
    id: "compiler-theory", 
    slug: "compiler-theory",
    name: "Compiler Theory", 
    description: "The art of translating high-level code to machine instructions.", 
    longDescription: "Uncover the magic behind compilers. Learn about lexical analysis, parsing, semantic analysis, code generation, and optimization techniques that transform source code into executable programs.",
    imageUrl: "https://placehold.co/400x300.png", 
    dataAiHint: "code compilation" 
  },
  { 
    id: "language-theory", 
    slug: "language-theory",
    name: "Language Theory", 
    description: "Formal languages, automata, and computability.", 
    longDescription: "Explore the theoretical foundations of computation and formal languages. This section delves into automata theory, grammars, Turing machines, and the limits of what can be computed.",
    imageUrl: "https://placehold.co/400x300.png", 
    dataAiHint: "abstract symbols" 
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "deep-dive-into-quantum-entanglement",
    title: "A Deep Dive into Quantum Entanglement",
    date: "2024-07-15T10:00:00Z",
    author: "The Nocturnist",
    tags: ["Quantum Physics", "Theory"],
    excerpt: "Exploring the spooky action at a distance and its implications for computing...",
    content: "# A Deep Dive into Quantum Entanglement\n\n## Introduction\nQuantum entanglement is a phenomenon ...\n\n## Implications\nThis has profound implications for...\n\n```python\n# Example of a Bell state\ndef create_bell_state():\n  # Theoretical representation\n  return \"|Φ+⟩ = 1/√2 (|00⟩ + |11⟩)\"\n```\n\nFurther reading is recommended.",
    imageUrl: "https://placehold.co/800x400.png",
    dataAiHint: "quantum physics"
  },
  {
    id: "2",
    slug: "the-elegance-of-lambda-calculus",
    title: "The Elegance of Lambda Calculus",
    date: "2024-06-28T14:30:00Z",
    author: "Lex Scripter",
    tags: ["Functional Programming", "Theory", "Mathematics"],
    excerpt: "Understanding the foundational principles of functional programming through Lambda Calculus.",
    content: "# The Elegance of Lambda Calculus\n\nLambda Calculus, developed by Alonzo Church, is a formal system in mathematical logic for expressing computation based on function abstraction and application using variable binding and substitution.\n\nIt's a minimalist, yet powerful, model of computation. Many functional programming languages are based on its principles.\n\n**Key Concepts:**\n- Abstraction: `λx.M` (a function with argument `x` and body `M`)\n- Application: `M N` (applying function `M` to argument `N`)\n\nThis framework allows for encoding numbers, booleans, and data structures purely with functions.",
    imageUrl: "https://placehold.co/800x400.png",
    dataAiHint: "mathematical symbols"
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
    children: MOCK_TOPICS.map(topic => ({ label: topic.name, href: `/topics/${topic.slug}` })),
  },
  { label: "Blog", href: "/blog" },
  { label: "Wiki", href: "/wiki" },
  { label: "Think Tank", href: "/think-tank" },
  { label: "About", href: "/about" },
];
