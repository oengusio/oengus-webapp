import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { DurationService } from '../../services/duration.service';

@Directive({
    selector: '[appMinDurationValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinDurationValidatorDirective, multi: true }],
})
export class MinDurationValidatorDirective implements Validator {

  // @ts-expect-error meh.
  @Input('appMinDurationValidator') minDuration: number;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return {
        minDuration: true
      };
    }

    const duration = Temporal.Duration.from(DurationService.toIso(control.value));

    if (duration.total('seconds') > this.minDuration) {
      return null;
    }

    return {
      minDuration: true
    };
  }
}
