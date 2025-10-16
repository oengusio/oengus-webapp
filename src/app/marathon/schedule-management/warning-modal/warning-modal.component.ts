import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-publish-warning-modal',
    templateUrl: './warning-modal.component.html',
    styleUrls: ['./warning-modal.component.scss'],
    standalone: false
})
export class WarningModalComponent implements OnInit {
  buttonLoading = false;

  @Output() publishConfirm = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.buttonLoading = true;

    setTimeout(() => {
      this.buttonLoading = false;
    }, 5000);
  }
}
