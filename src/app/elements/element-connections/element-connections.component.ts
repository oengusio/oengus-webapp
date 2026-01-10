import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocialAccount } from '../../../model/social-account';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ConnectionSettingsComponent } from './connection-settings/connection-settings.component';

@Component({
    selector: 'app-element-connections',
    templateUrl: './element-connections.component.html',
    styleUrls: ['./element-connections.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
        ConnectionSettingsComponent,
    ]
})
export class ElementConnectionsComponent {
  faPlus = faPlus;

  @Input() discordId = '';
  @Input() twitchId = '';

  @Input() connections: SocialAccount[] = [];
  @Output() connectionsChange = new EventEmitter<SocialAccount[]>();

  addNewConnection(): void {
    this.connections.push({
      platform: 'SPEEDRUNCOM',
      username: '',
    });
    this.connectionsChange.emit(this.connections);
  }

  deleteConnection(connection: SocialAccount): void {
    const conns = this.connections;

    const index = conns.indexOf(connection);

    if (index > -1) {
      conns.splice(index, 1);

      this.connectionsChange.emit(this.connections);
    }
  }
}
