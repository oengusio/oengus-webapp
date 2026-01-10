import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { ElementTableCellComponent } from '../element-table-cell/element-table-cell.component';

@Component({
    selector: 'app-element-table-expand-button',
    templateUrl: './element-table-expand-button.component.html',
    styleUrls: ['./element-table-expand-button.component.scss'],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ElementTableCellComponent,
    ]
})
export class ElementTableExpandButtonComponent {
  @Input() expanded: boolean;

  get icon() {
    return this.expanded ? faCaretDown : faCaretRight;
  }

}
