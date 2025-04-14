import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatronListComponent } from './patron-list/patron-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarOverviewComponent } from './marathon-sidebar-overview/sidebar-overview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NwbCommonModule } from '@wizishop/ng-wizi-bulma';
import { RouterModule } from '@angular/router';
import { OengusMdComponent } from './oengus-md/oengus-md.component';
import { WidgetSigninPickerComponent } from './widget-signin-picker/widget-signin-picker.component';
import { ElementModule } from '../elements/elements.module';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { SimpleMdComponent } from './simple-md/simple-md.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { MarkdownPipe } from '../pipes/markdown.pipe';

@NgModule({
  declarations: [
    PatronListComponent,
    SidebarOverviewComponent,
    OengusMdComponent,
    WidgetSigninPickerComponent,
    SimpleMdComponent,
    NotificationListComponent,
  ],
  exports: [
    OengusMdComponent,
    PatronListComponent,
    SidebarOverviewComponent,
    WidgetSigninPickerComponent,
    SimpleMdComponent,
    NotificationListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NwbCommonModule,
    FontAwesomeModule,
    TranslateModule,
    LocalizeRouterModule,
    ElementModule,
    MarkdownPipe,
  ],
})
export class ComponentsModule { }
