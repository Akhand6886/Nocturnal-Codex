import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Document, Node, Text } from '@contentful/rich-text-types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function isTextNode(node: Node): node is Text {
    return node.nodeType === 'text' && typeof (node as Text).value === 'string';
}

export function richTextToPlainText(richText: Document | null | undefined): string {
  if (!richText || !richText.content) {
    return '';
  }

  let text = '';

  const traverse = (nodes: Node[]) => {
    for (const node of nodes) {
      if (isTextNode(node)) {
        text += node.value;
      }

      if ('content' in node && Array.isArray(node.content)) {
        if (node.nodeType === 'paragraph' && text.length > 0 && !text.endsWith(' ')) {
          text += ' '; // Add a space between paragraphs
        }
        traverse(node.content as Node[]);
      }
    }
  };

  traverse(richText.content);
  return text.trim().replace(/\s+/g, ' '); // Consolidate whitespace
}
