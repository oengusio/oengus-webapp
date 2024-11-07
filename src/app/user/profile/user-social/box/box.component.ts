import { Component, Input } from '@angular/core';
import { ConnectionMeta, connectionMetas, ConnectionMetas, SocialAccount } from '../../../../../model/social-account';
import {
  faDiscord,
  faFacebookF,
  faInstagram,
  faMastodon,
  faSnapchatGhost,
  faTwitch,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faStar, faTrophy, faTv } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
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
