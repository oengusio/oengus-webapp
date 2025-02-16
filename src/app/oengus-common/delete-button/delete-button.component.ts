import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    standalone: false
})
export class DeleteButtonComponent implements OnInit {

  public faTimes = faTimes;
  public faCheck = faCheck;

  public showConfirm = false;

  @Output() public confirmHandler: EventEmitter<void> = new EventEmitter();
  @Output() public cancelHandler: EventEmitter<void> = new EventEmitter();
  @Input() public baseText: string;
  @Input() public confirmText: string;
  @Input() public cancelText: string;

  constructor() { }

  ngOnInit() {
  }

  confirm() {
    this.showConfirm = true;
  }

  cancel() {
    this.showConfirm = false;
    this.cancelHandler.next();
  }
}
