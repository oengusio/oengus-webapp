import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-element-table-cell',
  templateUrl: './element-table-cell.component.html',
  styleUrls: ['./element-table-cell.component.scss'],
})
export class ElementTableCellComponent implements OnChanges {
  @Input() isHeader = false;
  @Input() columnStart = 'auto';
  @Input() columnEnd = 'auto';
  @Input() rowStart = 'auto';
  @Input() rowEnd = 'auto';

  // @HostBinding('class.element-table-header') get header() { return this.isHeader; }
  @HostBinding('style') get style() {
    return {
      '--column-start': this.columnStart,
      '--column-end': this.columnEnd,
      '--row-start': this.rowStart,
      '--row-end': this.rowEnd,
    };
  }

  constructor(private elem: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isHeader.currentValue !== changes.isHeader.previousValue) {
      // The good way did not work for me 🙃
      const clsList = (this.elem.nativeElement.classList as DOMTokenList);

      if (this.isHeader) {
        clsList.add('element-table-header');
      } else {
        clsList.remove('element-table-header');
      }
    }
  }

}
