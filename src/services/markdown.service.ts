import { Injectable } from '@angular/core';
import MarkdownIt from 'markdown-it';
import tablePlugin from 'markdown-it-multimd-table';
import emojiPlugin from 'markdown-it-emoji';
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts';
import createDOMPurify from 'dompurify';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private dompurify = createDOMPurify(window);
  private standardMd = new MarkdownIt('default', {
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
  })
    .use(tablePlugin)
    .use(emojiPlugin)
    .use(MarkdownItGitHubAlerts);

  private readonly simpleMd = new MarkdownIt('zero', {
    linkify: false,
  })
    // Only enable [links](https://oengus.io), **bold** and _italic_
    .enable(['link', 'emphasis']);

  sanitizeHtml(html: string): string {
    return this.dompurify.sanitize(html);
  }

  render(markdown: string): string {
    return this.sanitizeHtml(this.standardMd.render(markdown));
  }

  renderInlineSimple(markdown: string): string {
    return this.sanitizeHtml(this.simpleMd.renderInline(markdown));
  }
}
