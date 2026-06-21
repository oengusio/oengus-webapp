import { Component, Input, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownService } from '../../../services/markdown.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-oengus-md',
    templateUrl: './oengus-md.component.html',
    styleUrls: ['./oengus-md.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
    ]
})
export class OengusMdComponent implements OnInit {
  private readonly markdown = inject(MarkdownService);
  private readonly sanitizer = inject(DomSanitizer);

  @Input() public data = '';
  @Input() padTop = false;

  trustedContent: SafeHtml = '';

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
