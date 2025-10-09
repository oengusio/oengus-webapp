import { Component, inject } from '@angular/core';
import { SignupDto } from '../../../model/dto/signup-dto';
import { AuthService } from '../../../services/auth.service';
import { NwbAlertService } from '@oengus/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    standalone: false
})
export class SignUpComponent {
  readonly title = 'Sign Up';

  private authService = inject(AuthService);
  private toastr = inject(NwbAlertService);
  private translateService = inject(TranslateService);

  showNextStep = false;

  loading = false;
  passwordHidden = true;
  data: SignupDto = {
    displayName: '',
    username: '',
    email: '',
    password: '',
    country: null,
    pronouns: [],
    languagesSpoken: [],
    connections: [],
  };

  errors: Record<string, string> = {};

  async submit() {
    this.loading = true;
    this.errors = {};
    this.data.username = this.data.username.toLowerCase();
    this.data.displayName = this.data.displayName || this.data.username;
    this.data.connections = this.data.connections.filter(it => it.platform && it.username);

    try {
      const result = await this.authService.performRegister(this.data);

      if (result.status === 'SIGNUP_SUCCESS') {
        this.showNextStep = true;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      this.triggerValidationToaster();

      const errors: { field: string; defaultMessage: string }[] = e.error.errors ?? [];

      errors.forEach(({ field, defaultMessage }) => {
        this.errors[field] = defaultMessage;
      });

      window.scrollTo(0, 0);

      console.log(e);
      this.showNextStep = false;
    } finally {
      this.loading = false;
    }
  }

  private triggerValidationToaster() {
    this.translateService.get('alert.generic.validationError').subscribe({
      next: (message: string) => {
        this.toastr.open({
          message,
          duration: 5000,
          position: 'is-right',
          color: 'is-danger'
        });
      },
    });
  }
}
