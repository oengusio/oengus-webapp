import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../../../../model/user-profile';
import { ActivatedRoute, Params } from '@angular/router';
import { HistoryMarathon, UserProfileHistory } from '../../../../model/user-profile-history';
import { UserService } from '../../../../services/user.service';

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

  submissionHistory: UserProfileHistory[] = [];
  moderationHistory: HistoryMarathon[] = [];

  fetched = {
    submission: false,
    moderation: false,
  };

  currentQuery: Params = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((newParams) => {
      this.currentQuery = newParams;
      this.fetchNewData();
    });
  }

  private fetchNewData(): void {
    if (this.activeTab === this.submissionTab) {
      if (!this.fetched.submission) {
        this.userService.getSubmissionHistory(this.user.id).subscribe((history) => {
          this.submissionHistory = history.data;
          this.fetched.submission = true;
        });
      }
    } else if (this.activeTab === this.moderationTab) {
      if (!this.fetched.moderation) {
        this.userService.getModerationHistory(this.user.id).subscribe((history) => {
          this.moderationHistory = history.data;
          this.fetched.moderation = true;
        });
      }
    }
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
