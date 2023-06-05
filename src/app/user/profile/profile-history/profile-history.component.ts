import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../../../../model/user-profile';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile-history',
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.scss']
})
export class ProfileHistoryComponent implements OnInit {
  @Input() user: UserProfile;

  tabQuery = 'user-history';
  submissionTab = 'submission';
  moderationTab = 'moderation';

  currentQuery: Params = {};

  constructor(private route: ActivatedRoute) {
    route.queryParams.subscribe((newParams) => {
      this.currentQuery = newParams;
    });
  }

  ngOnInit(): void {
  }

  get activeTab(): string|Array<string|null> {
    return this.currentQuery[this.tabQuery] ?? this.submissionTab;
  }

  isActiveClass(tabName: string) {
    return {
      'is-active': this.activeTab === tabName,
    };
  }

  isActive(tabName: string): boolean {
    return this.activeTab === tabName;
  }

  queryFor(tab: string): Params {
    return { ...this.currentQuery, [this.tabQuery]: tab };
  }

}
