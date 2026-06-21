import { Component, ElementRef, Input, OnChanges, SimpleChanges, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-element-table',
    templateUrl: './element-table.component.html',
    styleUrls: ['./element-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
    ]
})
export class ElementTableComponent implements OnChanges {
  private elem = inject(ElementRef);

  // @ts-expect-error meh.
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
