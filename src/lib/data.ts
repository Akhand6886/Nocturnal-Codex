import type { NavItem as NavItemType } from '@/components/layout/navbar';

export const NAV_ITEMS: NavItemType[] = [
  { label: "Home", href: "/" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Languages", href: "/languages" },
  { label: "Blog", href: "/blog" },
  { label: "Think Tank", href: "/think-tank" },
  { label: "Wiki", href: "/wiki" },
  { label: "About", href: "/about" },
];

export interface WikiArticle {
  slug: string;
  title: string;
  category: 'Core Concept' | 'Data Structures' | 'Algorithms' | 'Paradigms';
  excerpt: string;
  content: string; // Markdown content
  related: string[]; // Slugs of related articles
}

export const MOCK_WIKI_ARTICLES: WikiArticle[] = [
    {
        slug: 'p-vs-np',
        title: 'P vs. NP Problem',
        category: 'Core Concept',
        excerpt: 'One of the most profound unsolved problems in computer science, asking if every problem whose solution can be quickly verified can also be quickly solved.',
        content: `
The P versus NP problem is a major unsolved problem in theoretical computer science. In informal terms, it asks whether every problem whose solution can be quickly verified can also be solved quickly.

- **P (Polynomial Time):** This is a class of decision problems that can be solved by a deterministic Turing machine in polynomial time. These are problems that are considered "efficiently solvable."
- **NP (Nondeterministic Polynomial Time):** This is a class of decision problems for which a given solution can be verified by a deterministic Turing machine in polynomial time.

The core question is: **Is P equal to NP?** Most computer scientists believe that P ≠ NP, meaning there are problems in NP that are not in P—problems that are easy to verify but hard to solve.
        `,
        related: ['big-o-notation', 'algorithms']
    },
    {
        slug: 'big-o-notation',
        title: 'Big O Notation',
        category: 'Algorithms',
        excerpt: 'A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.',
        content: `
Big O notation is used to classify algorithms according to how their run time or space requirements grow as the input size grows. It provides a high-level understanding of an algorithm's efficiency.

| Notation | Name | Description |
|---|---|---|
| O(1) | Constant | Always takes the same amount of time, regardless of input size. |
| O(log n) | Logarithmic | Time increases logarithmically with input size. Very efficient. |
| O(n) | Linear | Time increases linearly with input size. |
| O(n log n) | Linearithmic | Common in efficient sorting algorithms. |
| O(n^2) | Quadratic | Time grows with the square of the input size. |
| O(2^n) | Exponential | Becomes very slow with even small increases in input size. |
        `,
        related: ['p-vs-np', 'algorithms', 'data-structures']
    },
    {
        slug: 'data-structures',
        title: 'Data Structures',
        category: 'Data Structures',
        excerpt: 'The fundamental constructs around which you build your programs. Each data structure provides a particular way of organizing, storing, and accessing data.',
        content: `
A data structure is a data organization, management, and storage format that is usually chosen for efficient access to data. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.

**Common Data Structures:**
- **Arrays:** A collection of items stored at contiguous memory locations.
- **Linked Lists:** A linear collection of data elements whose order is not given by their physical placement in memory.
- **Stacks:** A LIFO (Last-In, First-Out) structure.
- **Queues:** A FIFO (First-In, First-Out) structure.
- **Trees:** A hierarchical structure with a root value and subtrees of children.
- **Graphs:** A set of nodes (or vertices) and edges that connect them.
- **Hash Tables:** A structure that maps keys to values for highly efficient lookups.
        `,
        related: ['big-o-notation', 'algorithms']
    },
    {
        slug: 'algorithms',
        title: 'Algorithms',
        category: 'Algorithms',
        excerpt: 'A step-by-step procedure for calculations. Algorithms are used for calculation, data processing, and automated reasoning.',
        content: `
An algorithm is a finite sequence of well-defined, computer-implementable instructions, typically to solve a class of problems or to perform a computation.

**Algorithm Design Paradigms:**
- **Divide and Conquer:** Breaking down a problem into smaller sub-problems, solving them recursively, and combining their solutions. (e.g., Merge Sort, Quick Sort).
- **Greedy Algorithms:** Making the locally optimal choice at each stage with the hope of finding a global optimum. (e.g., Dijkstra's algorithm).
- **Dynamic Programming:** Solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions. (e.g., Fibonacci sequence).
        `,
        related: ['big-o-notation', 'data-structures', 'p-vs-np']
    }
];

export function getWikiArticleBySlug(slug: string): WikiArticle | undefined {
    return MOCK_WIKI_ARTICLES.find(article => article.slug === slug);
}

export function getRelatedWikiArticles(article: WikiArticle): WikiArticle[] {
    if (!article.related || article.related.length === 0) {
        return [];
    }
    return MOCK_WIKI_ARTICLES.filter(a => article.related.includes(a.slug) && a.slug !== article.slug);
}
