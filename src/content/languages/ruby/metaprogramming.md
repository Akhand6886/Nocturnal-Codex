---
title: "Metaprogramming"
description: "Open classes, send, and define_method in Ruby"
---

## What is Metaprogramming?

**Metaprogramming** is code that writes code. **Ruby** is famous for this capability. Because Ruby is so dynamic, you can modify the behavior of classes and objects **at runtime**.

## 1. Open Classes (Monkey Patching)

In Ruby, classes are never closed. You can re-open any class (even built-in ones like `String`) and add new methods to them.

```ruby
class String
  def shout
    self.upcase + "!!!"
  end
end

puts "hello".shout # "HELLO!!!"
```

Wait! Use this power with caution. If you change a core method, you might break other libraries that depend on it!

## 2. Dynamic Method Calls (`send`)

The `send` method allows you to call a method by its **name** (as a symbol or string).

```ruby
user.send(:name) # Same as user.name
```

## 3. Dynamic Method Definition (`define_method`)

You can create methods on the fly based on data.

```ruby
class User
  ["admin", "editor", "viewer"].each do |role|
    define_method("#{role}?") do
      self.role == role
    end
  end
end

user.admin? # This method was generated automatically!
```

## 4. `method_missing`

If you call a method that doesn't exist, Ruby calls `method_missing`. You can override this to handle "ghost methods" that aren't actually defined.

```ruby
def method_missing(name, *args)
  puts "You tried to call #{name} with #{args}"
end
```

## Summary

| Term | Description |
| :--- | :--- |
| **Monkey Patch**| Adding methods to an existing class at runtime |
| **send** | Calling a method using a symbol |
| **define_method**| Creating a method programmatically |
| **instance_eval**| Running code in the context of an instance |
| **Best For** | Building Frameworks (Rails), DSLs, and reducing repetition |
| **Logic** | "The code is data, and the data is code" |
| **Safety** | High risk of name collisions and hard-to-find bugs |
| **Modern** | Ruby 3.x introduced `Module#prepend` for safer overrides |
| **Standard** | Use `public_send` instead of `send` for better security |
| **Identity** | The reason why Ruby on Rails feels like "Magic" |
| **Introspection**| `methods`, `instance_variables`, `ancestors` |
