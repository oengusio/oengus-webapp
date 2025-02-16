import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-element-password-input',
    templateUrl: './element-password-input.component.html',
    styleUrls: ['./element-password-input.component.scss'],
    host: {
        'class': 'field',
    },
    standalone: false
})
export class ElementPasswordInputComponent {
  passwordHidden = true;
  iconPadlock = faLock;
  iconEye = faEye;
  iconEyeSlash = faEyeSlash;

  @Input() password: string | null;
  @Output() passwordChange = new EventEmitter<string>();
}
