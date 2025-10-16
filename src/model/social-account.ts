import { SocialPlatform, SocialPlatformName } from './social-platform';
import { parseMastodonUrl } from '../utils/helpers';

export type ConnectionPlatform = SocialPlatformName | 'PHONE';

export class SocialAccount {
  id?: number;
  platform: ConnectionPlatform;
  username: string;
}

export interface ConnectionMeta {
  linkBase?: (fragment: string) => string;
  usernameFormatter?: (username: string) => string;
  icon: string;
  header?: string;
  link?: string;
  maxLength?: number;
  regex?: RegExp | string;
}

export type ConnectionMetas = Record<ConnectionPlatform, ConnectionMeta>;

const simpleUsernameRegex = '^[\\w\\-0-9]+$';

export const connectionMetas: ConnectionMetas&{ _DEFAULT: ConnectionMeta } = {
  BLUESKY: {
    linkBase: (fragment) => `${SocialPlatform.BLUESKY}${stripAtPrefix(fragment)}`,
    icon: 'fa-brands fa-bluesky',
    header: 'platform.BLUESKY',
    regex: '^(@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$',
  },
  DISCORD: {
    icon: 'fa-brands fa-discord',
    header: 'platform.DISCORD',
    regex: simpleUsernameRegex,
    maxLength: 30,
  },
  EMAIL: {
    linkBase: fragment => `mailto:${fragment}`,
    icon: 'fa-solid fa-envelope',
    header: 'platform.EMAIL',
  },
  FACEBOOK: {
    linkBase: fragment => `https://www.facebook.com/${fragment}`,
    icon: 'fa-brands fa-facebook',
    header: 'platform.FACEBOOK',
    regex: simpleUsernameRegex,
    maxLength: 32,
  },
  INSTAGRAM: {
    linkBase: fragment => `https://www.instagram.com/${fragment}`,
    icon: 'fa-brands fa-instagram',
    header: 'platform.INSTAGRAM',
    regex: simpleUsernameRegex,
    maxLength: 32,
  },
  PHONE: {
    linkBase: fragment => `tel:${fragment}`,
    icon: 'fa-solid fa-phone',
    header: 'platform.PHONE',
    regex: /[0-9+]+/,
  },
  NICO: {
    linkBase: fragment => `https://com.nicovideo.jp/community/${fragment}`,
    icon: 'fa-solid fa-tv',
    header: 'platform.NICO',
  },
  MASTODON: {
    linkBase: (fragment) => parseMastodonUrl(fragment),
    icon: 'fa-brands fa-mastodon',
    header: 'platform.MASTODON',
  },
  SNAPCHAT: {
    linkBase: fragment => `https://www.snapchat.com/add/${fragment}`,
    icon: 'fa-brands fa-snapchat',
    header: 'platform.SNAPCHAT',
    regex: simpleUsernameRegex,
  },
  SPEEDRUNCOM: {
    linkBase: fragment => `https://speedrun.com/user/${fragment}`,
    icon: 'fa-solid fa-trophy',
    header: 'platform.SPEEDRUNCOM',
  },
  SPEEDRUNSME: {
    linkBase: fragment => `https://speedruns.me/${fragment}`,
    icon: 'ong-speedrunsme',
    header: 'platform.SPEEDRUNSME',
  },
  TWITCH: {
    linkBase: fragment => `https://www.twitch.tv/${fragment}`,
    icon: 'fa-brands fa-twitch',
    header: 'platform.TWITCH',
    regex: simpleUsernameRegex,
    maxLength: 32,
  },
  TWITTER: {
    linkBase: fragment => `https://www.twitter.com/${fragment}`,
    icon: 'fa-brands fa-twitter',
    header: 'platform.TWITTER',
    regex: simpleUsernameRegex,
    maxLength: 32,
  },
  YOUTUBE: {
    linkBase: fragment => `https://www.youtube.com/@${fragment}`,
    usernameFormatter: username => `@${username}`,
    icon: 'fa-brands fa-youtube',
    header: 'platform.YOUTUBE',
    regex: simpleUsernameRegex,
  },

  _DEFAULT: {
    icon: 'fa-solid fa-star',
  },
};

export function stripAtPrefix(input: string): string {
  if (input.startsWith('@') || input.length > 1) {
    return input.slice(1);
  }

  return input;
}
