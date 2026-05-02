---
title: "Akka Actors"
description: "Distributed concurrency and the Actor Model in Scala"
---

## What is the Actor Model?

The **Actor Model** is a pattern for building highly concurrent and distributed systems. Instead of sharing memory (which leads to locks and bugs), **Actors** communicate exclusively by **passing messages**.

In **Scala**, the **Akka** library is the industry standard for implementing this model.

## What is an Actor?

An **Actor** is a small object that:
1.  Has its own **internal state** (which no one else can see).
2.  Has a **mailbox** (to receive messages).
3.  Process messages one at a time.

```scala
class GreetActor extends Actor {
  def receive = {
    case "Hello" => println("Hi there!")
    case _       => println("Unknown message")
  }
}
```

## Why use Actors?

Wait! Because actors don't share memory, you never have to worry about "Race Conditions" or "Locks." This makes it much easier to build apps that run on dozens of CPU cores or even across hundreds of servers.

1.  **Fault Tolerance**: If an actor fails, its parent can automatically restart it.
2.  **Location Transparency**: You send a message to an actor the same way, whether it's on the same machine or a server in another country.
3.  **High Concurrency**: You can have millions of actors running on a single laptop.

## Summary

| Term | Description |
| :--- | :--- |
| **Actor** | The unit of computation in the Actor Model |
| **Message** | Immutable data sent between actors |
| **Mailbox** | Where messages are stored until the actor can process them |
| **Supervision**| The process of managing actor failures |
| **Location** | Where the actor lives (Local vs. Remote) |
| **Best For** | Real-time chat, gaming servers, and massive distributed systems |
| **Logic** | "Share by communicating, don't communicate by sharing" |
| **Safety** | Complete isolation of state prevents multi-threading bugs |
| **Modern** | Powering massive systems at Twitter, Netflix, and PayPal |
| **Standard** | Use Akka Typed for modern, type-safe actors |
| **Identity** | The "Golden Standard" for distributed systems in the JVM |
| **!** | The "Tell" operator (Sending a message) |
