import { Directive, inject, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { MarathonService } from '../../services/marathon.service';
import { map } from 'rxjs/operators';

@Directive({
    selector: '[appMarathonExistsValidator]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: MarathonExistsValidatorDirective, multi: true }],
    standalone: false
})
export class MarathonExistsValidatorDirective implements AsyncValidator {
  private marathonService = inject(MarathonService);

  @Input() previousMarathonName: string;

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.marathonService.exists(control.value).pipe(map(errors => {
      if (this.previousMarathonName) {
        return errors;
      }
      if (errors.exists && control.value !== this.previousMarathonName) {
        return {
          exists: true
        };
      }
      return null;
    }));
  }

}
