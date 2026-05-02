---
title: "Classes & Modules"
description: "Object-Oriented Ruby, Mixins, and Attribute Accessors"
---

## Defining Classes

Everything in **Ruby** is an object, and every object is an instance of a **Class**. You define a class using the `class` keyword.

```ruby
class User
  def initialize(name)
    @name = name # Instance variable
  end

  def greet
    puts "Hello, #{@name}"
  end
end

user = User.new("Alpha")
user.greet
```

Wait! The **`initialize`** method is the constructor. It runs automatically when you call `User.new`.

## Attribute Accessors (`attr_...`)

In Ruby, instance variables are **private** by default. To make them readable or writable from outside, you use **Attribute Accessors**.

```ruby
class User
  attr_accessor :name # Creates both getter and setter
  attr_reader :id     # Creates only a getter
  attr_writer :secret # Creates only a setter
end
```

## Inheritance (`<`)

Ruby supports **Single Inheritance**. Use the `<` symbol to inherit from a base class.

```ruby
class Admin < User
  def delete_stuff
    # ... logic ...
  end
end
```

## Modules and Mixins

A **Module** is a collection of methods and constants, but it cannot be instantiated. Modules have two primary uses:

1.  **Namespacing**: Keeping your code organized and avoiding name collisions.
2.  **Mixins**: Using the `include` keyword to "mix in" the module's methods into a class. This is Ruby's answer to multiple inheritance!

```ruby
module Loggable
  def log(msg)
    puts "[LOG] #{msg}"
  end
end

class User
  include Loggable
end

User.new.log("Created!")
```

## Summary

| Term | Description |
| :--- | :--- |
| **initialize**| The constructor method |
| **@var** | Instance variable (Object state) |
| **attr_acc.** | Automatic getters and setters |
| **include** | Adding module methods as instance methods |
| **extend** | Adding module methods as class methods |
| **Best For** | Organizing complex logic and data modeling |
| **Logic** | "Encapsulate state, expose behavior" |
| **Safety** | Access control with `private` and `protected` keywords |
| **Modern** | Ruby 3.x introduced "RBS" for optional static typing |
| **Standard** | Use `PascalCase` for Classes and Modules |
| **Identity** | A class is also an object (instance of `Class`) |
| **Mixins** | Favor small, focused modules over deep inheritance |
