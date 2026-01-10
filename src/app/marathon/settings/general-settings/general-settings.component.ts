import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { NwbSwitchModule } from '@oengus/ng-wizi-bulma';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MarathonSettingsWithHelpfulProps } from '../../../../model/marathon';
import { MarathonService } from '../../../../services/marathon.service';
import { environment } from '../../../../environments/environment';
import isoLang from '../../../../assets/languages.json';
import countriesImport from '../../../../assets/countries.json';
import { UserService } from '../../../../services/user.service';
import { debounce } from 'lodash';
import { firstValueFrom } from 'rxjs';
import { UserProfile } from '../../../../model/user-profile';
import { connectionMetas } from '../../../../model/social-account';
import { DirectivesModule } from '../../../directives/directives.module';
import { DescriptionEditorComponent } from './description-editor/description-editor.component';
import { ElementI18nComponent } from '../../../elements/element-i18n/element-i18n.component';

@Component({
    selector: 'app-marathon-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NwbSwitchModule,
        AutocompleteLibModule,
        DirectivesModule,
        DescriptionEditorComponent,
        ElementI18nComponent,
    ]
})
export class GeneralSettingsComponent implements OnInit {
  marathonService = inject(MarathonService);
  userService = inject(UserService);


  @Input() public settings: MarathonSettingsWithHelpfulProps;
  @Input() public moderators: UserProfile[];
  @Input() public updateStartTime: boolean;
  @Input() public disabled: boolean;

  @Output() public stateUpdate = new EventEmitter<boolean>();

  public userResults = [];
  public countries = countriesImport as unknown as Map<string, string>;
  public languages = isoLang;

  public now: Date;
  public env = environment;

  bskySettings = connectionMetas.BLUESKY;
  mastodonSettings = connectionMetas.MASTODON;

  marathonDescMaxLen = 10000;

  // TODO: remove support for bot webhook (and give it its own settings)
  public loadWebhookCheck: boolean;
  public isWebhookOnline = true;
  public isOengusBotWebhook = false;
  public isMissingMarathon = false;
  public checkWebhookDebounced;

  constructor() {
    this.now = new Date();
    this.now.setSeconds(0);


    this.checkWebhookDebounced = debounce(this.checkWebhook, 250);

  }

  ngOnInit(): void {
    this.isOengusBotWebhook = (this.settings.webhook || '').startsWith('oengus-bot');
  }

  checkWebhook(text: string): void {
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

  get currentUserIsOwner(): boolean {
    return this.userService.user.id === this.marathonService.marathon.creator.id;
  }
}
