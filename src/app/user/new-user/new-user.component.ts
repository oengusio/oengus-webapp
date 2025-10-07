import { Component } from '@angular/core';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css'],
    standalone: false
})
export class NewUserComponent {
  readonly title = 'Invalid account state!';
}
