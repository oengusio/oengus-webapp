import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { V2ScheduleLine } from '../../../../model/schedule-line';
import { ElementModule } from '../../../elements/elements.module';
import { ComponentsModule } from '../../../components/components.module';

@Component({
    selector: 'app-run-details',
    templateUrl: './run-details.component.html',
    styleUrls: ['./run-details.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        ElementModule,
        ComponentsModule,
    ]
})
export class RunDetailsComponent {
  @Input() run: V2ScheduleLine;

  get titleText(): string | null {
    return this.run.setupBlock ? (this.run.setupBlockText || null) : this.run.game;
  }
}
