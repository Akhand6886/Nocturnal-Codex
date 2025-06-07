
import {defineField, defineType} from 'sanity'
import {BookText} from 'lucide-react' // Example icon

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: BookText,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(96).warning('Shorter titles are usually better.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string', // Simple string for author name
      initialValue: 'The Nocturnist',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text', // Allows for longer summaries
      rows: 3,
      validation: (Rule) => Rule.required().max(200, 'Excerpt should be concise.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required().warning('Alternative text is highly recommended.'),
        },
        {
          name: 'dataAiHint',
          type: 'string',
          title: 'AI Hint for Image (Optional)',
          description: 'One or two keywords for AI image search (e.g., "technology abstract"). Max two words.',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption (Optional)',
        }
      ]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags' // Renders as a tag input field
      }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'seriesId',
      title: 'Series ID (Optional)',
      type: 'string',
      description: 'An identifier for posts belonging to the same series (e.g., "quantum-intro").',
    }),
    defineField({
      name: 'seriesOrder',
      title: 'Order in Series (Optional)',
      type: 'number',
      description: 'The numerical order of this post within its series (e.g., 1, 2, 3).',
    }),
    defineField({
        name: 'featured',
        title: 'Featured Post',
        type: 'boolean',
        initialValue: false,
        description: 'Mark this post as featured to highlight it on the homepage or other sections.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array', // For Portable Text
      of: [
        {
          type: 'block', 
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] })
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image', 
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: Rule => Rule.warning('You should add alternative text for images.'),
            },
            {
                name: 'caption',
                type: 'string',
                title: 'Caption',
            }
          ]
        },
        {
            type: 'code', 
            options: {
                withFilename: true, 
                languageAlternatives: [ // Provide some common languages
                    {title: 'JavaScript', value: 'javascript'},
                    {title: 'TypeScript', value: 'typescript'},
                    {title: 'Python', value: 'python'},
                    {title: 'HTML', value: 'html'},
                    {title: 'CSS', value: 'css'},
                    {title: 'JSON', value: 'json'},
                    {title: 'Shell', value: 'sh'},
                    {title: 'Text', value: 'text'},
                ]
            }
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage',
      author: 'author',
    },
    prepare({title, subtitle, media, author}) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString() : 'No date';
      const authorName = author || 'Unknown Author';
      return {
        title,
        subtitle: `${authorName} - ${date}`,
        media: media || BookText,
      }
    }
  }
})
