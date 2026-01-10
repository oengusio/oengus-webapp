import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarDisplayNameComponent } from './header-bar-display-name/header-bar-display-name.component';
import { HeaderBarVerifyEmailComponent } from './header-bar-verify-email/header-bar-verify-email.component';
import { HeaderBarNavComponent } from './header-bar-nav/header-bar-nav.component';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss'],
    imports: [
        CommonModule,
        HeaderBarDisplayNameComponent,
        HeaderBarVerifyEmailComponent,
        HeaderBarNavComponent,
    ]
})
export class HeaderBarComponent {
  //
}
