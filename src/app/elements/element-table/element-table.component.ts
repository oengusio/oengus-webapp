import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-element-table',
  templateUrl: './element-table.component.html',
  styleUrls: ['./element-table.component.scss'],
})
export class ElementTableComponent implements OnChanges {
  @Input() isDivided: boolean;
  // the good way 😄
  // @HostBinding('style.--border-width') tableStyle = '';

  constructor(private elem: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDivided.currentValue !== changes.isDivided.previousValue) {
      // The good way did not work for me 🙃
      (this.elem.nativeElement.style as CSSStyleDeclaration)
        .setProperty(
          '--border-width',
          this.isDivided ? '1px' : '0'
        );
    }
  }
}
