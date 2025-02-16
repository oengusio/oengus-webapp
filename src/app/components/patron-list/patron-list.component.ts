import { Component, OnInit } from '@angular/core';
import Patron from '../../../model/patron';
import { PatreonService } from '../../../services/patreon.service';

@Component({
    selector: 'app-patron-list',
    templateUrl: './patron-list.component.html',
    styleUrls: ['./patron-list.component.scss'],
    standalone: false
})
export class PatronListComponent implements OnInit {

  patrons: Patron[] = [];

  constructor(private patreonService: PatreonService) { }

  ngOnInit(): void {
    this.patreonService.fetchPatrons().subscribe({
      next: (response) => {
        this.patrons = response.patrons;
      },
      error: (ignored) => {
        // Just ignore any errors
        this.patrons = [];
      }
    });
  }

}
