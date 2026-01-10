import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-monetary-amount',
    templateUrl: './monetary-amount.component.html',
    styleUrls: ['./monetary-amount.component.scss'],
    imports: [
        CommonModule,
    ]
})
export class MonetaryAmountComponent {

  @Input() amount: number;
  @Input() currency: string;

  public localStorage = localStorage;

  constructor() {
    if (!this.amount) {
      this.amount = 0;
    }
  }

}
