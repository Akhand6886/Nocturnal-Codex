---
title: "File I/O"
description: "Opening, reading, and writing files in Perl"
---

## Opening Files

In **Perl**, you interact with files using **Filehandles**. You use the `open` function to connect a filehandle to a file.

```perl
# Reading (<)
open(my $fh, "<", "input.txt") or die "Could not open file: $!";

# Writing (>)
open(my $out, ">", "output.txt") or die "Could not open file: $!";

# Appending (>>)
open(my $log, ">>", "log.txt") or die "Could not open file: $!";
```

Wait! The **`or die`** part is essential. It ensures your script stops immediately if the file can't be opened, and **`$!`** explains why (e.g., "File not found").

## Reading Line-by-Line

The most memory-efficient way to read a file is one line at a time using a `while` loop.

```perl
while (my $line = <$fh>) {
    chomp($line);
    print "Read: $line\n";
}
```

## Writing to a File

To write, simply put the filehandle after the `print` keyword.

```perl
print $out "This is a new line\n";
```

## Closing Files

It is good practice to close your filehandles when you are finished with them.

```perl
close($fh);
```

## Summary

| Term | Description |
| :--- | :--- |
| **<** | Open for reading |
| **>** | Open for writing (Overwrites!) |
| **>>** | Open for appending |
| **$fh** | A scalar variable acting as a filehandle |
| **$!** | Special variable containing the OS error message |
| **autodie** | A module that makes `open` fail automatically without `or die` |
| **Best For** | Processing logs, generating reports, and configuration management |
| **Logic** | "Stream-based I/O" |
| **Safety** | Always check the return value of `open` |
| **Modern** | Use 3-argument `open` for better security |
| **Standard** | Part of the Perl core since version 1 |
| **Identity** | Perl's file handling is extremely fast and robust |
