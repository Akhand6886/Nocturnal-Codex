import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Document, Node } from '@contentful/rich-text-types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function richTextToPlainText(richText: Document | null | undefined): string {
  if (!richText || !richText.content) {
    return '';
  }

  let text = '';

  const traverse = (nodes: Node[]) => {
    for (const node of nodes) {
      if (node.nodeType === 'text' && 'value' in node) {
        text += node.value;
      }

      if ('content' in node && Array.isArray(node.content)) {
        if (node.nodeType === 'paragraph' && text.length > 0 && !text.endsWith(' ')) {
          text += ' ';
        }
        traverse(node.content as Node[]);
      }
    }
  };

  traverse(richText.content);
  return text.trim();
}
