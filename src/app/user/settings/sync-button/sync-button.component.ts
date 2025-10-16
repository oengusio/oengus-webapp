import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-sync-button',
    templateUrl: './sync-button.component.html',
    styleUrls: ['./sync-button.component.scss'],
    standalone: false
})
export class SyncButtonComponent {
  @Input() public title: string;
  @Input() public username: string;
  @Input() public synced: boolean;

  @Output() public sync = new EventEmitter<void>();
  @Output() public unsync = new EventEmitter<void>();
}
