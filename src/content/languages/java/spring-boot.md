---
title: "Spring Boot"
description: "Building production-ready Java apps with Dependency Injection and Microservices"
---

## What is Spring Boot?

**Spring Boot** is the most popular framework for building modern **Java** applications. It's built on top of the original Spring Framework, but it automates all the boring setup and configuration, allowing you to build a production-ready application (like a REST API or a web service) in just a few minutes.

Its slogan is "Convention over Configuration."

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class MyApi {
    public static void main(String[] args) {
        SpringApplication.run(MyApi.class, args);
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from Spring Boot!";
    }
}
```

## Key Concept: Dependency Injection (DI)

Wait! How does Spring actually work? It uses **Dependency Injection**. Instead of you creating objects with `new`, the Spring "Container" creates them for you and "injects" them where they are needed. This makes your code highly modular and easy to test.

```java
@Service
public class UserService {
    // Business logic...
}

@RestController
public class UserController {
    // Spring INJECTS this service automatically!
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }
}
```

## Comparisons: Spring Boot vs. Traditional Spring

| Feature | Traditional Spring | Spring Boot |
| :--- | :--- | :--- |
| **Logic** | Manual XML or Java Config. | **Auto-Configuration.** |
| **Server** | Deploy to Tomcat/Jetty externally. | **Embedded Server** (Just run the JAR!). |
| **Build** | Complex dependencies. | **"Starters"** (Curated dependency groups). |

## Why Use Spring Boot?

1.  **Speed**: Go from zero to a working API in seconds using the "Spring Initializr."
2.  **Microservices**: The primary tools for building "Cloud-Native" distributed systems.
3.  **Enterprise**: Built-in support for Security (Spring Security), Databases (Spring Data), and Messaging (Kafka/RabbitMQ).
4.  **Community**: Massive documentation and millions of developers worldwide.

## Summary

| Term | Description |
| :--- | :--- |
| **@SpringBootApp** | The entry point for the entire application |
| **Bean** | An object managed by the Spring Container |
| **Injection** | Providing a Bean to another object automatically |
| **RestController**| A class that handles HTTP requests (APIs) |
| **Service** | A class for business logic and "heavy lifting" |
| **Repository** | A class that talks to the Database |
| **Auto-Config** | Spring guessing what you need based on JARs |
| **Starter** | A group of related dependencies (e.g., `web`, `data-jpa`) |
| **JPA** | Java Persistence API (Database work!) |
| **MVC** | Model-View-Controller architecture |
| **Maven/Gradle** | Standard build tools used with Spring |
| **Best For** | REST APIs, Microservices, Enterprise Backend systems |
| **Standard** | Established and trusted worldwide for 15+ years |
| **Security** | Most robust authentication/authorization in Java |
| **Application** | `application.properties` (The main config file!) |
| **Actuator** | Health checks and monitoring for production |
| **Testing** | Built-in support for JUnit and Mockito |
| **Profiles** | `dev`, `prod`, `test` (Different settings for different places!) |
| **Safety** | Dependency Injection prevents "Spaghetti Code" |
| **Modular** | Build your app in layers: Controller -> Service -> DB |
| **Reactive** | "Spring WebFlux" for high-performance non-blocking logic |
| **Lombok** | Common library used to remove Java "boilerplate" |
| **Cloud** | "Spring Cloud" for building massive distributed systems |
| **Modern** | Always following the latest Java versions (17, 21) |
