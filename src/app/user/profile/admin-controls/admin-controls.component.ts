import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { UserProfile } from '../../../../model/user-profile';

@Component({
    selector: 'app-user-admin-controls',
    templateUrl: './admin-controls.component.html',
    styleUrls: ['./admin-controls.component.scss'],
    standalone: false
})
export class AdminControlsComponent {
  userService = inject(UserService);

  @Input() user: UserProfile;
  @Output() openDialog = new EventEmitter<void>();

  public openAdminDialog(): void {
    this.openDialog.emit();
  }
}
