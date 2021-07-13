import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import SocialAccount from '../../../../model/social-account';
import SocialPlatform from '../../../../model/social-platform';

@Component({
  selector: 'app-connection-settings',
  templateUrl: './connection-settings.component.html',
  styleUrls: ['./connection-settings.component.scss']
})
export class ConnectionSettingsComponent implements OnInit {
  @Input() public connection: SocialAccount;

  @Output() public deleteSelf = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  get platforms() {
    const data = {};

    for (const platform of Object.keys(SocialPlatform)) {
      data[platform] = SocialPlatform[platform];
    }

    return data;
  }

}
