import { Component, OnInit } from '@angular/core';
import { MarathonSettings } from '../../../model/marathon';
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
import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { UserProfile } from '../../../model/user-profile';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private marathonId: string;
  public settings: MarathonSettings;
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

  defaultSetupTimeHuman: string;

  constructor(
    public marathonService: MarathonService,
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private toastr: NwbAlertService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ settings }) => {
      this.settings = cloneDeep(settings);
      this.marathonId = settings.id;
    });

    this.defaultSetupTimeHuman = DurationService.toHuman(this.settings.defaultSetupTime);
    this.submissionsQuestions = this.questions.filter(q => q.type === 'SUBMISSION');
    this.donationsQuestions = this.questions.filter(q => q.type === 'DONATION');
  }

  async submit(event: SubmitEvent) {
    if (this.loading) {
      return;
    }

    const form = event.target as HTMLFormElement;

    if (!form.reportValidity()) {
      return;
    }

    this.loading = true;
    this.settings.defaultSetupTime = moment.duration(this.defaultSetupTimeHuman).toISOString();
    this.questions = [];
    this.questions = this.questions.concat(this.submissionsQuestions);
    this.questions = this.questions.concat(this.donationsQuestions);


    try {
      await firstValueFrom(this.marathonService.update(this.settings));
      await firstValueFrom(this.marathonService.updateQuestions(this.marathonId, this.questions));


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

  questionTypeChange({questionType, i: index, fieldType }: { questionType: string, i: number, fieldType: string }) {
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

  get title(): string {
    return 'Settings';
  }
}
