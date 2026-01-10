import { Pipe, PipeTransform, inject } from '@angular/core';
import { MarkdownService } from '../../services/markdown.service';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  private readonly markdown = inject(MarkdownService);


  transform(value: string): string {
    if (!value) {
      return '';
    }

    return this.markdown.renderInlineSimple(value);
  }
}
