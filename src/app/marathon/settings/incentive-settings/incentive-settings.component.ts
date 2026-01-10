import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NwbSwitchModule } from '@oengus/ng-wizi-bulma';
import { Marathon } from '../../../../model/marathon';
import { Question } from '../../../../model/question';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-marathon-incentive-settings',
    templateUrl: './incentive-settings.component.html',
    styleUrls: ['./incentive-settings.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        DragDropModule,
        FontAwesomeModule,
        NwbSwitchModule,
    ]
})
export class IncentiveSettingsComponent {
  @Input() public marathon: Marathon;
  @Input() public donationsQuestions: Question[];
  @Input() public disabled: boolean;

  public env = environment;
  public donationsDisabled = environment.donationsDisabled;

  @Output() public stateUpdate = new EventEmitter<boolean>();
  @Output() public questionTypeChange = new EventEmitter<{ questionType: 'DONATION', i: number, fieldType: string }>();
  @Output() public addOption = new EventEmitter<{ questionType: 'DONATION', i: number }>();
  @Output() public removeOption = new EventEmitter<{ questionType: 'DONATION', i: number, j: number }>();
  @Output() public addQuestion = new EventEmitter<{ questionType: 'DONATION' }>();
  @Output() public removeQuestion = new EventEmitter<{ questionType: 'DONATION', i: number }>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public drop = new EventEmitter<CdkDragDrop<Question[]>>();

  public faTimes = faTimes;
  public faPlus = faPlus;
  public faBars = faBars;
}
