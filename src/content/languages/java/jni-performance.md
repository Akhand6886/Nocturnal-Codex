---
title: "JNI & Performance"
description: "Interfacing with native C/C++ code and tuning the JVM for maximum throughput and low latency."
---

## JNI: Java Native Interface

JNI allows Java code running in the JVM to call and be called by native applications and libraries written in other languages such as C, C++, and assembly.

### 1. Why use JNI?
- **Performance**: For extremely CPU-intensive tasks (though modern JVMs are very fast).
- **Native Libraries**: Using existing C/C++ libraries (e.g., OpenCV for image processing, or low-level hardware drivers).
- **Platform-specific features**: Accessing OS features not exposed by the Java Standard Library.

### 2. The JNI Workflow
1. Declare a method with the `native` keyword in Java.
2. Generate a header file using `javac -h`.
3. Implement the method in C/C++.
4. Compile the C/C++ code into a shared library (.so, .dll, or .dylib).
5. Load the library in Java using `System.loadLibrary()`.

```java
public class NativeExample {
    public native void sayHello();

    static {
        System.loadLibrary("hello");
    }

    public static void main(String[] args) {
        new NativeExample().sayHello();
    }
}
```

---

## JVM Performance Tuning

High-performance Java engineering requires understanding how the JVM manages memory and executes code.

### 1. Garbage Collection (GC)
- **G1 GC**: The default since Java 9. Good for general-purpose applications.
- **ZGC / Shenandoah**: Ultra-low latency collectors (sub-millisecond pauses) designed for massive heaps (terabytes).
- **Tuning**: Using flags like `-Xmx` (Max Heap), `-Xms` (Initial Heap), and `-XX:MaxGCPauseMillis`.

### 2. Just-In-Time (JIT) Compilation
The JVM doesn't just interpret bytecode; it compiles hot code sections into native machine code at runtime.
- **C1 Compiler**: Fast compilation, less optimization.
- **C2 Compiler**: Slower compilation, but aggressive optimization (inlining, loop unrolling).
- **GraalVM**: A modern replacement for C2 that can also perform **Ahead-of-Time (AOT)** compilation to create instant-start native executables.

### 3. Profiling and Diagnostics
- **JFR (Java Flight Recorder)**: Built-in tool for collecting diagnostic and profiling data with almost zero overhead.
- **JConsole / VisualVM**: Real-time monitoring of heap usage and thread count.
- **Flame Graphs**: Visualizing where the CPU is spending time in your application.

---

### Performance Tip: Avoid Premature Optimization
Java is incredibly fast. Most performance issues are caused by inefficient algorithms or blocking I/O, not the JVM itself. Profile first, then tune.
