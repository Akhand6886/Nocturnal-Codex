---
title: "Tables"
description: "Displaying tabular data with rows and columns"
---

## When to use Tables?

Wait! **Tables** should only be used for **Data** (like a schedule, a price list, or a set of scores). In the old days, developers used tables for page layout, but that is a major "Don't." Today, we use Flexbox or Grid for layout.

```html
<table>
  <tr>
    <th>Language</th>
    <th>Release Year</th>
  </tr>
  <tr>
    <td>JavaScript</td>
    <td>1995</td>
  </tr>
</table>
```

## The Table Hierarchy

1.  **`<table>`**: The main wrapper.
2.  **`<thead>`**: The header section (optional but recommended).
3.  **`<tbody>`**: The body section where the main data lives.
4.  **`<tr>`**: Table Row.
5.  **`<th>`**: Table Header (Bold and centered by default).
6.  **`<td>`**: Table Data (A single cell).

## Merging Cells

-   **`colspan`**: Merges columns horizontally.
-   **`rowspan`**: Merges rows vertically.

```html
<td colspan="2">Double Width Cell</td>
```

## Summary

| Term | Description |
| :--- | :--- |
| **tr** | Table Row |
| **th** | Table Header (Title of the column) |
| **td** | Table Data (The actual value) |
| **border** | The line around the cells (Usually set in CSS) |
| **caption** | A title for the whole table |
| **Best For** | Schedules, spreadsheets, and statistical data |
| **Logic** | "Columnar data presentation" |
| **Safety** | Keep tables simple to ensure they work on mobile screens |
| **Modern** | Use CSS `display: block` to stack tables on small screens |
| **Standard** | Use `<thead>` and `<tbody>` for better accessibility |
| **Identity** | The "Spreadsheet" view of the web |
