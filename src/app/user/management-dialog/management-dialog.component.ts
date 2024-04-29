import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserProfile } from '../../../model/user-profile';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-management-dialog',
  templateUrl: './management-dialog.component.html',
  styleUrls: ['./management-dialog.component.scss']
})
export class ManagementDialogComponent implements OnInit {
  @Input() user: UserProfile;
  @Output() close = new EventEmitter<void>();

  private roles: string[] = [];
  banLoading = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.fetchRoles(this.user.id).subscribe((roles) => {
      this.roles = roles;
    });
  }

  public isRole(role: string): boolean {
    return this.roles.includes(`ROLE_${role.toUpperCase()}`);
  }

  public toggleRole(role: string): void {
    const roleName = `ROLE_${role.toUpperCase()}`;
    const idx = this.roles.indexOf(roleName);

    if (idx > -1) {
      this.roles.splice(idx, 1);
    } else {
      this.roles.push(roleName);
    }
  }

  public async saveRoles(): Promise<void> {
    this.userService.updateRoles(this.user.id, this.roles).subscribe({
      next: () => {
        alert('Roles updated!');
      },
      error: (e) => {
        alert(`Something went wrong: ${e.message}`);
      }
    });
  }

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
