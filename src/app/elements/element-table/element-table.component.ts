import { Component, ElementRef, Input, OnChanges, SimpleChanges, inject } from '@angular/core';

@Component({
    selector: 'app-element-table',
    templateUrl: './element-table.component.html',
    styleUrls: ['./element-table.component.scss'],
    standalone: false
})
export class ElementTableComponent implements OnChanges {
  private elem = inject(ElementRef);

  @Input() isDivided: boolean;

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
