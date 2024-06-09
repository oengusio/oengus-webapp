import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import * as vis from 'vis-timeline';
import { DataSet } from 'vis-data';
import { Availability, AvailabilityResponse } from '../../../../model/availability';
import moment from 'moment-timezone';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { TranslateService } from '@ngx-translate/core';
import { ScheduleTableOldElementComponent } from './schedule-table-old-element/schedule-table-old-element.component';

// Options are 'id' and 'content'
const AVAILABILITY_SORT_KEY = 'content';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('scheduleTableComponent') scheduleTable: ScheduleTableComponent | ScheduleTableOldElementComponent;

  scheduleInfo: ScheduleInfo;
  marathonId = '';
  oldSlug = '';
  todoLines: Array<V2ScheduleLine> = [];
  lines: Array<V2ScheduleLine> = [];

  loading = false;
  warningModalActive = false;

  env = environment;

  submissionsLoaded = false;


  public timezone = moment.tz.guess();
  private timeline: vis.Timeline;
  private timebar: vis.IdType;
  public availabilitiesGroups: vis.DataSetDataGroup;
  public availabilitiesItems: vis.DataSetDataItem;
  public availabilitiesSelected = [];
  private availabilitiesSelectedItems = [];
  public allAvailabilities: AvailabilityResponse = {};

  private _hideCompleteUsers = true;

  get hideCompleteUsers() {
    return this._hideCompleteUsers;
  }

  set hideCompleteUsers(val: boolean) {
    localStorage.setItem('hideCompleteUsers', val ? 'true' : 'false');
    this._hideCompleteUsers = val;
  }

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private submissionService: SubmissionService,
    private selectionService: SelectionService,
    private marathonService: MarathonService,
    private toastr: NwbAlertService,
    private translateService: TranslateService
  ) {
    const localItem = localStorage.getItem('hideCompleteUsers');

    if (localItem === null) {
      this.hideCompleteUsers = true;
    }

    this._hideCompleteUsers = localStorage.getItem('hideCompleteUsers') === 'true';

    this.availabilitiesGroups = new DataSet([], {queue: {delay: 1000}});
    this.availabilitiesItems = new DataSet([], {queue: {delay: 1000}});
    this.marathonId = this.route.snapshot.parent.paramMap.get('id');
    this.scheduleInfo = this.route.snapshot.data.scheduleInfo;
    this.oldSlug = this.scheduleInfo.slug;
  }

  async ngOnInit() {
    this.scheduleService.getLines(this.marathonId, this.scheduleInfo.id).subscribe((resp) => {
      this.lines = resp.data;
    });
    await this.loadAllSubmissions();
    await this.loadAllAvailabilities();
    await this.initTimeline();
  }

  ngOnDestroy(): void {
    this.timeline.destroy();
  }

  async initTimeline() {
    // Somehow this delay solves the availabilities not showing.
    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    this.timeline = new vis.Timeline(document.getElementById('timeline'),
      this.availabilitiesItems,
      this.availabilitiesGroups,
      {
        min: moment.tz(this.marathonService.marathon.startDate, this.timezone).subtract(1, 'hours').toDate(),
        max: moment.tz(this.marathonService.marathon.endDate, this.timezone).add(1, 'hours').toDate(),
        orientation: {
          axis: 'both',
          item: 'bottom',
        },
      });
    this.timebar = this.timeline.addCustomTime(this.marathonService.marathon.startDate);
    this.computeSchedule();
  }

  async loadAllSubmissions(): Promise<void> {
    this.submissionsLoaded = false;

    const selections = await firstValueFrom(
      this.selectionService.getAllForMarathonAdmin(this.marathonId, ['VALIDATED', 'BONUS']),
    ).catch(() => new Map());

    // TODO: implement pagination on search endpoint so we can just pass our desired statuses to it
    const filteredSubmissions = await this.submissionService.loadAllSubmissions(
      this.marathonId,
      (page) => page.filter(submission =>
        submission.games.filter(game => game.categories
          .filter(category =>
            Object.keys(selections).includes(category.id.toString()))
          .length > 0).length > 0,
      ),
    );

    const setupTime = this.marathonService.marathon.defaultSetupTime ?? 'PT15M';

    filteredSubmissions.forEach((submission) => {
      submission.games.forEach(game => {
        game.categories
          .filter(category => Object.keys(selections).includes(category.id.toString()))
          // TODO: find a better way of doing this, category ID works but I hate to store it.
          .filter(category => !this.lines.map(line => line.categoryId).includes(category.id))
          .forEach((category) => {
            const runners: LineRunner[] = [{profile: submission.user}];

            category.opponents.forEach((opponent) => {
              runners.push({profile: opponent.user});
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

    if (this.hideCompleteUsers) {
      this.hideAllUsersNotInTodo();
    }

    this.submissionsLoaded = true;
  }

  async submit(): Promise<void> {
    try {
      this.loading = true;
      await firstValueFrom(
        this.scheduleService.updateSchedule(this.marathonId, this.scheduleInfo.id, this.scheduleInfo),
      );

      await firstValueFrom(
        this.scheduleService.updateLines(
          this.marathonId, this.scheduleInfo.id, this.lines,
        )
      );

      this.translateService.get('alert.schedule.save.success').subscribe((res: string) => {
        const alertConfig: NwbAlertConfig = {
          message: res,
          duration: 3000,
          position: 'is-right',
          color: 'is-success'
        };

        this.toastr.open(alertConfig);
      });
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
      next() {
        // Reload the window to see the new changes!
        window.location.reload();
      },

      error: (err: any) => {
        console.log(err);
        const alertConfig: NwbAlertConfig = {
          message: `Something went wrong: ${err.message}`,
          duration: 5000,
          position: 'is-right',
          color: 'is-warning',
        };
        this.toastr.open(alertConfig);
      },
    });
  }

  async loadAllAvailabilities() {
    const allAvailabilities = await firstValueFrom(
      this.submissionService.availabilities(this.marathonId)
    );

    this.allAvailabilities = allAvailabilities;

    const entries = Object.entries<Availability[]>(allAvailabilities)
      .sort((a, b) => a[0].localeCompare(b[0]));

    for (const [username, availabilities] of entries) {
      const contentName = availabilities.length ? availabilities[0].username : username;

      this.availabilitiesGroups.add({
        id: username,
        content: contentName,
      });

      availabilities.forEach((availability, index) => {
        this.availabilitiesItems.add({
          id: username + index,
          group: username,
          start: availability.from,
          end: availability.to,
          content: '',
        });
      });
    }

    this.availabilitiesGroups.flush();
    this.availabilitiesItems.flush();

    // Sort availabilities alphabetically.
    const sortedData = this.availabilitiesGroups.get({ order: AVAILABILITY_SORT_KEY });

    this.availabilitiesGroups.clear();
    this.availabilitiesGroups.add(sortedData);
    this.availabilitiesGroups.flush();
  }

  async loadAvailabilitiesForRunner(userId: number) {
    // TODO: do not load if we have a user in the array already.

    try {
      const availabilities = await firstValueFrom(
        this.submissionService.availabilitiesForUser(this.marathonId, userId),
      );

      this.allAvailabilities = {
        ...this.allAvailabilities,
        ...availabilities,
      };

      for (const [key, value] of Object.entries(availabilities)) {

        // in case of adding a runner that did not submit.
        // TODO: add to empty array either way?
        if (!value.length) {
          continue;
        }

        // data already exists, just ignore
        if (this.availabilitiesGroups.get(key)) {
          continue;
        }

        this.availabilitiesGroups.add({
          id: key,
          content: value[0].username,
        });

        value.forEach((availability, index) => {
          this.availabilitiesItems.add({
            id: key + index,
            group: key,
            start: availability.from,
            end: availability.to,
            content: '',
          });
        });
      }
    } catch (e: any) {
      console.error(e);
    }
  }

  clearSelectedAvailabilities() {
    const toRemove = this.availabilitiesItems.getIds({
      filter: (item) => this.availabilitiesSelected.includes(item.group),
    });
    this.availabilitiesSelected = [];
    this.availabilitiesSelectedItems = this.availabilitiesSelectedItems.filter(el => !toRemove.includes(el));
    this.timeline.setSelection(this.availabilitiesSelectedItems);
  }

  triggerSelectedAvailability(inp: { username: string, on: boolean }) {
    if (inp.on) {
      this.selectAvailabilities(inp.username);
    } else {
      this.unselectAvailabilities(inp.username);
    }
  }

  selectAvailabilities(username: string) {
    this.availabilitiesSelected.push(username);
    this.availabilitiesSelectedItems = [
      ...new Set([
        ...this.availabilitiesSelectedItems,
        ...this.availabilitiesItems.getIds({
          filter: (item) => item.group === username,
        }),
      ]),
    ];
    this.timeline.setSelection(this.availabilitiesSelectedItems);
  }

  unselectAvailabilities(username: string) {
    this.availabilitiesSelected.splice(this.availabilitiesSelected.findIndex(name => name === username), 1);
    const toRemove = this.availabilitiesItems.getIds({
      filter: (item) => item.group === username,
    });
    this.availabilitiesSelectedItems = this.availabilitiesSelectedItems.filter(el => !toRemove.includes(el));
    this.timeline.setSelection(this.availabilitiesSelectedItems);
  }

  addCustomLine(isSetup: boolean): void {
    const customLine: V2ScheduleLine = {
      category: '',
      categoryId: 0,
      console: '',
      customData: '',
      customRun: true,
      date: undefined,
      emulated: false,
      estimate: 'PT0S',
      game: '',
      id: -1,
      position: this.lines.length,
      ratio: '',
      runners: [],
      setupBlock: isSetup,
      setupBlockText: '',
      setupTime: this.marathonService.marathon.defaultSetupTime,
      type: 'OTHER',
    };

    this.lines.push(customLine);

    this.scheduleTable.toggleExpand(this.lines.length - 1, true);

    this.computeSchedule();
  }

  computeSchedule(): void {
    if (!this.lines.length) {
      return;
    }

    this.lines[0].date = this.marathonService.marathon.startDate;
    this.lines[0].position = 0;

    for (let i = 1; i < this.lines.length; i++) {
      const prevEl = this.lines[i - 1];

      this.lines[i].date = moment.tz(prevEl.date, this.timezone)
        .add(moment.duration(prevEl.estimate))
        .add(moment.duration(prevEl.setupTime))
        .toDate();
      this.lines[i].position = i;
    }
    const lastElement = this.lines[this.lines.length - 1];

    if (this.timeline) {
      this.timeline.setCustomTime(moment.tz(lastElement.date, this.timezone)
        .add(moment.duration(lastElement.estimate))
        .add(moment.duration(lastElement.setupTime))
        .toDate(), this.timebar);
    }
  }

  moveToSchedule(index: number): void {
    const run = this.todoLines[index];

    this.lines.push(run);
    this.todoLines.splice(index, 1);
    this.computeSchedule();

    const usernames = run.runners
      .map((runner) => runner.profile ? runner.profile.username : null)
      .filter((runner) => runner);

    this.removeFromTimelineWhenNoMoreRunsTodo(usernames);
  }

  removeScheduleLine(index: number) {
    const run = this.lines[index];

    if (run) {
      this.lines.splice(index, 1);
    }
  }

  moveToTodo(index: number) {
    const run = this.lines[index];

    this.todoLines.push(run);
    this.lines.splice(index, 1);
    this.computeSchedule();

    const usernames = run.runners
      .map((runner) => runner.profile ? runner.profile.username : null)
      .filter((runner) => runner);

    this.addToTimelineWhenRunsInTodo(usernames);
  }

  private removeFromTimelineWhenNoMoreRunsTodo(usernames: string[]) {
    if (!this.hideCompleteUsers) {
      return;
    }

    // We can just remove the group, that will hide the user from the timeline.
    const usernamesInTodo = this.getUsernamesInTodo();
    const filteredUsernames = usernames.filter((username) => !usernamesInTodo.includes(username));

    if (filteredUsernames.length) {
      this.availabilitiesGroups.remove(filteredUsernames);
    }

    this.availabilitiesGroups.flush();
  }

  private addToTimelineWhenRunsInTodo(usernames: string[]) {
    // We're not checking if the feature is on here.
    // The user might enable it mid schedule config, and we should always add the user to the groups.

    // We can just remove the group, that will hide the user from the timeline.
    const usernamesInTodo = this.getUsernamesInTodo();
    const filteredUsernames = usernames
      .filter((username) => usernamesInTodo.includes(username))
      .filter((username) => !this.availabilitiesGroups.get(username));

    if (filteredUsernames.length) {
      this.availabilitiesGroups.add(
        filteredUsernames.map((username) => {
          const av = this.allAvailabilities[username];

          const contentUsername = av.length ? av[0].username : username;

          return {
            id: username,
            content: contentUsername,
          };
        })
      );
    }

    this.availabilitiesGroups.flush();

    const sortedData = this.availabilitiesGroups.get({ order: AVAILABILITY_SORT_KEY });

    this.availabilitiesGroups.clear();
    this.availabilitiesGroups.add(sortedData);
    this.availabilitiesGroups.flush();
  }

  private getUsernamesInTodo(): string[] {
    return [
      ...new Set(
        this.todoLines.map(
          (run) => run.runners
            .map((runner) => runner.profile ? runner.profile.username : null)
            .filter((runner) => runner)
        )
          .flat()
      )
    ];
  }

  private hideAllUsersNotInTodo() {
    this.lines.forEach((run) => {
      const usernames = run.runners
        .map((runner) => runner.profile ? runner.profile.username : null)
        .filter((runner) => runner);

      this.removeFromTimelineWhenNoMoreRunsTodo(usernames);
    });
  }
}
