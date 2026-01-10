import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-header-bar-verify-email',
    templateUrl: './header-bar-verify-email.component.html',
    styleUrls: ['./header-bar-verify-email.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class HeaderBarVerifyEmailComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);


  canPressButton = true;
  loading = false;

  requestNewEmail() {
    this.canPressButton = false;
    this.loading = true;
    this.authService.requestNewVerificationEmail().subscribe({
      next: ({ status }) => {
        console.log(status);
        alert('Email sent!');
        this.loading = false;
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
