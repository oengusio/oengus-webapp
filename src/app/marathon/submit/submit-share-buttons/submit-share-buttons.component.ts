import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTwitter, faBluesky } from '@fortawesome/free-brands-svg-icons';
import { MarathonService } from '../../../../services/marathon.service';
import { environment } from '../../../../environments/environment';
import { ElementShareMastodonComponent } from '../../../elements/element-share-mastodon/element-share-mastodon.component';

@Component({
  selector: 'app-submit-share-buttons',
  templateUrl: './submit-share-buttons.component.html',
  styleUrl: './submit-share-buttons.component.scss',
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    ElementShareMastodonComponent,
  ],
})
export class SubmitShareButtonsComponent {
  private marathonService = inject(MarathonService);

  protected faTwitter = faTwitter;
  protected faBluesky = faBluesky;
  protected localStorage = localStorage;
  protected shortDomain = environment.shortUrl;

  @Input() gameNames: string;

  get marathonName() {
    return this.marathonService.marathon.name;
  }

  get marathonId() {
    return this.marathonService.marathon.id;
  }
}
