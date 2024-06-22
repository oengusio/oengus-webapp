import { Component, Input } from '@angular/core';
import MarkdownIt from 'markdown-it';
import dompurify from 'markdown-it-dompurify';

@Component({
  selector: 'app-simple-md',
  templateUrl: './simple-md.component.html',
  styleUrls: ['./simple-md.component.scss'],
})
export class SimpleMdComponent {
  @Input() public data: string;

  private md = new MarkdownIt('zero', {
    linkify: false,
  })
    // Only enable [links](https://oengus.io), **bold** and _italic_
    .enable(['link', 'emphasis'])
    .use(dompurify());

  get markdownText(): string {
    if (!this.data) {
      return '';
    }

    return this.md.renderInline(this.data);
  }

}
