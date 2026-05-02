---
title: "Apache Spark"
description: "Big Data processing and analytics with Scala"
---

## What is Apache Spark?

**Apache Spark** is a lightning-fast distributed data processing engine. It is designed to handle **Big Data**—datasets so large that they cannot fit on a single machine. While Spark supports multiple languages, it is written in **Scala**, and Scala remains the most powerful and efficient way to use it.

```scala
val textFile = sc.textFile("hdfs://...")
val counts = textFile.flatMap(line => line.split(" "))
                 .map(word => (word, 1))
                 .reduceByKey(_ + _)
counts.saveAsTextFile("hdfs://...")
```

## Key Concepts

1.  **RDD (Resilient Distributed Dataset)**: A collection of data distributed across many machines. It is immutable and can be rebuilt if a machine fails.
2.  **DataFrames**: A distributed collection of data organized into named columns (like an SQL table).
3.  **Lazy Evaluation**: Spark doesn't actually process your data until you call an "Action" (like `count()` or `save()`). This allows it to optimize the entire processing plan at once.

## Why use Scala for Spark?

Wait! While Python is popular for Spark, Scala has several advantages:
1.  **Type Safety**: Catch data type errors at compile-time before you run a 10-hour processing job.
2.  **Performance**: Scala runs natively on the JVM, avoiding the overhead of "shuttling" data between Python and the JVM.
3.  **Latest Features**: New Spark features always arrive in Scala first.

## The Spark Pipeline

1.  **Input**: Load data from HDFS, S3, or a Database.
2.  **Transform**: Filter, Map, Group, and Join your data.
3.  **Output**: Save the results back to storage.

## Summary

| Term | Description |
| :--- | :--- |
| **Spark** | The distributed engine for data processing |
| **RDD** | Resilient Distributed Dataset (The core abstraction) |
| **DataFrame** | Column-based data structure (SQL-like) |
| **Driver** | The main program that coordinates the work |
| **Executor** | The worker machines that do the actual calculation |
| **Best For** | ETL, Machine Learning, and Big Data Analytics |
| **Logic** | "Distributed functional programming" |
| **Safety** | Fault-tolerance: automatically recovers from machine failure |
| **Modern** | The successor to the old Hadoop MapReduce model |
| **Standard** | The #1 tool for data engineering in the world |
| **Identity** | Scala is the "First Class" citizen of the Spark ecosystem |
