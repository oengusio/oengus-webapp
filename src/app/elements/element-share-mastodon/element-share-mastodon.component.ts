import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMastodon } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-element-share-mastodon',
    templateUrl: './element-share-mastodon.component.html',
    styleUrls: ['./element-share-mastodon.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
    ]
})
export class ElementShareMastodonComponent {

  @Input() text: string;

  shareUrl = 'mastodon.social';

  faMastodon = faMastodon;

  getInstance(): string {
    return window.prompt(
      'Please tell me your Mastodon instance'
    );
  }

  mastodonButtonClick(): boolean {
    this.shareUrl = this.getInstance();

    return true;
  }
}
