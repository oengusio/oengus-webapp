import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {Category} from '../../../../model/category';
import {Marathon} from '../../../../model/marathon';
import { faFilm, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ElementTemporalDurationComponent } from '../../../elements/temporal/element-temporal-duration/element-temporal-duration.component';
import { OengusCommonModule } from '../../../oengus-common/oengus-common.module';
import { UserLinkComponent } from '../../../elements/user-link/user-link.component';
import { SimpleMdComponent } from '../../../components/simple-md/simple-md.component';

@Component({
    selector: 'app-submission-category',
    templateUrl: './submission-category.component.html',
    styleUrls: ['./submission-category.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
        ElementTemporalDurationComponent,
        OengusCommonModule,
        UserLinkComponent,
        SimpleMdComponent,
    ]
})
export class SubmissionCategoryComponent implements OnInit, OnDestroy {

  @Input() public category: Category;
  @Input() public marathon: Marathon;
  @Input() public rawStatus: string;
  @Input() public showDelete: boolean;

  @Output() public triggerDelete = new EventEmitter<void>();

  public faFilm = faFilm;
  public faTimes = faTimes;
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
