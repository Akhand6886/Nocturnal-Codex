---
title: "Control Flow"
description: "If/Then, Select Case, and Loops in VBA"
---

## Conditional Logic (`If`)

**VBA** uses a very readable, English-like syntax for conditionals.

```vba
If score >= 90 Then
    MsgBox "Excellent!"
ElseIf score >= 80 Then
    MsgBox "Good"
Else
    MsgBox "Keep working"
End If
```

## The `Select Case` Statement

`Select Case` is the VBA version of a switch statement. It is much cleaner than a long list of `ElseIf` blocks.

```vba
Select Case score
    Case 90 To 100
        result = "A"
    Case 80 To 89
        result = "B"
    Case Else
        result = "F"
End Select
```

## Loops in VBA

1.  **`For...Next`**: Best for a fixed number of iterations.
2.  **`For Each...Next`**: The most powerful loop in VBA. It allows you to iterate through a collection of objects (like all Worksheets in a Workbook).
3.  **`Do...Loop`**: Runs as long as (or until) a condition is met.

```vba
# The "Excel Way" to loop
Dim ws As Worksheet
For Each ws In ThisWorkbook.Worksheets
    Debug.Print ws.Name
Next ws
```

## Summary

| Keyword | Description |
| :--- | :--- |
| **If...Then** | Basic branching |
| **Select Case** | Multi-way branch |
| **For Each** | Iterating through objects (Worksheets, Ranges, etc.) |
| **For...Next** | Numeric iteration |
| **Do While** | Conditional loop |
| **End If** | Required to close every block |
| **Logic** | Essential for making decisions in your automation |
| **Safety** | Clear, keyword-based structure (No curly braces) |
| **Modern** | Highly optimized for processing Office objects |
| **Standard** | Indent your code for better readability |
| **Identity** | Control flow in VBA is designed for non-programmers to read |
