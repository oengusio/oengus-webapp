import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConnectionMeta, connectionMetas, SocialAccount } from '../../../../../model/social-account';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
    ]
})
export class BoxComponent {
  @Input() connection: SocialAccount;

  get usernameFormatted(): string {
    const connectionMeta = connectionMetas[this.connection?.platform] ?? connectionMetas._DEFAULT;

    return connectionMeta?.usernameFormatter?.(this.connection.username) ?? this.connection.username;
  }

  get connectionMeta(): ConnectionMeta {
    const connectionMeta = connectionMetas[this.connection?.platform] ?? connectionMetas._DEFAULT;
    connectionMeta.link = connectionMeta.linkBase?.(this.connection.username);
    return connectionMeta;
  }

}
