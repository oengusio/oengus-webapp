import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { V2Schedule } from '../../../../model/schedule';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';
import { NwbAlertConfig, NwbAlertService } from '@oengus/ng-wizi-bulma';

@Component({
    selector: 'app-marathon-schedule-share',
    templateUrl: './marathon-schedule-share.component.html',
    styleUrls: ['./marathon-schedule-share.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
    ]
})
export class MarathonScheduleShareComponent {
  private toastr = inject(NwbAlertService);
  private translate = inject(TranslateService);

  iconShare = faShare;

  @Input() schedule: V2Schedule;

  onShareClick() {
    if (navigator.share) {
      this.showShareDialog();
    } else {
      this.copyLinkToClipboard();
    }
  }

  private showShareDialog() {
    navigator.share({
      text: this.shareUrl,
    }).catch(console.error);
  }

  private copyLinkToClipboard() {
    navigator.clipboard.writeText(this.shareUrl)
      .then(() => this.showSuccessToastr())
      .catch(console.error);
  }

  private showSuccessToastr() {
    this.translate.get('alert.generic.clipboardOk').subscribe((text) => {
      const alertConfig: NwbAlertConfig = {
        message: text,
        duration: 3000,
        position: 'is-right',
        color: 'is-success'
      };

      this.toastr.open(alertConfig);
    });
  }

  get shareUrl(): string {
    return `${environment.shortUrl}/${this.schedule.marathonId}/${this.schedule.slug}`;
  }
}
