import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { V2ScheduleLine } from '../../../../../../model/schedule-line';
import { DurationService } from '../../../../../../services/duration.service';
import moment from 'moment-timezone';
import { UserProfile } from '../../../../../../model/user-profile';
import { MAX_NAME_LENGTH } from '../../../../../../model/user';
import DOMPurify from 'dompurify';
import { UserService } from '../../../../../../services/user.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

type UserSearchType = { username: string; profile: null; isCustom: true} |  { username: string; profile: UserProfile; isCustom: false};

@Component({
    selector: 'app-normal-run-editor',
    templateUrl: './normal-run-editor.component.html',
    styleUrls: ['./normal-run-editor.component.scss'],
    standalone: false
})
export class NormalRunEditorComponent implements OnInit {
  iconTimes = faTimes;
  userSearch: { [key: string]: UserSearchType[] } = {};

  @Input() line: V2ScheduleLine;
  @Input() i: number;
  @Output() loadAvailabilities = new EventEmitter<number>();
  @Output() estimateChanged = new EventEmitter<string>();
  @Output() setupTimeChanged = new EventEmitter<string>();

  @ViewChild('autocompleteComponent') searchBox: AutocompleteComponent;

  setupTimeHuman = '00:00:00';
  estimateHuman = '00:00:00';

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.setupTimeHuman = DurationService.toHuman(this.line.setupTime);
    this.estimateHuman = DurationService.toHuman(this.line.estimate);
  }

  onSetupTimeBlur(): void {
    this.line.setupTime = moment.duration(this.setupTimeHuman).toISOString();
    this.setupTimeChanged.emit(this.line.setupTime);
  }

  onEstimateBlur(): void {
    this.line.estimate = moment.duration(this.estimateHuman).toISOString();
    this.estimateChanged.emit(this.line.estimate);
  }

  removeUser(index: number) {
    this.line.runners.splice(index, 1);
    if (this.line.runners.length === 1) {
      this.line.type = 'SINGLE';
    }

    return false;
  }

  // TODO: types are shit, come up with better ones
  onSelectUser(search: UserSearchType, line: V2ScheduleLine) {
    if (search.isCustom) {
      line.runners.push({ runnerName: search.username });
    } else if (line.runners.findIndex(
      (runner) => runner.profile && runner.profile.id === search.profile.id
    ) < 0) {
      const user = search.profile;

      line.runners.push({ profile: user });
      this.loadAvailabilities.emit(user.id);
    }

    if (line.runners.length > 1) {
      line.type = 'RACE';
    }

    this.searchBox.clear();
    delete this.userSearch[line.position];
  }

  onSearchUser(val: string, position: number) {
    if (!val) {
      this.userSearch[position] = [];
      return;
    }

    if (val.length < 3) {
      return;
    }

    this.userService.searchV1(val).subscribe(response => {
      const combinedItems: UserSearchType[] = response.map((user) => ({
        isCustom: false,
        username: user.username,
        // @ts-ignore
        profile: user as UserProfile,
      }));

      combinedItems.push({
        profile: null,
        username: val.length > MAX_NAME_LENGTH ? val.substring(0, MAX_NAME_LENGTH) : val,
        isCustom: true
      });

      combinedItems.forEach((item) => {
        item.username = DOMPurify.sanitize(item.username);
      });

      this.userSearch[position] = combinedItems;
    });
  }
}
