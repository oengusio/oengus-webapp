import { Component, Input } from '@angular/core';
import { faTwitter, faBluesky } from '@fortawesome/free-brands-svg-icons';
import { MarathonService } from '../../../../services/marathon.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-submit-share-buttons',
  templateUrl: './submit-share-buttons.component.html',
  styleUrl: './submit-share-buttons.component.scss',
  standalone: false,
})
export class SubmitShareButtonsComponent {
  protected faTwitter = faTwitter;
  protected faBluesky = faBluesky;
  protected localStorage = localStorage;
  protected shortDomain = environment.shortUrl;

  @Input() gameNames: string;

  constructor(private marathonService: MarathonService) {
  }

  get marathonName() {
    return this.marathonService.marathon.name;
  }

  get marathonId() {
    return this.marathonService.marathon.id;
  }
}
