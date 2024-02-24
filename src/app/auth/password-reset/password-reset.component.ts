import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  errorTranslationKey: string | null = 'auth.passwordReset.error.PASSWORD_RESET_CODE_INVALID';
  resetToken: string | null = null;

  loading = true;
  newPassword = '';
  notificationClass = 'is-danger';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resetToken = params['token'];

      if (this.resetToken) {
        this.errorTranslationKey = null;
      }

      this.loading = false;
    });
  }

  async performReset() {
    if (!this.resetToken) {
      this.errorTranslationKey = 'auth.passwordReset.error.PASSWORD_RESET_CODE_INVALID';
    }

    this.loading = true;
    this.notificationClass = 'is-danger';

    try {
      const { status } = await firstValueFrom(this.authService.resetPassword(this.resetToken, this.newPassword));

      if (status === 'PASSWORD_RESET_SUCCESS') {
        this.notificationClass = 'is-success';
        this.errorTranslationKey = 'auth.passwordReset.success';
        this.newPassword = '';
      }
    } catch (e: any) {
      if ((e.error || {}).errors) {
        this.errorTranslationKey = e.error.errors.flatMap(error => error.defaultMessage.split(',')).join('\n');
      } else if (e.error.status) {
        this.errorTranslationKey = `auth.passwordReset.error.${e.error.status.toUpperCase()}`;
      }
    } finally {
      this.loading = false;
    }
  }

}
