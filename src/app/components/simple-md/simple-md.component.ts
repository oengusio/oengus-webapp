import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownService } from '../../../services/markdown.service';

@Component({
    selector: 'app-simple-md',
    templateUrl: './simple-md.component.html',
    styleUrls: ['./simple-md.component.scss'],
    imports: [
        CommonModule,
    ]
})
export class SimpleMdComponent {
  private readonly markdown = inject(MarkdownService);

  @Input() public data: string;

  get markdownText(): string {
    if (!this.data) {
      return '';
    }

    return this.markdown.renderInlineSimple(this.data);
  }

}
