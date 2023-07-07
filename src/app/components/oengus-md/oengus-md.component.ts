import { Component, Input } from '@angular/core';
import MarkdownIt from 'markdown-it';
import dompurify from 'markdown-it-dompurify';
import tablePlugin from 'markdown-it-multimd-table';
import emojiPlugin from 'markdown-it-emoji';

@Component({
  selector: 'app-oengus-md',
  templateUrl: './oengus-md.component.html',
  styleUrls: ['./oengus-md.component.scss']
})
export class OengusMdComponent {
  @Input() public data: string;
  @Input() padTop = false;

  private md = new MarkdownIt('default', {
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
  })
    .use(dompurify())
    .use(tablePlugin)
    .use(emojiPlugin);

  get markdownText(): string {
    if (!this.data) {
      return '';
    }

    return this.md.render(this.data);
  }
}
