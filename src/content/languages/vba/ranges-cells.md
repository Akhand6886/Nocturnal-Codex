---
title: "Ranges & Cells"
description: "Interacting with the grid: Reading and writing data in Excel"
---

## The Range Object

The **`Range`** object is the most important object in Excel **VBA**. It represents a single cell or a group of cells.

```vba
Range("A1").Value = "Hello"
Range("A1:B10").Interior.Color = vbYellow
```

## Cells vs. Range

While `Range("A1")` is easy to read, the **`Cells`** property is much better for looping because it uses row and column numbers.

```vba
Cells(1, 1).Value = "A1" % Row 1, Column 1
Cells(10, 2).Value = "B10" % Row 10, Column 2
```

## Reading and Writing

To get a value from a cell:
```vba
Dim myVal As Variant
myVal = Range("A1").Value
```

## Speeding Up Your Code

Wait! Interacting with the grid is the slowest thing in VBA. If you are writing a lot of data, follow these rules:

1.  **Turn off Screen Updating**: `Application.ScreenUpdating = False`
2.  **Turn off Calculations**: `Application.Calculation = xlCalculationManual`
3.  **Use Arrays**: Read the whole range into an array, process it in memory, and write it back in one go.

## Find the Last Row

Wait! This is the most common task in Excel VBA. How do you know where the data ends?

```vba
Dim lastRow As Long
lastRow = Cells(Rows.Count, 1).End(xlUp).Row
```

## Summary

| Term | Description |
| :--- | :--- |
| **Range** | A fixed area of cells (e.g., "A1:C10") |
| **Cells** | Numeric access to a cell (Row, Col) |
| **Value** | The data inside the cell |
| **Offset** | Moving from a cell (e.g., 1 row down) |
| **CurrentReg.**| The whole block of data around a cell |
| **Best For** | Automating data entry, cleaning, and reporting |
| **Logic** | "The grid is your data structure" |
| **Safety** | Always specify which Worksheet a Range belongs to! |
| **Modern** | Power Query is often better for simple cleaning; VBA for complex logic |
| **Standard** | Use `Long` for all row indices |
| **Identity** | The foundation of every Excel automation |
