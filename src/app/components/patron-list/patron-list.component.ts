import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import Patron from '../../../model/patron';
import { PatreonService } from '../../../services/patreon.service';

@Component({
    selector: 'app-patron-list',
    templateUrl: './patron-list.component.html',
    styleUrls: ['./patron-list.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class PatronListComponent implements OnInit {
  private patreonService = inject(PatreonService);


  patrons: Patron[] = [];

  ngOnInit(): void {
    this.patreonService.fetchPatrons().subscribe({
      next: (response) => {
        this.patrons = response.patrons;
      },
      error: () => {
        // Just ignore any errors
        this.patrons = [];
      }
    });
  }

}
