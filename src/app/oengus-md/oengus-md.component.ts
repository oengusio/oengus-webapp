import { Component, Input, OnInit } from '@angular/core';
import MarkdownIt from 'markdown-it';
import dompurify from 'markdown-it-dompurify';

@Component({
  selector: 'app-oengus-md',
  templateUrl: './oengus-md.component.html',
  styleUrls: ['./oengus-md.component.scss']
})
export class OengusMdComponent implements OnInit {
  @Input() public data: string;
  private md = new MarkdownIt('default', {
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
  }).use(dompurify());

  constructor() { }

  ngOnInit() {
  }

  get markdownText(): string {
    if (!this.data) {
      return '';
    }

    return this.md.render(this.data);
  }
}
