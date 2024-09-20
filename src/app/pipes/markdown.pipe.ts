import { Pipe, PipeTransform } from '@angular/core';
import { MarkdownService } from '../../services/markdown.service';

@Pipe({
  standalone: true,
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  constructor(
    private readonly markdown: MarkdownService,
  ) {
  }

  transform(value: string, ...args: any[]): string {
    if (!value) {
      return '';
    }

    return this.markdown.renderInlineSimple(value);
  }
}
