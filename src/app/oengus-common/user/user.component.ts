import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import SocialAccount from '../../../model/social-account';
import {SocialPlatform} from '../../../model/social-platform';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Input() showSocialLinks = false;
  @Input() showProfileLink = true;

  private readonly acceptedTypes = ['TWITTER', 'TWITCH', 'SPEEDRUNCOM'];
  public platforms = SocialPlatform;
  public iconMapping = {
    'TWITCH': faTwitch,
    'TWITTER': faTwitter,
    'SPEEDRUNCOM': faTrophy,
  };

  public localStorage = localStorage;

  constructor() {
  }

  ngOnInit() {
  }

  get profileConnections(): SocialAccount[] {
    return this.user.connections.filter((connection) => this.acceptedTypes.includes(connection.platform));
  }

}
