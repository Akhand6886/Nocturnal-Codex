
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
      [MARKS.BOLD]: text => <strong>{text}</strong>,
      [MARKS.ITALIC]: text => <em>{text}</em>,
      [MARKS.UNDERLINE]: text => <u>{text}</u>,
      [MARKS.CODE]: text => <code>{text}</code>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const uri = node.data.uri as string;
        if (uri.startsWith('/')) {
          return <Link href={uri}>{children}</Link>;
        }
        return <a href={uri} target="_blank" rel="noopener noreferrer">{children}</a>;
      },
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote>
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr />,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { title, description, file } = node.data.target.fields;
        const { url } = file;
        const { width, height } = file.details.image;
        const imageUrl = url.startsWith('//') ? `https:${url}` : url;

        return (
          <figure>
            <Image
              src={imageUrl}
              width={width}
              height={height}
              alt={title || ''}
              data-ai-hint={description || ''}
            />
            {description && <figcaption>{description}</figcaption>}
          </figure>
        );
      },
    },
  };

  return <div>{documentToReactComponents(content, options)}</div>;
}
