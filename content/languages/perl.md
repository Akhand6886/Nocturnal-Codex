---
id: "perl"
name: "Perl"
slug: "perl"
description: "A highly capable, feature-rich language excelling at text processing, system administration, and scripting."
iconName: "perl"
year: 1987
creator: "Larry Wall"
paradigm: ["Procedural", "Object-Oriented", "Functional"]
useCases: ["Text Processing", "System Administration", "Bioinformatics", "Web Development"]
website: "https://www.perl.org/"
category: "General Purpose"
featured: false
difficulty: "Intermediate"
---

## Overview

Perl is a family of high-level, general-purpose, interpreted, dynamic programming languages. Originally developed for text manipulation, it has grown to be used for system administration, web development, network programming, GUI development, and bioinformatics. Perl's powerful built-in support for regular expressions and text processing makes it the "Swiss army chainsaw" of programming languages.

## Key Features

- **Regex mastery** — First-class regular expression support integrated into the language
- **CPAN** — Comprehensive Perl Archive Network with over 200,000 modules
- **Text processing** — Unmatched string manipulation capabilities
- **TMTOWTDI** — "There's More Than One Way To Do It" philosophy
- **One-liners** — Powerful command-line scripting capabilities

## Code Example

```perl
#!/usr/bin/perl
use strict;
use warnings;

# Perl's regex power: extract emails from text
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
