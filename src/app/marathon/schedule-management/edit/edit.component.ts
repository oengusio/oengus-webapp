import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleInfo } from '../../../../model/schedule';
import { environment } from '../../../../environments/environment';
import { ScheduleService } from '../../../../services/schedule.service';
import { firstValueFrom } from 'rxjs';
import { LineRunner, V2ScheduleLine } from '../../../../model/schedule-line';
import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { SubmissionService } from '../../../../services/submission.service';
import { SelectionService } from '../../../../services/selection.service';
import { MarathonService } from '../../../../services/marathon.service';
import {
  faBars,
  faCalendarTimes,
  faCalendarWeek,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faExclamationTriangle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public iconBars = faBars;
  public iconEdit = faEdit;
  public iconTimes = faTimes;
  public iconCalendarWeek = faCalendarWeek;
  public iconCalendarTimes = faCalendarTimes;
  public iconChevronRight = faChevronRight;
  public iconChevronLeft = faChevronLeft;
  public iconExclamation = faExclamationTriangle;

  scheduleInfo: ScheduleInfo;
  marathonId = '';
  oldSlug = '';
  todoLines: Array<V2ScheduleLine> = [];
  lines: Array<V2ScheduleLine> = [];

  loading = false;
  warningModalActive = false;

  env = environment;

  submissionsLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private submissionService: SubmissionService,
    private selectionService: SelectionService,
    private marathonService: MarathonService,
    private toastr: NwbAlertService,
  ) {
    this.marathonId = this.route.snapshot.parent.paramMap.get('id');
    this.scheduleInfo = this.route.snapshot.data.scheduleInfo;
    this.oldSlug = this.scheduleInfo.slug;
  }

  ngOnInit(): void {
    // the service has updateLines() for updating the lines.
    this.scheduleService.getLines(this.marathonId, this.scheduleInfo.id).subscribe((resp) => {
      this.lines = resp.data;
    });
    this.loadAllSubmissions();
  }

  async loadAllSubmissions(): Promise<void> {
    this.submissionsLoaded = false;

    const selections = await firstValueFrom(
      this.selectionService.getAllForMarathonAdmin(this.marathonId, ['VALIDATED', 'BONUS'])
    ).catch(() => new Map());

    // TODO: implement pagination on search endpoint so we can just pass our desired statuses to it
    const filteredSubmissions = await this.submissionService.loadAllSubmissions(
      this.marathonId,
      (page) => page.filter(submission =>
        submission.games.filter(game => game.categories
          .filter(category =>
            Object.keys(selections).includes(category.id.toString()))
          .length > 0).length > 0
      )
    );

    const setupTime = this.marathonService.marathon.defaultSetupTime ?? 'PT15M';

    filteredSubmissions.forEach((submission) => {
      submission.games.forEach(game => {
        game.categories
          .filter(category => Object.keys(selections).includes(category.id.toString()))
          // TODO: find a better way of doing this, category ID works but I hate to store it.
          .filter(category => !this.lines.map(line => line.categoryId).includes(category.id))
          .forEach((category) => {
            const runners: LineRunner[] = [{ profile: submission.user }];

            category.opponents.forEach((opponent) => {
              runners.push({ profile: opponent.user });
            });

            this.todoLines.push({
              id: -1,
              game: game.name,
              console: game.console,
              emulated: game.emulated,
              ratio: game.ratio,
              type: runners.length > 1 ? 'RACE' : 'SINGLE',
              runners,
              category: category.name,
              estimate: category.estimate,
              setupTime: setupTime,
              position: -1,
              customRun: false,
              setupBlock: false,
              setupBlockText: '',
              customData: '',
              date: new Date(),
              categoryId: category.id,
            });
          });
      });
    });

    this.submissionsLoaded = true;
  }

  async submit(): Promise<void> {
    try {
      this.loading = true;
      await firstValueFrom(
        this.scheduleService.updateSchedule(this.marathonId, this.scheduleInfo.id, this.scheduleInfo)
      );
    } catch (e: any) {
      console.log(e);
      alert(`Something broke: ${e.message}`);
    } finally {
      this.loading = false;
    }
  }

  handlePublishCallback(didConfirm: boolean): void {
    this.warningModalActive = false;

    if (didConfirm) {
      this.publish();
    }
  }

  async publish(): Promise<void> {
    this.loading = true;

    this.scheduleService.publish(this.marathonId, this.scheduleInfo.id).subscribe({
      next () {
        // Reload the window to see the new changes!
        window.location.reload();
      },

      error: (err: any) => {
        console.log(err);
        const alertConfig: NwbAlertConfig = {
          message: `Something went wrong: ${err.message}`,
          duration: 5000,
          position: 'is-right',
          color: 'is-warning'
        };
        this.toastr.open(alertConfig);
      },
    });
  }

  computeSchedule(): void {
    // TODO
  }

  moveToSchedule(index: number): void {
    const run = this.todoLines[index];

    this.lines.push(run);
    this.todoLines.splice(index, 1);
    this.computeSchedule();
  }

  moveToTodo(index: number) {
    const run = this.lines[index];

    this.todoLines.push(run);
    this.lines.splice(index, 1);
    this.computeSchedule();
  }
}
