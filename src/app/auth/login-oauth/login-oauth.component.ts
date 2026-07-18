import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingBarService } from '../../../services/loading-bar.service';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { LoginResponse, LoginResponseStatus } from '../../../model/auth';
import { NotificationService } from '../../../services/notification.service';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-login-oauth',
    templateUrl: './login-oauth.component.html',
    styleUrls: ['./login-oauth.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class LoginOauthComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(NotificationService);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            this.toastr.toastRaw(res + '\n\nCode: ' + error.status, 5000, 'warning');
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
    this.toastr.toast('alert.user.login.disabledAccount', 8000, 'warning');
  }

  passwordResetRequiredToast() {
    this.router.navigate(['/forgot-password']);
    this.toastr.toast('alert.user.login.passwordResetRequired', 8000, 'warning');
  }
}
