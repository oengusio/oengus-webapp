import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { passwordResetErrorToMessage } from '../../../utils/authHelpers';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss'],
    standalone: false
})
export class PasswordResetComponent implements OnInit {
  readonly title = 'Reset Password';
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  errorTranslationKey: string | null = 'auth.passwordReset.error.PASSWORD_RESET_CODE_INVALID';
  resetToken: string | null = null;

  loading = true;
  newPassword = '';
  notificationClass = 'is-danger';

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

    try {
      const { status } = await firstValueFrom(this.authService.resetPassword(this.resetToken, this.newPassword));

      if (status === 'PASSWORD_RESET_SUCCESS') {
        this.notificationClass = 'is-success';
        this.errorTranslationKey = 'auth.passwordReset.success';
        this.newPassword = '';
      } else {
        this.errorTranslationKey = 'You should never see this message. If you do, let me know what you did.';
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      this.notificationClass = 'is-danger';
      this.errorTranslationKey = passwordResetErrorToMessage(e);
    } finally {
      this.loading = false;
    }
  }
}
