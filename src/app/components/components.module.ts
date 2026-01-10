import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatronListComponent } from './patron-list/patron-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarOverviewComponent } from './marathon-sidebar-overview/sidebar-overview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NwbCommonModule } from '@oengus/ng-wizi-bulma';
import { RouterModule } from '@angular/router';
import { OengusMdComponent } from './oengus-md/oengus-md.component';
import { WidgetSigninPickerComponent } from './widget-signin-picker/widget-signin-picker.component';
import { ElementModule } from '../elements/elements.module';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { SimpleMdComponent } from './simple-md/simple-md.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { MarkdownPipe } from '../pipes/markdown.pipe';
import { ElementLoginLinkSelectorComponent } from '../elements/element-login-link-selector/element-login-link-selector.component';

@NgModule({
  declarations: [
  ],
  exports: [
    // Standalone components re-exported (must be in both imports and exports)
    NotificationListComponent,
    PatronListComponent,
    SidebarOverviewComponent,
    OengusMdComponent,
    SimpleMdComponent,
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
    ElementLoginLinkSelectorComponent,
    WidgetSigninPickerComponent,
    NotificationListComponent,
    PatronListComponent,
    SidebarOverviewComponent,
    OengusMdComponent,
    SimpleMdComponent,
  ],
})
export class ComponentsModule { }
