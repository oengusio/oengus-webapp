import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { Question } from '../../../../model/question';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-marathon-incentive-settings',
    templateUrl: './incentive-settings.component.html',
    styleUrls: ['./incentive-settings.component.scss'],
    standalone: false
})
export class IncentiveSettingsComponent implements OnInit {
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
  @Output() public drop = new EventEmitter<CdkDragDrop<Question[]>>();

  public faTimes = faTimes;
  public faPlus = faPlus;
  public faBars = faBars;

  constructor() { }

  ngOnInit(): void {
  }


  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
