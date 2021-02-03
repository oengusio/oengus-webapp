import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../../model/category';
import {Marathon} from '../../../../model/marathon';
import { faFilm, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-submission-category',
  templateUrl: './submission-category.component.html'
})
export class SubmissionCategoryComponent implements OnInit {

  @Input() public category: Category;
  @Input() public marathon: Marathon;
  @Input() public rawStatus: string;
  @Input() public showDelete: boolean;

  @Output() public triggerDelete: EventEmitter<any> = new EventEmitter();

  public faFilm = faFilm;
  public faTimes = faTimes;
  public status: string;

  private statusMap = {
    'VALIDATED': 'is-success',
    'REJECTED': 'is-danger',
    'BACKUP': 'is-primary',
    'BONUS': 'is-info',
  };

  constructor() { }

  ngOnInit() {
    this.status = this.statusMap[this.rawStatus] || '';
  }
}
