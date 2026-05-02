---
title: "Charts & Formatting"
description: "Creating visuals and styling cells programmatically"
---

## Formatting Cells

**VBA** gives you total control over the appearance of your data.

```vba
With Range("A1:D1")
    .Font.Bold = True
    .Font.Color = vbRed
    .Interior.Color = RGB(200, 200, 200)
    .Borders.LineStyle = xlContinuous
End With
```

Wait! Use the **`With...End With`** block to perform multiple actions on the same object. This makes your code cleaner and faster.

## Creating Charts

You can automate the creation of charts to generate reports instantly.

```vba
Dim myChart As Chart
Set myChart = Charts.Add
myChart.ChartType = xlColumnClustered
myChart.SetSourceData Source:=Range("A1:B10")
```

## Conditional Formatting

While you can use the Excel UI for this, VBA allows you to apply complex rules based on dynamic data.

```vba
Range("A1:A10").FormatConditions.Add(xlCellValue, xlGreater, "50")
Range("A1:A10").FormatConditions(1).Interior.Color = vbGreen
```

## Number Formats

Always format your numeric data to make it professional.

```vba
Range("C:C").NumberFormat = "$#,##0.00"
```

## Summary

| Term | Description |
| :--- | :--- |
| **Interior** | The background color/pattern of a cell |
| **Borders** | The lines around a cell |
| **Font** | The style, size, and color of the text |
| **ChartType** | Bar, Line, Pie, etc. |
| **RGB** | Function for creating custom colors |
| **Best For** | Professional reporting and automated dashboards |
| **Logic** | "Separate data from presentation" |
| **Safety** | Formatting doesn't change the underlying data |
| **Modern** | Combine with `Table` objects for even better formatting |
| **Standard** | Use `vbRed`, `vbBlue`, etc. for simple colors |
| **Identity** | The "Final Polish" of any automated tool |
