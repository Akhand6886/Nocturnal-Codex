---
title: "Recursive Types"
description: "Modeling deeply nested and self-referencing data structures"
---

## What are Recursive Types?

A **Recursive Type** is a type that references itself. This is essential for modeling data structures that can be nested to an arbitrary depth, such as **Linked Lists**, **Trees**, or **JSON objects**.

In TypeScript, you define a recursive type by using the type's name within its own definition.

### Example: A Simple Linked List

```typescript
type LinkedList<T> = {
  value: T;
  next: LinkedList<T> | null;
};

const list: LinkedList<number> = {
  value: 1,
  next: {
    value: 2,
    next: null
  }
};
```

## Modeling a File System

One of the most common uses for recursive types is representing a file system where a folder can contain other folders.

```typescript
type FileSystemItem = {
  name: string;
  size: number;
  type: 'file' | 'folder';
  children?: FileSystemItem[]; // Recursive reference
};

const myDrive: FileSystemItem = {
  name: "root",
  type: "folder",
  size: 1024,
  children: [
    { name: "photo.jpg", type: "file", size: 500 },
    { 
      name: "documents", 
      type: "folder", 
      size: 524,
      children: [
        { name: "resume.pdf", type: "file", size: 200 }
      ]
    }
  ]
};
```

## Recursive JSON Type

Since a JSON value can be an object or array which in turn contains other JSON values, we must use recursion to type it accurately.

```typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];

const data: JSONValue = {
  id: 1,
  meta: {
    tags: ["tech", "coding"],
    active: true
  }
};
```

## Recursive Utility Types

You can also use recursion in generic utility types to perform deep transformations, such as making all properties in a nested object `Readonly`.

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

interface User {
  id: number;
  profile: {
    name: string;
    preferences: {
      theme: string;
    }
  }
}

type ReadonlyUser = DeepReadonly<User>;
// All nested levels are now readonly!
```

---

### Summary Checklist
- [x] Use for Linked Lists and Trees
- [x] Essential for modeling JSON and File Systems
- [x] Can be used in generic utility types for deep transformations
- [x] Always ensure there is a "base case" (like `null` or a non-recursive branch) to avoid infinite types.
