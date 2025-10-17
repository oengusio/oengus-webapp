/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Donation } from '../../../model/donation';
import { DonationService } from '../../../services/donation.service';
import { MarathonService } from '../../../services/marathon.service';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../environments/environment';
import { DonationExtraData } from '../../../model/donation-extra-data';
import { Incentive } from '../../../model/incentive';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DonationIncentiveLink } from '../../../model/donation-incentive-link';
import { Bid } from '../../../model/bid';

@Component({
    selector: 'app-donate',
    templateUrl: './donate.component.html',
    styleUrls: ['./donate.component.scss'],
    standalone: false
})
export class DonateComponent implements OnInit {
  readonly title = 'Donate';

  private donationService = inject(DonationService);
  marathonService = inject(MarathonService);
  userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private zone = inject(NgZone);


  public donation = new Donation();
  public incentives: Incentive[];

  public links: Link[];

  public paypalConfig: any/*IPayPalConfig*/;
  public loading = false;
  public faTimes = faTimes;

  isBid = (tbd: any): tbd is Bid => (tbd as Bid).incentiveId !== undefined;
  isIncentive = (tbd: any): tbd is Incentive => (tbd as Incentive).scheduleLine !== undefined;


  constructor() {
    const userService = this.userService;

    this.incentives = this.route.snapshot.data.incentives;
    this.incentives.forEach(incentive => {
      if (incentive.bidWar && incentive.openBid) {
        const bid = new Bid();
        bid.approved = false;
        bid.isNew = true;
        bid.incentiveId = incentive.id;
        incentive.bids.push(bid);
      }
    });
    this.links = [];
    if (userService.user) {
      this.donation.nickname = userService.user.username;
    }
    if (this.marathonService.marathon.questions.length > 0) {
      if (!this.donation.answers || this.donation.answers.length === 0) {
        this.donation.answers = [];
        this.marathonService.marathon.questions.forEach(question => {
          // @ts-expect-error wrong typing
          if (question.questionType === 'DONATION') {
            const answer = new DonationExtraData();
            answer.question = question;
            if (question.fieldType === 'CHECKBOX') {
              answer.answer = false;
            }
            this.donation.answers.push(answer);
          }
        });
      } else {
        this.donation.answers.forEach(answer => {
          if (answer.question.fieldType === 'CHECKBOX') {
            answer.answer = Boolean(answer.answer);
          }
        });
      }
    }
  }

  ngOnInit(): void {
    this.initConfig();
  }

  addLink() {
    this.links.push(new Link());
  }

  removeLink(index: number) {
    this.links.splice(index, 1);
  }

  getLeftAmount() {
    const total = this.donation.amount ? this.donation.amount : 0;
    return total - this.links.map(link => link.amount).reduce((acc, cur) => acc + cur, 0);
  }

  private initConfig(): void {
    this.paypalConfig = {
      currency: this.marathonService.marathon.donationCurrency,
      clientId: environment.paypalClientId,
      createOrderOnServer: () => {
        return new Promise<string>((resolve, reject) => {
          this.links.forEach(link => {
            const donationIncentiveLink = new DonationIncentiveLink();
            donationIncentiveLink.amount = link.amount;
            if (this.isBid(link.incentive)) {
              donationIncentiveLink.bid = link.incentive;
            } else if (this.isIncentive(link.incentive)) {
              donationIncentiveLink.incentive = link.incentive;
            }
            this.donation.donationIncentiveLinks.push(donationIncentiveLink);
          });
          this.donationService.donate(this.marathonService.marathon.id, this.donation).subscribe(response => {
            console.log(JSON.stringify(response));
            // @ts-expect-error wrong types.
            resolve(response.body.id);
          }, reject);
        });
      },
      authorizeOnServer: async (data) => {
        this.zone.run(() => {
          this.donationService.validate(this.marathonService.marathon.id, data.orderID).add(() => {
            this.loading = false;
            this.router.navigate(['marathon', this.marathonService.marathon.id, 'donations']);
          });
        });
      },
      advanced: {
        commit: 'true',
        extraQueryParams: [
          { name: 'merchant-id', value: this.marathonService.marathon.payee }
        ]
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: () => {
        this.loading = true;
      },
      onCancel: (data) => {
        this.zone.run(() => {
          this.donationService.cancel(this.marathonService.marathon.id, data.orderID).subscribe(() => {
            this.loading = false;
          });
        });
      },
      onShippingChange: (data, actions) => {
        // https://github.com/paypal/paypal-checkout-components/issues/1521
        return actions.resolve();
      }
    };
  }
}

export class Link {
  incentive: any;
  amount = 0;
}
