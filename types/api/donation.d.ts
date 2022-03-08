import { OengusPagination, OengusState } from './oengus-api';

export interface Donation {
  id: number;
  nickname: string;
  date: string|Date;
  amount: number;
  comment: string;
  donationIncentiveLinks: Array<string>;
  answers: Array<any>; // Array<Answer>
}

export interface DonationStats {
  average: number;
  count: number;
  max: number;
  total: number;
}

export interface DonationState extends OengusState {
  donations: { [id: string]: OengusPagination<Donation> };
  stats: { [id: string]: DonationStats };
}

export interface DonationPageParams {
  page: number;
  size: number;
}
