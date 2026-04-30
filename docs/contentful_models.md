# Contentful Content Models Required

Based on the latest source code updates, your Next.js application expects the following Content Models and field structures in Contentful.

---

## 1. Category (Content Type ID: `category`)
*Used to categorize and filter Blog Posts.*

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
| **Short Description** | `shortDescription` | Long text | Used for preview card and SEO fallback |
| **Content** | `content` | Rich text | Main body of the article |
| **Featured Image** | `featuredImage` | Media | Thumbnail and header banner |
| **Category** | `category` | Reference (Many) | Points to `category` content type |
| **Featured** | `featured` | Boolean | Highlight this post on the homepage |
| **Author** | `author` | Reference (Single) | Points to an Author model |

---

## 3. Think Tank Article (Content Type ID: `thinkTankArticle`)
*Powers the `/think-tank` section for advanced research and theory.*

| Field Name | Field ID | Field Type | Notes |
| :--- | :--- | :--- | :--- |
| **Title** | `title` | Short text | Required |
| **Slug** | `slug` | Short text | Required, unique |
| **Date** | `date` | Date and time | Published date |
| **Authors** | `authors` | Reference (Many) | Points to Author entries |
| **Series** | `series` | Reference (Single) | Groups articles into a research series |
| **Discipline** | `discipline` | Short text | e.g., "Cryptography", "Distributed Systems" |
| **Abstract** | `abstract` | Rich text | Brief summary rendered in a highlighted card |
| **Content** | `content` | Rich text | Main research body |
| **Citations** | `citations` | Rich text | Scholarly references, rendered in a dedicated section |
| **Tags** | `tags` | List -> Short text | Searchable keywords |
| **Featured Image** | `featuredImage` | Media | Header banner |
| **PDF Download** | `pdfDownload` | Media | Optional file (PDF) for user download |
| **Meta Title** | `metaTitle` | Short text | Overrides the page title for SEO |
| **Meta Description** | `metaDescription` | Long text | Overrides the abstract for SEO meta tags |

---

## Technical Implementation Notes

### Rich Text Rendering
The `ContentfulRichTextRenderer` supports:
*   **Headings**: H1 through H4
*   **Formatting**: Bold, Italic, Underline, and Inline Code blocks
*   **Media**: Embedded Assets (Images) are rendered with dimensions and captions
*   **Lists**: Ordered and Unordered lists
*   **Quotes**: Styled blockquotes

### ISR & Webhooks
*   **On-Demand ISR**: Set up a webhook in Contentful pointing to `/api/revalidate` with your secret header to trigger instant updates.
*   **Draft Mode**: Use the Preview API at `/api/draft` to see unpublished entries directly in the UI.
