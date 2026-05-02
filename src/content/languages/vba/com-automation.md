---
title: "COM Automation"
description: "Controlling Word, Outlook, and other apps from Excel"
---

## What is COM?

**COM** (Component Object Model) is the technology that allows different Microsoft applications to "talk" to each other. With **VBA**, you can control Word, Outlook, PowerPoint, and even File Explorer directly from Excel.

## 1. Controlling Outlook (Sending Email)

This is the most common use of COM automation.

```vba
Dim OutApp As Object
Dim OutMail As Object

Set OutApp = CreateObject("Outlook.Application")
Set OutMail = OutApp.CreateItem(0)

With OutMail
    .To = "alpha@example.com"
    .Subject = "Daily Report"
    .Body = "Please find the report attached."
    .Send
End With
```

## 2. Controlling Word (Generating Documents)

You can take data from your Excel sheet and automatically generate a Word document or a contract.

```vba
Dim WordApp As Object
Set WordApp = CreateObject("Word.Application")
WordApp.Visible = True
WordApp.Documents.Add
WordApp.Selection.TypeText "This was sent from Excel!"
```

## Early vs. Late Binding

Wait! There are two ways to connect to other apps:

1.  **Early Binding**: You add a "Reference" to the app in the VBE (Tools > References). This gives you IntelliSense and speed, but the code might break on different versions of Office.
2.  **Late Binding**: You use `CreateObject`. This is slower and has no IntelliSense, but it is much more "portable" and works on different Office versions.

> [!TIP]
> Use **Early Binding** while you are writing the code (for the help) and switch to **Late Binding** before you send it to other users.

## Summary

| Term | Description |
| :--- | :--- |
| **CreateObject** | Connecting to another application |
| **Visible** | Showing or hiding the other application |
| **Object** | The generic type used for Late Binding |
| **Set** | The keyword required to assign an object to a variable |
| **Nothing** | Clearing the object from memory when finished |
| **Best For** | Multi-app workflows (Excel to Outlook, etc.) |
| **Logic** | "Cross-application control" |
| **Safety** | Always close the other application to avoid "Zombie" processes |
| **Modern** | Power Automate is the modern cloud version of this |
| **Standard** | Always set your objects to `Nothing` at the end of the script |
| **Identity** | The "Secret Power" of the Microsoft ecosystem |
