import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-table',
  templateUrl: './element-table.component.html',
  styleUrls: ['./element-table.component.scss']
})
export class ElementTableComponent implements OnInit {
  @Input() isDivided: boolean;
  tableStyle = '';

  constructor() { }

  ngOnInit(): void {
    if (this.isDivided) {
      this.tableStyle = '--border-width: 1px;';
    }
  }

}
