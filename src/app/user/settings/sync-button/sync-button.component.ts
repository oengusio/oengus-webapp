import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-sync-button',
    templateUrl: './sync-button.component.html',
    styleUrls: ['./sync-button.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
    ]
})
export class SyncButtonComponent {
  public faSyncAlt = faSyncAlt;

  @Input() public title: string;
  @Input() public username: string;
  @Input() public synced: boolean;

  @Output() public sync = new EventEmitter<void>();
  @Output() public unsync = new EventEmitter<void>();
}
