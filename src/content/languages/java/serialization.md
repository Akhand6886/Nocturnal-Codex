---
title: "Serialization"
description: "Saving objects to binary data with Serializable and ObjectOutputStream"
---

## What is Serialization?

In **Java**, **Serialization** is the process of converting an object's state (its data) into a stream of **Bytes**. This allows you to "flatten" an object so it can be saved to a file, sent over a network, or stored in a database.

**Deserialization** is the opposite: rebuilding the object from those bytes!

```java
import java.io.*;

// Just mark it with the interface! (No code needed!)
public class User implements Serializable {
    public String name;
    public int score;
}
```

## Comparisons: The Two Essential Points

-   **`Serializable`**: A "Marker Interface" (No methods!). Telling the JVM it's safe to save this object.
-   **`transient`**: A keyword that tells the JVM to **SKIP** a variable during serialization. (Use this for passwords or temporary data!).

```java
public class User implements Serializable {
  public String name;
  public transient String password; // This WON'T be saved to disk!
}
```

## How to Save and Load Objects

Use **`ObjectOutputStream`** to save (Write) and **`ObjectInputStream`** to load (Read) your objects.

```java
User user = new User("Alpha", 100);

// SAVE!
try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("user.bin"))) {
    out.writeObject(user);
}

// LOAD!
try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("user.bin"))) {
  User loadedUser = (User) in.readObject();
  System.out.println("Loaded: " + loadedUser.name);
}
```

## The `serialVersionUID`

Wait! If you change your class (e.g., add a new field) after saving it, Java might fail to load it back. To prevent this, always define a **`serialVersionUID`**. This is a "Version Number" for your class.

```java
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    // ... data ...
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **Serializable**| Interface that allows an object to be saved |
| **Transient** | Variable that should NOT be serialized |
| **SID** | Version number for your class (`serialVersionUID`) |
| **Stream** | Binary data representing the object state |
| **Marker** | Interface with NO methods (Just a flag for the JVM!) |
| **Best For** | Saving game states, caching data, network objects |
| **Safety** | Prevents "InvalidClassException" with a stable SID |
| **Clean** | Your object becomes its own persistent data format |
| **Security** | `transient` prevents sensitive data leaks! |
| **Manual** | Use `readObject()`/`writeObject()` for custom logic |
| **Legacy** | Serialization is powerful but slow and sometimes risky! |
| **Nio** | Combine with `Path` and `Files` for modern storage |
| **Framework** | Used internally by standard Java tools like JPA/RMI |
| **External** | Use `Externalizable` interface for TOTAL control |
| **Memory** | Serialization uses buffers to minimize disk hits |
| **Hierarchy**| If a parent is Serializable, the child is TOO! |
| **Safety** | Only Serialized data is safe from "Garbage Collection" |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Efficiency**| Binary serialization is faster than human-readable JSON |
| **Constraint**| Non-serializable parents MUST have a no-args constructor! |
| **Static** | Regular `static` variables are NOT serialized! |
| **Block** | Use "Serialiazation Filters" (Java 9+) for better security |
| **Future** | Modern Java often uses JSON/Protobuf for networking |
