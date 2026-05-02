---
title: "Message Passing"
description: "Channels (mpsc), sender/receiver, and cross-thread communication"
---

## "Do not communicate by sharing memory..."

Wait! Rust follows the famous Go proverb: **"Do not communicate by sharing memory; instead, share memory by communicating."** 

The most common way to do this in Rust is by using **Channels**. A channel has two parts: a **Transmitter** (Sender) and a **Receiver**.

## Creating a Channel

We create a channel using the `mpsc::channel()` function. **`mpsc`** stands for **Multi-Producer, Single-Consumer**. This means you can have many threads sending messages to a single thread that receives them.

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap(); // Send the message!
    });

    let received = rx.recv().unwrap(); // Wait and receive!
    println!("Got: {}", received);
}
```

## Ownership and Channels

Wait! When you send a value through a channel, ownership is **moved**. Once you call `tx.send(val)`, you can no longer use `val` in the sending thread. This prevents data races!

## Multi-Producer Logic

Because the transmitter is "Multi-Producer," you can **clone** it to give multiple threads the ability to send messages to the same receiver.

```rust
let (tx, rx) = mpsc::channel();
let tx1 = tx.clone(); // Second transmitter!

thread::spawn(move || {
    tx1.send(String::from("from thread 1")).unwrap();
});

thread::spawn(move || {
    tx.send(String::from("from thread 2")).unwrap();
});
```

## Receiving Multiple Messages

You can treat the receiver like an **iterator** to process messages as they arrive. The loop will finish when all transmitters are dropped.

```rust
for received in rx {
    println!("Got: {}", received);
}
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **mpsc** | `std::sync::mpsc` | Multi-Producer Single-Consumer |
| **Sender** | `tx.send(val)` | Putting data into the channel |
| **Receiver** | `rx.recv()` | Blocking wait for data |
| **try_recv** | `rx.try_recv()`| Non-blocking check for data |
| **Clone** | `tx.clone()` | Creating additional transmitters |
| **Move** | Transfer | Data sent to a channel is MOVED |
| **Safe** | Sync | Channels ensure thread-safe communication |
| **Best For** | Task pipelines, work distribution, event handling |
| **Bound** | `sync_channel` | A channel with a fixed capacity (backpressure!) |
| **Logic** | The channel is closed when all Senders are dropped |
| **Safety** | Prevents "Double use" and data races via ownership |
| **Standard** | `mpsc` is built into the Rust standard library |
