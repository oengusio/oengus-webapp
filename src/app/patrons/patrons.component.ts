import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import Patron from '../../model/patron';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-patrons',
    templateUrl: './patrons.component.html',
    styleUrls: ['./patrons.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class PatronsComponent {
  private route = inject(ActivatedRoute);

  public patrons: Patron[];

  constructor() {
    this.patrons = this.route.snapshot.data.patrons.patrons;
  }

  readonly title = 'Our patrons';
}
