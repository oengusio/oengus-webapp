import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-table-cell',
  templateUrl: './element-table-cell.component.html',
  styleUrls: ['./element-table-cell.component.scss'],
})
export class ElementTableCellComponent implements OnInit {
  @Input() isHeader: boolean;
  @Input() columnStart = 'auto';
  @Input() columnEnd = 'auto';
  @Input() rowStart = 'auto';
  @Input() rowEnd = 'auto';

  // @HostBinding('class.element-table-header') get cellHeader() { return false; }

  classes = {
    'element-table-header': false,
  };

  styles = {
    '--column-start': this.columnStart,
    '--column-end': this.columnEnd,
    '--row-start': this.rowStart,
    '--row-end': this.rowEnd,
  };

  constructor() { }

  ngOnInit(): void {
    this.classes = {
      'element-table-header': this.isHeader,
    };
  }

}
