---
title: "MVC Architecture"
description: "Model, View, and Controller in Ruby on Rails"
---

## What is MVC?

**MVC** (Model-View-Controller) is a design pattern that divides an application into three interconnected parts. This "Separation of Concerns" makes large codebases much easier to manage and scale. **Ruby on Rails** is built entirely on this pattern.

## 1. Model (Data)
The **Model** manages the data and the business logic. It talks to the database and ensures that data follows the rules (validations).
-   **File**: `app/models/user.rb`

## 2. View (Presentation)
The **View** is what the user sees. In Rails, views are usually **ERB** (Embedded Ruby) files—HTML with a bit of Ruby code mixed in.
-   **File**: `app/views/users/index.html.erb`

## 3. Controller (Logic)
The **Controller** is the middleman. it takes a request from the user, asks the Model for data, and then gives that data to the View to render.
-   **File**: `app/controllers/users_controller.rb`

## The Request Cycle

Wait! Here is how a request travels through Rails:
1.  **Router**: Sees the URL (`/users/1`) and sends it to the correct Controller.
2.  **Controller**: Asks the **Model** for User #1.
3.  **Model**: Gets the data from the Database.
4.  **Controller**: Takes the User data and sends it to the **View**.
5.  **View**: Renders the HTML and sends it back to the User's browser.

> [!IMPORTANT]
> **"Fat Model, Skinny Controller"** is the golden rule of Rails. Keep your business logic in the Model and keep your Controller as simple as possible.

## Summary

| Component | Responsibility |
| :--- | :--- |
| **Model** | Database, Logic, Validations |
| **View** | HTML, CSS, User Interface |
| **Controller** | Routing, Param handling, Orchestration |
| **Router** | Mapping URLs to Controllers |
| **Logic** | Separation of concerns for better maintenance |
| **Best For** | Building organized and scalable web applications |
| **Safety** | Prevents spaghetti code by enforcing structure |
| **Modern** | Rails 7+ uses "Hotwire" to make MVC feel like a SPA |
| **Standard** | The foundation of modern web framework design |
| **Identity** | The "Convention over Configuration" philosophy |
