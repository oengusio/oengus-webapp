import { Component, inject } from '@angular/core';
import { SelfUser } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SocialAccount } from '../../../model/social-account';
import { SocialPlatform, SocialPlatformName } from '../../../model/social-platform';
import { PatreonStatusDto, RelationShip } from '../../../model/annoying-patreon-shit';
import DOMPurify from 'dompurify';
import { AuthService } from '../../../services/auth.service';
import { InitMFADto } from '../../../model/auth';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: false
})
export class SettingsComponent {

  constructor() {
    this.user = {...this.route.snapshot.data.user};

    this.route.params.subscribe(params => {
      this.route.queryParams.subscribe(queryParams => {
        if (!!params['service'] && !!queryParams['code']) {
          this.syncService(params, queryParams);
        }
      });
    });
  }

  get usernameConfirmed(): boolean {
    if (!this.userService.user) {
      return false;
    }

    return this.deleteUsername === this.userService.user.username;
  }

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private notificationService = inject(NotificationService);

  public faPlus = faPlus;

  public user: SelfUser;
  public loading = false;
  mfaLoading = false;
  mfaSettings: InitMFADto | null = null;

  public deactivateConfirm = false;
  public deleteConfirm = false;
  public deleteUsername: string;
  pwResetButtonDisabled = false;

  readonly title = 'Settings';

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

  addOrUpdateConnectionByType(type: SocialPlatformName, username: string): void {
    const conn = this.user.connections.find((c) => c.platform === type);

    if (conn) {
      conn.username = username;
    } else if (typeof SocialPlatform[type] !== 'undefined') {
      this.user.connections.push({
        platform: type,
        username,
      });
    }
  }

  syncDiscord(): void {
    delete this.user.discordId;

    window.location.assign(this.authService.getDiscordAuthUri(true));
  }

  syncTwitch(): void {
    delete this.user.twitchId;

    window.location.assign(this.authService.getTwitchAuthUrl(true));
  }

  syncPatreon(): void {
    delete this.user.patreonId;

    window.location.assign(this.authService.patreonSyncUrl);
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

  unsyncPatreon(): void {
    delete this.user.patreonId;
    this.submit();
  }

  async submit(): Promise<void> {
    this.loading = true;
    this.user.connections = this.user.connections.filter((c) => !!c.platform && !!c.username);
    // Display name is free text basically, here we strip all HTML and only keep text or default to username.
    this.user.displayName = DOMPurify.sanitize(this.user.displayName, {  ALLOWED_TAGS: [ '#text' ] }) || this.user.username;

    try {
      this.user = await this.userService.update(this.user);

      if (!this.user.enabled) {
        this.notificationService.toast('alert.user.deactivate.success');
        this.userService.logout();
        return;
      }

      this.notificationService.toast('alert.user.update.success');
    } catch (error) {
      if (error.error.type === 'AccountSyncOrPasswordRequiredException') {
        alert('Please set a password or connect twitch/discord before proceeding');
        window.location.reload();
        return;
      }

      this.notificationService.toast('alert.user.update.error', 3000, 'warning');
    } finally {
      this.loading = false;
    }
  }

  async deactivate(): Promise<void> {
    this.loading = true;
    this.user.enabled = false;

    return this.submit();
  }

  deleteUser(): void {
    this.loading = true;
    this.userService.delete(this.user.id).subscribe(() => {
      this.loading = false;
      this.notificationService.toast('user.settings.deletingAccount.success');
      // redirects to home
      this.userService.logout();
    });
  }

  initMfa(): void {
    this.mfaLoading = true;

    this.authService.initMfaSettings().subscribe({
      next: (data: InitMFADto) => {
        this.mfaSettings = data;
      },
    });
  }

  async requestNewPassword(): Promise<void> {
    if (!this.user.emailVerified) {
      firstValueFrom(this.translateService.get('auth.emailVerificationRequired')).then((res: string) => {
        alert(res);
      });

      return;
    }

    this.loading = true;

    try {
      const { status } = await firstValueFrom(this.authService.requestPasswordReset(this.user.email));

      if (status === 'PASSWORD_RESET_SENT') {
        this.pwResetButtonDisabled = true;
        this.notificationService.toast('auth.passwordReset.requested');
      }

      console.log(status);
      // eslint-disable-next-line
    } catch (e: any) {
      console.log(e.error);
      alert(`Something went wrong: ${JSON.stringify(e.error)}`);
    } finally {
      this.loading = false;
    }
  }

  handleMfaResult(result: boolean): void {
    // true == mfa stored
    // false == mfa failed
    this.user.mfaEnabled = result;
    this.mfaSettings = null;
    this.mfaLoading = false;
  }

  async resetMfa() {
    this.loading = true;
    this.mfaLoading = true;

    const mfaCode = prompt('Please enter your current 2FA code:');

    if (!mfaCode || mfaCode.length < 6) {
      this.loading = false;
      this.mfaLoading = false;
      return;
    }

    try {
      const result = await firstValueFrom(this.authService.deleteMfa(mfaCode));

      if (result.status) {
        alert('2fa reset successful');
      } else {
        alert('2fa code was not valid');
      }

      window.location.reload(); // just to make sure stuff get purged
    } catch (e) {
      alert(`Failed to reset MFA: ${JSON.stringify(e.error)}`);
    } finally {
      this.loading = true;
      this.mfaLoading = true;
    }
  }

  private async syncService(params: Params, queryParams: Params): Promise<void> {
    this.loading = true;

    try {
      const response = await this.userService.sync(
        params['service'],
        queryParams['code'],
      );

      if (typeof this.user[`${params['service'].toLowerCase()}Id`] !== 'undefined' && 'id' in response) {
        this.user[`${params['service'].toLowerCase()}Id`] = response.id;
        this.addOrUpdateConnectionByType(params['service'].toUpperCase(), response.name);
      }

      this.submit().then(() => {
        if (params['service'] === 'patreon') {
          // sync the data to the backend
          const { data, included } = response as RelationShip;

          if (data.relationships.memberships.data.length > 0) {
            const dto: PatreonStatusDto = {
              patreonId: data.id,
              status: included[0].attributes.patron_status.toUpperCase(),
              pledgeAmount: included[0].attributes.will_pay_amount_cents,
            };

            this.userService.updatePatreonStatus(this.user.id, dto);
          }
        }

        this.router.navigate(['/user/settings']);
      });
    } catch (error) {
      this.router.navigate(['/user/settings']);

      if (error.error) {
        if (error.error.error) {
          this.notificationService.toastRaw(error.error.error, 3000, 'warning');
        } else {
          switch (error.error) {
            case 'ACCOUNT_ALREADY_SYNCED':
              this.notificationService.toast('alert.user.sync.alreadySynced', 3000, 'warning');
              break;
            default:
              this.notificationService.toast('alert.user.sync.error', 3000, 'warning');
              break;
          }
        }
        return;
      }
    }
  }
}
