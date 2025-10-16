import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MarathonService } from '../../../../services/marathon.service';
import { MarathonSettings } from '../../../../model/marathon';
import { Question } from '../../../../model/question';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-marathon-submission-settings',
    templateUrl: './submission-settings.component.html',
    styleUrls: ['./submission-settings.component.scss'],
    standalone: false
})
export class SubmissionSettingsComponent {
  marathonService = inject(MarathonService);

  @Input() public settings: MarathonSettings;
  @Input() public submissionsQuestions: Question[];
  @Input() public disabled: boolean;

  @Output() public stateUpdate = new EventEmitter<boolean>();
  @Output() public questionTypeChange = new EventEmitter<{ questionType: 'SUBMISSION', i: number, fieldType: string }>();
  @Output() public addOption = new EventEmitter<{ questionType: 'SUBMISSION', i: number }>();
  @Output() public removeOption = new EventEmitter<{ questionType: 'SUBMISSION', i: number, j: number }>();
  @Output() public addQuestion = new EventEmitter<{ questionType: 'SUBMISSION' }>();
  @Output() public removeQuestion = new EventEmitter<{ questionType: 'SUBMISSION', i: number }>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public drop = new EventEmitter<CdkDragDrop<Question[]>>();

  public botInvite = 'https://discord.com/oauth2/authorize?client_id=559625844197163008&permissions=68608&scope=bot';

  public loadingDiscordCheck = false;

  checkDiscordStatus() {
    if (!this.settings.discordRequired) {
      this.settings.discordGuildId = null;
      this.settings.discordGuildName = null;
      return;
    }

    if (this.settings.discord) {
      this.loadingDiscordCheck = true;
      this.marathonService.fetchDiscordInfo(this.settings)
        .subscribe(({ id, name }) => {
          this.settings.discordGuildId = id;
          this.settings.discordGuildName = name;
        })
        .add(() => this.loadingDiscordCheck = false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitsOpenChanged(event: any): void {
    const now = new Date();
    const closeDate = new Date(this.settings.submissionsEndDate);

    if (!this.settings.submissionsOpen && (Boolean(this.settings.submissionsEndDate) && now > closeDate)) {
      const conf = confirm('Re-opening the submissions will clear the automatic open and close times, do you want to continue?');

      if (conf) {
        this.settings.submissionsEndDate = null;
        this.settings.submissionsStartDate = null;
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
}
