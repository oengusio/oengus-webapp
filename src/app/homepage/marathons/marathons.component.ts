import { Component, Input } from '@angular/core';
import { HomepageMetadata } from '../../../model/homepage-metadata';
import { getRowParity } from '../../../assets/table';
import { Marathon } from '../../../model/marathon';
import { TemporalServiceService } from '../../../services/termporal/temporal-service.service';

@Component({
  selector: 'app-homepage-marathons',
  templateUrl: './marathons.component.html',
  styleUrls: ['./marathons.component.scss'],
})
export class MarathonsComponent {

  @Input() homepageMarathons: HomepageMetadata;

  marathonsLists = [
    {
      key: 'live',
      label: 'homepage.marathons.live',
      timeTranslationKey: 'homepage.ends',
      timeTranslationValue: ['endDate'],
      headerClass: 'is-3',
    },
    {
      key: 'next',
      label: 'homepage.marathons.upcoming',
      timeTranslationKey: 'homepage.starts',
      timeTranslationValue: ['startDate'],
      headerClass: 'is-4',
    },
    {
      key: 'open',
      label: 'homepage.marathons.open',
      timeTranslationKey: 'homepage.submissions_close',
      timeTranslationValue: ['submissionsEndDate', 'startDate'],
      headerClass: 'is-4',
    },
    {
      key: 'moderated',
      label: 'homepage.marathons.moderated',
      timeTranslationKey: 'homepage.starts',
      timeTranslationValue: ['startDate'],
      headerClass: 'is-4',
    },
  ];

  getRowParity = getRowParity;

  constructor(public temporal: TemporalServiceService) {
  }

  shouldRenderList(key: keyof HomepageMetadata): boolean {
    return (this.homepageMarathons?.[key]?.length ?? 0) > 0;
  }

  getMarathonDistance(marathon: Marathon, keys: Array<keyof Marathon>): Date | undefined {
    return keys.map(key => marathon[key] as Date).find(date => date);
  }

}
