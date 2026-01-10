import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NwbSwitchModule } from '@oengus/ng-wizi-bulma';
import { MarathonSettingsWithHelpfulProps } from '../../../model/marathon';
import { MarathonService } from '../../../services/marathon.service';
import { UserService } from '../../../services/user.service';
import { cloneDeep } from 'lodash';
import { DurationService } from '../../../services/duration.service';
import moment from 'moment';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Question } from '../../../model/question';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NwbAlertConfig, NwbAlertService } from '@oengus/ng-wizi-bulma';
import { UserProfile } from '../../../model/user-profile';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { DiscordSettingsComponent } from './discord-settings/discord-settings.component';
import { SubmissionSettingsComponent } from './submission-settings/submission-settings.component';
import { IncentiveSettingsComponent } from './incentive-settings/incentive-settings.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        FontAwesomeModule,
        NwbSwitchModule,
        GeneralSettingsComponent,
        DiscordSettingsComponent,
        SubmissionSettingsComponent,
        IncentiveSettingsComponent,
    ]
})
export class SettingsComponent implements OnInit {
  marathonService = inject(MarathonService);
  userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private translateService = inject(TranslateService);
  private toastr = inject(NwbAlertService);


  private marathonId: string;
  public settings: MarathonSettingsWithHelpfulProps;
  public questions: Question[];
  public moderators: UserProfile[] = [];
  public loading = false;

  public active = 'general';

  public deleteConfirm = false;
  public updateStartTime = false;
  public deleteShortname: string;

  public faTimes = faTimes;
  public faPlus = faPlus;

  public submissionsQuestions: Question[];
  public donationsQuestions: Question[];

  public settingsValid = true;

  readonly title = 'Settings';

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ settings, questions, moderators }) => {
      this.settings = cloneDeep(settings);
      this.marathonId = settings.id;

      this.settings.defaultSetupTimeHuman = DurationService.toHuman(this.settings.defaultSetupTime);

      this.questions = questions;

      this.submissionsQuestions = this.questions.filter(q => q.type === 'SUBMISSION');
      this.donationsQuestions = this.questions.filter(q => q.type === 'DONATION');

      this.moderators = moderators;
    });
  }

  async submit(event: SubmitEvent) {
    if (this.loading) {
      return;
    }

    const form = event.target as HTMLFormElement;

    if (!form.reportValidity()) {
      return;
    }

    if (this.settings.webhook?.toLowerCase().includes('discord')) {
      alert('Discord is not compatible with Oengus webhooks.');
      return;
    }

    this.loading = true;
    this.settings.defaultSetupTime = moment.duration(this.settings.defaultSetupTimeHuman).toISOString();

    this.questions = [];
    this.questions = this.questions.concat(this.submissionsQuestions);
    this.questions = this.questions.concat(this.donationsQuestions);

    try {
      const updatedSettings = await firstValueFrom(this.marathonService.updateSettings(this.settings));
      await firstValueFrom(this.marathonService.updateQuestions(this.marathonId, this.questions));

      if (this.userService.user.id === this.marathonService.marathon.creator.id) {
        await firstValueFrom(this.marathonService.updateModerators(this.marathonId, this.moderators.map(it => it.id)));
      }

      this.marathonService.marathon = {
        ...this.marathonService.marathon,
        ...updatedSettings,
      };

      this.translateService.get('alert.marathon.update.success').subscribe((res: string) => {
        const alertConfig: NwbAlertConfig = {
          message: res,
          duration: 3000,
          position: 'is-right',
          color: 'is-success'
        };

        return this.toastr.open(alertConfig);
      });
    } catch (e) {
      this.translateService.get('alert.marathon.update.error').subscribe((res: string) => {
        const alertConfig: NwbAlertConfig = {
          message: `${res}\n${e.message}`,
          duration: 3000,
          position: 'is-right',
          color: 'is-warning'
        };

        return this.toastr.open(alertConfig);
      });
    } finally {
      this.loading = false;
    }
  }

  settingsComponentUpdated(isValid: boolean): void {
    this.settingsValid = isValid;
  }

  addQuestion({ questionType }: { questionType: string }) {
    const question: Question = {
      description: '', fieldType: '', id: 0, label: '', options: [], position: 0, required: false, type: questionType
    };
    if (questionType === 'SUBMISSION') {
      question.position = this.submissionsQuestions.length;
      this.submissionsQuestions.push(question);
    }
    if (questionType === 'DONATION') {
      question.position = this.donationsQuestions.length;
      this.donationsQuestions.push(question);
    }
    this.computeQuestionsPositions();
  }

  questionTypeChange({questionType, i: index }: { questionType: string, i: number, fieldType: string }) {
    if (questionType === 'SUBMISSION') {
      if (this.submissionsQuestions[index].fieldType === 'FREETEXT') {
        this.submissionsQuestions[index].required = false;
      }
    }
    if (questionType === 'DONATION') {
      if (this.donationsQuestions[index].fieldType === 'FREETEXT') {
        this.donationsQuestions[index].required = false;
      }
    }
  }

  computeQuestionsPositions() {
    for (let i = 0; i < this.donationsQuestions.length; i++) {
      this.donationsQuestions[i].position = i;
    }
    for (let j = 0; j < this.submissionsQuestions.length; j++) {
      this.submissionsQuestions[j].position = j;
    }
  }

  removeQuestion({ questionType, i }: { questionType: string, i: number }) {
    if (questionType === 'SUBMISSION') {
      this.submissionsQuestions.splice(i, 1);
    }
    if (questionType === 'DONATION') {
      this.donationsQuestions.splice(i, 1);
    }
    this.computeQuestionsPositions();
  }

  addOption({ questionType, i }: { questionType: string, i: number }) {
    if (questionType === 'SUBMISSION') {
      this.submissionsQuestions[i].options.push('');
    }
    if (questionType === 'DONATION') {
      this.donationsQuestions[i].options.push('');
    }
  }

  removeOption({ questionType, i, j }: { questionType: string, i: number, j: number }) {
    if (questionType === 'DONATION') {
      this.donationsQuestions[i].options.splice(j, 1);
    }
  }

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.computeQuestionsPositions();
  }
}
