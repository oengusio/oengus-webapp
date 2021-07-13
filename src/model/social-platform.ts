interface Data {
  display: string;
  urlPrefix?: string;
}

export default class SocialPlatform {
  public static readonly SPEEDRUNCOM: Data = {
    display: 'speedrun.com',
    urlPrefix: 'https://speedrun.com/user/',
  };
  public static readonly TWITTER: Data = {
    display: 'Twitter',
    urlPrefix: 'https://www.twitter.com/'
  };
  public static readonly TWITCH: Data = {
    display: 'Twitch',
    urlPrefix: 'https://www.twitch.tv/',
  };
  public static readonly FACEBOOK: Data = {
    display: 'Facebook',
    urlPrefix: 'https://www.facebook.com/',
  };
  public static readonly INSTAGRAM: Data = {
    display: 'Instagram',
    urlPrefix: 'https://www.instagram.com/',
  };
  public static readonly SNAPCHAT: Data = {
    display: 'Snapchat',
    urlPrefix: 'https://www.snapchat.com/add/',
  };
  public static readonly DISCORD: Data = {
    display: 'Discord',
  };
  public static readonly IRC: Data = {
    display: 'IRC',
  };
  public static readonly EMAIL: Data = {
    display: 'Email',
    urlPrefix: 'mailto:',
  };
  public static readonly PHONE: Data = {
    display: 'Phone',
    urlPrefix: 'tel:',
  };
}
