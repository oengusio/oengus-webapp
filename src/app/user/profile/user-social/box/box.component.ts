import { Component, Input, OnInit } from '@angular/core';
import { ConnectionMeta, ConnectionMetas, SocialAccount } from '../../../../../model/social-account';
import { faDiscord, faFacebookF, faInstagram, faMastodon, faSnapchatGhost, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faStar, faTrophy, faTv } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Input() connection: SocialAccount;

  connectionMetas: ConnectionMetas&{ _DEFAULT: ConnectionMeta } = {
    DISCORD: {
      icon: faDiscord,
      header: 'platform.DISCORD',
    },
    EMAIL: {
      linkBase: fragment => `mailto:${fragment}`,
      icon: faEnvelope,
      header: 'platform.EMAIL',
    },
    FACEBOOK: {
      linkBase: fragment => `https://www.facebook.com/${fragment}`,
      icon: faFacebookF,
      header: 'platform.FACEBOOK',
    },
    INSTAGRAM: {
      linkBase: fragment => `https://www.instagram.com/${fragment}`,
      icon: faInstagram,
      header: 'platform.INSTAGRAM',
    },
    PHONE: {
      linkBase: fragment => `tel:${fragment}`,
      icon: faPhone,
      header: 'platform.PHONE',
    },
    NICO: {
      linkBase: fragment => `https://com.nicovideo.jp/community/${fragment}`,
      icon: faTv,
      header: 'platform.NICO',
    },
    MASTODON: {
      linkBase: (fragment) => {
        const [ username, domain ] = fragment.split('@');

        return `https://${domain}/@${username}`;
      },
      icon: faMastodon,
      header: 'platform.MASTODON',
    },
    SNAPCHAT: {
      linkBase: fragment => `https://www.snapchat.com/add/${fragment}`,
      icon: faSnapchatGhost,
      header: 'platform.SNAPCHAT',
    },
    SPEEDRUNCOM: {
      linkBase: fragment => `https://speedrun.com/user/${fragment}`,
      icon: faTrophy,
      header: 'platform.SPEEDRUNCOM',
    },
    TWITCH: {
      linkBase: fragment => `https://www.twitch.tv/${fragment}`,
      icon: faTwitch,
      header: 'platform.TWITCH',
    },
    TWITTER: {
      linkBase: fragment => `https://www.twitter.com/${fragment}`,
      icon: faTwitter,
      header: 'platform.TWITTER',
    },

    _DEFAULT: {
      icon: faStar,
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

  get connectionMeta(): ConnectionMeta {
    const connectionMeta = this.connectionMetas[this.connection?.platform] ?? this.connectionMetas._DEFAULT;
    connectionMeta.link = connectionMeta.linkBase?.(this.connection.username);
    return connectionMeta;
  }

}
