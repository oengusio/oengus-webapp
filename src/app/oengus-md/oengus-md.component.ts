import { Component, Input, OnInit } from '@angular/core';
import MarkdownIt from 'markdown-it';

@Component({
  selector: 'app-oengus-md',
  templateUrl: './oengus-md.component.html',
  styleUrls: ['./oengus-md.component.scss']
})
export class OengusMdComponent implements OnInit {
  @Input() public data: string;
  private md = new MarkdownIt('commonmark', {
    html: false,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
  });

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
