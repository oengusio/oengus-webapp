import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SocialAccount } from '../../../model/social-account';

@Component({
    selector: 'app-element-connections',
    templateUrl: './element-connections.component.html',
    styleUrls: ['./element-connections.component.scss'],
    standalone: false
})
export class ElementConnectionsComponent {
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
