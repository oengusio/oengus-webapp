import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-header-bar-verify-email',
  templateUrl: './header-bar-verify-email.component.html',
  styleUrls: ['./header-bar-verify-email.component.scss']
})
export class HeaderBarVerifyEmailComponent {

  canPressButton = true;
  loading = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  requestNewEmail() {
    this.canPressButton = false;
    this.loading = true;
    this.authService.requestNewVerificationEmail().subscribe({
      next({ status }) {
        console.log(status);
        alert('Email sent!');
        this.loading = false;
      },

      error: (err: any) => {
        console.log(err);
        this.loading = false;
        alert(`Something went wrong: ${err.error.message}`);
      }
    });
  }

  get show(): boolean {
    return this.userService.user && !this.userService.user.emailVerified;
  }

}
