---
title: "Active Record"
description: "The object-relational mapper (ORM) that powers Ruby on Rails"
---

## What is Active Record?

**Active Record** is the "M" (Model) in the **Ruby on Rails** MVC architecture. It is an implementation of the Active Record pattern, where each class represents a database table, and each instance of that class represents a row in that table.

```ruby
# The class 'User' maps to the 'users' table automatically!
class User < ApplicationRecord
end

user = User.create(name: "Alpha", email: "a@codex.com")
```

## Key Features

1.  **Zero Configuration**: It automatically figures out the columns from your database schema.
2.  **Validations**: Ensure your data is clean before it hits the database.
3.  **Associations**: Define relationships (like `has_many`, `belongs_to`) easily.
4.  **Query Interface**: Write complex SQL using simple Ruby methods.

## Examples

```ruby
# Find all active users
users = User.where(active: true).order(created_at: :desc)

# Find a specific user
user = User.find_by(email: "a@codex.com")

# Update
user.update(name: "New Name")
```

## Validations

Wait! Active Record allows you to define rules for your data directly in the model.

```ruby
class User < ApplicationRecord
  validates :name, presence: true
  validates :email, uniqueness: true, format: { with: /@/ }
end
```

## Summary

| Term | Description |
| :--- | :--- |
| **Model** | A Ruby class that represents a database table |
| **Migration** | A Ruby file that describes changes to the DB schema |
| **has_many** | A One-to-Many relationship |
| **belongs_to** | The reverse of a One-to-Many relationship |
| **where** | Filtering the database |
| **Best For** | Database management in Rails applications |
| **Logic** | Combining data and behavior in a single object |
| **Safety** | Prevents SQL Injection automatically |
| **Modern** | Supports modern DB features like JSONB and Enums |
| **Standard** | The "Gold Standard" for ORMs in any language |
| **Identity** | The reason why Rails developers are so productive |
| **Callbacks** | Running code before/after save (e.g., `before_save`) |
