import { faEnvelope, faPhone, faStar, faTrophy, faTv, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SocialPlatformName } from './social-platform';
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

export type ConnectionPlatform = SocialPlatformName | 'PHONE';

export class SocialAccount {
  id?: number;
  platform: ConnectionPlatform;
  username: string;
}

export interface ConnectionMeta {
  linkBase?: (fragment: string) => string;
  usernameFormatter?: (username: string) => string;
  icon: IconDefinition;
  header?: string;
  link?: string;
  maxLength?: number;
  regex?: RegExp | string;
}

export type ConnectionMetas = Record<ConnectionPlatform, ConnectionMeta>;

const simpleUsernameRegex = '^[\\w\\-0-9]+$';

export const connectionMetas: ConnectionMetas&{ _DEFAULT: ConnectionMeta } = {
  DISCORD: {
    icon: faDiscord,
    header: 'platform.DISCORD',
    regex: simpleUsernameRegex,
    maxLength: 30,
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
    regex: simpleUsernameRegex,
    maxLength: 32,
  },
  INSTAGRAM: {
    linkBase: fragment => `https://www.instagram.com/${fragment}`,
    icon: faInstagram,
    header: 'platform.INSTAGRAM',
    regex: simpleUsernameRegex,
    maxLength: 32,
  },
  PHONE: {
    linkBase: fragment => `tel:${fragment}`,
    icon: faPhone,
    header: 'platform.PHONE',
    regex: /[0-9+]+/,
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
    regex: simpleUsernameRegex,
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
    regex: simpleUsernameRegex,
    maxLength: 32,
  },
  TWITTER: {
    linkBase: fragment => `https://www.twitter.com/${fragment}`,
    icon: faTwitter,
    header: 'platform.TWITTER',
    regex: simpleUsernameRegex,
    maxLength: 32,
  },
  YOUTUBE: {
    linkBase: fragment => `https://www.youtube.com/@${fragment}`,
    usernameFormatter: username => `@${username}`,
    icon: faYoutube,
    header: 'platform.YOUTUBE',
    regex: simpleUsernameRegex,
  },

  _DEFAULT: {
    icon: faStar,
  },
};
