
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

export interface LanguageSection { // Represents Core Concepts or detailed aspects
  id: string; // slug-like, for URL hash
  title: string;
  content: string; // Markdown
  codeSnippets?: CodeSnippetItem[];
  tutorials?: Tutorial[];
}

export interface KeyFeature {
    id: string;
    name: string;
    description: string;
    icon?: string; // Lucide icon name, optional
}

export interface ProgrammingLanguage {
  id: string;
  slug: string;
  name: string;
  description: string; // Short description for tiles/lists
  iconUrl: string;
  dataAiHint: string;
  category?: string;
  longDescription?: string; // Longer intro for the language page header
  mainContent?: string; // Markdown for detailed Introduction/Overview section
  keyFeatures?: KeyFeature[];
  useCases?: string[];
  paradigms?: string[];
  typing?: string; // e.g., "Dynamically Typed", "Statically Typed"
  version?: string; // Current stable version or relevant version info
  sections?: LanguageSection[]; // For Core Concepts or other detailed sections
  tutorials?: Tutorial[]; // General tutorials for a dedicated "Tutorials" section
  codeSnippets?: CodeSnippetItem[]; // General examples for a dedicated "Examples" section
  relatedWikiArticles?: WikiArticleStub[];
  officialDocumentationUrl?: string;
  communityLinks?: Array<{ name: string, url: string, type: 'forum' | 'discord' | 'subreddit' | 'other' }>;
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
    longDescription: "Python is an interpreted, high-level and general-purpose programming language. Its design philosophy emphasizes code readability with its notable use of significant indentation. Python aims to help programmers write clear, logical code for small and large-scale projects.",
    officialDocumentationUrl: "https://docs.python.org/3/",
    mainContent: `
## Welcome to the World of Python

Python stands out for its simplicity and readability, making it an excellent choice for beginners and a powerful tool for experts. Created by Guido van Rossum and first released in 1991, Python's ecosystem has grown immensely, supporting a vast array of applications.

### Why Python?
- **Ease of Learning:** Its syntax is designed to be intuitive and closely resembles plain English.
- **Vast Libraries:** A rich standard library and an extensive collection of third-party packages (like NumPy, Pandas for data science, Django and Flask for web development) accelerate development.
- **Versatility:** From web servers and data analysis to machine learning and automation, Python is highly versatile.
- **Strong Community:** A large, active global community means abundant resources, tutorials, and support.
- **Cross-Platform:** Python programs can run on Windows, macOS, Linux, and other platforms without modification.
    `,
    keyFeatures: [
        { id: "readability", name: "High Readability", description: "Clean syntax emphasizes readability, reducing the cost of program maintenance.", icon: "Baseline"},
        { id: "libraries", name: "Extensive Standard Library", description: "Offers a wide range of modules and functions for various tasks, often called 'batteries included'.", icon: "Library"},
        { id: "dynamic-typing", name: "Dynamic Typing", description: "Variable types are checked at runtime, offering flexibility during development.", icon: "Type"},
        { id: "interprete", name: "Interpreted Language", description: "Code is executed line by line, simplifying debugging and prototyping.", icon: "PlayCircle"},
        { id: "oop", name: "Object-Oriented", description: "Supports object-oriented programming paradigms, allowing for modular and reusable code.", icon: "Box"},
    ],
    useCases: [
        "Web Development (Django, Flask, FastAPI)",
        "Data Science & Machine Learning (NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch)",
        "Automation & Scripting",
        "Artificial Intelligence & Natural Language Processing",
        "Scientific Computing & Research",
        "Software Testing",
        "Game Development (Pygame)",
    ],
    paradigms: ["Object-Oriented", "Imperative", "Functional", "Procedural"],
    typing: "Dynamically Typed, Strong Typing",
    version: "Python 3.x is the current standard",
    sections: [ 
      {
        id: "basic-syntax",
        title: "Basic Syntax",
        content: `
Python's syntax is designed for clarity.

### Variables and Data Types
Variables are created when you assign a value to them. Python has several built-in data types:
- **Numbers**: \`int\`, \`float\`, \`complex\`
- **Strings**: \`str\` (e.g., \`"Hello"\`, \`'World'\`)
- **Booleans**: \`bool\` (\`True\`, \`False\`)
- **Sequences**: \`list\`, \`tuple\`, \`range\`
- **Mappings**: \`dict\`
- **Sets**: \`set\`, \`frozenset\`

\`\`\`python
name = "Alice"      # str
age = 30           # int
height = 5.5       # float
is_student = False # bool
numbers = [1, 2, 3]  # list
person = {"name": "Bob", "age": 25} # dict
\`\`\`
### Comments
Comments start with a \`#\`, and Python will ignore them:
\`\`\`python
# This is a single-line comment
print("Hello, World!") 
\`\`\`
        `,
      },
      {
        id: "control-flow",
        title: "Control Flow",
        content: `
Control flow statements direct the order of execution.

### Conditional Statements (\`if\`, \`elif\`, \`else\`)
\`\`\`python
x = 10
if x > 5:
    print("x is greater than 5")
elif x == 5:
    print("x is 5")
else:
    print("x is less than 5")
\`\`\`
### Loops (\`for\`, \`while\`)
**For Loops** are used for iterating over a sequence:
\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

for i in range(5):  # Iterates from 0 to 4
    print(i)
\`\`\`
**While Loops** repeat as long as a condition is true:
\`\`\`python
count = 0
while count < 3:
    print(f"Count is {count}")
    count += 1
\`\`\`
        `,
      },
      {
        id: "functions",
        title: "Functions",
        content: `
Functions are blocks of reusable code, defined using the \`def\` keyword.
\`\`\`python
def greet(name):
    """This function greets the person passed in as a parameter."""
    return f"Hello, {name}!"

message = greet("Pythonista")
print(message)  # Output: Hello, Pythonista!

# Functions can have default arguments
def add(a, b=5):
    return a + b

print(add(3))      # Output: 8 (uses default b=5)
print(add(3, 7))   # Output: 10 (overrides default b)
\`\`\`
        `
      },
      {
        id: "python-decorators-deep-dive",
        title: "Python Decorators Deep Dive",
        content: `
### Understanding Decorators
Decorators are a powerful and expressive feature in Python that allow you to modify or enhance functions and methods in a clean and readable way. They are a form of metaprogramming, where one function takes another function and extends its behavior without explicitly modifying it.

### Use Cases
- Logging function calls and their arguments/return values.
- Enforcing access control and authentication.
- Caching the results of expensive function calls.
- Adding instrumentation for performance monitoring.
- Implementing frameworks and APIs (e.g., route handling in web frameworks).

### Example: A Simple Logging Decorator
\`\`\`python
import functools

def log_calls(func):
    @functools.wraps(func) # Preserves original function metadata
    def wrapper(*args, **kwargs):
        print(f"Calling function '{func.__name__}' with arguments: {args}, keyword arguments: {kwargs}")
        result = func(*args, **kwargs)
        print(f"Function '{func.__name__}' returned: {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    """Adds two numbers."""
    return a + b

sum_result = add(5, 3)
# Output will show logs before and after the add function call
\`\`\`
This example demonstrates how a decorator can wrap around the \`add\` function to log its execution details.
        `
      }
    ],
    codeSnippets: [ 
        { id: "py-hello-world", title: "Hello World in Python", language: "python", code: 'print("Hello, World!")', description: "The quintessential first program demonstrating basic output."}
    ],
    tutorials: [ 
        { id: "py-tut-official", title: "Official Python Tutorial", url: "https://docs.python.org/3/tutorial/", sourceName: "Python Software Foundation"},
        { id: "py-tut-realpython", title: "Python for Beginners on Real Python", url: "https://realpython.com/learning-paths/python3-introduction/", sourceName: "Real Python"}
    ],
    relatedWikiArticles: [
        {id: "wiki-pep8", slug: "pep-8-style-guide", title: "PEP 8 - Python Style Guide"},
        {id: "wiki-python-history", slug: "python-history", title: "History of Python"},
    ],
    communityLinks: [
        { name: "Python Forum", url: "https://discuss.python.org/", type: "forum"},
        { name: "r/Python Subreddit", url: "https://www.reddit.com/r/Python/", type: "subreddit"}
    ]
  },
  {
    id: "javascript",
    slug: "javascript",
    name: "JavaScript",
    description: "Essential for web development, front-end and back-end.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "javascript logo",
    category: "Web Development",
    longDescription: "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript specification. It is a cornerstone technology of the World Wide Web, alongside HTML and CSS.",
    mainContent: `
## Exploring JavaScript
JavaScript (JS) is a versatile programming language primarily known as the scripting language for Web pages, but it's also used in many non-browser environments thanks to Node.js.

### Key Aspects:
- **Client-Side Scripting:** Dynamically update content, control multimedia, animate images, and much more.
- **Server-Side Development:** With Node.js, JavaScript can be used to build scalable network applications.
- **Asynchronous Nature:** Features like Promises and async/await make handling asynchronous operations elegant.
- **Rich Ecosystem:** A vast number of frameworks and libraries (React, Angular, Vue, Express, etc.) simplify development.
`,
    keyFeatures: [
      { id: "dynamic", name: "Dynamic and Interpreted", description: "Executed directly by the browser or Node.js runtime.", icon: "Zap"},
      { id: "prototype-based", name: "Prototype-based OOP", description: "Uses prototypes for inheritance rather than classes (though ES6 classes are syntactic sugar).", icon: "Share2"},
      { id: "single-threaded", name: "Single-threaded Event Loop", description: "Manages asynchronous operations efficiently without blocking the main thread.", icon: "RefreshCw"},
    ],
    useCases: [
      "Interactive Front-End Web Development (React, Vue, Angular)",
      "Server-Side Web Applications (Node.js, Express.js)",
      "Mobile App Development (React Native, Ionic)",
      "Desktop App Development (Electron)",
      "Game Development (Phaser, PixiJS)",
    ],
    typing: "Dynamically Typed, Weakly Typed",
    paradigms: ["Event-Driven", "Functional", "Object-Oriented (Prototype-based)"],
  },
  {
    id: "java",
    slug: "java",
    name: "Java",
    description: "Enterprise-level applications, Android development.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "java logo",
    category: "Enterprise",
    longDescription: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let application developers write once, run anywhere (WORA).",
    officialDocumentationUrl: "https://docs.oracle.com/en/java/",
    mainContent: `
## Java: Write Once, Run Anywhere

Java is a robust, object-oriented language known for its platform independence and extensive use in enterprise-level applications, large-scale systems, and Android mobile development.

### Key Aspects:
- **Platform Independence (WORA):** Java code is compiled into bytecode that runs on any device with a Java Virtual Machine (JVM).
- **Object-Oriented:** Fully supports OOP principles like encapsulation, inheritance, and polymorphism.
- **Strong Memory Management:** Features automatic garbage collection.
- **Rich API:** Provides a comprehensive standard library for various tasks.
- **Concurrency Support:** Built-in support for multithreaded programming.
- **Security:** Designed with security features like a sandbox environment.
  `,
    keyFeatures: [
      { id: "platform-independent", name: "Platform Independent", description: "Compile once, run on any JVM-enabled device.", icon: "Globe" },
      { id: "object-oriented", name: "Object-Oriented", description: "Embraces encapsulation, inheritance, and polymorphism.", icon: "Blocks" },
      { id: "robust", name: "Robust & Secure", description: "Strong memory management, exception handling, and security features.", icon: "ShieldCheck" },
      { id: "multithreaded", name: "Multithreaded", description: "Built-in support for concurrent execution of tasks.", icon: "Users" },
      { id: "large-ecosystem", name: "Large Ecosystem", description: "Vast collection of libraries, frameworks (e.g., Spring, Hibernate), and tools.", icon: "Library" }
    ],
    useCases: [
      "Enterprise Applications (Spring Framework)",
      "Android Mobile App Development",
      "Big Data Technologies (Hadoop, Spark)",
      "Web Servers and Application Servers",
      "Scientific Applications",
      "Financial Services Industry Software",
      "Embedded Systems & IoT"
    ],
    paradigms: ["Object-Oriented", "Imperative", "Generic", "Concurrent"],
    typing: "Statically Typed, Strong Typing",
    version: "Java LTS (e.g., 11, 17, 21)",
    sections: [
      {
        id: "java-basic-syntax",
        title: "Basic Syntax and Structure",
        content: \`
Java syntax is similar to C++ but simplified to eliminate language features that cause common programming errors.

### Hello World Example
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### Variables and Data Types
Java has primitive data types (\`int\`, \`float\`, \`boolean\`, \`char\`, etc.) and object types (classes).
\`\`\`java
int age = 30;
double salary = 75000.50;
boolean isActive = true;
String name = "Java Developer"; // String is an object
\`\`\`

### Control Flow
Java uses standard control flow statements:
- **Conditional:** \`if\`, \`else if\`, \`else\`, \`switch\`
- **Loops:** \`for\`, \`while\`, \`do-while\`

\`\`\`java
int number = 10;
if (number % 2 == 0) {
    System.out.println(number + " is even.");
} else {
    System.out.println(number + " is odd.");
}

for (int i = 0; i < 5; i++) {
    System.out.println("Iteration: " + i);
}
\`\`\`
      \`
      },
      {
        id: "java-oop",
        title: "Object-Oriented Programming (OOP) in Java",
        content: \`
Java is fundamentally object-oriented. Key OOP concepts include:

### Classes and Objects
A class is a blueprint for creating objects. An object is an instance of a class.
\`\`\`java
class Dog {
    String name;
    String breed;

    public Dog(String name, String breed) {
        this.name = name;
        this.breed = breed;
    }

    void bark() {
        System.out.println(name + " says: Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog("Buddy", "Golden Retriever");
        myDog.bark(); // Buddy says: Woof!
    }
}
\`\`\`

### Inheritance
Allows a class (subclass) to inherit fields and methods from another class (superclass).
\`\`\`java
class Animal {
    void eat() {
        System.out.println("This animal eats food.");
    }
}

class Cat extends Animal { // Cat inherits from Animal
    void meow() {
        System.out.println("Meow!");
    }
}
\`\`\`

### Polymorphism
Allows objects of different classes to respond to the same method call in different ways.

### Encapsulation
Bundling data (attributes) and methods that operate on the data within a single unit (class), often with access control (public, private, protected).
      \`
      }
    ],
    codeSnippets: [
      { id: "java-class-example", title: "Simple Java Class", language: "java", code: \`public class Vehicle {\n    String modelName;\n    int year;\n\n    public Vehicle(String model, int yr) {\n        modelName = model;\n        year = yr;\n    }\n\n    public void displayInfo() {\n        System.out.println("Model: " + modelName + ", Year: " + year);\n    }\n\n    public static void main(String[] args) {\n        Vehicle car = new Vehicle("SedanX", 2023);\n        car.displayInfo();\n    }\n}\`, description: "A basic example of a class with a constructor and a method."}
    ],
    tutorials: [
      { id: "java-tut-oracle", title: "Oracle Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/", sourceName: "Oracle"},
      { id: "java-tut-baeldung", title: "Baeldung Java Tutorials", url: "https://www.baeldung.com/java-tutorial", sourceName: "Baeldung"}
    ],
    relatedWikiArticles: [
      {id: "wiki-jvm", slug: "jvm-overview", title: "Java Virtual Machine (JVM)"},
      {id: "wiki-garbage-collection", slug: "java-garbage-collection", title: "Garbage Collection in Java"},
    ],
    communityLinks: [
      { name: "Stack Overflow (Java)", url: "https://stackoverflow.com/questions/tagged/java", type: "forum"},
      { name: "r/java Subreddit", url: "https://www.reddit.com/r/java/", type: "subreddit"}
    ]
  },
  {
    id: "cplusplus",
    slug: "cplusplus",
    name: "C++",
    description: "High-performance systems, game development, OS.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "cplusplus logo",
    category: "Systems Programming",
    mainContent: "## C++: Performance and Control\nC++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or \"C with Classes\". It has imperative, object-oriented and generic programming features, while also providing facilities for low-level memory manipulation."
  },
  {
    id: "csharp",
    slug: "csharp",
    name: "C#",
    description: "Windows apps, game dev (Unity), web with .NET.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "csharp logo",
    category: "Microsoft Ecosystem",
    mainContent: "## C#: Versatile and Modern\nC# (C-Sharp) is a modern, object-oriented, and type-safe programming language. C# enables developers to build many types of secure and robust applications that run in the .NET ecosystem."
  },
   {
    id: "typescript",
    slug: "typescript",
    name: "TypeScript",
    description: "JavaScript superset adding static types for large apps.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "typescript logo",
    category: "Web Development",
    mainContent: "## TypeScript: JavaScript That Scales\nTypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS."
  },
  {
    id: "c",
    slug: "c",
    name: "C",
    description: "Foundation for many languages, OS, embedded systems.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "c logo",
    category: "Systems Programming",
    mainContent: "## C: The Bedrock of Modern Computing\nThe C programming language is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system. By design, C provides constructs that map efficiently to typical machine instructions."
  },
  {
    id: "sql",
    slug: "sql",
    name: "SQL",
    description: "Standard language for managing relational databases.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "sql logo",
    category: "Databases",
    mainContent: "## SQL: Querying Your Data\nSQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS), or for stream processing in a relational data stream management system (RDSMS)."
  },
  {
    id: "php",
    slug: "php",
    name: "PHP",
    description: "Server-side scripting language for web development.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "php logo",
    category: "Web Development",
    mainContent: "## PHP: Powering the Web\nPHP is a popular general-purpose scripting language that is especially suited to web development. Fast, flexible and pragmatic, PHP powers everything from your blog to the most popular websites in the world."
  },
  {
    id: "html",
    slug: "html",
    name: "HTML",
    description: "Standard markup language for creating web pages.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "html logo",
    category: "Web Development",
    mainContent: "## HTML: The Structure of Web Pages\nHTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript."
  },
  {
    id: "css",
    slug: "css",
    name: "CSS",
    description: "Style sheet language for describing web page presentation.",
    iconUrl: "https://placehold.co/64x64.png",
    dataAiHint: "css logo",
    category: "Web Development",
    mainContent: "## CSS: Styling the Web\nCascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript."
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
      {id: "wiki-big-o", slug: "big-o-notation", title: "Big O Notation"}
    ],
    codeSnippets: [
      {id: "cs-algo-1", title: "Python Merge Sort", language: "python", code: "def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        # ... (merge logic)\n        i = j = k = 0\n        while i < len(L) and j < len(R):\n            if L[i] < R[j]:\n                arr[k] = L[i]\n                i += 1\n            else:\n                arr[k] = R[j]\n                j += 1\n            k += 1\n        while i < len(L):\n            arr[k] = L[i]\n            i += 1\n            k += 1\n        while j < len(R):\n            arr[k] = R[j]\n            j += 1\n            k += 1\n", description: "A classic divide-and-conquer sorting algorithm."},
      {
        id: "cs-algo-bigo-example",
        title: "Big O Notation Example (Linear Time)",
        language: "python",
        code:
      \`def find_element(arr, target):
    # O(n) - Linear time complexity
    for element in arr:
        if element == target:
            return True
    return False

my_list = [1, 2, 3, 4, 5]
print(find_element(my_list, 3)) # True
print(find_element(my_list, 6)) # False\`,
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
    content: "# Big O Notation\n\nBig O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it is used to classify algorithms according to how their run time or space requirements grow as the input size grows.\n\n## Common Complexities\n- **O(1)**: Constant time - The algorithm takes the same amount of time regardless of the input size.\n- **O(log n)**: Logarithmic time - Time increases logarithmically with input size (e.g., binary search).\n- **O(n)**: Linear time - Time increases linearly with input size (e.g., iterating through a list).\n- **O(n log n)**: Linearithmic time - Common in efficient sorting algorithms (e.g., merge sort, quicksort).\n- **O(n^2)**: Quadratic time - Time increases with the square of the input size (e.g., nested loops over the same collection).\n- **O(2^n)**: Exponential time - Time doubles with each addition to the input size (e.g., some recursive algorithms without memoization).\n- **O(n!)**: Factorial time - Time increases factorially, often seen in permutations.\n\nUnderstanding Big O is crucial for writing efficient and scalable code."
  },
  {
    id: "2",
    slug: "turing-machines",
    title: "Turing Machines",
    category: "Theory of Computation",
    lastUpdated: "2024-05-20T09:00:00Z",
    content: "# Turing Machines\n\nA Turing machine is a mathematical model of computation that defines an abstract machine which manipulates symbols on a strip of tape according to a table of rules. Despite its simplicity, a Turing machine can be adapted to simulate the logic of any computer algorithm, and is particularly useful in explaining the functions of a CPU inside a computer.\n\n## Components\n1.  **Tape**: An infinitely long strip divided into cells. Each cell can hold one symbol from a finite alphabet.\n2.  **Head**: Can read the symbol in the current cell, write a new symbol, and move one cell to the left or right.\n3.  **State Register**: Stores the current state of the machine, chosen from a finite set of states.\n4.  **Transition Function (Finite Table of Instructions)**: Given the current state and the symbol under the head, it dictates:\n    *   The symbol to write on the tape.\n    *   How to move the head (left, right, or stay).\n    *   The next state of the machine.\n\nTuring machines are fundamental to the study of computability and complexity theory."
  },
  {
    id: "wiki-pep8", 
    slug: "pep-8-style-guide",
    title: "PEP 8 Style Guide for Python Code",
    category: "Programming Practices",
    lastUpdated: "2024-02-15T10:00:00Z",
    content: "# PEP 8 - Style Guide for Python Code\n\nPEP 8, sometimes spelled PEP8 or PEP-8, is a document that provides guidelines and best practices on how to write Python code. It was written in 2001 by Guido van Rossum, Barry Warsaw, and Nick Coghlan. The primary focus of PEP 8 is to improve the readability and consistency of Python code.\n\n## Key areas covered by PEP 8:\n\n- **Code Lay-out**: Indentation (4 spaces per level), tabs vs. spaces (spaces are preferred), maximum line length (79 characters for code, 72 for docstrings/comments), blank lines, source file encoding (UTF-8).\n- **String Quotes**: Consistency in using single or double quotes.\n- **Whitespace in Expressions and Statements**: Proper use of spaces around operators and after commas.\n- **Comments**: Block comments, inline comments, and documentation strings (docstrings).\n- **Naming Conventions**: \`lowercase\` for functions and variables, \`CapWords\` for classes, \`UPPERCASE_WITH_UNDERSCORES\` for constants.\n- **Programming Recommendations**: Comparisons to singletons like \`None\` should always be done with \`is\` or \`is not\`, never with equality operators. Use \`isinstance()\` for type checking.\n\nAdhering to PEP 8 makes Python code more readable and maintainable across different projects and teams."
  },
  {
    id: "wiki-python-history",
    slug: "python-history",
    title: "History of Python",
    category: "Programming Languages",
    lastUpdated: "2024-01-10T14:00:00Z",
    content: "# History of Python\n\nPython was conceived in the late 1980s by Guido van Rossum at Centrum Wiskunde & Informatica (CWI) in the Netherlands as a successor to the ABC language (itself inspired by SETL), capable of exception handling and interfacing with the Amoeba operating system. Its implementation began in December 1989.\n\n- **Python 0.9.0** was released in February 1991.\n- **Python 1.0** was released in January 1994, with major new features including lambda, map, filter, and reduce.\n- **Python 2.0**, released in October 2000, introduced list comprehensions, garbage collection system capable of collecting reference cycles, and support for Unicode.\n- **Python 3.0** (also known as Python 3000 or Py3k), a major, backward-incompatible release, was released in December 2008 after a long period of testing. Many of its major features were backported to Python 2.6.x and 2.7.x version series.\n\nPython's philosophy emphasizes code readability and a syntax that allows programmers to express concepts in fewer lines of code than might be used in languages such as C++ or Java."
  },
  {
    id: "wiki-jvm",
    slug: "jvm-overview",
    title: "Java Virtual Machine (JVM)",
    category: "Programming Languages",
    lastUpdated: "2024-03-10T11:00:00Z",
    content: "# Java Virtual Machine (JVM)\n\nThe Java Virtual Machine (JVM) is an abstract computing machine that enables a computer to run a Java program. When a Java program is compiled, it is compiled into an intermediate language called bytecode. The JVM translates this bytecode into machine code that can be executed by the computer's processor.\n\n## Key Functions:\n- **Loads code**\n- **Verifies code**\n- **Executes code**\n- **Provides runtime environment**\n\nKey components include the Classloader, Execution Engine, and Runtime Data Areas (Heap, Stack, Method Area, etc.). The JVM is a crucial part of the \"Write Once, Run Anywhere\" (WORA) capability of Java."
  },
  {
    id: "wiki-garbage-collection",
    slug: "java-garbage-collection",
    title: "Garbage Collection in Java",
    category: "Programming Languages",
    lastUpdated: "2024-04-05T16:30:00Z",
    content: "# Garbage Collection in Java\n\nGarbage Collection (GC) in Java is the process of automatically managing memory. It identifies and discards objects that are no longer needed by a program so that their resources can be reclaimed and reused.\n\n## How it Works (Simplified):\n1.  **Marking**: The garbage collector identifies which pieces of memory are in use and which are not.\n2.  **Sweeping/Deleting**: The garbage collector removes objects identified during the \"marking\" phase.\n3.  **Compacting** (Optional): After deleting unused objects, the memory can be compacted to reduce fragmentation.\n\nJava provides different garbage collection algorithms (e.g., Serial GC, Parallel GC, CMS GC, G1 GC, ZGC, Shenandoah) that offer different trade-offs in terms of pause times and throughput."
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
 
    
