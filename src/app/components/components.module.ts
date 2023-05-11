import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatronListComponent } from './patron-list/patron-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarOverviewComponent } from './marathon-sidebar-overview/sidebar-overview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NwbCommonModule } from '@wizishop/ng-wizi-bulma';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PatronListComponent,
    SidebarOverviewComponent,
  ],
  exports: [
    PatronListComponent,
    SidebarOverviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NwbCommonModule,
    FontAwesomeModule,
    TranslateModule,
  ]
})
export class ComponentsModule { }
