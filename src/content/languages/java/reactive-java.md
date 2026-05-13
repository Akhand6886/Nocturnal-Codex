---
title: "Reactive Java"
description: "Non-blocking, event-driven programming using Project Reactor and Spring WebFlux."
---

## Why Reactive?

In a traditional multi-threaded model, each request is handled by a dedicated thread. If the application performs I/O (like calling a database or another API), the thread blocks and waits, wasting resources. **Reactive Programming** solves this by using non-blocking I/O and a few "event loop" threads to handle many concurrent connections.

### 1. Project Reactor
Reactor is the foundation of reactive programming in the Spring ecosystem.
- **Flux**: A reactive stream that can emit 0 to N elements.
- **Mono**: A reactive stream that emits 0 or 1 element.
- **Operators**: Functional transformations like `map`, `flatMap`, `filter`, and `zip`.

```java
Flux<String> names = Flux.just("Alice", "Bob", "Charlie")
    .map(String::toUpperCase)
    .filter(name -> name.startsWith("A"));

names.subscribe(System.out::println); // Prints: ALICE
```

### 2. Spring WebFlux
The reactive alternative to Spring MVC.
- **Netty**: The default high-performance, non-blocking server used by WebFlux.
- **Functional Endpoints**: An alternative to `@Controller` using `RouterFunction` and `HandlerFunction`.

---

## Key Concepts

### 1. Backpressure
Reactive streams allow consumers to tell producers how much data they can handle. This prevents a fast producer from overwhelming a slow consumer, which is critical for system stability.

### 2. The Scheduler
Decides which thread a reactive operation should run on.
- `Schedulers.parallel()`: For CPU-bound tasks.
- `Schedulers.boundedElastic()`: For legacy blocking I/O (like JDBC).

### 3. R2DBC: Reactive Databases
Traditional JDBC is blocking. **R2DBC** (Reactive Relational Database Connectivity) brings non-blocking database access to the reactive stack, allowing for fully end-to-end non-blocking applications.

```java
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public Flux<User> getAllUsers() {
        return userRepository.findAll(); // Returns a non-blocking stream of users
    }
}
```

---

### The Goal of Reactive
Reactive programming isn't about making a single request faster; it's about **Scalability**. It allows a single server to handle tens of thousands of concurrent connections with minimal memory overhead.
