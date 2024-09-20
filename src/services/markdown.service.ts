import { Injectable } from '@angular/core';
import MarkdownIt from 'markdown-it';
import dompurify from 'markdown-it-dompurify';
import tablePlugin from 'markdown-it-multimd-table';
import emojiPlugin from 'markdown-it-emoji';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private standardMd = new MarkdownIt('default', {
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
  })
    .use(dompurify())
    .use(tablePlugin)
    .use(emojiPlugin);

  private readonly simpleMd = new MarkdownIt('zero', {
    linkify: false,
  })
    // Only enable [links](https://oengus.io), **bold** and _italic_
    .enable(['link', 'emphasis'])
    .use(dompurify());

  render(markdown: string): string {
    return this.standardMd.render(markdown);
  }

  renderInlineSimple(markdown: string): string {
    return this.simpleMd.renderInline(markdown);
  }
}
