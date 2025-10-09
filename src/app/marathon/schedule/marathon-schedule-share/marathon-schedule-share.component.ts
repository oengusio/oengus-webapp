import { Component, inject, Input } from '@angular/core';
import { V2Schedule } from '../../../../model/schedule';
import { environment } from '../../../../environments/environment';
import { NwbAlertConfig, NwbAlertService } from '@oengus/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-marathon-schedule-share',
    templateUrl: './marathon-schedule-share.component.html',
    styleUrls: ['./marathon-schedule-share.component.scss'],
    standalone: false
})
export class MarathonScheduleShareComponent {
  private toastr = inject(NwbAlertService);
  private translate = inject(TranslateService);

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
