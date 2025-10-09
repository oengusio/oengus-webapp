import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { LoginDetails, LoginResponse, LoginResponseStatus } from '../../../model/auth';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NwbAlertConfig, NwbAlertService } from '@oengus/ng-wizi-bulma';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  authService = inject(AuthService);
  private translateService = inject(TranslateService);
  private toastr = inject(NwbAlertService);


  loginData: LoginDetails = {
    username: '',
    password: '',
    twoFactorCode: ''
  };

  loginError: LoginResponseStatus | null = null;
  loading = false;
  passwordHidden = true;
  mfaNeeded = !!localStorage.getItem('alwaysShowMfa');

  performLogin(): void {
    this.loading = true;
    this.passwordHidden = true;

    // Force the username to be lowercase :)
    this.loginData.username = this.loginData.username.toLowerCase();

    this.authService.performLogin(this.loginData).subscribe({
      next: (response) => {
        this.loading = false;

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
          case LoginResponseStatus.MFA_INVALID:
            return;
          case LoginResponseStatus.MFA_REQUIRED:
            // Be nice to users next time around?
            // localStorage.setItem('alwaysShowMfa', 'true');
            this.mfaNeeded = true;
            return;
          case LoginResponseStatus.USERNAME_PASSWORD_INCORRECT:
            return;
        }
      },

      error: ({ error }: { error: LoginResponse }) => {
        this.loginError = error.status;
        this.loading = false;

        if (this.loginError === LoginResponseStatus.PASSWORD_RESET_REQUIRED) {
          this.passwordResetRequiredToast();
        }
      }
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
