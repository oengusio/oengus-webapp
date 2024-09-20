import { Component, Input } from '@angular/core';
import { MarkdownService } from '../../../services/markdown.service';

@Component({
  selector: 'app-oengus-md',
  templateUrl: './oengus-md.component.html',
  styleUrls: ['./oengus-md.component.scss']
})
export class OengusMdComponent {
  @Input() public data: string;
  @Input() padTop = false;

  constructor(
    private readonly markdown: MarkdownService,
  ) {
  }

  get markdownText(): string {
    if (!this.data) {
      return '';
    }

    return this.markdown.render(this.data);
  }
}
