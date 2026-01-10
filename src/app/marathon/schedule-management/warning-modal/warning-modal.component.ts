import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-publish-warning-modal',
    templateUrl: './warning-modal.component.html',
    styleUrls: ['./warning-modal.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
    ]
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
