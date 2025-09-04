---
id: "algorithms"
slug: "algorithms"
name: "Algorithms"
category: "Core Computer Science"
description: "Core concepts of computation and problem-solving strategies."
imageUrl: "https://placehold.co/400x300.png"
dataAiHint: "abstract algorithm"
subtopics:
  - id: "sorting"
    slug: "sorting"
    name: "Sorting Algorithms"
    description: "Techniques for arranging data in a specific order."
  - id: "graphs"
    slug: "graphs"
    name: "Graph Theory"
    description: "Study of networks and relationships between objects."
  - id: "dp"
    slug: "dynamic-programming"
    name: "Dynamic Programming"
    description: "Optimization technique by breaking down problems."
  - id: "complexity-analysis"
    slug: "complexity-analysis"
    name: "Complexity Analysis"
    description: "Understanding how algorithms scale with input size, using notations like Big O."
codeSnippets:
  - id: "cs-algo-1"
    title: "Python Merge Sort"
    language: "python"
    code: |
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
    description: "A classic divide-and-conquer sorting algorithm."
  - id: "cs-algo-bigo-example"
    title: "Big O Notation Example (Linear Time)"
    language: "python"
    code: |
      def find_element(arr, target):
          # O(n) - Linear time complexity
          for element in arr:
              if element == target:
                  return True
          return False

      my_list = [1, 2, 3, 4, 5]
      print(find_element(my_list, 3)) # True
      print(find_element(my_list, 6)) # False
    description: "Illustrates an algorithm with O(n) time complexity."
references:
  - id: "1"
    title: "Big O Notation Explained"
    slug: "big-o-notation"
---

Delve into the fundamental building blocks of computation. This section explores various algorithmic paradigms, data structures, and complexity analysis essential for efficient problem-solving in computer science.
