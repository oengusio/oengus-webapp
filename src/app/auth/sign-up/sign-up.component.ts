import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignupDto } from '../../../model/dto/signup-dto';
import { faEnvelope, faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';

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
    this.data.displayName = this.data.displayName || this.data.username;
    this.data.connections = this.data.connections.filter(it => it.platform && it.username);

    try {
      const result = await this.authService.performRegister(this.data);

      if (result.status === 'SIGNUP_SUCCESS') {
        this.showNextStep = true;
      }
    } catch (e: any) {
      const errors: { field: string; defaultMessage: string }[] = e.error.errors || {};

      errors.forEach(({ field, defaultMessage }) => {
        this.errors[field] = defaultMessage;
      });

      console.log(e);
      this.showNextStep = false;
    } finally {
      this.loading = false;
    }
  }

  get title(): string {
    return 'Sign Up';
  }
}
