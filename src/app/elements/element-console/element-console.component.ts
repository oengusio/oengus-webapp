import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-element-console',
    templateUrl: './element-console.component.html',
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class ElementConsoleComponent {
  @Input() console: string;
  @Input() emulated = false;
}
