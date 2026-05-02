---
title: "Regular Expressions"
description: "Mastering the world's most powerful pattern matching engine"
---

## What are RegEx?

**Perl** was the language that made **Regular Expressions** (RegEx) famous. It has the most integrated and powerful RegEx engine of any programming language. It is the reason why Perl is the king of text processing.

## 1. Matching (`m//` or `//`)

The binding operator **`=~`** is used to check if a string matches a pattern.

```perl
if ($text =~ /apple/) {
    print "Found an apple!\n";
}
```

## 2. Substitution (`s///`)

You can replace text within a string using the `s/pattern/replacement/` syntax.

```perl
$text =~ s/apple/orange/; # Replaces the first apple with orange
$text =~ s/apple/orange/g; # 'g' flag replaces ALL apples
```

## 3. Capturing Groupings

Wait! You can extract parts of a string by putting them in parentheses. The matched parts are automatically saved into special variables: **`$1`**, **`$2`**, etc.

```perl
if ($date =~ /(\d{4})-(\d{2})-(\d{2})/) {
    my $year = $1;
    my $month = $2;
    my $day = $3;
}
```

## Common Metacharacters

| Char | Description |
| :--- | :--- |
| **\d** | Any digit (0-9) |
| **\w** | Any word character (a-z, 0-9, _) |
| **\s** | Any whitespace (space, tab, newline) |
| **.** | Any single character |
| **\*** | 0 or more times |
| **+** | 1 or more times |
| **^** | Start of a string |
| **$** | End of a string |

## Summary

| Term | Description |
| :--- | :--- |
| **=~** | The RegEx binding operator |
| **!~** | The "does not match" operator |
| **//** | Delimiters for a pattern |
| **s///** | Substitution syntax |
| **$1, $2** | Capturing variables |
| **g** | Global flag (match all) |
| **i** | Case-insensitive flag |
| **Best For** | Parsing logs, scraping data, and validating inputs |
| **Logic** | "Describe the shape of the text" |
| **Safety** | Powerful but can be hard to read; use comments! |
| **Modern** | PCRE (Perl Compatible Regular Expressions) is used in almost every other language |
| **Standard** | Use `x` flag for readable, multi-line regex with comments |
| **Identity** | The "Secret Sauce" of Perl's text-processing dominance |
