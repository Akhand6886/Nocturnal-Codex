---
id: ruby
name: Ruby
slug: ruby
description: 'A dynamic, elegant language designed for developer happiness and productivity.'
iconName: ruby
year: 1995
creator: Yukihiro Matsumoto
paradigm:
  - Object-Oriented
  - Functional
  - Imperative
useCases:
  - Web Development
  - Scripting
  - Automation
  - Prototyping
website: 'https://www.ruby-lang.org/'
category: Web
featured: false
difficulty: Beginner
topics:
  - section: Basics
    items:
      - title: Introduction to Ruby
        description: 'IRB, RubyGems, and the Ruby philosophy'
        slug: introduction-to-ruby
      - title: Variables & Types
        description: 'Dynamic typing, symbols, strings, numbers, and nil'
        slug: variables-types
      - title: Control Flow
        description: 'if/unless, case/when, while/until, and ternary'
        slug: control-flow
      - title: Methods
        description: 'def, return values, default params, and variadic args (*)'
        slug: methods
  - section: Collections & Iteration
    items:
      - title: Arrays
        description: 'Creation, slicing, map, select, reject, flatten'
        slug: arrays
      - title: Hashes
        description: 'Symbol keys, default values, merge, and transform'
        slug: hashes
      - title: 'Blocks, Procs & Lambdas'
        description: 'yield, Proc.new, lambda, and the block/proc distinction'
        slug: blocks-procs-lambdas
      - title: Enumerable
        description: 'each, map, reduce, group_by, and lazy enumerators'
        slug: enumerable
  - section: OOP
    items:
      - title: Classes & Modules
        description: 'attr_accessor, initialize, inheritance, and mixins'
        slug: classes-modules
      - title: Metaprogramming
        description: 'method_missing, define_method, and open classes'
        slug: metaprogramming
      - title: Patterns
        description: 'Duck typing, convention over configuration, and DSLs'
        slug: patterns
  - section: Ruby on Rails
    items:
      - title: MVC Architecture
        description: 'Models, views, controllers, and the Rails request cycle'
        slug: mvc-architecture
      - title: Active Record
        description: 'ORM, migrations, validations, and associations'
        slug: active-record
      - title: Testing
        description: 'RSpec, Minitest, FactoryBot, and TDD practices'
        slug: testing
---

## Overview

Ruby is a dynamic, open-source language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write. Everything in Ruby is an object. Ruby on Rails, the web framework that popularized Ruby, introduced conventions like MVC and "convention over configuration" that influenced web development across all languages.

## Key Features

- **Everything is an object** — Even numbers and nil are objects with methods
- **Blocks & procs** — First-class closures enabling elegant DSLs
- **Metaprogramming** — Runtime class modification and method_missing
- **Gems ecosystem** — RubyGems.org hosts thousands of libraries
- **Convention over configuration** — Rails philosophy minimizes boilerplate

## Code Example

```ruby
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
