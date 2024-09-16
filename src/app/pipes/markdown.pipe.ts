import { Pipe, PipeTransform } from '@angular/core';
import MarkdownIt from 'markdown-it';
import dompurify from 'markdown-it-dompurify';

@Pipe({
  standalone: true,
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  // TODO: add helper function to get markdown configuration
  private md = new MarkdownIt('zero', {
    linkify: false,
  })
    // Only enable [links](https://oengus.io), **bold** and _italic_
    .enable(['link', 'emphasis'])
    .use(dompurify());

  transform(value: string, ...args: any[]): string {
    if (!value) {
      return '';
    }

    return this.md.renderInline(value);
  }
}
