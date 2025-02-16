import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { UserService } from '../../../services/user.service';
import { LoginDetails, LoginResponse, LoginResponseStatus } from '../../../model/auth';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {

  loginData: LoginDetails = {
    username: '',
    password: '',
    twoFactorCode: ''
  };

  loginError: LoginResponseStatus | null = null;
  loading = false;
  passwordHidden = true;
  mfaNeeded: boolean = !!localStorage.getItem('alwaysShowMfa');

  iconUser = faUser;
  iconDiscord = faDiscord;
  iconTwitch = faTwitch;

  constructor(
    private userService: UserService,
    private router: Router,
    public authService: AuthService,
  ) { }

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
            this.mfaNeeded = true;
            return;
          case LoginResponseStatus.USERNAME_PASSWORD_INCORRECT:
            return;
        }
      },

      error: ({ error }: { error: LoginResponse }) => {
        this.loginError = error.status;
        this.loading = false;
      }
    });
  }
}
