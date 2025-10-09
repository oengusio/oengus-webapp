import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Input() password: string | null;
  @Output() passwordChange = new EventEmitter<string>();
}
