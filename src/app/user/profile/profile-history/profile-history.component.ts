import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { UserProfile } from '../../../../model/user-profile';
import { ActivatedRoute, Params } from '@angular/router';
import { HistoryMarathon, SavedGame, UserProfileHistory } from '../../../../model/user-profile-history';
import { UserService } from '../../../../services/user.service';
import { SubmissionComponent } from './submission/submission.component';
import { ModeratedComponent } from './moderated/moderated.component';
import { SavedGamesComponent } from './saved-games/saved-games.component';
import { LoadingIndicatorComponent } from '../../../elements/loading-indicator/loading-indicator.component';

@Component({
    selector: 'app-profile-history',
    templateUrl: './profile-history.component.html',
    styleUrls: ['./profile-history.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        SubmissionComponent,
        ModeratedComponent,
        SavedGamesComponent,
        LoadingIndicatorComponent,
    ]
})
export class ProfileHistoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  @Input() user: UserProfile;

  tabQuery = 'user-history';
  submissionTab = 'submission';
  moderationTab = 'moderation';
  savedSpeedrunsTab = 'saved';

  submissionHistory: UserProfileHistory[] = [];
  moderationHistory: HistoryMarathon[] = [];
  savedGames: SavedGame[] = [];

  fetched = {
    submission: false,
    moderation: false,
    savedGames: false,
  };

  loading = true;

  currentQuery: Params = {};

  ngOnInit(): void {
    this.route.queryParams.subscribe((newParams) => {
      this.currentQuery = newParams;
      this.fetchNewData();
    });
  }

  private fetchNewData(): void {
    switch (this.activeTab) {
      case this.submissionTab:
      default:
        this.fetchSubmissions();
        break;
      case this.moderationTab:
        this.fetchModeration();
        break;
      case this.savedSpeedrunsTab:
        this.fetchSavedGames();
        break;
    }
  }

  public resetTabs(): void {
    this.fetched.submission = false;
    this.fetched.moderation = false;
    this.fetched.savedGames = false;

    this.submissionHistory = [];
    this.moderationHistory = [];
    this.savedGames = [];

    this.fetchNewData();
  }

  private fetchSubmissions() {
    if (!this.fetched.submission) {
      this.loading = true;
      this.userService.getSubmissionHistory(this.user.id).subscribe((history) => {
        this.submissionHistory = history.data;
        this.fetched.submission = true;
        this.loading = false;
      });
    }
  }

  private fetchModeration() {
    if (!this.fetched.moderation) {
      this.loading = true;
      this.userService.getModerationHistory(this.user.id).subscribe((history) => {
        this.moderationHistory = history.data;
        this.fetched.moderation = true;
        this.loading = false;
      });
    }
  }

  private fetchSavedGames() {
    // Ignore if we don't want saved games.
    if (!this.user.savedGamesPublic) {
      this.fetched.savedGames = true;
      this.loading = false;
      return;
    }

    if (!this.fetched.savedGames) {
      this.loading = true;

      this.userService.getSavedGamesList(this.user.id).subscribe((savedGames) => {
        this.savedGames = savedGames.data;
        this.fetched.savedGames = true;
        this.loading = false;
      });
    }
  }

  get activeTab(): string|(string|null)[] {
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
