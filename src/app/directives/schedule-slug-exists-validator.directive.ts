import { Directive, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ScheduleService } from '../../services/schedule.service';
import { MarathonService } from '../../services/marathon.service';
import { map } from 'rxjs/operators';

@Directive({
    selector: '[appScheduleSlugExistsValidator]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ScheduleSlugExistsValidatorDirective, multi: true }],
    standalone: false
})
export class ScheduleSlugExistsValidatorDirective implements AsyncValidator {
  // Holds the old value of the slug
  @Input() appScheduleSlugExistsValidator = '';

  constructor(
    private marathonService: MarathonService,
    private scheduleService: ScheduleService,
  ) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (this.appScheduleSlugExistsValidator === control.value) {
      return Promise.resolve(null);
    }

    return this.scheduleService.isSlugInUse(
      this.marathonService.marathon.id,
      control.value,
    )
      .pipe(map((res) => {
        return res.status ? {
          exists: res.status,
        } : null;
      }));
  }
}
