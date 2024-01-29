import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignupDto } from '../../../model/dto/signup-dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  loading = false;
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

  get title(): string {
    return 'Sign Up';
  }

}
