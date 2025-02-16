import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { LoadingBarService } from '../../../services/loading-bar.service';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { LoginResponse, LoginResponseStatus } from '../../../model/auth';

@Component({
    selector: 'app-login-oauth',
    templateUrl: './login-oauth.component.html',
    styleUrls: ['./login-oauth.component.scss'],
    standalone: false
})
export class LoginOauthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: NwbAlertService,
    private translateService: TranslateService,
    private loader: LoadingBarService
  ) { }

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
    this.router.navigate(['/register'], {
      queryParams: {
        username,
      }
    });

    this.translateService.get('alert.user.login.noAccountFound').subscribe((res: string) => {
      const alertConfig: NwbAlertConfig = {
        message: res,
        duration: 8000,
        position: 'is-right',
        color: 'is-warning'
      };
      this.toastr.open(alertConfig);
    });
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
}
