import { OengusPagination, OengusState } from './oengus-api';

export interface Donation {
  id: number;
  nickname: string;
  date: string|Date;
  amount: number;
  comment: string;
  donationIncentiveLinks: Array<string>;
  answers: Array<string>;
}

export interface DonationState extends OengusState {
  donations: { [id: string]: OengusPagination<Donation> };
}

export interface DonationPageParams {
  page: number;
  size: number;
}
