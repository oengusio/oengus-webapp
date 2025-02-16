import { Component, Input } from '@angular/core';
import { MarkdownService } from '../../../services/markdown.service';

@Component({
    selector: 'app-simple-md',
    templateUrl: './simple-md.component.html',
    styleUrls: ['./simple-md.component.scss'],
    standalone: false
})
export class SimpleMdComponent {
  @Input() public data: string;

  constructor(
    private readonly markdown: MarkdownService,
  ) {
  }

  get markdownText(): string {
    if (!this.data) {
      return '';
    }

    return this.markdown.renderInlineSimple(this.data);
  }

}
