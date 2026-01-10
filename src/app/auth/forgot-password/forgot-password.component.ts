import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { passwordResetErrorToMessage } from '../../../utils/authHelpers';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        FontAwesomeModule,
    ]
})
export class ForgotPasswordComponent {
  readonly title = 'Forgot your password';
  private authService = inject(AuthService);

  iconUser = faEnvelope;

  errorTranslationKey: string | null = null;
  notificationClass = 'is-danger';

  loading = false;
  email = '';

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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e.error);
      this.notificationClass = 'is-danger';
      this.errorTranslationKey = passwordResetErrorToMessage(e);
    } finally {
      this.loading = false;
    }
  }
}
