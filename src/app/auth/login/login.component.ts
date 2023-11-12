import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { UserService } from '../../../services/user.service';
import { LoginDetails, LoginResponse, LoginResponseStatus } from '../../../model/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: LoginDetails = {
    username: '',
    password: '',
    twoFactorCode: ''
  };

  loginError: LoginResponseStatus | null = LoginResponseStatus.USERNAME_PASSWORD_INCORRECT;
  loading = false;
  passwordHidden = true;
  mfaNeeded: boolean = !!localStorage.getItem('alwaysShowMfa');

  iconUser = faUser;
  iconPadlock = faLock;
  iconEye = faEye;
  iconEyeSlash = faEyeSlash;
  iconDiscord = faDiscord;
  iconTwitch = faTwitch;

  constructor(
    public userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  performLogin(): void {
    this.loading = true;
    this.passwordHidden = true;

    this.authService.performLogin(this.loginData).subscribe({
      next(response) {
        console.log(response);

        switch (response.status) {
          case LoginResponseStatus.LOGIN_SUCCESS:
            return;
          case LoginResponseStatus.MFA_INVALID:
            return;
          case LoginResponseStatus.MFA_REQUIRED:
            this.loading = false;
            this.mfaNeeded = true;
            return;
          case LoginResponseStatus.USERNAME_PASSWORD_INCORRECT:
            return;
        }
      },

      error({ error }: { error: LoginResponse }) {
        this.loginError = error.status;
      }
    });
  }
}
