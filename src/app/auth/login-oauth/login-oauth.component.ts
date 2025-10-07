import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NwbAlertConfig, NwbAlertService } from '@oengus/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { LoadingBarService } from '../../../services/loading-bar.service';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { LoginResponse, LoginResponseStatus } from '../../../model/auth';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-login-oauth',
    templateUrl: './login-oauth.component.html',
    styleUrls: ['./login-oauth.component.scss'],
    standalone: false
})
export class LoginOauthComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(NwbAlertService);
  private notificationService = inject(NotificationService);
  private translateService = inject(TranslateService);
  private loader = inject(LoadingBarService);


  ngOnInit(): void {
    setTimeout(() => {
      this.loader.setLoading(true);
    }, 0);

    this.route.params.subscribe(params => {
      this.route.queryParams.subscribe(queryParams => {
        const service = params['service'];
        const code = queryParams['code'];

        this.loginTo(service, code);
      });
    });
  }

  async loginTo(service: string, code: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.authService.performOauthLogin({ service, code }));

      switch (response.status) {
        case LoginResponseStatus.LOGIN_SUCCESS:
          this.userService.token = response.token;
          this.userService.me().add(() => {
            if (this.userService.user.email) {
              const item = localStorage.getItem('prev_loc') || '/';
              localStorage.removeItem('prev_loc');

              this.router.navigate([item]);
            }
          });
          return;
      }
    } catch (e: any) {
      const { error }: { error: LoginResponse } = e;

      switch (error.status) {
        case LoginResponseStatus.ACCOUNT_DISABLED:
          this.disabledAccountToast();
          return;
        case LoginResponseStatus.PASSWORD_RESET_REQUIRED:
          this.passwordResetRequiredToast();
          return;
        case LoginResponseStatus.OAUTH_ACCOUNT_NOT_FOUND:
          this.unknownAccountToast(error.token);
          return;
        default:
          this.router.navigate(['/']);
          this.translateService.get('alert.user.login.error').subscribe((res: string) => {
            const alertConfig: NwbAlertConfig = {
              message: res + '\n\nCode: ' + error.status,
              duration: 5000,
              position: 'is-right',
              color: 'is-warning'
            };
            this.toastr.open(alertConfig);
          });
      }
    }
  }

  unknownAccountToast(username: string | null) {
    this.router.navigate(['/login'], {
      queryParams: {
        username,
      }
    });

    this.notificationService.notify('alert.user.login.noAccountFound', 'warning');
  }

  disabledAccountToast() {
    this.router.navigate(['/']);
    this.translateService.get('alert.user.login.disabledAccount').subscribe((res: string) => {
      const alertConfig: NwbAlertConfig = {
        message: res,
        duration: 8000,
        position: 'is-right',
        color: 'is-warning'
      };
      this.toastr.open(alertConfig);
    });
  }

  passwordResetRequiredToast() {
    this.router.navigate(['/forgot-password']);
    this.translateService.get('alert.user.login.passwordResetRequired').subscribe((res: string) => {
      const alertConfig: NwbAlertConfig = {
        message: res,
        duration: 8000,
        position: 'is-right',
        color: 'is-warning'
      };
      this.toastr.open(alertConfig);
    });
  }
}
