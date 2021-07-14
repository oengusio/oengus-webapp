import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { faSyncAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import SocialAccount from '../../../model/social-account';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public faSyncAlt = faSyncAlt;
  public faPlus = faPlus;

  public user: User;
  public loading = false;

  public deactivateConfirm = false;
  public deleteConfirm = false;
  public deleteUsername: string;

  constructor(public userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: NwbAlertService,
              private translateService: TranslateService) {
    this.user = {...this.route.snapshot.data.user};
    localStorage.setItem('user', JSON.stringify(this.user));
    this.route.params.subscribe(params => {
      this.route.queryParams.subscribe(queryParams => {
        if (!!params['service'] && (!!queryParams['code'] || !!queryParams['oauth_token'] && !!queryParams['oauth_verifier'])) {
          this.syncService(params, queryParams);
        }
      });
    });
  }

  ngOnInit(): void {

  }

  addNewConnection(): void {
    this.user.connections.push({
      platform: '',
      username: '',
    });
  }

  getUsernameByConnectionType(type: string): string {
    const conn = this.user.connections.find((c) => c.platform === type);

    if (conn) {
      return conn.username;
    }

    return '';
  }

  deleteConnection(connection: SocialAccount): void {
    const conns = this.user.connections;

    const index = conns.indexOf(connection);

    if (index > -1) {
      conns.splice(index, 1);
    }
  }

  removeConnectionByType(type: string): void {
    const conn = this.user.connections.find((c) => c.platform === type);

    if (conn) {
      this.deleteConnection(conn);
    }
  }

  addOrUpdateConnectionByType(type: string, username: string): void {
    const conn = this.user.connections.find((c) => c.platform === type);

    if (conn) {
      conn.username = username;
    } else {
      this.user.connections.push({
        platform: type,
        username,
      });
    }
  }

  syncDiscord(): void {
    delete this.user.discordId;
    // this.removeConnectionByType('DISCORD');

    window.location.assign(this.userService.getDiscordAuthUri(true));
  }

  syncTwitch(): void {
    delete this.user.twitchId;

    window.location.assign(this.userService.getTwitchAuthUrl(true));
  }

  syncTwitter(): void {
    this.loading = true;
    delete this.user.twitterId;

    this.userService.sync('twitterAuth').subscribe(response => {
      window.location.replace(response.token);
    });
  }

  unsyncDiscord(): void {
    delete this.user.discordId;
    this.removeConnectionByType('DISCORD');
    this.submit();
  }

  unsyncTwitch(): void {
    delete this.user.twitchId;
    this.removeConnectionByType('TWITCH');
    this.submit();
  }

  unsyncTwitter(): void {
    delete this.user.twitterId;
    this.removeConnectionByType('TWITTER');
    this.submit();
  }

  submit(): Promise<void> {
    this.loading = true;
    return new Promise((resolve) => {
      this.userService.update(this.user).add(() => {
        this.loading = false;
        localStorage.setItem('user', JSON.stringify(this.user));
        resolve();
      });
    });
  }

  deactivate(): void {
    this.loading = true;
    this.user.enabled = false;
    this.userService.update(this.user).add(() => {
      this.loading = false;
    });
  }

  deleteUser(): void {
    this.loading = true;
    this.userService.delete(this.user.id).subscribe(() => {
      this.loading = false;
      this.translateService.get('user.settings.deletingAccount.success').subscribe((res: string) => {
        this.showSuccessToast(res);
      });
      // redirects to home
      this.userService.logout();
    });
  }

  get usernameConfirmed(): boolean {
    if (!this.userService.user) {
      return false;
    }

    return this.deleteUsername === this.userService.user.username;
  }

  get title(): string {
    return 'Settings';
  }

  private syncService(params, queryParams): void {
    this.loading = true;
    this.userService.sync(params['service'],
      queryParams['code'],
      queryParams['oauth_token'],
      queryParams['oauth_verifier']).subscribe(response => {
        // TODO: use more javascript magic
      switch (params['service']) {
        case 'discord' :
          this.user.discordId = response.id;
          this.addOrUpdateConnectionByType('DISCORD', response.name);
          break;
        case 'twitch' :
          this.user.twitchId = response.id;
          this.addOrUpdateConnectionByType('TWITCH', response.name);
          break;
        case 'twitter' :
          this.user.twitterId = response.id;
          this.addOrUpdateConnectionByType('TWITTER', response.name);
          break;
      }
      this.submit().then(() => {
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/user/settings']);
      });
    }, error => {
      switch (error.code) {
        case 'ACCOUNT_ALREADY_SYNCED':
          this.translateService.get('alert.user.sync.alreadySynced').subscribe((res: string) => {
            this.showWarningToast(res);
          });
          break;
        default:
          this.translateService.get('alert.user.sync.error').subscribe((res: string) => {
            this.showWarningToast(res);
          });
          break;
      }
    });
  }

  private showSuccessToast(message: string) {
    const alertConfig: NwbAlertConfig = {
      message: message,
      duration: 3000,
      position: 'is-right',
      color: 'is-success'
    };
    this.toastr.open(alertConfig);
  }

  private showWarningToast(message: string) {
    const alertConfig: NwbAlertConfig = {
      message: message,
      duration: 3000,
      position: 'is-right',
      color: 'is-warning'
    };
    this.toastr.open(alertConfig);
  }
}
