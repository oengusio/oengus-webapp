import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatronListComponent } from './patron-list/patron-list.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../services/http-loader-factory';
import { HttpClient } from '@angular/common/http';
import { SidebarOverviewComponent } from './marathon-sidebar-overview/sidebar-overview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NwbCommonModule } from '@wizishop/ng-wizi-bulma';

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
    NwbCommonModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class ComponentsModule { }
