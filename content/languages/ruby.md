---
id: "ruby"
name: "Ruby"
slug: "ruby"
description: "A dynamic, elegant language designed for developer happiness and productivity."
iconName: "ruby"
year: 1995
creator: "Yukihiro Matsumoto"
paradigm: ["Object-Oriented", "Functional", "Imperative"]
useCases: ["Web Development", "Scripting", "Automation", "Prototyping"]
website: "https://www.ruby-lang.org/"
category: "Web"
featured: false
difficulty: "Beginner"
---

## Overview

Ruby is a dynamic, open-source language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write. Everything in Ruby is an object, and every expression returns a value. Ruby on Rails, the web framework that popularized Ruby, introduced conventions like MVC architecture and "convention over configuration" that influenced web development frameworks across all languages.

## Key Features

- **Everything is an object** — Even numbers and nil are objects with methods
- **Blocks & procs** — First-class closures enabling elegant DSLs
- **Metaprogramming** — Runtime class modification and method_missing
- **Gems ecosystem** — RubyGems.org hosts thousands of libraries
- **Convention over configuration** — Rails philosophy minimizes boilerplate

## Code Example

```ruby
# Ruby's expressive syntax
class Greeter
  def initialize(names)
    @names = names
  end

  def greet
    @names.map { |name| "Hello, #{name}!" }
          .each { |greeting| puts greeting }
  end
end

Greeter.new(["World", "Ruby", "Hacker"]).greet
```

## Learning Resources

- [Ruby Official Docs](https://www.ruby-lang.org/en/documentation/)
- [Ruby on Rails Guides](https://guides.rubyonrails.org/)
- [Try Ruby (Interactive)](https://try.ruby-lang.org/)
