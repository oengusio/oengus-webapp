import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.scss'],
    standalone: false
})
export class LoadingIndicatorComponent {
  @Input() public loading = true;
}
