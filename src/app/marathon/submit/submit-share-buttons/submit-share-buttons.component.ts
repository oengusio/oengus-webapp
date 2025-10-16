import { Component, inject, Input } from '@angular/core';
import { MarathonService } from '../../../../services/marathon.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-submit-share-buttons',
  templateUrl: './submit-share-buttons.component.html',
  styleUrl: './submit-share-buttons.component.scss',
  standalone: false,
})
export class SubmitShareButtonsComponent {
  private marathonService = inject(MarathonService);

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
