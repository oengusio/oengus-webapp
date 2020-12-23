import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import Patron, {PatronApiResponse} from '../../model/patron';

@Component({
  selector: 'app-patrons',
  templateUrl: './patrons.component.html',
  styleUrls: ['./patrons.component.scss']
})
export class PatronsComponent implements OnInit {
  public patrons: Patron[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<PatronApiResponse>(`${this.patronUrl}/patrons`).subscribe((data) => {
      this.patrons = data.patrons;
    });
  }

  private get patronUrl(): string {
    return environment.patronApi || environment.api + '/patreon';
  }
}
