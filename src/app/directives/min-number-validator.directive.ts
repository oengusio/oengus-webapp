import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[appMinNumberValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinNumberValidatorDirective, multi: true }],
    standalone: false
})
export class MinNumberValidatorDirective implements Validator {

  @Input('appMinNumberValidator') minNumber: number;

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value >= this.minNumber) {
      return null;
    } else {
      return {
        minNumber: true
      };
    }
  }

}
