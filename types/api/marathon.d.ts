import { OengusState } from './oengus-api';
import { User } from './user';

export interface Marathon {
  id: string;
  name: string;
  location: string;
  country: string;
  startDate: string|Date;
  endDate: string|Date;
  submissionsEndDate: string|Date;
  language: string;
  onsite: boolean;
  private: boolean;
}

export interface FullMarathon {
  announceAcceptedSubmissions: boolean
  canEditSubmissions: boolean;
  country: string;
  creator: User;
  defaultSetupTime: Duration;
  description: string;
  discord: string;
  discordGuildId: string;
  discordGuildName: string;
  discordPrivacy: boolean;
  discordRequired: boolean;
  donationCurrency: string;
  donationsOpen: boolean;
  emulatorAuthorized: boolean;
  endDate: string|Date;
  hasDonations: boolean;
  hasIncentives: boolean;
  hasMultiplayer: boolean;
  id: string;
  isPrivate: boolean;
  language: string;
  location: string;
  maxCategoriesPerGame: number;
  maxNumberOfScreens: number;
  moderators: Array<User>;
  name: string;
  onsite: boolean;
  payee: string;
  questions: Array<Question>;
  scheduleDone: boolean;
  selectionDone: boolean;
  startDate: string|Date;
  submissionsEndDate: string|Date;
  submissionsStartDate: string|Date;
  submitsOpen: boolean;
  supportedCharity: string;
  twitch: string;
  twitter: string;
  unlimitedCateogires: boolean;
  unlimitedGames: boolean;
  videoRequiored: boolean;
  webhook: string;
  youtube: string;
}

export interface FrontPageMarathons {
  next: Array<Marathon>;
  open: Array<Marathon>;
  live: Array<Marathon>;
}

export interface MarathonCalendar {
  calendar: Array<Marathon>;
}

export interface MarathonState extends OengusState {
  marathons: { [id: string]: FullMarathon };
  calendars: { [timeRange: string]: MarathonCalendar };
  frontPage?: FrontPageMarathons;
}

export interface MarathonForDateParams {
  /** ISO Date string */
  start: string;
  /** ISO Date string */
  end: string;
  /** IANA Time Zone name */
  zoneId: string;
}

export type QuestionType = 'TEXT'|'SELECT'|'TEXTAREA'|'CHECKBOX'|'FREETEXT';

export interface Question {
  description: string;
  filedType: QuestionType;
  id: number;
  label: string;
  marathon: Marathon;
  options: Array<string>;
  position: number;
  questionType: string;
  required: boolean;
}

export interface Duration {
  nano: number;
  negative: boolean;
  seconds: number|BigInt;
  zero: boolean
  units: Array<TemporalUnit>;
}

export interface TemporalUnit {
  dateBased: boolean;
  duration: Duration;
  durationEstimated: boolean;
  timeBased: boolean;
}
