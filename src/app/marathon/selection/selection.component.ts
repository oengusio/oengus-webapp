import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionService } from '../../../services/selection.service';
import { MarathonService } from '../../../services/marathon.service';
import { DurationService } from '../../../services/duration.service';
import moment from 'moment-timezone';
import { Selection } from '../../../model/selection';
import { Availability } from '../../../model/availability';
import * as vis from 'vis-timeline';
import { DataSet } from 'vis-data';
import { SubmissionService } from '../../../services/submission.service';
import { Submission } from '../../../model/submission';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.scss'],
    standalone: false
})
export class SelectionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private selectionService = inject(SelectionService);
  private submissionService = inject(SubmissionService);
  private marathonService = inject(MarathonService);


  public submissionsLoaded = false;
  public submissions: Submission[] = [];
  public selection: Record<string, Selection>;
  public loading = false;

  @ViewChild('timeline', {static: false}) timeline: ElementRef;
  public availabilitiesGroups: vis.DataSetDataGroup;
  public availabilitiesItems: vis.DataSetDataItem;

  public availabilitiesSelected = [];

  private timezone = moment.tz.guess();
  readonly title = 'Select Runs';

  constructor() {
    this.availabilitiesGroups = new DataSet([]);
    this.availabilitiesItems = new DataSet([]);
    this.selection = this.route.snapshot.data.selection;
    this.loadSubmissions();
  }

  async loadSubmissions(): Promise<void> {
    this.submissionsLoaded = false;
    this.submissions = await this.submissionService.loadAllSubmissions(this.marathonService.marathon.id, (submissions) => {
      submissions.forEach(submission => {
        submission.games.forEach(game => {
          game.categories.forEach(category => {
            category.estimateHuman = DurationService.toHuman(category.estimate);
            if (!Object.keys(this.selection).includes(category.id.toString())) {
              const selection = new Selection();
              selection.status = 'TODO';
              selection.categoryId = category.id;
              this.selection[category.id] = selection;
            }
          });
        });
      });

      return submissions;
    });
    this.submissionsLoaded = true;
  }

  async loadSelection(): Promise<void> {
    // @ts-expect-error SHUT UP
    this.selection = await firstValueFrom(this.selectionService.getAllForMarathonAdmin(
      this.route.snapshot.parent.paramMap.get('id'),
      this.route.snapshot.data['statuses'])
    )
      .catch(() => new Map());
  }

  async ngOnInit() {
    // Somehow this delay solves the availabilities not showing.
    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const timeline = new vis.Timeline(document.getElementById('timeline'),
      this.availabilitiesItems,
      this.availabilitiesGroups,
      {
        min: moment.tz(this.marathonService.marathon.startDate, this.timezone).subtract(1, 'hours').toDate(),
        max: moment.tz(this.marathonService.marathon.endDate, this.timezone).add(1, 'hours').toDate()
      });
  }

  getSelectColor(value: string) {
    switch (value) {
      case 'TODO':
        return 'is-warning';
      case 'REJECTED':
        return 'is-danger';
      case 'BONUS':
        return 'is-info';
      case 'BACKUP':
        return 'is-primary';
      case 'VALIDATED':
        return 'is-success';
    }
  }

  submit() {
    this.loading = true;
    this.selectionService.save(this.marathonService.marathon.id, Object.values(this.selection)).add(() => {
      // Reload the selections so we have their ids to update.
      this.loadSelection().then(() => {
        this.loading = false;
      });
    });
  }

  getNumberOfRuns() {
    return Object.keys(this.selection).length;
  }

  getNumberOfRunners() {
    const runners = [];
    this.submissions.forEach(submission => {
      if (!runners.includes(submission.user.id)) {
        runners.push(submission.user.id);
      }
    });
    return runners.length;
  }

  getTotalTime() {
    const duration = moment.duration(0);
    this.submissions.forEach(submission => {
      submission.games.forEach(game => {
        game.categories.forEach(category => {
          duration.add(category.estimate);
        });
      });
    });

    return DurationService.toHuman(duration.toISOString());
  }

  getAverageTime() {
    const numberOfRuns = this.getNumberOfRuns();
    if (numberOfRuns === 0) {
      return '0:00:00';
    }

    const duration = moment.duration(0);
    this.submissions.forEach(submission => {
      submission.games.forEach(game => {
        game.categories.forEach(category => {
          duration.add(category.estimate);
        });
      });
    });

    const averageDuration = moment.duration(duration.asMilliseconds() / numberOfRuns);
    return DurationService.toHuman(averageDuration.toISOString());
  }

  getMarathonLength() {
    const end = moment(this.marathonService.marathon.endDate).tz(this.timezone).seconds(0);
    const start = moment(this.marathonService.marathon.startDate).tz(this.timezone).seconds(0);
    const diff = moment.duration(end.diff(start));
    return DurationService.toHuman(diff.toISOString());
  }

  getDefaultSetupTime() {
    return DurationService.toHuman(this.marathonService.marathon.defaultSetupTime);
  }

  getValidatedRunsTime() {
    const duration = moment.duration(0);
    this.submissions.forEach(submission => {
      submission.games.forEach(game => {
        game.categories.forEach(category => {
          if (this.selection[category.id].status === 'VALIDATED') {
            duration.add(category.estimate);
            duration.add(moment.duration(this.marathonService.marathon.defaultSetupTime));
          }
        });
      });
    });
    if (duration.asMilliseconds() > 0) {
      duration.subtract(moment.duration(this.marathonService.marathon.defaultSetupTime));
    }
    return DurationService.toHuman(duration.toISOString());
  }

  setTodoToDeclined(): void {
       for (const catId in this.selection) {
      if (this.selection[catId].status === 'TODO') {
        this.selection[catId].status = 'REJECTED';
      }
    }
  }

  canPublish() {
    return !Object.values(this.selection).find((value: Selection) => value.status === 'TODO');
  }

  publish() {
    const conf = confirm('HOLD UP!!\nYou are about to PUBLISH this selection. Are you 200% sure?');

    if (!conf) {
      return;
    }

    this.loading = true;
    this.selectionService.save(this.marathonService.marathon.id, Object.values(this.selection)).add(() => {
      this.marathonService.publishSelection(this.marathonService.marathon).add(() => {
        this.loading = false;
      });
    });
  }

  getAvailabilitiesForRunner(userId: number) {
    this.submissionService.availabilitiesForUser(this.marathonService.marathon.id, userId).subscribe(response => {
      for (const [key, value] of Object.entries(response)) {
        const availabilityArray = value as Availability[];
        this.availabilitiesSelected.push(key);
        this.availabilitiesGroups.add({
          id: key,
          content: availabilityArray[0].username
        });
        availabilityArray.forEach((availability, index) => {
          this.availabilitiesItems.add({
            id: key + index,
            group: key,
            start: availability.from,
            end: availability.to,
            content: ''
          });
        });
      }
    });
  }

  removeAvailabilitiesForRunner(username: string) {
    this.availabilitiesGroups.remove(username);
    this.availabilitiesItems.remove(this.availabilitiesItems.getIds({filter: (item) => item.group === username}));
    this.availabilitiesSelected.splice(this.availabilitiesSelected.findIndex(name => name === username), 1);
  }

  clearAvailabilities() {
    this.availabilitiesSelected.forEach(username => {
      this.availabilitiesGroups.remove(username);
      this.availabilitiesItems.remove(this.availabilitiesItems.getIds({filter: (item) => item.group === username}));
    });
    this.availabilitiesSelected = [];
  }

  get marathonId() {
    return this.marathonService.marathon.id.toLowerCase();
  }
}
