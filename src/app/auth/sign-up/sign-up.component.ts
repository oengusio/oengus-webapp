import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignupDto } from '../../../model/dto/signup-dto';
import { faEye, faEyeSlash, faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  iconUser = faUser;
  iconEmail = faEnvelope;
  iconPadlock = faLock;
  iconEye = faEye;
  iconEyeSlash = faEyeSlash;
  iconDiscord = faDiscord;
  iconTwitch = faTwitch;

  loading = false;
  passwordHidden = true;
  data: SignupDto = {
    connections: [],
    country: '',
    displayName: '',
    email: '',
    languagesSpoken: [],
    password: '',
    pronouns: [],
    username: '',
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

  ngOnInit(): void {
  }

  submit() {
    this.loading = true;
  }

  get title(): string {
    return 'Sign Up';
  }
}
