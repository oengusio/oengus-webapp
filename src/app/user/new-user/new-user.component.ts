import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css'],
    imports: [
        CommonModule,
    ]
})
export class NewUserComponent {
  readonly title = 'Invalid account state!';
}
