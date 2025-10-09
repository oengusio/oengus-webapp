import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-element-share-mastodon',
    templateUrl: './element-share-mastodon.component.html',
    styleUrls: ['./element-share-mastodon.component.scss'],
    standalone: false
})
export class ElementShareMastodonComponent {

  @Input() text: string;

  shareUrl = 'mastodon.social';

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
