---
title: "Images & Media"
description: "Embedding photos, videos, and audio in HTML"
---

## Images (`<img>`)

The **`<img>`** tag is used to embed an image in a web page.

```html
<img src="logo.png" alt="Company Logo" width="200">
```

Wait! The **`alt`** (Alternative Text) attribute is **mandatory**.
1.  It is read by screen readers for blind users.
2.  It is shown if the image fails to load.
3.  It helps search engines understand the image.

## Video (`<video>`)

Modern HTML makes it very easy to host your own videos.

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

Wait! The **`controls`** attribute adds the Play/Pause button and volume slider automatically.

## Audio (`<audio>`)

Similar to video, the `<audio>` tag allows for music and sound clips.

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
</audio>
```

## Iframes (`<iframe>`)

An **Iframe** is used to display another web page (like a YouTube video or a Google Map) inside your current page.

```html
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
```

## Summary

| Term | Description |
| :--- | :--- |
| **src** | The path to the file |
| **alt** | Descriptive text for accessibility |
| **controls** | Show browser player controls |
| **autoplay** | Start playing immediately (Use sparingly!) |
| **muted** | Start with no sound (Required for autoplay on many browsers) |
| **Best For** | Building rich, interactive, and visual websites |
| **Logic** | "Multi-media embedding" |
| **Safety** | Always use descriptive `alt` tags |
| **Modern** | Use WebP or AVIF for much faster loading images |
| **Standard** | Use `<figure>` and `<figcaption>` to group images with captions |
| **Identity** | Media makes the web "The Web" |
