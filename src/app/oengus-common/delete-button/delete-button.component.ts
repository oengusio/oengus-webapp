import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
  ],
})
export class DeleteButtonComponent {

  public faTimes = faTimes;
  public faCheck = faCheck;

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
