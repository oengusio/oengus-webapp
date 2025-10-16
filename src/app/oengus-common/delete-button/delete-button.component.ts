import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
  standalone: false,
})
export class DeleteButtonComponent {
  public showConfirm = false;

  @Output() public confirmHandler = new EventEmitter<void>();
  @Output() public cancelHandler = new EventEmitter<void>();
  @Input() public baseText: string;
  @Input() public confirmText: string;
  @Input() public cancelText: string;

  confirm() {
    this.showConfirm = true;
  }

  cancel() {
    this.showConfirm = false;
    this.cancelHandler.next();
  }
}
