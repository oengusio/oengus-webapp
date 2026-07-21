import { BasicUserInfo, User } from './user';
import { Question } from './question';

export interface MarathonRaw {
  id: string;
  name: string;
  creator: BasicUserInfo;
  startDate: string;
  endDate: string;
  submissionsStartDate: string;
  submissionsEndDate: string;
  description: string;
  onsite: boolean;
  location: string;
  language: string;
  maxGamesPerRunner: number;
  maxCategoriesPerGame: number;
  hasMultiplayer: boolean;
  maxNumberOfScreens: number;
  twitch: string;
  twitter: string;
  mastodon?: string;
  bluesky?: string;
  discord: string;
  youtube: string;
  country: string;
  discordPrivacy: boolean;
  submitsOpen: boolean;
  moderators: BasicUserInfo[];
  defaultSetupTime: string;
  defaultSetupTimeHuman: string;
  selectionDone: boolean;
  scheduleDone: boolean;
  isPrivate: boolean;
  hasIncentives: boolean;
  canEditSubmissions: boolean;
  questions: Question[];
  hasDonations: boolean;
  payee: string;
  donationCurrency: string;
  supportedCharity: string;
  webhook: string;
  donationsTotal: number;
  hasSubmitted: boolean;
  donationsOpen: boolean;
  videoRequired: boolean;
  unlimitedGames: boolean;
  unlimitedCategories: boolean;
  emulatorAuthorized: boolean;
  discordGuildId: string;
  discordGuildName: string;
  discordRequired: boolean;
  announceAcceptedSubmissions: boolean;
}

export class Marathon {
  id = '';
  name = '';
  creator: BasicUserInfo = new User();
  startDate: Temporal.ZonedDateTime = Temporal.Now.zonedDateTimeISO();
  endDate: Temporal.ZonedDateTime = Temporal.Now.zonedDateTimeISO();
  submissionsStartDate: Temporal.ZonedDateTime = Temporal.Now.zonedDateTimeISO();
  submissionsEndDate: Temporal.ZonedDateTime = Temporal.Now.zonedDateTimeISO();
  description = '';
  onsite = false;
  location = '';
  language = '';
  maxGamesPerRunner = 5;
  maxCategoriesPerGame = 3;
  hasMultiplayer = false;
  maxNumberOfScreens = 4;
  twitch = '';
  twitter = '';
  mastodon ? = '';
  bluesky ? = '';
  discord = '';
  youtube = '';
  country = '';
  discordPrivacy = false;
  submitsOpen = false;
  moderators: BasicUserInfo[] = [];
  defaultSetupTime = '';
  defaultSetupTimeHuman = '';
  selectionDone = false;
  scheduleDone = false;
  isPrivate = true;
  hasIncentives = false;
  canEditSubmissions = false;
  questions: Question[] = [];
  hasDonations = false;
  payee = '';
  donationCurrency = '';
  supportedCharity = '';
  webhook = '';
  donationsTotal = -1;
  hasSubmitted = false;
  donationsOpen = false;
  videoRequired = true;
  unlimitedGames = false;
  unlimitedCategories = false;
  emulatorAuthorized = true;
  discordGuildId = '';
  discordGuildName = '';
  discordRequired = false;
  announceAcceptedSubmissions = true;
}

export interface MarathonWithExtraData extends Marathon {
  effectiveDate: Temporal.ZonedDateTime;
  translateKey: string;
}

export interface MarathonSettingsRawApi<DateType = string> {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  startDate: DateType;
  endDate: DateType;
  submissionsStartDate?: DateType | null;
  submissionsEndDate?: DateType | null;
  onsite: boolean;
  location: string;
  country: string;
  language: string;

  unlimitedGames: boolean;
  unlimitedCategories: boolean;
  maxGamesPerRunner: number;
  maxCategoriesPerGame: number;
  allowMultiplayer: boolean;
  maxNumberOfScreens: number;

  videoRequired: boolean;
  allowEmulators: boolean;

  discordRequired: boolean;
  discordGuildId: string | null;
  discordGuildName: string | null;

  submissionsOpen: boolean;

  twitch: string;
  twitter: string;
  mastodon: string;
  bluesky: string;
  discord: string;
  youtube: string;
  discordPrivate: boolean;

  defaultSetupTime: string;
  selectionDone: boolean;
  scheduleDone: boolean;

  webhook: string;
  announceAcceptedSubmissions: boolean;
}

export type MarathonSettings = MarathonSettingsRawApi<Temporal.ZonedDateTime>;

export interface MarathonSettingsWithHelpfulProps extends MarathonSettings {
  defaultSetupTimeHuman: string;
}
