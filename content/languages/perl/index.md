---
id: perl
name: Perl
slug: perl
description: >-
  A highly capable, feature-rich language excelling at text processing, system
  administration, and scripting.
iconName: perl
year: 1987
creator: Larry Wall
paradigm:
  - Procedural
  - Object-Oriented
  - Functional
useCases:
  - Text Processing
  - System Administration
  - Bioinformatics
  - Web Development
website: 'https://www.perl.org/'
category: General Purpose
featured: false
difficulty: Intermediate
topics:
  - section: Basics
    items:
      - title: Introduction to Perl
        description: 'Perl 5 vs Perl 7, CPAN, and the Perl philosophy'
        slug: introduction-to-perl
      - title: Variables
        description: 'Scalars ($), arrays (@), hashes (%), and context'
        slug: variables
      - title: Regular Expressions
        description: 'Pattern matching, substitution, and capture groups'
        slug: regular-expressions
      - title: Control Flow
        description: 'if/unless, while/until, for/foreach, and given/when'
        slug: control-flow
  - section: Data & Subroutines
    items:
      - title: Subroutines
        description: 'sub, @_, return, and prototypes'
        slug: subroutines
      - title: References
        description: 'Scalar refs, array refs, hash refs, and dereferencing'
        slug: references
      - title: File I/O
        description: 'open, read, write, and filehandles'
        slug: file-i-o
      - title: Modules
        description: 'use, require, Exporter, and CPAN module management'
        slug: modules
  - section: Advanced
    items:
      - title: OOP in Perl
        description: 'bless, method dispatch, and Moose/Moo'
        slug: oop-in-perl
      - title: One-Liners
        description: Powerful command-line text processing with perl -e/-p/-n
        slug: one-liners
      - title: Text Processing
        description: 'String manipulation, parsing, and report generation'
        slug: text-processing
---

## Overview

Perl is a family of high-level, general-purpose, interpreted, dynamic programming languages. Originally developed for text manipulation, it has grown to be used for system administration, web development, network programming, and bioinformatics. Perl's powerful built-in regular expression support makes it the "Swiss army chainsaw" of programming.

## Key Features

- **Regex mastery** — First-class regular expression support
- **CPAN** — Over 200,000 modules
- **Text processing** — Unmatched string manipulation capabilities
- **TMTOWTDI** — "There's More Than One Way To Do It"
- **One-liners** — Powerful command-line scripting

## Code Example

```perl
#!/usr/bin/perl
use strict;
use warnings;

my $text = "Contact us at info\@example.com or support\@nocturnal.dev";
my @emails = ($text =~ /[\w.+-]+\@[\w.-]+\.\w+/g);

foreach my $email (@emails) {
    print "Found: $email\n";
}
```

## Learning Resources

- [Perl.org](https://www.perl.org/)
- [Learn Perl in about 2 hours 30 minutes](https://qntm.org/perl_en)
- [Modern Perl](http://modernperlbooks.com/)
