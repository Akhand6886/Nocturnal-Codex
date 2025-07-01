
'use client';

import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';
import Link from 'next/link';
import Image from 'next/image';

interface RichTextRendererProps {
  content: Document;
}

export function ContentfulRichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) {
    return null;
  }

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: text => <strong className="font-semibold">{text}</strong>,
      [MARKS.ITALIC]: text => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: text => <u className="underline">{text}</u>,
      [MARKS.CODE]: text => <code className="px-1.5 py-1 bg-muted/50 text-accent rounded-md font-mono text-[0.9em]">{text}</code>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const uri = node.data.uri as string;
        if (uri.startsWith('/')) {
          return <Link href={uri} className="text-primary hover:underline">{children}</Link>;
        }
        return <a href={uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>;
      },
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-3xl font-semibold mt-8 mb-4 pb-2 border-b">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-2xl font-semibold mt-6 mb-3">{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4 className="text-xl font-semibold mt-6 mb-3">{children}</h4>,
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-5 leading-relaxed">{children}</p>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc ml-5 mb-5 space-y-2">{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal ml-5 mb-5 space-y-2">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className="pl-2">{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="p-4 my-5 border-l-4 border-primary bg-muted/30 text-muted-foreground italic rounded-r-md shadow-sm">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-border" />,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { title, description, file } = node.data.target.fields;
        const { url } = file;
        const { width, height } = file.details.image;
        const imageUrl = url.startsWith('//') ? `https:${url}` : url;

        return (
          <figure className="my-6">
            <Image
              src={imageUrl}
              width={width}
              height={height}
              alt={title || ''}
              className="rounded-lg shadow-lg"
              data-ai-hint={description || ''}
            />
            {description && <figcaption className="text-center text-sm text-muted-foreground mt-2">{description}</figcaption>}
          </figure>
        );
      },
    },
  };

  return <div className="prose dark:prose-invert max-w-none markdown-content">{documentToReactComponents(content, options)}</div>;
}
