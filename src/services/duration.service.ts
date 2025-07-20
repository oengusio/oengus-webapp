import { Injectable } from '@angular/core';
import type { Temporal } from '@js-temporal/polyfill';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DurationService {

  constructor() {
  }

  static toHuman(estimate: string): string {
    // @ts-expect-error temporal is not polyfilled
    if (window.Temporal?.Duration) {
      console.log(`Using temporal to parse ${estimate}`);

      // @ts-expect-error temporal is not polyfilled
      const d: Temporal.Duration = window.Temporal.Duration.from(estimate);
      // tslint:disable:no-shadowed-variable
      const hours = d.hours.toString().padStart(2, '0');
      const minutes = d.minutes.toString().padStart(2, '0');
      const seconds = d.seconds.toString().padStart(2, '0');
      // tslint:enable:no-shadowed-variable

      return `${hours}:${minutes}:${seconds}`;
    }

    const duration = moment.duration(estimate);
    const hours = Math.floor(duration.asHours()).toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  static toIso(humanEstimate: string): string {
    // @ts-expect-error temporal is not polyfilled
    if (window.Temporal?.Duration) {
      console.log(`Using temporal to parse ${humanEstimate}`);

      const timeParts = humanEstimate.split(':');
      let duration: Temporal.Duration;

      if (timeParts.length === 3) {
        const [hours, minutes, seconds] = timeParts.map((p) => parseInt(p, 10));
        // @ts-expect-error temporal is not polyfilled
        duration = window.Temporal.Duration.from({hours, minutes, seconds});
      } else {
        const [minutes, seconds] = timeParts.map((p) => parseInt(p, 10));
        // @ts-expect-error temporal is not polyfilled
        duration = window.Temporal.Duration.from({hours: 0, minutes, seconds});
      }


      return duration.toString();
    }

    // TODO: replace moment with something not moment
    return moment.duration(humanEstimate).toISOString();
  }
}
