import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  errorTranslationKey: string | null = 'auth.passwordReset.bla';

  loading = false;
  newPassword = '';

  constructor() { }

  ngOnInit(): void {
  }

}
