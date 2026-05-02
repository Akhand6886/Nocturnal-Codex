---
title: "UserForms"
description: "Creating custom graphical user interfaces (GUIs) in VBA"
---

## What is a UserForm?

A **UserForm** is a custom dialog box that you design yourself. It allows you to create a professional interface for your users to input data, select options, and run macros without touching the spreadsheet grid.

## Designing a Form

You create a UserForm in the **VBE** by going to **Insert > UserForm**. You then drag and drop controls from the **Toolbox**.

## Common Controls

| Control | Purpose |
| :--- | :--- |
| **Label** | Displaying text |
| **TextBox** | Getting text or numeric input |
| **ComboBox** | A dropdown list of choices |
| **CommandBut.**| A button to run code |
| **ListBox** | A list where multiple items can be selected |
| **CheckBox** | True/False options |

## Show and Hide

```vba
UserForm1.Show % Open the form
Unload UserForm1 % Close and delete the form
```

## Event-Driven Programming

Wait! Code in a UserForm is **Event-Driven**. You don't run it manually; it runs in response to the user doing something (like clicking a button).

```vba
Private Sub CommandButton1_Click()
    MsgBox "You clicked the button!"
End Sub
```

## Why use UserForms?

1.  **Professionalism**: Your Excel tool feels like a real standalone app.
2.  **Data Validation**: Ensure the user enters a valid date or number before you process it.
3.  **User Experience**: Guide the user through a complex task step-by-step.

## Summary

| Term | Description |
| :--- | :--- |
| **Show** | Display the form |
| **Hide** | Temporarily hide the form |
| **Unload** | Close and clear the form from memory |
| **Initialize** | Event that runs when the form first opens |
| **Change** | Event that runs when an input is modified |
| **Best For** | Building user-friendly tools and dashboards |
| **Logic** | "Interactive graphical interfaces" |
| **Safety** | Prevents users from breaking the spreadsheet |
| **Modern** | Combine with `ImageList` for beautiful icons |
| **Standard** | Use clear names for controls (e.g., `btnSubmit`, `txtAge`) |
| **Identity** | The pinnacle of VBA application design |
