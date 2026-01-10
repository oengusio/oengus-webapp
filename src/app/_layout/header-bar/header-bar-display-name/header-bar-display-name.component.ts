import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-header-bar-display-name',
    templateUrl: './header-bar-display-name.component.html',
    styleUrls: ['./header-bar-display-name.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class HeaderBarDisplayNameComponent {
  private userService = inject(UserService);


  get isMissingDisplayName(): boolean {
    return this.userService.user && !this.userService.user.displayName;
  }
}
