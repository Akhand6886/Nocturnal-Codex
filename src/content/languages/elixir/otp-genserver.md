---
title: "OTP & GenServer"
description: "The backbone of fault-tolerant and distributed systems in Elixir"
---

## What is OTP?

**OTP** (Open Telecom Platform) is a set of libraries and design patterns built into Elixir/Erlang. It's what allows Elixir to handle millions of concurrent connections with 99.9999999% reliability. 

At the heart of OTP is the **Actor Model**, where independent "Processes" communicate by passing messages.

## 1. What is a GenServer?

A **GenServer** (Generic Server) is a behavior that abstracts the common patterns of a long-running process: keeping state, executing code asynchronously, and providing a synchronous API.

## 2. The GenServer Structure

A GenServer implementation usually has two parts:
1.  **Client API**: Functions called by other parts of your app.
2.  **Server Callbacks**: Functions that run inside the GenServer process.

```elixir
defmodule Stack do
  use GenServer

  # Client API
  def start_link(default) do
    GenServer.start_link(__MODULE__, default)
  end

  def push(pid, element) do
    GenServer.cast(pid, {:push, element}) # Asynchronous
  end

  def pop(pid) do
    GenServer.call(pid, :pop) # Synchronous
  end

  # Server Callbacks
  @impl true
  def init(stack) do
    {:ok, stack}
  end

  @impl true
  def handle_call(:pop, _from, [head | tail]) do
    {:reply, head, tail}
  end

  @impl true
  def handle_cast({:push, element}, state) do
    {:noreply, [element | state]}
  end
end
```

## 3. Supervisions

OTP isn't just about starting processes; it's about managing them. **Supervisors** monitor child processes. If a process crashes (due to a bug or network error), the Supervisor automatically restarts it in a known good state. 

*Philosophy: "Let it crash."*

## 4. Why use GenServer?

- **State Management**: Keep track of user sessions, game states, or shopping carts.
- **Concurrency**: Run tasks in parallel without worrying about locks or shared memory.
- **Fault Tolerance**: Build systems that self-heal.

## Summary Checklist
- [x] OTP provides the architecture for scale and reliability.
- [x] GenServer abstracts stateful processes.
- [x] `call` is for synchronous requests (wait for response).
- [x] `cast` is for asynchronous messages (fire and forget).
- [x] Use Supervisors to make your system self-healing.
- [x] High performance and low latency for distributed apps.
---
