import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { V2Schedule } from '../../../../model/schedule';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../../services/notification.service';

@Component({
    selector: 'app-marathon-schedule-share',
    templateUrl: './marathon-schedule-share.component.html',
    styleUrls: ['./marathon-schedule-share.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
    ]
})
export class MarathonScheduleShareComponent {
  private toastr = inject(NotificationService);

  iconShare = faShare;

  // @ts-expect-error meh.
  @Input() schedule: V2Schedule;

  onShareClick() {
    // @ts-expect-error SHUSH.
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
    this.toastr.toast('alert.generic.clipboardOk');
  }

  get shareUrl(): string {
    return `${environment.shortUrl}/${this.schedule.marathonId}/${this.schedule.slug}`;
  }
}
