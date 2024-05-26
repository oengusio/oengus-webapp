import { Component, Input, ViewChild } from '@angular/core';
import { LineRunner, V2ScheduleLine } from '../../../../../../model/schedule-line';
import { DurationService } from '../../../../../../services/duration.service';
import moment from 'moment-timezone';
import { UserProfile } from '../../../../../../model/user-profile';
import { MAX_NAME_LENGTH, User } from '../../../../../../model/user';
import DOMPurify from 'dompurify';
import { UserService } from '../../../../../../services/user.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

type UserSearchType = UserProfile | { username: string; isCustom: true };

@Component({
  selector: 'app-normal-run-editor',
  templateUrl: './normal-run-editor.component.html',
  styleUrls: ['./normal-run-editor.component.scss']
})
export class NormalRunEditorComponent {
  // TODO: emit event when line estimate or setup time is updated so we can re-compute the schedule times.

  iconTimes = faTimes;
  userSearch: { [key: string]: UserSearchType[] } = {};

  @Input() line: V2ScheduleLine;
  @Input() i: number;

  @ViewChild('autocompleteComponent') searchBox: AutocompleteComponent;

  constructor(
    private userService: UserService,
  ) {
  }

  removeUser(index: number) {
    this.line.runners.splice(index, 1);
    if (this.line.runners.length === 1) {
      this.line.type = 'SINGLE';
    }

    return false;
  }

  onSelectUser(item: UserSearchType, line: V2ScheduleLine) {
    if ('isCustom' in item) {
      line.runners.push({ runnerName: item.username });
    } else if (line.runners.findIndex(runner => 'user' in runner && runner.profile.id === item.id) < 0) {
      line.runners.push({ profile: item });
      // TODO: fix
      // this.getAvailabilitiesForRunner(item.id);
    }

    if (line.runners.length > 1) {
      line.type = 'RACE';
    }

    this.searchBox.clear();
    delete this.userSearch[line.position];
  }

  onSearchUser(val: string, position: number) {
    if (!val || val.length < 3) {
      return;
    }

    this.userService.searchV1(val).subscribe(response => {
      // @ts-ignore
      const combinedItems: UserSearchType[] = response;

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

  get lineEstimate(): string {
    return DurationService.toHuman(this.line.estimate);
  }

  set lineEstimate(value: string) {
    this.line.estimate = moment.duration(value).toISOString();
  }

  get lineSetup(): string {
    return DurationService.toHuman(this.line.setupTime);
  }

  set lineSetup(value: string) {
    this.line.setupTime = moment.duration(value).toISOString();
  }
}
