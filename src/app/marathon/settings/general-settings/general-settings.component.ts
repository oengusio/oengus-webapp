import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marathon, MarathonSettings } from '../../../../model/marathon';
import { MarathonService } from '../../../../services/marathon.service';
import { environment } from '../../../../environments/environment';
import isoLang from '../../../../assets/languages.json';
import countriesImport from '../../../../assets/countries.json';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../model/user';
import { debounce } from 'lodash';
import { firstValueFrom } from 'rxjs';
import { UserProfile } from '../../../../model/user-profile';

@Component({
  selector: 'app-marathon-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  @Input() public settings: MarathonSettings;
  @Input() public moderators: UserProfile[];
  @Input() public updateStartTime: boolean;
  @Input() public disabled: boolean;

  @Output() public stateUpdate = new EventEmitter<boolean>();

  public userResults = [];
  public countries = countriesImport as unknown as Map<string, string>;
  public languages = (<any>isoLang);

  public now: Date;
  public env = environment;

  // TODO: remove support for bot webhook
  public loadWebhookCheck: boolean;
  public isWebhookOnline = true;
  public isOengusBotWebhook = false;
  public isMissingMarathon = false;
  public checkWebhookDebounced;

  constructor(public marathonService: MarathonService, public userService: UserService) {
    this.now = new Date();
    this.now.setSeconds(0);


    this.checkWebhookDebounced = debounce(this.checkWebhook, 250);

  }

  ngOnInit(): void {
    this.isOengusBotWebhook = (this.settings.webhook || '').startsWith('oengus-bot');
  }

  checkWebhook(text: any): void {
    if (!text) {
      this.isWebhookOnline = true;
      this.isOengusBotWebhook = false;
      this.isMissingMarathon = false;
      return;
    }

    text = text.trim();

    if (text.startsWith('oengus-bot')) {
      this.isWebhookOnline = true;
      this.isOengusBotWebhook = true;
      this.isMissingMarathon = !text.includes('marathon=' + this.marathonService.marathon.id);
      this.isWebhookOnline = !this.isMissingMarathon;

      return;
    }

    this.loadWebhookCheck = true;
    this.isOengusBotWebhook = false;

    const observer = this.marathonService.isWebhookOnline(this.marathonService.marathon.id, text);

    firstValueFrom(observer)
      .then(() => this.isWebhookOnline = true)
      .catch(() => this.isWebhookOnline = false)
      .finally(() => this.loadWebhookCheck = false);
  }

  onSelectMod(item: UserProfile) {
    const creator = this.marathonService.marathon.creator;

    if (this.moderators.findIndex(user => user.id === item.id) < 0
      && creator.id !== item.id) {
      this.moderators.push(item);
    }
  }

  onSearchMod(val: string) {
    if (!val || val.length < 3) {
      return;
    }
    this.userService.searchV1(val).subscribe(response => {
      this.userResults = response;
    });
  }

  removeModerator(index: number) {
    this.moderators.splice(index, 1);
  }

}
