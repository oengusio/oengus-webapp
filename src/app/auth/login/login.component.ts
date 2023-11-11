import { Component, OnInit } from '@angular/core';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: {
    username: string;
    password: string;
    mfaCode: string;
  } = {
    username: '',
    password: '',
    mfaCode: ''
  };

  loading = false;
  passwordHidden = true;

  iconUser = faUser;
  iconPadlock = faLock;
  iconEye = faEye;
  iconEyeSlash = faEyeSlash;


  constructor() { }

  ngOnInit(): void {
  }

  performLogin(): void {
    this.loading = true;
  }
}
