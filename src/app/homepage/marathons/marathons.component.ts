import { Component, Input, OnInit } from '@angular/core';
import { HomepageMetadata } from '../../../model/homepage-metadata';

@Component({
  selector: 'app-homepage-marathons',
  templateUrl: './marathons.component.html',
  styleUrls: ['./marathons.component.scss']
})
export class MarathonsComponent implements OnInit {

  @Input() homepageMarathons: HomepageMetadata;

  marathonsLists = [
    {
      key: 'live',
      label: 'homepage.marathons.live',
      timeTranslationKey: 'homepage.ends',
      timeTranslationValue: [ 'endDate' ],
      headerClass: 'is-3',
    },
    {
      key: 'next',
      label: 'homepage.marathons.upcoming',
      timeTranslationKey: 'homepage.starts',
      timeTranslationValue: [ 'startDate' ],
      headerClass: 'is-4',
    },
    {
      key: 'open',
      label: 'homepage.marathons.open',
      timeTranslationKey: 'homepage.submissions_close',
      timeTranslationValue: [ 'submissionsEndDate', 'startDate' ],
      headerClass: 'is-4',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
