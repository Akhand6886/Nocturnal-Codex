---
id: vba
name: VBA
slug: vba
description: >-
  Visual Basic for Applications — the automation and macro language for
  Microsoft Office products.
iconName: visualbasic
year: 1993
creator: Microsoft
paradigm:
  - Object-Oriented
  - Event-Driven
  - Procedural
useCases:
  - Office Automation
  - Data Processing
  - Reporting
  - Business Tools
website: 'https://learn.microsoft.com/en-us/office/vba/api/overview/'
category: General Purpose
featured: false
difficulty: Beginner
topics:
  - section: Basics
    items:
      - title: VBA Editor
        description: 'VBE, modules, Immediate Window, and macro recording'
        slug: vba-editor
      - title: Variables & Data Types
        description: 'Dim, data types, Variant, and Option Explicit'
        slug: variables-data-types
      - title: Control Flow
        description: 'If/Then/Else, Select Case, For/Next, Do/Loop'
        slug: control-flow
      - title: Procedures
        description: 'Sub vs Function, parameters, and ByRef vs ByVal'
        slug: procedures
  - section: Excel Object Model
    items:
      - title: Workbooks & Worksheets
        description: 'Accessing, creating, and manipulating Excel objects'
        slug: workbooks-worksheets
      - title: Ranges & Cells
        description: 'Range object, Cells property, and dynamic ranges'
        slug: ranges-cells
      - title: Charts & Formatting
        description: 'Creating charts, conditional formatting, and styles'
        slug: charts-formatting
  - section: Advanced
    items:
      - title: UserForms
        description: 'Custom dialog boxes, controls, and event handling'
        slug: userforms
      - title: Error Handling
        description: 'On Error, Resume Next, and error logging'
        slug: error-handling
      - title: COM Automation
        description: 'Controlling Outlook, Word, and external applications'
        slug: com-automation
---

## Overview

VBA (Visual Basic for Applications) is an implementation of Microsoft's Visual Basic built into Microsoft Office applications. It enables users to automate repetitive tasks, create custom functions, build forms, and extend Office functionality.

## Key Features

- **Office integration** — Direct access to Excel, Word, Outlook object models
- **Macro recording** — Generate code by recording user actions
- **UserForms** — Build custom dialog boxes and input forms
- **COM automation** — Control other Windows applications
- **Immediate Window** — REPL-like debugging and testing

## Code Example

```vb
Sub SummarizeData()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("Sales")

    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row

    With ws.Range("A1:D" & lastRow)
        .Borders.LineStyle = xlContinuous
        .Font.Name = "Calibri"
    End With

    ws.Cells(lastRow + 1, 1).Value = "Total"
    ws.Cells(lastRow + 1, 4).Formula = "=SUM(D2:D" & lastRow & ")"
End Sub
```

## Learning Resources

- [Microsoft VBA Documentation](https://learn.microsoft.com/en-us/office/vba/)
- [Excel Easy VBA Tutorial](https://www.excel-easy.com/vba.html)
- [WiseOwl VBA Tutorials](https://www.wiseowl.co.uk/vba-macros/)
