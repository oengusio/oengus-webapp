import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { DurationService } from '../../../services/duration.service';
import { ScheduleLine, ScheduleRunner } from '../../../model/schedule-line';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MarathonService } from '../../../services/marathon.service';
import moment from 'moment-timezone';
import { ScheduleService } from '../../../services/schedule.service';
import { Schedule } from '../../../model/schedule';
import { NwbEditInPlaceConfig, ReturnedData } from '@wizishop/ng-wizi-bulma';
import { Observable } from 'rxjs';
import { MAX_NAME_LENGTH, User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { Availability } from '../../../model/availability';
import * as vis from 'vis-timeline';
import { SubmissionService } from '../../../services/submission.service';
import { Selection } from '../../../model/selection';
import DOMPurify from 'dompurify';
import { DataSet } from 'vis-data';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss']
})
export class ScheduleManagementComponent implements OnInit {

  public scheduleTodo: ScheduleLine[];
  public schedule: Schedule;
  public loading = false;
  public submissionsLoaded = false;

  public userSearch = {};
  public editMode = {};

  public faBars = faBars;
  public faEdit = faEdit;
  public faTimes = faTimes;
  public faCalendarWeek = faCalendarWeek;
  public faCalendarTimes = faCalendarTimes;
  public faChevronRight = faChevronRight;
  public faChevronLeft = faChevronLeft;
  public faExclamation = faExclamationTriangle;

  public moment = moment;

  public timezone = moment.tz.guess();

  private timeline: vis.Timeline;
  private timebar: vis.IdType;
  private availabilitiesSelectedItems = [];
  public availabilitiesGroups: vis.DataSetDataGroup;
  public availabilitiesItems: vis.DataSetDataItem;
  public availabilitiesSelected = [];
  private allAvailabilities: { [key: string]: Availability[] } = {};

  public showModal = false;
  public buttonLoading = false;

  public durationEditConfig: NwbEditInPlaceConfig = {
    handler: (value) => {
      return new Observable<boolean | ReturnedData>(subscriber => {
        subscriber.next(moment.duration(value).asSeconds() > 0);
        subscriber.complete();
      });
    }
  };

  public setupDurationEditConfig: NwbEditInPlaceConfig = {
    handler: (value) => {
      return new Observable<boolean | ReturnedData>(subscriber => {
        subscriber.next(moment.duration(value).asSeconds() >= 0);
        subscriber.complete();
      });
    }
  };

  public showCustomDataInput = false;
  private _hideCompleteUsers = true;

  get hideCompleteUsers() { return this._hideCompleteUsers; }
  set hideCompleteUsers(val: boolean) {
    localStorage.setItem('hideCompleteUsers', val ? 'true' : 'false');
    this._hideCompleteUsers = val;
  }

  constructor(private route: ActivatedRoute,
              public marathonService: MarathonService,
              private scheduleService: ScheduleService,
              private submissionService: SubmissionService,
              private userService: UserService) {
    const localItem = localStorage.getItem('hideCompleteUsers');

    if (localItem === null) {
      this.hideCompleteUsers = true;
    }

    this._hideCompleteUsers = localStorage.getItem('hideCompleteUsers') === 'true';

    this.availabilitiesGroups = new DataSet([], { queue: { delay: 1000 } });
    this.availabilitiesItems = new DataSet([], { queue: { delay: 1000 } });
    this.allAvailabilities = this.route.snapshot.data.availabilities as { [key: string]: Availability[] };
    const entries = Object.entries<Availability[]>(this.allAvailabilities)
      .sort((a, b) => a[0].localeCompare(b[0]));

    for (const [username, availabilities] of entries) {
      const contentName = availabilities.length ? availabilities[0].username : username;

      this.availabilitiesGroups.add({
        id: username,
        content: contentName
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

    // this.availabilitiesGroups.sort()

    // TODO: lazy load selection.
    const selection = this.route.snapshot.data.selection;
    this.initSchedule(this.route.snapshot.data.schedule);
    this.scheduleTodo = [];
    this.loadSubmissions(selection);
  }

  async loadSubmissions(selection: Map<number, Selection>): Promise<void> {
    this.submissionsLoaded = false;

    const filteredSubmissions = await this.submissionService.loadAllSubmissions(
      this.marathonService.marathon.id,
      (page) => page.filter(submission =>
        submission.games.filter(game => game.categories
          .filter(category =>
            Object.keys(selection).includes(category.id.toString()))
          .length > 0).length > 0
      )
    );

    // TODO: also put this in the transformation?
    filteredSubmissions.forEach(submission => {
      submission.games.forEach(game => {
        game.categories
          .filter(category => Object.keys(selection).includes(category.id.toString()))
          // TODO: find a better way of doing this, category ID works but I hate to store it.
          .filter(category => !this.schedule.lines.map(line => line.categoryId).includes(category.id))
          .forEach(category => {
            const scheduleLine = new ScheduleLine();
            scheduleLine.categoryId = category.id;
            scheduleLine.categoryName = category.name;
            scheduleLine.console = game.console;
            scheduleLine.estimate = category.estimate;
            scheduleLine.estimateHuman = DurationService.toHuman(category.estimate);
            scheduleLine.gameName = game.name;
            scheduleLine.ratio = game.ratio;
            scheduleLine.runners = [{ user: submission.user }];
            category.opponentDtos.forEach(opponent => scheduleLine.runners.push({ user: opponent.user }));
            scheduleLine.setupTime = this.marathonService.marathon.defaultSetupTime;
            scheduleLine.setupTimeHuman = DurationService.toHuman(this.marathonService.marathon.defaultSetupTime);
            scheduleLine.setupBlock = false;
            scheduleLine.type = scheduleLine.runners.length > 1 ? 'RACE' : 'SINGLE';
            this.scheduleTodo.push(scheduleLine);
          });
      });
    });

    // TODO: hide submissions in todo
    if (this.hideCompleteUsers) {
      this.hideAllUsersNotInTodo();
    }

    this.submissionsLoaded = true;
  }

  initSchedule(schedule: Schedule) {
    if (!!schedule) {
      this.schedule = schedule;
    } else {
      this.schedule = new Schedule();
    }
    this.schedule.lines.forEach(line => {
      line.useSetupBlockText = !!line.setupBlockText;
      line.setupTimeHuman = DurationService.toHuman(line.setupTime);
      line.estimateHuman = DurationService.toHuman(line.estimate);
      line.customData = line.customDataDTO;
      // Sorry TS lords
      // @ts-ignore
      line.runners = line.runners.map(runner => runner.id > 0 ? { user: runner } : { runnerName: runner.username });
    });
  }

  async ngOnInit() {
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
          item: 'bottom'
        }
      });
    this.timebar = this.timeline.addCustomTime(this.marathonService.marathon.startDate);
    this.computeSchedule();
  }

  computeSchedule() {
    if (!this.schedule.lines.length) {
      return;
    }
    this.schedule.lines[0].date = this.marathonService.marathon.startDate;
    this.schedule.lines[0].position = 0;
    for (let i = 1; i < this.schedule.lines.length; i++) {
      this.schedule.lines[i].date = moment.tz(this.schedule.lines[i - 1].date, this.timezone)
        .add(moment.duration(this.schedule.lines[i - 1].estimate))
        .add(moment.duration(this.schedule.lines[i - 1].setupTime))
        .toDate();
      this.schedule.lines[i].position = i;
    }
    const lastElement = this.schedule.lines[this.schedule.lines.length - 1];
    if (this.timeline) {
      this.timeline.setCustomTime(moment.tz(lastElement.date, this.timezone)
        .add(moment.duration(lastElement.estimate))
        .add(moment.duration(lastElement.setupTime))
        .toDate(), this.timebar);
    }
  }

  drop(event: CdkDragDrop<ScheduleLine[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.computeSchedule();
  }

  estimateChange(line: ScheduleLine, event: any) {
    line.estimate = moment.duration(event).toISOString();
    this.computeSchedule();
  }

  setupChange(line: ScheduleLine, event: any) {
    line.setupTime = moment.duration(event).toISOString();
    this.computeSchedule();
  }

  submit() {
    this.loading = true;
    this.schedule.lines.forEach(line => {
      if (line.customData) {
        line.customData = line.customData.trim();
      } else {
        line.customData = null;
      }

      if (!line.useSetupBlockText) {
        line.setupBlockText = null;
      }
    });
    this.scheduleService.save(this.marathonService.marathon.id, this.schedule).add(() => {
      this.loading = false;
      this.scheduleService.getAllForMarathon(this.marathonService.marathon.id, true, true).subscribe(response => {
        this.initSchedule(response);
        this.computeSchedule();
        this.marathonService.find(this.marathonService.marathon.id).subscribe(marathon => this.marathonService.marathon = marathon);
      });
    });
  }

  publish() {
    const conf = confirm('HOLD UP!!\nYou are about to PUBLISH this schedule. Are you 420% sure?');

    if (!conf) {
      return;
    }

    this.showModal = true;
    this.buttonLoading = true;

    setTimeout(() => {
      this.buttonLoading = false;
    }, 5000);

  }

  realPublish(): void {
    this.showModal = false;

    this.submit();
    this.marathonService.update({...this.marathonService.marathon, scheduleDone: true}, false);
  }

  onSelectUser(item: User | { username: string; isCustom: true }, line: ScheduleLine) {
    if ('isCustom' in item) {
      line.runners.push({ runnerName: item.username });
    } else if (line.runners.findIndex(runner => 'user' in runner && runner.user.id === item.id) < 0) {
      line.runners.push({ user: item });
      this.getAvailabilitiesForRunner(item.id);
    }

    if (line.runners.length > 1) {
      line.type = 'RACE';
    }

    delete this.userSearch[line.position];
  }

  onSearchUser(val: string, position: number) {
    if (!val || val.length < 3) {
      return;
    }

    this.userService.searchV1(val).subscribe(response => {
      const combinedItems: (User | { username: string; isCustom: true })[] = response;

      combinedItems.push({
        username: val.length > MAX_NAME_LENGTH ? val.substring(0, MAX_NAME_LENGTH) : val,
        isCustom: true
      });

      combinedItems.forEach((item) => {
        item.username = DOMPurify.sanitize(item.username);
      });

      this.userSearch[position] = combinedItems;
    });
  }

  toggleEditMode(position: number): void {
    const oldMode = this.editMode[position];

    if (oldMode) {
      delete this.userSearch[position];
    }

    this.editMode[position] = !oldMode;
  }

  removeUser(index: number, line: ScheduleLine) {
    line.runners.splice(index, 1);
    if (line.runners.length === 1) {
      line.type = 'SINGLE';
    }
  }

  get editInProgress() {
    return Object.values(this.editMode).some(Boolean);
  }

  addLine(isSetup: boolean) {
    const setupBlock = new ScheduleLine();
    setupBlock.setupBlock = isSetup;
    setupBlock.customRun = !isSetup;
    setupBlock.type = 'OTHER';
    setupBlock.position = this.schedule.lines.length;
    setupBlock.setupTime = this.marathonService.marathon.defaultSetupTime;
    setupBlock.setupTimeHuman = DurationService.toHuman(setupBlock.setupTime);
    setupBlock.estimate = moment.duration(0, 'seconds').toISOString();

    this.schedule.lines.push(setupBlock);
    this.computeSchedule();
  }

  removeLine(index: number) {
    this.schedule.lines.splice(index, 1);
    this.computeSchedule();
  }

  moveToSchedule(index: number) {
    const run = this.scheduleTodo[index];

    this.schedule.lines.push(run);
    this.scheduleTodo.splice(index, 1);
    this.computeSchedule();

    const usernames = run.runners
      .map((runner) => 'user' in runner ? runner.user.username : null)
      .filter((runner) => runner);

    this.removeFromTimelineWhenNoMoreRunsTodo(usernames);
  }

  moveToTodo(index: number) {
    const run = this.schedule.lines[index];

    this.scheduleTodo.push(run);
    this.schedule.lines.splice(index, 1);
    this.computeSchedule();

    const usernames = run.runners
      .map((runner) => 'user' in runner ? runner.user.username : null)
      .filter((runner) => runner);

    this.addToTimelineWhenRunsInTodo(usernames);
  }

  private hideAllUsersNotInTodo() {
    this.schedule.lines.forEach((run) => {
      const usernames = run.runners
        .map((runner) => 'user' in runner ? runner.user.username : null)
        .filter((runner) => runner);

      this.removeFromTimelineWhenNoMoreRunsTodo(usernames);
    });
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

    const sortedData = this.availabilitiesGroups.get({ order: 'id' });

    this.availabilitiesGroups.clear();
    this.availabilitiesGroups.add(sortedData);
    this.availabilitiesGroups.flush();
  }

  private getUsernamesInTodo(): string[] {
    return [
      ...new Set(
        this.scheduleTodo.map(
          (run) => run.runners
            .map((runner) => 'user' in runner ? runner.user.username : null)
            .filter((runner) => runner)
        )
          .flat()
      )
    ];
  }

  getRunnerUsername(runner: ScheduleRunner): string {
    if ('user' in runner) {
      const user = runner.user;

      return `${user.displayName} (${user.username})`;
    }

    return runner.runnerName;
  }

  getRunnerRawUsername(runner: ScheduleRunner): string {
    if ('user' in runner) {
      return runner.user.username;
    }

    return runner.runnerName;
  }

  selectAvailabilities(username: string) {
    this.availabilitiesSelected.push(username);
    this.availabilitiesSelectedItems = [...new Set([...this.availabilitiesSelectedItems,
      ...this.availabilitiesItems.getIds({filter: (item) => item.group === username})])];
    this.timeline.setSelection(this.availabilitiesSelectedItems);
  }

  unselectAvailabilities(username: string) {
    this.availabilitiesSelected.splice(this.availabilitiesSelected.findIndex(name => name === username), 1);
    const toRemove = this.availabilitiesItems.getIds({filter: (item) => item.group === username});
    this.availabilitiesSelectedItems = this.availabilitiesSelectedItems.filter(el => !toRemove.includes(el));
    this.timeline.setSelection(this.availabilitiesSelectedItems);
  }

  clearAvailabilities() {
    const toRemove = this.availabilitiesItems.getIds({filter: (item) => this.availabilitiesSelected.includes(item.group)});
    this.availabilitiesSelected = [];
    this.availabilitiesSelectedItems = this.availabilitiesSelectedItems.filter(el => !toRemove.includes(el));
    this.timeline.setSelection(this.availabilitiesSelectedItems);
  }

  getAvailabilitiesForRunner(userId: number) {
    this.submissionService.availabilitiesForUser(this.marathonService.marathon.id, userId).subscribe(response => {
      for (const [key, value] of Object.entries(response)) {
        const availabilityArray = <Availability[]>value;

        // in case of adding a runner that did not submit.
        if (!availabilityArray.length) {
          continue;
        }

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

  matchesAvailabilities(line: ScheduleLine) {
    return line.runners.every(runner => {
      return this.isAvailable(runner, line);
    });
  }

  isAvailable(runner: ScheduleRunner, line: ScheduleLine) {
    if (!('user' in runner)) {
      return true;
    }

    const availabilities = this.route.snapshot.data.availabilities;

    return availabilities[runner.user.username] &&
      availabilities[runner.user.username].some(availability => {
        const startDateAvail = moment.tz(availability.from, this.timezone);
        const endDateAvail = moment.tz(availability.to, this.timezone);
        const startDateRun = moment.tz(line.date, this.timezone);
        const endDateRun = moment.tz(line.date, this.timezone).add(moment.duration(line.estimate));
        return startDateAvail.isSameOrBefore(startDateRun) && endDateAvail.isSameOrAfter(endDateRun);
      });
  }

  get title(): string {
    return 'Manage Schedule';
  }
}
