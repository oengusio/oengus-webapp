import { Component, Input } from '@angular/core';
import { HomepageMetadata } from '../../../model/homepage-metadata';
import { getRowParity } from '../../../assets/table';
import { Marathon } from '../../../model/marathon';

interface HomepageListData {
  key: keyof HomepageMetadata;
  label: string;
  timeTranslationKey: string[];
  timeTranslationValue: (keyof Marathon)[];
  headerClass: string;
}

@Component({
    selector: 'app-homepage-marathons',
    templateUrl: './marathons.component.html',
    styleUrls: ['./marathons.component.scss'],
    standalone: false
})
export class MarathonsComponent {

  @Input() homepageMarathons: HomepageMetadata;

  marathonsLists: HomepageListData[] = [
    {
      key: 'live',
      label: 'homepage.marathons.live',
      timeTranslationKey: ['homepage.ends'],
      timeTranslationValue: ['endDate'],
      headerClass: 'is-3',
    },
    {
      key: 'next',
      label: 'homepage.marathons.upcoming',
      timeTranslationKey: ['homepage.starts'],
      timeTranslationValue: ['startDate'],
      headerClass: 'is-4',
    },
    {
      key: 'open',
      label: 'homepage.marathons.open',
      timeTranslationKey: ['homepage.submissions_close', 'homepage.starts'],
      timeTranslationValue: ['submissionsEndDate', 'startDate'],
      headerClass: 'is-4',
    },
    {
      key: 'moderated',
      label: 'homepage.marathons.moderated',
      timeTranslationKey: ['homepage.starts'],
      timeTranslationValue: ['startDate'],
      headerClass: 'is-4',
    },
  ];

  getRowParity = getRowParity;

  private now = new Date();

  private keyCache: Record<string, Record<number, Date>> = {};

  shouldRenderList(key: keyof HomepageMetadata): boolean {
    return (this.homepageMarathons?.[key]?.length ?? 0) > 0;
  }

  getTranslationData(marathon: Marathon, keys: (keyof Marathon)[]): Record<number, Date> {
    if (keys.length === 1) {
      return {
        0: marathon[keys[0]] as Date
      };
    }

    if (!this.keyCache[marathon.id]) {
      const found = keys.map(key => ({key, date: marathon[key] as Date}))
        .map(({key, date: strDate}) => ({key, date: new Date(strDate)}))
        .filter(({date}) => keys.length === 1 ? date : date && date > this.now)
        .find(item => item.date);

      this.keyCache[marathon.id] = {
        [keys.indexOf(found.key)]: found.date,
      };
    }

    return this.keyCache[marathon.id];
  }

}
