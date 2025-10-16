import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Category } from '../../../../model/category';
import { Marathon } from '../../../../model/marathon';

@Component({
    selector: 'app-submission-category',
    templateUrl: './submission-category.component.html',
    styleUrls: ['./submission-category.component.scss'],
    standalone: false
})
export class SubmissionCategoryComponent implements OnInit, OnDestroy {

  @Input() public category: Category;
  @Input() public marathon: Marathon;
  @Input() public rawStatus: string;
  @Input() public showDelete: boolean;

  @Output() public triggerDelete = new EventEmitter<void>();

  public status: string;

  private statusMap = {
    'VALIDATED': 'is-success',
    'REJECTED': 'is-danger',
    'BACKUP': 'is-primary',
    'BONUS': 'is-info',
  };

  get safeStatus(): string {
    return this.rawStatus || 'TODO';
  }

  get waitingRunnerCount(): number {
    return this.category.expectedRunnerCount - 1 /* subtract the runner themselves from the count */ - this.category.opponents.length;
  }

  ngOnInit() {
    this.status = this.statusMap[this.safeStatus] || '';
  }

  ngOnDestroy(): void {
    this.triggerDelete.unsubscribe();
  }
}
