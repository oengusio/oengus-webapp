import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-element-console',
    templateUrl: './element-console.component.html',
    standalone: false
})
export class ElementConsoleComponent {
  @Input() console: string;
  @Input() emulated = false;
}
