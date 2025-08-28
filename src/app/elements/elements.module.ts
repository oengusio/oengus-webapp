import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NwbCommonModule } from '@oengus/ng-wizi-bulma';
import { ElementTableComponent } from './element-table/element-table.component';
import { ElementTableCellComponent } from './element-table-cell/element-table-cell.component';
import { ElementDropdownComponent } from './element-dropdown/element-dropdown.component';
import { ElementTemporalDatetimeComponent } from './temporal/element-temporal-datetime/element-temporal-datetime.component';
import { ElementTableRowComponent } from './element-table-row/element-table-row.component';
import { ElementTemporalDurationComponent } from './temporal/element-temporal-duration/element-temporal-duration.component';
import { ElementTableExpandButtonComponent } from './element-table-expand-button/element-table-expand-button.component';
import { ElementTableDetailComponent } from './element-table-detail/element-table-detail.component';
import { ElementTemporalDistanceComponent } from './temporal/element-temporal-distance/element-temporal-distance.component';
import { ElementConsoleComponent } from './element-console/element-console.component';
import { TranslateModule } from '@ngx-translate/core';
import { ElementAdvertisementComponent } from './element-advertisement/element-advertisement.component';
import { MarathonLocationComponent } from './marathon-location/marathon-location.component';
import { ElementTwitchPlayerComponent } from './element-twitch-player/element-twitch-player.component';
import { UserLinkComponent } from './user-link/user-link.component';
import { ElementTemporalRangeComponent } from './temporal/element-temporal-range/element-temporal-range.component';
import { ElementRangeComponent } from './element-range/element-range.component';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { ElementShareMastodonComponent } from './element-share-mastodon/element-share-mastodon.component';
import { ElementPronounsComponent } from './element-pronouns/element-pronouns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementLanguagesComponent } from './element-languages/element-languages.component';
import { ElementCountryComponent } from './element-country/element-country.component';
import { ElementConnectionsComponent } from './element-connections/element-connections.component';
import { ConnectionSettingsComponent } from './element-connections/connection-settings/connection-settings.component';
import { ElementPasswordInputComponent } from './element-password-input/element-password-input.component';
import { ElementI18nComponent } from './element-i18n/element-i18n.component';

@NgModule({
  declarations: [
    ElementTableComponent,
    ElementTableCellComponent,
    ElementDropdownComponent,
    ElementTemporalDatetimeComponent,
    ElementTableRowComponent,
    ElementTemporalDurationComponent,
    ElementTableExpandButtonComponent,
    ElementTableDetailComponent,
    ElementTemporalDistanceComponent,
    ElementConsoleComponent,
    ElementAdvertisementComponent,
    MarathonLocationComponent,
    ElementTwitchPlayerComponent,
    UserLinkComponent,
    ElementTemporalRangeComponent,
    ElementRangeComponent,
    LoadingIndicatorComponent,
    ElementShareMastodonComponent,
    ElementPronounsComponent,
    ElementLanguagesComponent,
    ElementCountryComponent,
    ElementConnectionsComponent,
    ConnectionSettingsComponent,
    ElementPasswordInputComponent,
    ElementI18nComponent,
  ],
  exports: [
    ElementTableComponent,
    ElementTableCellComponent,
    ElementDropdownComponent,
    ElementTemporalDatetimeComponent,
    ElementTableRowComponent,
    ElementTemporalDurationComponent,
    ElementTableExpandButtonComponent,
    ElementTableDetailComponent,
    ElementTemporalDistanceComponent,
    ElementConsoleComponent,
    ElementAdvertisementComponent,
    MarathonLocationComponent,
    ElementTwitchPlayerComponent,
    UserLinkComponent,
    ElementTemporalRangeComponent,
    ElementRangeComponent,
    LoadingIndicatorComponent,
    ElementShareMastodonComponent,
    ElementPronounsComponent,
    ElementLanguagesComponent,
    ElementCountryComponent,
    ElementConnectionsComponent,
    ElementPasswordInputComponent,
    ElementI18nComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NwbCommonModule,
    TranslateModule,
    RouterModule,
    LocalizeRouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ElementModule {
}
