import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-element-console',
    templateUrl: './element-console.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class ElementConsoleComponent {
  @Input() console = '';
  @Input() emulated = false;
}
