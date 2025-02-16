import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { passwordResetErrorToMessage } from '../../../utils/authHelpers';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: false
})
export class ForgotPasswordComponent {
  iconUser = faEnvelope;

  errorTranslationKey: string | null = null;
  notificationClass = 'is-danger';

  loading = false;
  email = '';

  constructor(
    private authService: AuthService,
  ) { }

  async requestNewPassword(form: HTMLFormElement) {
    if (!form.reportValidity()) {
      return;
    }

    try {
      this.loading = true;

      const { status } = await firstValueFrom(this.authService.requestPasswordReset(this.email));

      if (status === 'PASSWORD_RESET_SENT') {
        this.notificationClass = 'is-success';
        this.errorTranslationKey = 'auth.passwordReset.requested';
        this.email = '';
      } else {
        this.errorTranslationKey = 'You should never see this message. If you do, let me know what you did.';
      }

    } catch (e: any) {
      console.log(e.error);
      this.notificationClass = 'is-danger';
      this.errorTranslationKey = passwordResetErrorToMessage(e);
    } finally {
      this.loading = false;
    }
  }

  get title(): string {
    return 'Forgot your password';
  }
}
