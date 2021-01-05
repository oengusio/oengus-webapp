import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private baseTitle = !environment.sandbox ? 'Oengus' : 'Oengus [Sandbox]';
  private mainTitle: string;

  constructor(private title: Title) {
    this.mainTitle = this.baseTitle;
  }

  setSubTitle(subTitle: string) {
    this.title.setTitle(`${subTitle} | ${this.mainTitle}`);
  }

  resetSubTitle() {
    this.title.setTitle(this.mainTitle);
  }

  setTitle(title: string) {
    this.title.setTitle(`${title} | ${this.baseTitle}`);
    this.mainTitle = this.title.getTitle();
  }

  resetTitle() {
    this.title.setTitle(this.baseTitle);
  }
}
