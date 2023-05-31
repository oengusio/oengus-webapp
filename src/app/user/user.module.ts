import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { UserResolver } from '../resolvers/user-resolver';
import { TranslateModule } from '@ngx-translate/core';
import { UsernameJapaneseExistsValidatorDirective } from '../directives/username-japanese-exists-validator.directive';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileResolver } from '../resolvers/user-profile-resolver';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConnectionComponent } from './profile/connection/connection.component';
import { ConnectionSettingsComponent } from './settings/connection-settings/connection-settings.component';
import { SyncButtonComponent } from './settings/sync-button/sync-button.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { ElementModule } from '../elements/elements.module';
import { UserSocialComponent } from './profile/user-social/user-social.component';
import { BoxComponent } from './profile/user-social/box/box.component';
import { ProfileHistoryComponent } from './profile/profile-history/profile-history.component';
import { SubmissionComponent } from './profile/profile-history/submission/submission.component';
import { ModeratedComponent } from './profile/profile-history/moderated/moderated.component';
import { AdminControlsComponent } from './profile/admin-controls/admin-controls.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const userRoutes: Routes = [
  {
    path: 'user/settings', component: SettingsComponent, resolve: {
      user: UserResolver
    }
  },
  {
    path: 'user/settings/sync/:service', component: SettingsComponent, resolve: {
      user: UserResolver
    }
  },
  {path: 'user/new', component: NewUserComponent},
  {
    path: 'user/:name', component: ProfileComponent, resolve: {
      user: UserProfileResolver
    }
  },
];

@NgModule({
  declarations: [
    NewUserComponent,
    SettingsComponent,
    UsernameJapaneseExistsValidatorDirective,
    ProfileComponent,
    ConnectionComponent,
    ConnectionSettingsComponent,
    SyncButtonComponent,
    UserProfileComponent,
    UserSocialComponent,
    BoxComponent,
    ProfileHistoryComponent,
    SubmissionComponent,
    ModeratedComponent,
    AdminControlsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(userRoutes),
    LocalizeRouterModule.forChild(userRoutes),
    FormsModule,
    DirectivesModule,
    FontAwesomeModule,
    ElementModule,
  ],
  providers: [UserResolver, UserProfileResolver],
  exports: [
    // RouterModule,
  ],
})
export class UserModule {
}
