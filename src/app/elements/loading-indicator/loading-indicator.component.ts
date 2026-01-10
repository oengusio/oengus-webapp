import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.scss'],
    imports: [
        CommonModule,
    ]
})
export class LoadingIndicatorComponent {
  @Input() public loading = true;
}
