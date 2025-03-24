import { BasicUserInfo } from './user';
import { Question } from './question';

export class Marathon {

  id: string;
  name: string;
  creator: BasicUserInfo;
  startDate: Date;
  endDate: Date;
  submissionsStartDate: Date;
  submissionsEndDate: Date;
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

  constructor() {
    this.onsite = false;
    this.maxGamesPerRunner = 5;
    this.maxCategoriesPerGame = 3;
    this.maxNumberOfScreens = 4;
    this.discordPrivacy = false;
    this.submitsOpen = false;
    this.selectionDone = false;
    this.donationsOpen = false;
    this.videoRequired = true;
    this.unlimitedGames = false;
    this.unlimitedCategories = false;
    this.emulatorAuthorized = true;
    this.isPrivate = true;
    this.questions = [];
    this.announceAcceptedSubmissions = false;
  }
}

export class MarathonWithExtraData extends Marathon {
  effectiveDate: Date;
  translateKey: string;
}

export interface MarathonSettings {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  startDate: Date;
  endDate: Date;
  submissionsStartDate: Date;
  submissionsEndDate: Date;
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
  discord: string;
  youtube: string;
  discordPrivate: boolean;

  defaultSetupTime: string;
  selectionDone: boolean;
  scheduleDone: boolean;

  webhook: string;
  announceAcceptedSubmissions: boolean;
}

export interface MarathonSettingsWithHelpfulProps extends MarathonSettings {
  defaultSetupTimeHuman: string;
}
