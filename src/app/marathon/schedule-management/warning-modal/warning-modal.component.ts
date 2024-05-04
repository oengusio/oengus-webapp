import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-publish-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {
  readonly faExclamation = faExclamationTriangle;
  buttonLoading = false;

  @Output() publishConfirm = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.buttonLoading = true;

    setTimeout(() => {
      this.buttonLoading = false;
    }, 5000);
  }
}
