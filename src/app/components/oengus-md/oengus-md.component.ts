import { Component, Input, OnInit } from '@angular/core';
import { MarkdownService } from '../../../services/markdown.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-oengus-md',
  templateUrl: './oengus-md.component.html',
  styleUrls: ['./oengus-md.component.scss']
})
export class OengusMdComponent implements OnInit {
  @Input() public data: string;
  @Input() padTop = false;

  trustedContent: SafeHtml = '';

  constructor(
    private readonly markdown: MarkdownService,
    private readonly sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    // This is safe because our markdown renderer has dompurify installed.
    this.trustedContent = this.sanitizer.bypassSecurityTrustHtml(this.markdownText);
  }

  get markdownText(): string {
    if (!this.data) {
      return '';
    }

    return this.markdown.render(this.data);
  }
}
