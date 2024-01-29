import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignupDto } from '../../../model/dto/signup-dto';
import { faEnvelope, faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.data.username = (params['username'] || '').toLowerCase();
      this.data.displayName = (params['display_name'] || params['username'] || '');
      this.data.email = (params['email'] || '');
    });
  }

  submit() {
    this.loading = true;
    this.data.connections = this.data.connections.filter(it => it.platform && it.username);
  }

  get title(): string {
    return 'Sign Up';
  }
}
