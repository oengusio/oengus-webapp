import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../services/user.service';
import {faSyncAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {NwbAlertConfig, NwbAlertService} from '@wizishop/ng-wizi-bulma';
import {TranslateService} from '@ngx-translate/core';
import { SocialAccount } from '../../../model/social-account';
import BulmaTagsInput from '@duncte123/bulma-tagsinput';
import { MiscService } from '../../../services/misc.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('pronouns', {static: true}) pronounsInput: ElementRef<HTMLInputElement>;

  public faSyncAlt = faSyncAlt;
  public faPlus = faPlus;

  public user: User;
  public loading = false;

  public deactivateConfirm = false;
  public deleteConfirm = false;
  public deleteUsername: string;
  private tagsInput: BulmaTagsInput;
  public countries = [
    'AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ',
    'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR',
    'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC',
    'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO',
    'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF',
    'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY',
    'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM',
    'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY',
    'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX',
    'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI',
    'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH',
    'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC',
    'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS',
    'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK',
    'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU',
    'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW'
  ];

  constructor(private userService: UserService,
              private miscService: MiscService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: NwbAlertService,
              private translateService: TranslateService) {
    this.user = {...this.route.snapshot.data.user};
    localStorage.removeItem('user');

    this.route.params.subscribe(params => {
      this.route.queryParams.subscribe(queryParams => {
        if (!!params['service'] && (!!queryParams['code'] || !!queryParams['oauth_token'] && !!queryParams['oauth_verifier'])) {
          this.syncService(params, queryParams);
        }
      });
    });
  }

  ngOnInit(): void {
    const tagsInput = this.pronounsInput.nativeElement;

    this.translateService.get('user.settings.pronouns.hint').subscribe((placeholder) => {
      this.translateService.get('user.settings.pronouns.no_results').subscribe((str) => {
        this.tagsInput = new BulmaTagsInput(tagsInput, {
          noResultsLabel: str,
          selectable: false,
          freeInput: false,
          placeholder,
          caseSensitive: false,
          trim: true,
          source: (value) => new Promise((resolve) => {
            if (!value) {
              return resolve([]);
            }

            this.miscService.searchPronouns(value).subscribe(resolve, () => resolve([]));
          }),
        });

        this.tagsInput.add(
          (this.user.pronouns || '').split(',')
        );
      });
    });
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
    this.user.pronouns = this.tagsInput.items.join(',') || null;
    return new Promise((resolve) => {
      this.userService.update(this.user).add(() => {
        this.loading = false;
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
      queryParams['oauth_verifier']).subscribe((response) => {
      if (typeof this.user[`${params['service'].toLowerCase()}Id`] !== 'undefined') {
        this.user[`${params['service'].toLowerCase()}Id`] = response.id;
        this.addOrUpdateConnectionByType(params['service'].toUpperCase(), response.name);
      }

      this.submit().then(() => {
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

  private showSuccessToast(message: string): void {
    const alertConfig: NwbAlertConfig = {
      message: message,
      duration: 3000,
      position: 'is-right',
      color: 'is-success'
    };
    this.toastr.open(alertConfig);
  }

  private showWarningToast(message: string): void {
    const alertConfig: NwbAlertConfig = {
      message: message,
      duration: 3000,
      position: 'is-right',
      color: 'is-warning'
    };
    this.toastr.open(alertConfig);
  }
}
