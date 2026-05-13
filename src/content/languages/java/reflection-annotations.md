---
title: "Reflection & Annotations"
description: "How Java programs can inspect themselves at runtime and use metadata to drive framework behavior."
---

## Introduction to Reflection

Reflection is a feature in Java that allows an executing Java program to examine or "introspect" upon itself, and manipulate internal properties of the program. For example, it's possible for a Java class to obtain the names of all its members and display them.

### 1. The Class Object
The entry point for all reflection operations is `java.lang.Class`.
- **Getting a Class object**: `String.class`, `obj.getClass()`, or `Class.forName("java.lang.String")`.
- **Inspecting Members**: `getMethods()`, `getFields()`, `getConstructors()`.

### 2. Accessing Fields and Methods
Reflection allows you to bypass access modifiers (like `private`) if the Security Manager allows it.
- **Field access**: `field.setAccessible(true)` followed by `field.get(obj)` or `field.set(obj, value)`.
- **Method invocation**: `method.invoke(obj, args...)`.

### 3. Creating Instances
You can create objects at runtime without using the `new` keyword.
- `clazz.getDeclaredConstructor().newInstance()`.

---

## Annotations: Metadata for Code

Annotations provide data about a program that is not part of the program itself. They have no direct effect on the operation of the code they annotate.

### 1. Built-in Annotations
- `@Override`: Informs the compiler that the element is meant to override an element declared in a superclass.
- `@Deprecated`: Indicates that the marked element is deprecated and should no longer be used.
- `@SuppressWarnings`: Tells the compiler to suppress specific warnings.

### 2. Custom Annotations
You can define your own annotations using the `@interface` keyword.
- **Retention Policy**: `@Retention(RetentionPolicy.RUNTIME)` makes the annotation available at runtime via reflection.
- **Target**: `@Target(ElementType.METHOD)` restricts where the annotation can be applied.

### 3. How Frameworks Use Annotations
Frameworks like **Spring** and **JUnit** use reflection to scan for annotations and trigger behavior.
- **Spring**: Scans for `@Component`, `@Service`, and `@Autowired` to manage dependency injection.
- **JUnit**: Scans for `@Test` to identify methods that should be run as test cases.

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LogExecutionTime {
}

// In a processor class
for (Method method : serviceClass.getDeclaredMethods()) {
    if (method.isAnnotationPresent(LogExecutionTime.class)) {
        // Wrap method execution with timing logic
    }
}
```
