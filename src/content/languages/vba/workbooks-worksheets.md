---
title: "Workbooks & Worksheets"
description: "Managing files and sheets in the Excel Object Model"
---

## The Hierarchy

**VBA** follows a clear object hierarchy. To be safe and precise, you should always reference your objects from the top down.

1.  **Application**: Excel itself.
2.  **Workbook**: The file (`.xlsx` or `.xlsm`).
3.  **Worksheet**: The specific tab inside the file.
4.  **Range**: The cells.

```vba
ThisWorkbook.Worksheets("Data").Range("A1")
```

## Managing Workbooks

| Action | Code |
| :--- | :--- |
| **Open** | `Workbooks.Open("C:\file.xlsx")` |
| **Close** | `ActiveWorkbook.Close SaveChanges:=True` |
| **Add** | `Workbooks.Add` |
| **Save** | `ActiveWorkbook.SaveAs "NewFile.xlsx"` |

## Managing Worksheets

Wait! You can easily loop through all the sheets in a workbook to perform a task (like hiding them or clearing them).

```vba
Dim ws As Worksheet
For Each ws In ThisWorkbook.Worksheets
    If ws.Name <> "Main" Then
        ws.Visible = xlSheetHidden
    End If
Next ws
```

## `ThisWorkbook` vs. `ActiveWorkbook`

-   **`ThisWorkbook`**: The file where the VBA code is currently running (Always safe!).
-   **`ActiveWorkbook`**: The file currently on top of the user's screen (Unpredictable!).

> [!IMPORTANT]
> **Always prefer `ThisWorkbook`** unless you specifically intend to modify a different file.

## Summary

| Term | Description |
| :--- | :--- |
| **Workbooks** | The collection of all open files |
| **Worksheets**| The collection of all tabs in a file |
| **Add** | Create a new workbook or sheet |
| **Delete** | Remove a workbook or sheet |
| **Name** | The label on the worksheet tab |
| **Best For** | Multi-file reporting and consolidating data |
| **Logic** | "Navigating the Office ecosystem" |
| **Safety** | Turn off `Application.DisplayAlerts` before deleting sheets |
| **Modern** | Combine with `Dir()` to process a whole folder of files |
| **Standard** | Use meaningful names for your sheets, not "Sheet1" |
| **Identity** | The fundamental structure of an Excel project |
