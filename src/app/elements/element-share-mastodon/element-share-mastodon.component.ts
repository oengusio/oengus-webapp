import { Component, Input, OnInit } from '@angular/core';
import { faMastodon } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-element-share-mastodon',
    templateUrl: './element-share-mastodon.component.html',
    styleUrls: ['./element-share-mastodon.component.scss'],
    standalone: false
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
