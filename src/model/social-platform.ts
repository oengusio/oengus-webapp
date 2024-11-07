export type SocialPlatformName = keyof typeof SocialPlatform;

export enum SocialPlatform {
  DISCORD = '',
  EMAIL = 'mailto:',
  FACEBOOK = 'https://www.facebook.com/',
  INSTAGRAM = 'https://www.instagram.com/',
  MASTODON = 'link-from-username',
  NICO = 'https://com.nicovideo.jp/community/',
  SNAPCHAT = 'https://www.snapchat.com/add/',
  SPEEDRUNCOM = 'https://speedrun.com/user/',
  TWITCH = 'https://www.twitch.tv/',
  TWITTER = 'https://www.twitter.com/',
  YOUTUBE = 'https://www.youtube.com/@',
}
