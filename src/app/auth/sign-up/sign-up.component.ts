import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignupDto } from '../../../model/dto/signup-dto';
import { faEnvelope, faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  iconUser = faUser;
  iconEmail = faEnvelope;
  iconPadlock = faLock;
  iconEye = faEye;
  iconEyeSlash = faEyeSlash;

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

  errors: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: NwbAlertService,
    private translateService: TranslateService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.data.username = (params['username'] || '').toLowerCase();
      this.data.displayName = (params['display_name'] || params['username'] || '');
      this.data.email = (params['email'] || '');
    });
  }

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

  get title(): string {
    return 'Sign Up';
  }
}
