import { Component, Input } from '@angular/core';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-element-table-expand-button',
    templateUrl: './element-table-expand-button.component.html',
    styleUrls: ['./element-table-expand-button.component.scss'],
    standalone: false
})
export class ElementTableExpandButtonComponent {
  @Input() expanded: boolean;

  get icon() {
    return this.expanded ? faCaretDown : faCaretRight;
  }

}
