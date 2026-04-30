# Contentful Content Models Required

Based on the source code in `src/lib/contentful.ts`, your Next.js application expects specific Content Models and field structures in Contentful to function correctly. 

You need to create **three** Content Types in your Contentful Space:

---

## 1. Category (Content Type ID: `category`)
*This is used to tag your blog posts.*

| Field Name | Field ID | Field Type | Notes |
| :--- | :--- | :--- | :--- |
| **Name** | `name` | Short text | e.g., "Web Development", "Tutorial" |

---

## 2. Blog Post (Content Type ID: `blog`)
*Powers the `/blog` section.*

| Field Name | Field ID | Field Type | Notes |
| :--- | :--- | :--- | :--- |
| **Title** | `title` | Short text | Required |
| **Slug** | `slug` | Short text | Required, unique (e.g., `my-first-post`) |
| **Date** | `date` | Date and time | Published date |
| **Short Description** | `shortDescription` | Long text | Used for the preview card and SEO |
| **Content** | `content` | Rich text | The main body of the article |
| **Featured Image** | `featuredImage` | Media | One file, used as the header and thumbnail |
| **Category** | `category` | Reference | Many references, pointing to the `category` content type |
| **Featured** | `featured` | Boolean | True/False toggle |
| **Author** | `author` | Reference | *(Optional)* Points to an Author model if you create one |

---

## 3. Think Tank Article (Content Type ID: `thinkTankArticle`)
*Powers the `/think-tank` section for deep-dive research.*

| Field Name | Field ID | Field Type | Notes |
| :--- | :--- | :--- | :--- |
| **Title** | `title` | Short text | Required |
| **Slug** | `slug` | Short text | Required, unique |
| **Date** | `date` | Date and time | Published date |
| **Abstract** | `abstract` | Rich text | A summary of the research paper/article |
| **Content** | `content` | Rich text | The main body of the article |
| **Featured Image** | `featuredImage` | Media | One file |
| **Authors** | `authors` | List -> Short text | Array of author names (strings) |
| **Tags** | `tags` | List -> Short text | Array of tag strings |

---

## Important Notes on Rich Text
For the `content` and `abstract` fields (which are Rich Text), the codebase currently supports rendering:
*   Headings (H1, H2, H3, H4)
*   Bold, Italic, Underline, and Inline Code
*   Hyperlinks
*   Unordered and Ordered Lists
*   Blockquotes
*   Embedded Assets (Images)

> [!TIP]
> **To embed images inside a post:** In Contentful's Rich Text editor, click "Embed > Asset". The `rich-text-renderer.tsx` file is perfectly configured to extract the URL, dimensions, and description and render it as an optimized Next.js `<Image />` component!
