import { Component, OnInit } from '@angular/core';
import { Marathon } from '../../../model/marathon';
import { MarathonService } from '../../../services/marathon.service';
import { UserService } from '../../../services/user.service';
import { cloneDeep } from 'lodash';
import { DurationService } from '../../../services/duration.service';
import moment from 'moment';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Question } from '../../../model/question';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public marathon: Marathon;
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

  constructor(public marathonService: MarathonService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.marathon = cloneDeep(this.marathonService.marathon);
    this.marathon.defaultSetupTimeHuman = DurationService.toHuman(this.marathon.defaultSetupTime);
    this.submissionsQuestions = this.marathon.questions.filter(q => q.questionType === 'SUBMISSION');
    this.donationsQuestions = this.marathon.questions.filter(q => q.questionType === 'DONATION');
  }

  submit(event: SubmitEvent) {
    const form = event.target as HTMLFormElement;

    if (!form.reportValidity()) {
      return;
    }

    this.loading = true;
    this.marathon.defaultSetupTime = moment.duration(this.marathon.defaultSetupTimeHuman).toISOString();
    this.marathon.questions = [];
    this.marathon.questions = this.marathon.questions.concat(this.submissionsQuestions);
    this.marathon.questions = this.marathon.questions.concat(this.donationsQuestions);
    this.marathonService.update(this.marathon).add(() => {
      // re-fetch marathon
      this.marathonService.find(this.marathon.id).subscribe((marathon) => {
        this.marathonService.marathon = marathon;
        this.loading = false;
      });
    });
  }

  settingsComponentUpdated(isValid: boolean): void {
    this.settingsValid = isValid;
  }

  addQuestion({ questionType }: { questionType: string }) {
    const question = new Question(questionType);
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
