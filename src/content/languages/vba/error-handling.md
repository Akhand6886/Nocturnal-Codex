---
title: "Error Handling"
description: "On Error GoTo and the Err object in VBA"
---

## Why handle errors?

In **VBA**, if an error occurs (like trying to open a file that doesn't exist), the whole macro crashes and shows a scary "Debug" window to the user. **Error Handling** allows you to catch these problems and handle them gracefully.

## 1. `On Error GoTo`

This is the standard way to handle errors in VBA. You tell the code to jump to a specific label if something goes wrong.

```vba
Sub SafeMacro()
    On Error GoTo ErrorHandler
    
    ' ... risky code here ...
    Dim x As Integer: x = 1 / 0 ' Divide by zero error!
    
    Exit Sub % CRITICAL! Don't run the handler if there's no error
    
ErrorHandler:
    MsgBox "An error occurred: " & Err.Description
End Sub
```

## 2. `On Error Resume Next`

Wait! This command tells VBA to **ignore** the error and just move to the next line. Use this **very sparingly**—only when you expect an error and know how to check for it immediately.

```vba
On Error Resume Next
Set mySheet = Worksheets("MissingSheet")
If mySheet Is Nothing Then
    ' Handle the fact that it's missing
End If
On Error GoTo 0 % Turn error handling back to normal
```

## The `Err` Object

When an error happens, the **`Err`** object contains all the details:
-   **`Err.Number`**: The numeric ID of the error.
-   **`Err.Description`**: The English explanation of what went wrong.

## Summary

| Term | Description |
| :--- | :--- |
| **On Error** | Instruction to start error handling |
| **GoTo Label** | Jumping to a specific handler block |
| **Resume Next**| Ignoring errors (Dangerous!) |
| **Err.Clear** | Resetting the error state |
| **Exit Sub** | Preventing the handler from running accidentally |
| **Best For** | Building professional and stable applications |
| **Logic** | "Anticipate failure and recover gracefully" |
| **Safety** | Prevents the user from seeing the code editor |
| **Modern** | Essential for robust automation |
| **Standard** | Use a consistent error handler in every major Sub |
| **Identity** | The difference between a "Script" and an "Application" |
