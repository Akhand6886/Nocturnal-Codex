---
title: "ASP.NET Core"
description: "Building high-performance web APIs and applications with C#"
---

## What is ASP.NET Core?

**ASP.NET Core** is the open-source, cross-platform framework for building modern, cloud-enabled, internet-connected apps. It is one of the fastest web frameworks in existence, often outperforming Node.js, Go, and Java in industry benchmarks.

## 1. Minimal APIs

Modern ASP.NET Core allows you to build a fully functional web API in just a few lines of code.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello, Nocturnal Codex!");

app.Run();
```

## 2. Dependency Injection (DI)

ASP.NET Core has built-in support for **Dependency Injection**. This means the framework automatically provides the objects your classes need (like database connections or logging services) rather than you creating them manually.

```csharp
public class MyController(IEmailService emailService) : ControllerBase {
    // emailService is automatically "injected" here!
}
```

## 3. Entity Framework Core (EF Core)

**EF Core** is the standard way to interact with databases in ASP.NET. It allows you to use C# classes and LINQ queries instead of writing raw SQL.

```csharp
var users = await dbContext.Users
                           .Where(u => u.IsActive)
                           .ToListAsync();
```

## 4. Middleware

Middleware is code that handles requests and responses. You can "chain" middleware together to handle things like Authentication, Logging, and Error Handling.

```csharp
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
```

## Summary

| Term | Description |
| :--- | :--- |
| **Kestrel** | The high-performance web server built into .NET |
| **Controller**| A class that handles incoming HTTP requests |
| **Action** | A method inside a controller that responds to a URL |
| **Razor** | A templating engine for building server-side HTML |
| **Blazor** | Building interactive web UIs using C# instead of JS! |
| **Best For** | Enterprise Backends, Microservices, SaaS platforms |
| **Logic** | Robust, scalable, and secure by default |
| **Safety** | Strong typing from the DB to the UI |
| **Modern** | Cloud-native, Docker-ready, and ultra-fast |
| **Standard** | Used by giants like Stack Overflow, UPS, and Microsoft |
| **Tooling** | Swagger/OpenAPI built-in for easy API documentation |
| **Identity** | The "Modern" successor to the old .NET Framework |
| **Wasm** | Blazor WebAssembly runs C# directly in the browser |
