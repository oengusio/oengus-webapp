import { Incentive } from './incentive';
import { Bid } from './bid';

export class DonationIncentiveLink {
  id = -1;
  incentive: Incentive = new Incentive();
  bid: Bid = new Bid();
  amount = -1;
}
