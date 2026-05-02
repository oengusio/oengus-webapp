import { BasicUserInfo } from './user';
import { Question } from './question';

export interface Marathon {
  id: string;
  name: string;
  creator: BasicUserInfo;
  startDate: Temporal.ZonedDateTime;
  endDate: Temporal.ZonedDateTime;
  submissionsStartDate: Temporal.ZonedDateTime;
  submissionsEndDate: Temporal.ZonedDateTime;
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
  submissionsStartDate: DateType;
  submissionsEndDate: DateType;
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
  discordGuildId: string;
  discordGuildName: string;

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
