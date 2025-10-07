import { Component, Input } from '@angular/core';
import { getRowParity } from '../../../../../assets/table';
import { HistoryMarathon } from '../../../../../model/user-profile-history';

@Component({
    selector: 'app-user-profile-moderated-history',
    templateUrl: './moderated.component.html',
    styleUrls: ['./moderated.component.scss'],
    standalone: false
})
export class ModeratedComponent {
  @Input() history: HistoryMarathon[];

  getRowParity = getRowParity;

  get moderatedMarathons() {
    return [ ...this.history ].reverse();
  }

}
