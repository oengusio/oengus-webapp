export type ConnectionPlatform =
  'DISCORD' |
  'EMAIL' |
  'FACEBOOK' |
  'INSTAGRAM' |
  'PHONE' |
  'NICO' |
  'MASTODON' |
  'SNAPCHAT' |
  'SPEEDRUNCOM' |
  'TWITCH' |
  'TWITTER' |
  'YOUTUBE';

export default interface SocialAccount {
  id?: number;
  platform: ConnectionPlatform | string;
  username: string;
}
