import { Component, Input } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { UserProfile } from '../../../../model/user-profile';

@Component({
  selector: 'app-user-admin-controls',
  templateUrl: './admin-controls.component.html',
  styleUrls: ['./admin-controls.component.scss']
})
export class AdminControlsComponent {
  @Input() user: UserProfile;

  banLoading = false;

  constructor(public userService: UserService) { }

  public banUser(): void {
    this.banLoading = true;

    this.userService.ban(this.user.id).subscribe({
      next: () => {
        this.user.banned = true;
      }, complete: () => {
        this.banLoading = false;
      }
    });
  }

  public unbanUser(): void {
    this.banLoading = true;

    this.userService.unban(this.user.id).subscribe({
      next: () => {
        this.user.banned = false;
      }, complete: () => {
        this.banLoading = false;
      }
    });
  }

  public setActivated(activated: boolean): void {
    this.banLoading = true;

    this.userService.setEnabled(this.user.id, activated).subscribe(() => {
      this.user.enabled = activated;
      this.banLoading = false;
    });
  }

}
