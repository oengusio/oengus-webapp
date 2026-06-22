import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { HomepageMetadata } from '../../../model/homepage-metadata';
import { getRowParity } from '../../../assets/table';
import { Marathon } from '../../../model/marathon';
import { ElementModule } from '../../elements/elements.module';
import { TemporalServiceService } from '../../../services/termporal/temporal-service.service';

interface HomepageListData {
  key: keyof HomepageMetadata;
  label: string;
  timeTranslationKey: string[];
  timeTranslationValue: (keyof Marathon)[];
  headerClass: string;
}

interface TranslationItem {
  index: number;
  date: Temporal.ZonedDateTime;
}

@Component({
    selector: 'app-homepage-marathons',
    templateUrl: './marathons.component.html',
    styleUrls: ['./marathons.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        ElementModule,
    ]
})
export class MarathonsComponent {
  private temporal = inject(TemporalServiceService);

  // @ts-expect-error meh.
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

  private now = this.temporal.now;

  private keyCache: Record<string, TranslationItem> = {};

  shouldRenderList(key: keyof HomepageMetadata): boolean {
    return (this.homepageMarathons?.[key]?.length ?? 0) > 0;
  }

  /*getTranslationData(marathon: Marathon, keys: (keyof Marathon)[]): Record<number, Temporal.ZonedDateTime> {
    if (keys.length === 1) {
      return {
        0: marathon[keys[0]] as Temporal.ZonedDateTime
      };
    }

    if (!this.keyCache[marathon.id]) {
      const found = keys.map(key => ({key, date: marathon[key] as Temporal.ZonedDateTime}))
        .filter(({date}) => keys.length === 1 ? date : date && Temporal.ZonedDateTime.compare(date, this.now) === 1)
        .find(item => item.date) as {
        key: keyof Marathon
        date: Temporal.ZonedDateTime
      };

      this.keyCache[marathon.id] = {
        [keys.indexOf(found.key)]: found.date,
      };
    }

    return this.keyCache[marathon.id];
  }*/

  getTranslationData(marathon: Marathon, keys: (keyof Marathon)[]): TranslationItem {
    if (keys.length === 1) {
      return {
        index: 0,
        date: marathon[keys[0]] as Temporal.ZonedDateTime,
      };
    }

    if (!this.keyCache[marathon.id]) {
      const found = keys.map(key => ({key, date: marathon[key] as Temporal.ZonedDateTime}))
        .filter(({date}) => keys.length === 1 ? date : date && Temporal.ZonedDateTime.compare(date, this.now) === 1)
        .find(item => item.date) as {
        key: keyof Marathon
        date: Temporal.ZonedDateTime
      };

      this.keyCache[marathon.id] = {
        index: keys.indexOf(found.key),
        date: found.date,
      };
    }

    return this.keyCache[marathon.id];
  }

}
