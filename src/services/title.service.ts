import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private baseTitle = !environment.sandbox ? 'Oengus' : 'Oengus [Sandbox]';

  constructor(private title: Title) { }

  setTitle(title: string) {
    this.title.setTitle(`${title} | ${this.baseTitle}`);
  }

  resetTitle() {
    this.title.setTitle(this.baseTitle);
  }
}
